---
name: teww-vps-infra
description: "Contabo VPS (147.93.134.216) layout — sites, ports, and the 5432 collision lesson"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6ec18861-e336-48b3-ac82-5a5bf5a403df
---

Contabo VPS `vmi3119879` @ 147.93.134.216 (Ubuntu 24.04), root via `ssh -i ~/.ssh/vps_teww root@147.93.134.216`. SSH is key-only (password auth disabled); console access is Contabo panel VNC. aaPanel manages the web stack; **nginx** is the real front on 80/443 (Apache/OpenLiteSpeed configs are dormant).

Sites:
- **teww.org** — NestJS+Prisma app, PM2 `teww-backend` → 127.0.0.1:3001. DB = **aaPanel PostgreSQL (PG18)** on 127.0.0.1:5432, database/user `twee` (NOT `teww_prod` as docs say). Repo `git@github.com:Taha-Mahmoodi/TEWW-mo-no.git` at /www/wwwroot/teww.org. Nightly pg_dump in deploy/backups/.
- **heard.teww.org** — Next.js 16 standalone, PM2 `heard` → 127.0.0.1:3002. Backend = self-hosted **Supabase** (docker, /root/supabase/docker) fronted at **api.heard.teww.org** → Kong 127.0.0.1:8000. See [[heard-deploy]]. Update via `update-heard.sh`.
- admin.teww.org, test.teww.org — static/PHP.
- BillionMail mail stack (docker) — postfix/dovecot/roundcube + its own pg on 127.0.0.1:25432.

**Critical lesson:** aaPanel Postgres (`twee`) uses host port **5432**. Supabase's Supavisor pooler defaulted to publishing `0.0.0.0:5432`, which collided with + shadowed it (and a reboot left aaPanel PG not auto-started) — this took teww.org down with `ENOIDENTIFIER no tenant identifier`. Fix: pooler rebound to `127.0.0.1:5433` in docker-compose.yml, aaPanel PG enabled on boot (`S01pgsql`). Never let Supabase claim host 5432 here.
