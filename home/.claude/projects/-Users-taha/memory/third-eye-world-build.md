---
name: third-eye-world-build
description: "SCRAPPED 2026-07-14 — user said this whole build was from the WRONG source file. Repo renamed to third-eye-kit-community; local folder deleted. Do not resume."
metadata: 
  node_type: memory
  type: project
  originSessionId: c9e246a0-b851-4dd1-9563-4e4ec02ff7c6
  modified: 2026-07-19T05:54:12.121Z
---

> **STATUS 2026-07-14: SCRAPPED.** User said the entire build below was based on the WRONG
> source file. Per their instruction: kept the GitHub repo but **renamed it to
> `Taha-Mahmoodi/third-eye-kit-community`** (private; still contains the old build content),
> and **deleted the local folder** `~/Documents/third-eye-world-engineering-build`. Nothing else
> deleted (PRs/branches/v1.0.0 release remain). Awaiting the correct file to start fresh. The
> account/workflow facts below still hold ([[github-accounts]]); the product work does not.

Building **Third Eye World** to production: a single Next.js app with two separate surfaces —
a public marketing "who we are" site (`/`) and **Third Eye Commons**, an auth-gated mission
platform users sign up for (`/app/*`). Grounded in the real [[third-eye-kit-v2]] dossier
(blind-assistive wearable by Said Mohaddes Sadeqi; *"Feel, don't wait."*). Accessibility is the
product's identity (WCAG AA floor, axe in CI). Anti-slop via the `design-taste-frontend` skill.

- **Local working clone:** `~/Documents/third-eye-world-engineering-build` (scratchpad wipes; push early).
- **Stack:** Next.js 15 / React 19 / TS strict / Tailwind 4 / Shadcn / Motion + GSAP / Auth.js +
  Prisma + PostgreSQL / Vitest + Playwright(+axe) / Docker (compose: app + postgres, self-host).
- **Spec:** `docs/superpowers/specs/2026-07-13-third-eye-world-design.md`. Five instruction docs
  in `docs/instructions/`.
- **Build order (one PR each, by Said):** scaffold → data+auth → marketing site → Commons
  features → a11y+test hardening → Docker+production.
- **GitHub workflow:** repo PRIVATE under **Taha-Mahmoodi**; **Said (sadeqisaidmohaddes-star) is
  collaborator and opens every PR**; branches main/prod/dev, features off dev; CI green required;
  **user reviews & merges — agent NEVER merges** (unlike [[atlas-erp-pr-merge-authorization]]).
  See [[github-accounts]] and [[said-account-collaborator-contributions-2026-07]].
- Started 2026-07-13. "Production-ready" from agent side = built, sandbox-tested, Dockerized,
  CI-green, PRs opened by Said awaiting the user's review.
- **Status 2026-07-14: ALL SIX SLICES BUILT.** Stack landed as Next 16 / React 19 / Tailwind 4 /
  Auth.js v5 (JWT+Credentials) / **Prisma 6** (Prisma 7 dropped url-in-schema; downgraded on
  purpose) / @node-rs/argon2 / Docker node:22-slim standalone. Jade "signal" accent, phosphor
  icons, grounded `src/lib/content/dossier.ts`, interactive haptic-demo (`src/lib/haptics`).
- **Stacked PRs #1..#6 by Said, all awaiting Taha's review (none merged):** scaffold → data-auth →
  marketing → commons → a11y-hardening → docker-prod. Verified in sandbox: type-check/lint, 17
  unit, 16 e2e (incl. axe), `docker compose up --build` + smoke all green.
- **Two-agent note:** a second Claude session concurrently built slices 3-5 in the same worktree;
  handled by not clobbering. If resuming, check for other live `claude` procs before writing.
- **colima is flaky** (stops between ops); `docker compose` plugin was missing — installed via
  `brew install docker-compose` + symlinked into `~/.docker/cli-plugins/`.
- Remaining after review: user merges the stack down to `dev`/`prod`/`main`, tags v1.0.0.
- **Social platform added 2026-07-14 (goal 2):** Commons is now a full social product, not a
  broadcast surface. Models Post/Comment/PostLike/Follow/Notification (migration
  `social_platform`). `/app` = community feed (Everyone/Following tabs, composer), `/app/post/[id]`
  detail + threaded replies, `/app/u/[id]` profiles w/ follow + counts, `/app/notifications` +
  nav unread bell badge. Actions in `src/actions/{posts,follow,notifications}.ts`; `notify()`
  helper writes follow/like/comment notifs. **PRs #7/#8/#9 by Said** (social-core → social-graph
  → social-notify), stacked on docker-prod, awaiting Taha's review. Verified: 27 unit, 20 e2e
  (incl axe on 9 routes), docker compose + smoke green. Playwright local `retries:1` absorbs a
  parallel-argon2 signup flake (CI runs workers:1, unaffected).
- **CI e2e fix 2026-07-14:** e2e failed in GitHub Actions only, with Auth.js v5 `UntrustedHost`
  (CI sets no AUTH_URL; passed locally/Docker because those set it). Fix = `trustHost: true` in
  `src/lib/auth.ts` (correct self-host setting). User had already merged PRs #1-#5 (child->parent);
  applied fix at data-auth + cascade-merged up; pushes to merged branches rejected (left alone),
  pushes to OPEN #6-#9 landed -> all four CI green. trustHost reaches dev as #6-#9 merge up.
- **SHIPPED v1.0.0 2026-07-14:** user authorized merging. Added VPS deploy layer (PR #10):
  `docker-compose.prod.yml` (Postgres + migrate + app + **Caddy** auto-HTTPS), `deploy/Caddyfile`,
  `.env.production.example`, `DEPLOY.md`. Verified full prod stack locally via APP_DOMAIN=localhost.
  Retargeted open PRs #6-#10 to `dev`, merged all, promoted dev->prod->main, tagged **v1.0.0** +
  GitHub release. CI green on dev/prod/main. Deploy: set APP_DOMAIN/AUTH_SECRET/POSTGRES_PASSWORD
  in `.env`, `docker compose -f docker-compose.prod.yml up -d --build`. Feature branches still on
  origin (merged; can be deleted). Repo private under Taha; agent merged this time per explicit ask.
