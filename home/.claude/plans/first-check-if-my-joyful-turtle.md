# Dockerize the VPS & remove aaPanel (zero data loss)

## Context

The VPS (`147.93.138.77`, Contabo, Ubuntu 24.04) runs the **lucifers-diary** app
twice — prod (`main`) and staging (`develop`) — as NestJS API + Next.js web,
under **aaPanel** which drags along nginx, PHP, MariaDB, phpMyAdmin, pure-ftpd,
its own Node/Postgres builds, and a control-panel daemon. The user wants
everything in Docker containers and aaPanel gone, with **no data loss**.

**Resource verdict: yes, comfortably.** 6 vCPU, 11 GiB RAM (1.6 used / 9.9 free),
83 GB free disk, load ~0.5. Entire Postgres footprint is **77 MB** (DBs 10 + 11 MB).
Docker + the whole stack will use ~1–2 GB RAM and a few GB of images. Massive headroom.

**Honest note (ponytail):** the payoff here is a *clean, reproducible, aaPanel-free
box*, not performance — the app is tiny and already fine. The plan keeps the shape
minimal: one compose file, Caddy for auto-TLS, one Postgres container for both DBs,
build-on-host (no registry/CI/k8s). The one genuinely valuable safety investment is
the **parallel-run + verified cutover** so no row is ever lost.

## Key findings that shaped the design

- **TLS:** current certs issue via acme.sh **HTTP-01 webroot**, renewing *through*
  Cloudflare. So **Caddy auto-HTTPS (HTTP-01)** works the same way — it replaces
  acme.sh entirely, auto-renewing with zero cron/hook. (Fallback documented: Cloudflare
  Origin cert if HTTP-01 ever fails behind the proxy.)
- **Domains are Cloudflare-proxied** (`104.21.x`/`172.67.x`). Origin only needs a valid
  cert CF trusts — Caddy's LE cert satisfies CF Full/Strict.
- **PowerDNS is vestigial:** `madeintaha.me` is delegated to Namecheap
  (`dns1/dns2.registrar-servers.com`), not this box — nothing queries local pdns.
  Included as a container per request, but flagged: dropping it changes nothing.
- **Postgres** = PG 18 at `/www/server/pgsql/data`; peer auth as `postgres` works.
- `NEXT_PUBLIC_*` are **build-time inlined** → each web image must be built with its
  env's URL as a build arg (prod vs staging differ).
- Host-level hardening already done (swap, fail2ban, ufw, SSH keys-only, unattended
  upgrades) is **independent of aaPanel** and survives untouched.

## Target architecture

Single `docker-compose.yml` on the host at `/opt/lucifers-diary/`. Internal Docker
network; **only Caddy publishes 80/443** (and pdns 53 if kept) — everything else is
network-internal, which also sidesteps Docker's ufw-bypass footgun.

| Service | Image / build | Role | Published |
|---|---|---|---|
| `postgres` | `postgres:18` + named volume `pgdata` | both DBs (`lucifer_diary`, `_staging`) | none (internal) |
| `api` | build `./prod` `Dockerfile.backend` | prod NestJS :3001 | none |
| `web` | build `./prod` `Dockerfile.frontend` | prod Next :3000 | none |
| `api-staging` | build `./staging` | staging NestJS :3003 | none |
| `web-staging` | build `./staging` | staging Next :3002 | none |
| `caddy` | `caddy:2` + `Caddyfile` + `caddydata` vol | reverse proxy + auto-TLS | **80, 443** |
| `pdns` *(optional)* | `powerdns/pdns-auth-48` + zone bind-mount | madeintaha.me DNS | 53/tcp+udp |

Two checkouts on host: `/opt/lucifers-diary/prod` (git `main`),
`/opt/lucifers-diary/staging` (git `develop`) — cloned fresh, aaPanel-free paths.

### New files (committed to the app repo, both branches)
- `Dockerfile.backend` — multi-stage `node:24-slim`: `npm ci` → `prisma generate` →
  `nest build`; runtime `CMD sh -c "npx --no-install prisma migrate deploy && node dist/src/main.js"`
  (keeps current migrate-on-boot behavior). Add `openssl` if Prisma needs it on slim.
- `Dockerfile.frontend` — multi-stage: `npm ci` → `npm run build` (accepts
  `--build-arg NEXT_PUBLIC_API_URL/SITE_URL`); runtime `CMD npm run start`.
- `.dockerignore` — `node_modules`, `.next`, `dist`, `.git`, `.env*`.

### Host-only infra (`/opt/lucifers-diary/`, backed up, not in app git)
- `docker-compose.yml` — the table above; build contexts point at the two checkouts;
  `env_file` per service.
- `Caddyfile`:
  ```
  lucifersdiary.com, www.lucifersdiary.com {
      @admin path /admin*
      header @admin Cache-Control "no-store"
      handle /api/* { reverse_proxy api:3001 }
      reverse_proxy web:3000
  }
  staging.lucifersdiary.com {
      header /admin* Cache-Control "no-store"
      handle /api/* { reverse_proxy api-staging:3003 }
      reverse_proxy web-staging:3002
  }
  ```
- `env/*.env` — copied from current `.env`/`.env.local`, with **`DATABASE_URL` host
  changed `localhost` → `postgres`**. Secrets stay off git, `600 root`.

## Execution phases (each gated; old stack stays up until cutover)

**Phase 0 — Backup & pre-flight**
- Run the existing `lucifer-db-backup.sh`; copy both `.dump` files aside to
  `/opt/lucifers-diary/seed-dumps/`. Verify TOC (`pg_restore --list`).
- `git bundle` / note current commits of both checkouts (rollback ref).

**Phase 1 — Install Docker** (additive, touches nothing live)
- Official `get.docker.com` script → Docker Engine + compose plugin. Verify `docker run hello-world`.

**Phase 2 — Author artifacts**
- Add the 3 Docker files to the repo on `develop`, then `main` (root-level → current
  pm2 autodeploy treats them as no-op, safe).
- Clone `main`→`/opt/lucifers-diary/prod`, `develop`→`/opt/lucifers-diary/staging`.
- Write `docker-compose.yml`, `Caddyfile`, `env/*.env` on host.

**Phase 3 — Bring up DB + restore + verify (parallel to live)**
- `docker compose up -d postgres`; create roles/DBs; **restore both dumps**.
- **Verify zero loss:** per-table `COUNT(*)` in container == source for both DBs
  (script the comparison). Gate: must match exactly.

**Phase 4 — Build & smoke apps (still parallel; Caddy on temp port)**
- Build all 4 app images (web images with correct `NEXT_PUBLIC_*` build args).
- Bring up api/web/api-staging/web-staging + Caddy bound to a **temp port** (e.g. 8443)
  or test via `docker exec` curl on the internal net.
- Gate: all 4 `/api/health/ready` == ok against the restored DB; web renders seeded content.

**Phase 5 — Cutover** (downtime fine per user)
- Pause the two pm2 autodeploy crons.
- `pm2 stop` all app procs → **final delta dump→restore** (catches any last writes) → re-verify counts.
- Stop aaPanel nginx (frees 80/443). Start `caddy` on 80/443.
- Verify: `https://lucifersdiary.com` + `https://staging…` serve over HTTPS **with data**,
  valid LE cert (Caddy-issued), `/admin` reachable. Staging first, then prod.
- **Rollback if bad:** stop Caddy, start aaPanel nginx + `pm2 resurrect` — old stack intact.

**Phase 6 — Decommission aaPanel** (only after Phase 5 verified)
- **Archive** `/www/server/pgsql/data` (tar to `/opt/lucifers-diary/archive/`) before removing anything.
- Stop + disable BT-Panel; remove aaPanel crons (autodeploy replaced below), acme.sh cron
  (Caddy owns TLS now), dbsync/backup crons (rewritten below).
- Remove `/www/server/{panel,nginx,pgsql,php,mysql,phpmyadmin,pure-ftpd,nodejs}` and `/www/wwwroot`
  **after** confirming nothing references them. Keep `/www/server/data` archive until confident.
- **PowerDNS:** if kept → `pdns` container (bind-mount zone data from `/var/named/chroot`), publish 53;
  else stop/remove. *(Recommend removing — not delegated to this box.)*

**Phase 7 — Ops re-wire for Docker**
- **Backup cron** → `docker exec postgres pg_dump …` for both DBs (replaces host-psql script).
- **Autodeploy** → per-env script: `git -C <checkout> pull` → on change
  `docker compose up -d --build <service>` → smoke → rollback-on-fail (port the existing
  quarantine pattern). Replaces the pm2 autodeploy.
- Confirm host hardening intact (swap, fail2ban, ufw 22/80/443[/53], SSH keys-only, unattended-upgrades).

## Verification (end-to-end)

1. `docker compose ps` → all services `healthy`/`running`.
2. Row-count parity: containerized DB vs the Phase-0 dump, every table, both DBs.
3. `curl https://lucifersdiary.com/api/health/ready` and staging → `{"status":"ok"}`.
4. Both sites load over HTTPS with a **Caddy-issued LE cert** (`echo | openssl s_client … | openssl x509 -issuer -dates`), seeded content visible.
5. Push a trivial commit to `develop` → new autodeploy rebuilds only staging, smoke passes.
6. `reboot` → compose `restart: unless-stopped` brings the whole stack back; sites 200; masked/removed services stay gone.
7. `free -h` / `docker stats` → RAM well within budget.

## Open items to confirm during build
- **PowerDNS:** keep-as-container vs remove (recommend remove — vestigial). Zone files under
  `/var/named/chroot` to be located precisely before Phase 6.
- **TLS fallback:** if Caddy HTTP-01 ever fails behind Cloudflare, switch to a Cloudflare
  **Origin Certificate** mounted into Caddy (`tls <cert> <key>`) — no renewal needed.
- Prisma on `node:24-slim`: confirm engine runs (add `openssl`/`libssl` if needed).
