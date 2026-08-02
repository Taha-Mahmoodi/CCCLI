# Deploy — VPS with Docker

**When to pick this:** the box runs other things, the build has to be reproducible, and rollback should be one command that cannot half-succeed.

---

## Prerequisites

| Need | Check |
|---|---|
| SSH access, key-based | `ssh -o BatchMode=yes <host> true` |
| Docker Engine on the box | `ssh <host> 'docker --version'` |
| Compose v2 | `ssh <host> 'docker compose version'` |
| A registry, or local build | `docker login <registry>` on the box, by the human |
| DNS pointing at the box | `dig +short <domain>` |
| Ports 80 and 443 free | `ssh <host> 'sudo ss -lntp | grep -E ":(80|443)"'` |

Registry credentials are entered by the human on the box. They are never
committed, never logged, never echoed (`§15`). Nothing secret goes into an image
layer: images are cached, shipped, and readable by anyone who can pull them.

## Snapshot

**Hard rule (`§15`). No snapshot, no deploy.** Here the snapshot is the image
tag that is currently running, which makes it the cleanest snapshot of any
target in this directory.

```bash
mkdir -p runs/<slug>/snapshot
HOST=<user>@<host>

ssh $HOST "docker inspect --format '{{.Config.Image}}' <site>-web" \
  > runs/<slug>/rollback-ref.txt

ssh $HOST "cd /srv/<site> && cat docker-compose.yml" \
  > runs/<slug>/snapshot/docker-compose.yml
ssh $HOST "cd /srv/<site> && docker compose ps --format json" \
  > runs/<slug>/snapshot/containers.json

# Caddy's certificates and its issuance state live in a volume
ssh $HOST "docker run --rm -v <site>_caddy_data:/data -v /tmp:/out alpine \
           tar czf /out/caddy-data.tar.gz -C /data ."
scp $HOST:/tmp/caddy-data.tar.gz runs/<slug>/snapshot/
```

First deploy: write `NEW-SITE` into `rollback-ref.txt`.

## Deploy

`Dockerfile`, multi-stage when there is a build, single stage when the site is
hand-authored HTML:

```dockerfile
# --- build (delete this stage for hand-authored HTML) ---
FROM node:22-alpine AS build
WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- serve ---
FROM nginx:1.27-alpine
COPY --from=build /src/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN nginx -t
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ >/dev/null || exit 1
```

`nginx.conf` next to it, headers and caching only. TLS is the proxy's job:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    location ~* \.(css|js|woff2|png|jpg|webp|avif|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    location = /index.html { add_header Cache-Control "no-cache"; }
    location / { try_files $uri $uri/ =404; }
    error_page 404 /404.html;
}
```

`docker-compose.yml` at `/srv/<site>/`:

```yaml
services:
  web:
    image: <registry>/<site>:${TAG}
    container_name: <site>-web
    restart: unless-stopped
    expose: ["80"]

  caddy:
    image: caddy:2.8-alpine
    restart: unless-stopped
    ports: ["80:80", "443:443"]
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config

volumes:
  caddy_data:
  caddy_config:
```

`Caddyfile`, which is the entire TLS story:

```
<domain> {
    encode zstd gzip
    reverse_proxy web:80
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        Permissions-Policy "geolocation=(), microphone=(), camera=()"
    }
}

www.<domain> {
    redir https://<domain>{uri} permanent
}
```

Build, push, and release with a real tag:

```bash
TAG=$(git rev-parse --short HEAD)-$(date -u +%Y%m%d%H%M)
docker build -t <registry>/<site>:$TAG .
docker push <registry>/<site>:$TAG

ssh $HOST "cd /srv/<site> && TAG=$TAG docker compose pull web \
        && TAG=$TAG docker compose up -d web \
        && docker compose ps"
```

Record the tag in `REPORT.md`. It is the only thing the next person needs.

```bash
curl -sI https://<domain>/ | head -1
```

## Rollback

```bash
ssh $HOST "cd /srv/<site> && TAG=$(cat runs/<slug>/rollback-ref.txt | sed 's/.*://') \
           docker compose up -d web"
```

Seconds, no rebuild, no network fetch if the old image is still in the local
cache. The previous image is byte-identical to what was serving, which no other
target in this directory can promise.

Certificates, if the Caddy volume was lost:

```bash
scp runs/<slug>/snapshot/caddy-data.tar.gz $HOST:/tmp/
ssh $HOST "docker run --rm -v <site>_caddy_data:/data -v /tmp:/in alpine \
           tar xzf /in/caddy-data.tar.gz -C /data"
ssh $HOST "cd /srv/<site> && docker compose restart caddy"
```

Keep the last five images on the box so rollback never depends on the registry:

```bash
ssh $HOST "docker image ls '<registry>/<site>' --format '{{.Tag}}' | tail -n +6 \
           | xargs -r -I{} docker rmi <registry>/<site>:{}"
```

## Domain and TLS

```
@    A     <server-ipv4>
www  A     <server-ipv4>
```

Caddy requests the certificate on first request to a matching hostname, over
ports 80 and 443, and renews on its own with no cron, no timer, no expiry
surprise. The `www` block above is what makes both hostnames deliberate.

```bash
ssh $HOST "cd /srv/<site> && docker compose logs caddy | grep -i certificate"
curl -sI http://<domain>/ | grep -i '^location'
curl -sI https://www.<domain>/ | head -1
echo | openssl s_client -connect <domain>:443 2>/dev/null | openssl x509 -noout -dates
```

Traefik instead of Caddy is a fair swap when the box already runs it. Caddy is
the default here because the TLS config is four lines and nothing to get wrong.

## Forms and conversion

A real endpoint, per `loops/05-share.md`, as a third service on the internal
network. It is never published on a host port; only Caddy reaches it.

```yaml
  contact:
    image: <registry>/<site>-contact:${CONTACT_TAG}
    restart: unless-stopped
    env_file: /srv/<site>/contact.env      # mode 600, on the box, not in git
    expose: ["8080"]
```

```
    # inside the <domain> block in the Caddyfile
    rate_limit {
        zone contact { key {remote_host} events 5 window 1m }
    }
    handle /api/* { reverse_proxy contact:8080 }
```

`contact.env` holds the SMTP or API credentials, is created by the human on the
box, is `chmod 600`, and is in `.gitignore` and `.dockerignore` both (`§15`).

Post it once from the live site and confirm the mail arrives before Gate C.

## Gotchas

- **Never `:latest` in production.** `latest` is a name, not a version. It makes
  rollback impossible, makes "which build is live" unanswerable, and turns
  `docker compose pull` into a coin flip. Tag with the commit sha and a
  timestamp, always.
- **`docker compose down` takes the proxy with it.** Restart one service:
  `docker compose up -d web`. `down` stops Caddy and drops TLS for everything
  else on the box.
- **Named volumes are prefixed by the project.** `<site>_caddy_data` assumes the
  compose project name is `<site>`. Confirm with `docker volume ls` before
  writing a restore command that silently creates a new empty volume.
- **Secrets in image layers persist.** A `COPY .env` deleted in a later layer is
  still in the image. Use `.dockerignore` and `env_file`.
- **Disk fills with images and build cache.** `docker system df`, then
  `docker system prune -f` on a schedule. Never `prune -a` on a box that holds
  the rollback images.
- **The build runs on the operator's machine.** An Apple Silicon laptop building
  for an amd64 VPS produces an image that will not start. Use
  `docker build --platform linux/amd64`.
- **Caddy needs port 80 reachable.** Blocking it in the firewall to "only serve
  https" breaks certificate issuance and renewal, ninety days later, quietly.
