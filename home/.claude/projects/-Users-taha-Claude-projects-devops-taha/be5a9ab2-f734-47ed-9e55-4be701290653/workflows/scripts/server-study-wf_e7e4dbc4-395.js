export const meta = {
  name: 'server-study',
  description: 'Exhaustive read-only study of the Contabo VPS: system, aaPanel, databases, backend, frontend, deployment, repo/docs, and overlooked areas — synthesized into one server profile.',
  phases: [
    { title: 'Deep-dive', detail: '8 parallel read-only domain investigators over SSH' },
    { title: 'Synthesize', detail: 'merge all findings into one complete server profile' },
  ],
}

// ---- shared connection context handed to every agent ----
const SSH = "ssh -i ~/.ssh/vps_contabo root@147.93.138.77 'bash -s' <<'SCRIPT'\n...commands...\nSCRIPT  (or: ssh -i ~/.ssh/vps_contabo root@147.93.138.77 '<one-liner>')";
const ENV = `
SERVER CONTEXT (already established, all confirmed):
- Connect over SSH:  ssh -i ~/.ssh/vps_contabo root@147.93.138.77 '<command>'
  For multiline scripts use a heredoc:  ssh -i ~/.ssh/vps_contabo root@147.93.138.77 'bash -s' <<'EOF' ... EOF
- You are ROOT on the box. Ubuntu 24.04, AMD EPYC 6 vCPU, 11GiB RAM, aaPanel control panel.
- Node (aaPanel-installed):  /www/server/nodejs/v24.15.0/bin   (node, npm, pm2 live here; NOT on default PATH — prefix: export PATH=/www/server/nodejs/v24.15.0/bin:$PATH)
- PostgreSQL client:         /www/server/pgsql/bin/psql   (PG server v18, db listens on 127.0.0.1:5432)
- MySQL/MariaDB client:      /www/server/mysql/bin/mysql  (MariaDB on :3306)
- The ONE app is a monorepo "lucifers-diary" (NestJS backend + Next.js 16 frontend), deployed twice:
    PRODUCTION:  /www/wwwroot/Lucifersdiary/lucifers-diary        (git branch main,    API :3001, web :3000, PM2 lucifer-api / lucifer-web)
    STAGING:     /www/wwwroot/lucifersdiary-staging/lucifers-diary (git branch develop, API :3003, web :3002, PM2 lucifer-api-staging / lucifer-web-staging)
  Each has backend/ and frontend/ subdirs, each with its own .env / .env.local.
- DB connection strings live in backend/.env (DATABASE_URL=postgresql://...). Postgres DBs: lucifer_diary (prod), lucifer_diary_staging.

ABSOLUTE RULES:
1. STRICTLY READ-ONLY. Do NOT modify, write, create, delete, restart, stop, pull, build, or change ANY file, process, service, or database row. Inspection only. No \`pm2 restart\`, no \`git pull\`, no INSERT/UPDATE/DELETE/DDL, no writing files on the server.
2. When printing secrets (passwords, JWT secrets, API keys, DB passwords), MASK them — show only that the key exists and maybe first/last 2 chars. Never echo full secret values.
3. Be thorough and precise. Run as many read-only inspection commands as you need. Quote exact values (versions, ports, paths, sizes, counts).
4. Return your findings as a detailed, well-structured MARKDOWN section (with the heading given to you). Your output is consumed by a synthesis agent — include concrete facts, not vague summaries. Flag anything notable: risks, misconfigurations, anomalies, tech debt.
`;

phase('Deep-dive')

const domains = [
  {
    label: 'system-security',
    prompt: `${ENV}

YOUR DOMAIN: ## 1. System & Security
Investigate the operating system and security posture. Cover ALL of:
- OS/kernel, install age, timezone, locale; pending reboot? (/var/run/reboot-required)
- Package management: \`apt list --installed\` count, any held packages, unattended-upgrades config & whether it auto-reboots, last \`apt\` activity (/var/log/apt/history.log tail).
- Users: human accounts in /etc/passwd (uid>=1000), who has shells, sudoers (/etc/sudoers + /etc/sudoers.d/*), last logins (\`last -n 15\`), currently logged in (\`who\`).
- SSH hardening: parse /etc/ssh/sshd_config for PermitRootLogin, PasswordAuthentication, PubkeyAuthentication, Port, AllowUsers; count keys in /root/.ssh/authorized_keys (mask the key bodies, just list comments/types).
- Firewall: full \`ufw status verbose\`; note any port open to the world that probably shouldn't be (e.g. 5432, 3306, 53). Cross-check which of those services actually bind 0.0.0.0 vs 127.0.0.1 (ss -ltn). Assess real exposure.
- fail2ban present/active? jails? (\`fail2ban-client status\` if installed).
- Scheduled work: root crontab, /etc/crontab, /etc/cron.d/*, /etc/cron.{daily,hourly}, systemd timers (\`systemctl list-timers\`).
- PowerDNS (pdns) on :53 — what is it for? Is it authoritative (aaPanel DNS Manager)? Check /etc/powerdns or /etc/pdns config and whether it's exposed publicly (open recursor = risk).
- pure-ftpd on :21 — config, TLS, accounts.
- Any security agents/oddities: rootkits dirs, suspicious processes, large/unknown listeners.
Give an explicit SECURITY POSTURE assessment with prioritized risks (High/Med/Low).`,
  },
  {
    label: 'aapanel-web',
    prompt: `${ENV}

YOUR DOMAIN: ## 2. aaPanel & Web Server (Nginx/SSL/PHP/FTP/DNS)
Investigate the aaPanel control panel and the web-serving layer. Cover:
- aaPanel: version (\`cat /www/server/panel/class/common.py\` or \`/www/server/panel/BT-Panel\` version; or \`bt 14\`), panel port (10873) & entrance path, installed plugins (ls /www/server/panel/plugin), the panel's own data DB at /www/server/panel/data/default.db — use \`/www/server/pgsql/bin\`... no, it's SQLite: use \`sqlite3 /www/server/panel/data/default.db\` if available (or python3) to list tables and dump the \`sites\` and \`databases\` and \`crontab\` tables (these are what the panel "knows about").
- Websites: every site aaPanel manages. For EACH nginx vhost in /www/server/panel/vhost/nginx/*.conf: the server_name(s), listen ports, document root, and especially the reverse-proxy upstream (proxy_pass target port) and any rewrite/location rules. Map: domain -> upstream port -> which app (prod/staging).
- SSL: for each site cert under /www/server/panel/vhost/cert/<domain>/ run \`openssl x509 -in fullchain.pem -noout -subject -issuer -enddate\` to get issuer (Let's Encrypt?) and EXPIRY date. Flag any expiring soon or expired. Note auto-renew (acme/certbot or aaPanel renew cron).
- PHP: which versions installed (ls /www/server/php), which is default, any PHP actually used by a site (the lucifersdiary.com static site uses .user.ini — is PHP even needed?).
- DNS: is aaPanel's DNS Manager managing zones via PowerDNS? List zones if you can (pdns stores in a DB — check pdns config for backend; if MySQL backend, the zones table).
- FTP: pure-ftpd accounts aaPanel manages.
Produce a clean DOMAIN→UPSTREAM routing table and an SSL expiry table.`,
  },
  {
    label: 'databases',
    prompt: `${ENV}

YOUR DOMAIN: ## 3. Databases (PostgreSQL + MariaDB)
Investigate ALL databases. READ-ONLY queries only (SELECT / catalog views / \\dt etc). Use:
  PSQL=/www/server/pgsql/bin/psql ; get DATABASE_URL from /www/wwwroot/Lucifersdiary/lucifers-diary/backend/.env (prod) and .../lucifersdiary-staging/.../backend/.env (staging) — MASK the password when you print the URL.
PostgreSQL:
- List all databases with sizes (\`\\l+\` or pg_database_size).
- For BOTH lucifer_diary (prod) and lucifer_diary_staging: list every table with estimated row count (pg_stat_user_tables.n_live_tup) and on-disk size (pg_total_relation_size). 
- Dump the full schema shape for the prod DB: tables, their columns+types, primary keys, foreign keys, indexes, and any ENUM types (e.g. NoteColor). You can use \`psql -c "\\d+ <table>"\` per table or query information_schema / pg_catalog.
- Compare prod vs staging schema: are they identical? List any differences (tables/columns present in one not the other).
- _prisma_migrations state in BOTH DBs: list migrations and their applied/failed status (note: staging had a notes-migration bookkeeping issue recently resolved — report current state of both).
- Note which Postgres roles exist and their privileges (\`\\du\`).
MariaDB/MySQL (:3306):
- Connect (try: /www/server/mysql/bin/mysql via socket /tmp/mysql.sock as root — aaPanel may have /root/.my.cnf, or password in /www/server/panel/config; if you cannot auth, say so rather than guessing). List databases & sizes. Identify what each is for (aaPanel's own panel DB? phpmyadmin? pdns zones? any app DB?).
Produce: a PG table inventory (rows+size) for prod & staging, the prod schema model list with relations, a prod-vs-staging diff, and the MariaDB inventory.`,
  },
  {
    label: 'backend-arch',
    prompt: `${ENV}

YOUR DOMAIN: ## 4. Backend Architecture (NestJS + Prisma)
Study the PRODUCTION backend at /www/wwwroot/Lucifersdiary/lucifers-diary/backend (git branch main). READ-ONLY (read files; do not build/run).
Cover:
- Stack & versions: read package.json — NestJS version, Prisma version, key deps (auth libs, validation, etc.), node engine. Build tooling (nest-cli, tsconfig).
- Module map: list every NestJS module (src/**/*.module.ts) and what each does. 
- Full API surface: enumerate controllers (src/**/*.controller.ts) and their routes (method + path + auth guard). Aim for a complete endpoint list grouped by feature (auth, stories, chapters, series, tags, notes, saves, follows, reading-positions, recommendations, health, admin/*, stats, etc.). You can read controller decorators, or cross-reference the route list the running app logs.
- Data model: read prisma/schema.prisma — list every model, its key fields, and relations (one-to-many, many-to-many, the polymorphic Note owner XOR, enums). Note the datasource & generator.
- Auth & security: how is auth done (JWT? guards? admin password)? Where are JWT_SECRET / ADMIN_PASSWORD used (MASK values). CORS/FRONTEND_URL config. Rate limiting? Validation pipes?
- Config: list the keys present in backend/.env (MASK all values — keys only). Note PORT, NODE_ENV, DATABASE_URL host/db (mask creds).
- Migrations: count files in prisma/migrations, list them chronologically with one-line purpose from each migration's comment/name.
- Seed scripts & scripts/ dir; any cron/queue/background jobs inside the app.
Produce a backend architecture map: modules, endpoint catalog, data-model relations, auth model, config keys.`,
  },
  {
    label: 'frontend-arch',
    prompt: `${ENV}

YOUR DOMAIN: ## 5. Frontend Architecture (Next.js 16)
Study the PRODUCTION frontend at /www/wwwroot/Lucifersdiary/lucifers-diary/frontend (git branch main). READ-ONLY.
Cover:
- Stack & versions: package.json — Next.js version (16), React, styling (Tailwind? read tailwind/postcss config & globals), TipTap (rich editor) extensions, GSAP, state libs, data-fetching/validation (zod?), UI libs (@base-ui/react). Node engine.
- Routing: full App Router tree under src/app (or app/) — list every route/page, layouts, route groups, dynamic segments, and which are public vs /admin (CMS). Note special routes: sitemap.xml, feed.xml, robots.txt, manifest, opengraph-image/twitter-image, middleware (proxy).
- Rendering: which pages are static vs dynamic; revalidate/caching config; the Cache-Control: no-store CMS behavior in next.config.
- Data layer: how the frontend talks to the backend API — the API client/wrapper, NEXT_PUBLIC_API_URL usage, and the Zod schemas that validate API responses. IMPORTANT: locate the schema that recently emitted "[API] Schema mismatch ... tags[].createdAt expected string received undefined" during build — identify the exact schema file/type and what it expects vs what the API returns. Explain the contract drift.
- Components & design system: structure of components/, the "Lucifer's Diary Design System" and "Hi-Fi design" folders at repo root (what are they — design assets? Storybook? raw files?).
- Config keys: list keys in frontend/.env.local (MASK values). Note which NEXT_PUBLIC_* are build-time-inlined.
Produce a frontend architecture map: route tree, rendering/caching model, API/data layer + the tags.createdAt contract-drift root cause, design-system layout.`,
  },
  {
    label: 'deployment-topology',
    prompt: `${ENV}

YOUR DOMAIN: ## 6. Deployment & Runtime Topology (PM2 + Nginx routing + env strategy)
Map how everything actually runs and how prod vs staging differ. READ-ONLY.
- PM2: run \`export PATH=/www/server/nodejs/v24.15.0/bin:$PATH; pm2 jlist\` and parse ALL processes. For each (lucifer-api, lucifer-web, lucifer-api-staging, lucifer-web-staging): exact name, cwd, script+args (note the api boots via \`sh -c "prisma migrate deploy && node dist/src/main.js"\`), interpreter, env (NODE_ENV, PORT — mask secrets), uptime, restart count, status, memory, log paths. Flag high restart counts. Is \`pm2 startup\` (systemd) installed so it survives reboot? Is \`pm2 save\` dump current (/root/.pm2/dump.pm2)?
- Read both ecosystem.config.js files (prod & staging repos) — note that the staging processes are NOT named like the ecosystem file (they're -staging), so figure out HOW staging was actually started (custom names) and document the real launch method.
- Nginx reverse-proxy: from the vhost confs, build the complete request-routing map: external domain+path -> nginx location -> proxy_pass upstream port -> PM2 app. Cover prod domain(s) and staging domain. Note how /api is routed vs the Next.js app, static /_next handling, and any caching headers.
- Port map: a clean table of every app port (3000/3001/3002/3003) -> env -> role.
- Env management: where do real secrets come from (per-app .env / .env.local files)? List the .env files that exist in prod & staging backend+frontend (paths + key names only, MASK values). Note any drift between prod and staging env keys.
- Update/deploy flow: summarize DEPLOY.md's update procedure and how a code change goes from git -> build -> pm2 restart for each env. Note risks (e.g. the boot-time migrate deploy gate).
- Logs: where pm2/app logs live, sizes, any error spam.
Produce: PM2 process table, full nginx routing map, port table, env-file inventory, and the deploy flow.`,
  },
  {
    label: 'repo-docs-diff',
    prompt: `${ENV}

YOUR DOMAIN: ## 7. Repository, Docs & Prod↔Staging Code Delta
Study the project's repo, documentation, and the difference between what's live on prod vs staging. READ-ONLY (no fetch/pull — only local git inspection; you MAY run \`git -C <repo> log/diff/branch/show\` which are read-only).
- Repo identity: github.com/Taha-Mahmoodi/lucifers-diary. Read README.md and DEPLOY.md (summarize). List docs/ contents and summarize each doc. What are the "Lucifer's Diary Design System", "lucife'r sdiary Hi-Fi design", and icons/ folders at repo root?
- Project purpose: from README + code, in 2-3 sentences what IS Lucifer's Diary (a fiction/serial-story CMS + reader site)? Who are the user types (public readers, admin/writer)?
- Branch topology: \`git -C /www/wwwroot/Lucifersdiary/lucifers-diary branch -a\` and the staging repo too. Which branch each deploy tracks (prod=main @ 6dd9633, staging=develop @ 43b1048).
- PROD vs STAGING code delta: in the staging repo run \`git log --oneline main..develop\` (and \`develop..main\`) to list exactly which commits/features staging has that production does NOT yet have (and vice-versa). Summarize the themes (e.g. notes model, search tag-filter reflow, reading positions, etc.). Roughly \`git diff --stat main..develop\` for scope.
- CI/CD: any .github/workflows? Husky hooks? lint/test setup? Is there automated deployment or is it manual per DEPLOY.md?
- .gitignore highlights (what's NOT committed: .env, .next, dist, node_modules).
- Any TODO/FIXME density or obvious tech-debt markers worth noting (a quick grep count, not exhaustive).
Produce: project overview, doc inventory, branch/deploy mapping, and a concrete "what's on staging but not prod yet" feature delta list.`,
  },
  {
    label: 'overlooked-audit',
    prompt: `${ENV}

YOUR DOMAIN: ## 8. Overlooked / Miscellaneous Audit (the completeness sweep)
Your job is to find everything the other 7 investigators (system-security, aapanel-web, databases, backend, frontend, deployment, repo-docs) might MISS. Hunt broadly. READ-ONLY.
- Backups: any backup jobs/dirs? (/www/backup, aaPanel backups, DB dumps, rsync/restic/borg, off-site?). Is there ANY backup of the Postgres DBs and the code? This is critical — explicitly state whether backups exist.
- Containers/other runtimes: docker/podman installed or running? \`docker ps\` ? any other language runtimes (python venvs, go, ruby)?
- Other apps/services not yet covered: is n8n, redis, a queue, a cache, mail server (postfix/exim), monitoring agent, or anything else installed/running? Check \`systemctl list-units --type=service\`, listening sockets already mapped, /opt, /srv, /root for stray apps.
- Disk hotspots: \`du -xh / --max-depth=2 2>/dev/null | sort -h | tail -25\` — biggest space consumers; any runaway logs (/var/log, /www/server/panel/logs, pm2 logs sizes), big node_modules, build caches.
- /root contents (scripts, notes, .env files, history hints — DON'T print secrets, just note presence), /etc/environment, any global env.
- Resource health over time: \`journalctl -p err -b --no-pager | tail -40\` for recent system errors; OOM kills? (\`dmesg | grep -i oom\`). No swap is configured — assess risk given 11GiB RAM.
- Certificates/cron for renewals, logrotate config for app logs.
- Anything weird, abandoned, half-installed, or that looks like leftover experimentation.
Produce: an inventory of overlooked items, a BACKUP status verdict (exist? where? adequate?), disk hotspot table, recent-errors summary, and a list of anything risky/abandoned.`,
  },
];

const findings = await parallel(
  domains.map(d => () =>
    agent(d.prompt, { label: d.label, phase: 'Deep-dive' })
      .then(text => ({ label: d.label, text }))
      .catch(err => ({ label: d.label, text: `(investigation failed: ${err && err.message ? err.message : err})` }))
  )
);

phase('Synthesize')

const sections = findings
  .filter(Boolean)
  .map(f => `===== DOMAIN: ${f.label} =====\n${f.text}`)
  .join('\n\n');

const synthesis = await agent(
  `You are the lead engineer writing the definitive SERVER PROFILE for a Contabo VPS (147.93.138.77) that hosts the "Lucifer's Diary" project. Eight specialist agents each studied one domain over SSH (read-only). Below are their raw findings.

Produce ONE cohesive, well-organized Markdown document titled "# Server Profile — Lucifer's Diary VPS (147.93.138.77)". Requirements:
- Start with a 6-10 line EXECUTIVE SUMMARY: what this server is, what runs on it, overall health, and the TOP 5 things that need attention (ranked).
- Then organized sections (use the 8 domains as a backbone but DEDUPLICATE and cross-reference — don't just concatenate). Suggested order: System & OS, Security & Firewall, aaPanel & Web Routing (include the domain→upstream table + SSL expiry table), Databases (inventory + schema + prod/staging diff), Application Architecture (backend modules+endpoints, frontend routes+data layer), Deployment & Runtime Topology (PM2 table, nginx routing, port map, env strategy, deploy flow), Repository & Code Delta (prod vs staging), Backups & Operational Gaps.
- Preserve concrete facts: exact versions, ports, paths, sizes, counts, table names, endpoint lists, cert expiry dates. Keep the useful tables.
- Include a consolidated "RISKS & RECOMMENDATIONS" section at the end: a prioritized table (Severity | Area | Issue | Recommended action). Pull in: backup status, no-swap, any world-open ports, SSL expiry, the tags.createdAt API contract drift, the staging migrate-on-boot gate, high PM2 restart counts, env drift, anything else flagged.
- Be precise and honest about what couldn't be determined (note gaps).
- This is an internal engineering reference — dense and factual, not marketing. Use tables liberally.

RAW FINDINGS FROM THE 8 AGENTS:
${sections}`,
  { label: 'synthesis', phase: 'Synthesize' }
);

return { synthesis, rawSectionsCount: findings.length };
