# Deploy — VPS with nginx

**When to pick this:** the subject owns the box, wants a real form endpoint, and nothing about the site should depend on a platform account.

---

## Prerequisites

| Need | Check |
|---|---|
| SSH access, key-based | `ssh -o BatchMode=yes <host> true` |
| sudo on the box | `ssh <host> 'sudo -n true'` |
| nginx installed and running | `ssh <host> 'nginx -v; systemctl is-active nginx'` |
| rsync on both ends | `rsync --version; ssh <host> 'rsync --version'` |
| certbot | `ssh <host> 'certbot --version'` |
| DNS already pointing at the box | `dig +short <domain>` |

Keys only. Password auth off, root login off. The private key never leaves the
operator's machine and is never printed (`§15`).

Set once, at the top of the session:

```bash
HOST=<user>@<host>
SITE=<domain>
ROOT=/var/www/$SITE
```

## Snapshot

**Hard rule (`§15`). No snapshot, no deploy.** This target overwrites files in
place with `--delete`. Without a snapshot there is nothing to go back to.

```bash
mkdir -p runs/<slug>/snapshot
STAMP=$(date -u +%Y%m%dT%H%M%SZ)

ssh $HOST "sudo tar czf /var/backups/$SITE-$STAMP.tar.gz -C /var/www $SITE \
           && sudo chown \$(id -u):\$(id -g) /var/backups/$SITE-$STAMP.tar.gz"

scp $HOST:/var/backups/$SITE-$STAMP.tar.gz runs/<slug>/snapshot/
echo "/var/backups/$SITE-$STAMP.tar.gz" > runs/<slug>/rollback-ref.txt

# The nginx config is part of what is live
ssh $HOST "sudo tar czf - /etc/nginx/sites-available /etc/nginx/sites-enabled" \
  > runs/<slug>/snapshot/nginx-conf-$STAMP.tar.gz
```

Pull the archive down. A backup that only exists on the box does not survive the
failure mode where the box is the problem.

## Deploy

```bash
# 1. Dry run. Read the delete list before it is real.
rsync -avz --delete --dry-run \
  --exclude '.well-known/' \
  dist/ $HOST:/tmp/$SITE-staging/

# 2. Upload to a staging path, not over the live root
rsync -avz --delete --exclude '.well-known/' dist/ $HOST:/tmp/$SITE-staging/

# 3. Swap it in, set ownership, test config, reload
ssh $HOST "sudo rsync -a --delete --exclude '.well-known/' /tmp/$SITE-staging/ $ROOT/ \
        && sudo chown -R www-data:www-data $ROOT \
        && sudo find $ROOT -type d -exec chmod 755 {} + \
        && sudo find $ROOT -type f -exec chmod 644 {} + \
        && sudo nginx -t && sudo systemctl reload nginx"
```

`nginx -t` before every reload. A reload with a broken config leaves the old
worker running and the next restart takes the site down with no warning.

The server block, at `/etc/nginx/sites-available/<domain>`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name <domain> www.<domain>;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://<domain>$request_uri; }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name www.<domain>;
    ssl_certificate     /etc/letsencrypt/live/<domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;
    return 301 https://<domain>$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name <domain>;
    root /var/www/<domain>;
    index index.html;

    ssl_certificate     /etc/letsencrypt/live/<domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL:10m;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'" always;

    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml application/wasm;

    brotli on;                    # requires ngx_brotli; drop these three lines without it
    brotli_comp_level 6;
    brotli_types text/plain text/css application/javascript application/json image/svg+xml application/wasm;

    location ~* \.(css|js|woff2|png|jpg|webp|avif|svg|wasm)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location = /index.html { add_header Cache-Control "no-cache"; }

    location /api/ {
        limit_req zone=contact burst=3 nodelay;
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
    }

    location / { try_files $uri $uri/ =404; }
    error_page 404 /404.html;
}
```

In `/etc/nginx/nginx.conf`, inside `http {}`:

```nginx
limit_req_zone $binary_remote_addr zone=contact:10m rate=5r/m;
```

Enable and reload:

```bash
ssh $HOST "sudo ln -sf /etc/nginx/sites-available/$SITE /etc/nginx/sites-enabled/ \
        && sudo nginx -t && sudo systemctl reload nginx"
```

## Rollback

```bash
ssh $HOST "sudo rm -rf $ROOT && sudo mkdir -p $ROOT \
        && sudo tar xzf $(cat runs/<slug>/rollback-ref.txt) -C /var/www \
        && sudo chown -R www-data:www-data $ROOT \
        && sudo nginx -t && sudo systemctl reload nginx"
```

Local copy, when the box lost the archive:

```bash
scp runs/<slug>/snapshot/<domain>-<stamp>.tar.gz $HOST:/tmp/
ssh $HOST "sudo tar xzf /tmp/<domain>-<stamp>.tar.gz -C /var/www && sudo systemctl reload nginx"
```

Config only:

```bash
ssh $HOST "sudo tar xzf - -C /" < runs/<slug>/snapshot/nginx-conf-<stamp>.tar.gz
ssh $HOST "sudo nginx -t && sudo systemctl reload nginx"
```

## Domain and TLS

```
@    A     <server-ipv4>
www  A     <server-ipv4>
@    AAAA  <server-ipv6>     # only if the box actually has one
```

Wait for `dig +short <domain>` to return the box before running certbot. It
validates over HTTP and fails against stale DNS.

```bash
ssh $HOST "sudo certbot --nginx -d $SITE -d www.$SITE \
           --redirect --agree-tos -m <email> --non-interactive"
```

Renewal is a systemd timer on a modern install. Confirm it exists rather than
assuming, and test the renewal path without burning rate limit:

```bash
ssh $HOST 'systemctl list-timers | grep -i certbot'
ssh $HOST 'sudo certbot renew --dry-run'
```

No timer, no cron entry: add one. An expired certificate takes the site down
completely, sixty to ninety days after a deploy everyone has forgotten about.

```bash
curl -sI http://<domain>/ | grep -i '^location'
curl -sI https://www.<domain>/ | head -1
curl -sI https://<domain>/ | grep -i strict-transport
echo | openssl s_client -connect <domain>:443 2>/dev/null | openssl x509 -noout -dates
```

## Forms and conversion

A real endpoint, rate-limited, per `loops/05-share.md`. Anything on this box
that accepts a POST is a public service and gets treated as one.

Minimum bar:

| Control | Where |
|---|---|
| Rate limit | `limit_req` above, 5/min per IP with a burst of 3 |
| Body size cap | `client_max_body_size 16k;` in the `/api/` location |
| Honeypot field | In the form markup, labelled and hidden |
| Server-side validation | Length and shape, before anything is sent |
| No secrets in the repo | SMTP or API credentials in a systemd unit `EnvironmentFile` with mode `600` (`§15`) |

Run the handler as an unprivileged systemd service on `127.0.0.1:8080`, never
exposed directly. Post the form once from the live site and confirm the mail
arrives before Gate C.

## Gotchas

- **`--delete` deletes.** Pointed at the wrong local directory it empties the
  document root. The dry run and the staging swap above exist for exactly this.
  A trailing slash on the source is load-bearing: `dist/` copies the contents,
  `dist` copies the directory itself and creates `/var/www/<site>/dist/`.
- **Permissions.** Files owned by the deploy user with mode 600 give a clean
  rsync and a 403 on every request. nginx reads as `www-data`, and it needs
  execute on every directory in the path.
- **SELinux.** On RHEL, Rocky, and Alma, a correct config still 403s until the
  context is right: `sudo restorecon -Rv /var/www/<site>`, and
  `sudo setsebool -P httpd_can_network_connect 1` before any `proxy_pass` will
  work. `getenforce` first, so the whole hour is not spent on the wrong theory.
- **The default server block wins.** Debian ships `sites-enabled/default`
  listening on 80 with `default_server`. Leave it and a fresh domain serves the
  nginx welcome page. Remove the symlink.
- **`nginx -t` passes, reload still breaks.** A missing certificate path is a
  runtime failure. Check `journalctl -u nginx -n 50` before assuming DNS.
- **Certbot rate limits.** Five failures per account per hour, fifty
  certificates per domain per week. Use `--dry-run` while debugging.
- **Disk.** Snapshot tarballs in `/var/backups` accumulate. A full disk gives
  nginx 500s that look like nothing else on this list. Prune on a schedule.
- **Firewall.** `ufw allow 'Nginx Full'`, and the provider's own security group
  as well. A closed 443 looks exactly like a DNS problem.
