---
name: heard-deploy
description: How heard.teww.org (Next.js + self-hosted Supabase) is deployed on the VPS
metadata: 
  node_type: memory
  type: project
  originSessionId: 6ec18861-e336-48b3-ac82-5a5bf5a403df
---

heard.teww.org on the [[teww-vps-infra]] VPS. Next.js 16 (React 19, Supabase) repo `git@github.com:Taha-Mahmoodi/heard.git` at /www/wwwroot/heard.teww.org. Private repo uses a dedicated deploy key via SSH alias `github-heard` (in /root/.ssh/config).

Runtime: built with `output: standalone`; run `node .next/standalone/server.js` under PM2 app `heard` bound to **127.0.0.1:3002** via `/root/heard.ecosystem.config.js` (holds server-only env incl. SUPABASE_SERVICE_ROLE_KEY). After build, copy `.next/static` and `public` into `.next/standalone/`.

Backend: self-hosted Supabase docker at /root/supabase/docker. All secrets regenerated (not demo); saved in `/root/heard-secrets.txt` (root-only) incl. Studio login `heardadmin`. anon/service JWTs minted HS256 from JWT_SECRET. Kong bound 127.0.0.1:8000, pooler 127.0.0.1:5433. DB schema = `heard` repo `supabase/migrations/*.sql` applied via `docker compose exec db psql`. ENABLE_EMAIL_AUTOCONFIRM=true (no SMTP wired yet). INTEGRATIONS_MODE=mock.

nginx vhost `/www/server/panel/vhost/nginx/node_heard.conf`: heard.teww.org→3002, api.heard.teww.org→8000; certbot certs both (certbot.timer renews).

**Updates:** run `update-heard.sh` on the server (pull → npm ci if deps changed → apply new migrations → build → refresh standalone assets → pm2 restart → verify 200).
