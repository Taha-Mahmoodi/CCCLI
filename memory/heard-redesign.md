---
name: heard-redesign
description: "Heard app (heard-backup repo) full UI redesign — spec, constraints, git workflow, local stack quirks"
metadata: 
  node_type: memory
  type: project
  originSessionId: f6011bc1-b566-4d56-9e65-c8e6e65ddc41
---

Redesign of ~/Documents/heard-backup (github.com/Taha-Mahmoodi/heard-backup) started 2026-07-03.
Heard = marketplace: customers pay to talk with blind/low-vision "companion listeners". Next.js 16, Tailwind v4, Supabase local.

- Design spec lives in repo: `DESIGN_SPEC_V2.md` ("The Listening Room"). Colors + Logo.tsx are untouchable (user constraint). Quality bar: teww.org (user's NGO site, Third Eye Worldwide).
- User-mandated git workflow: every change = GitHub issue → branch → PR with full description → merge, all automatic, no approval. Commit author must be Taha-Mahmoodi (see [[github-accounts]]).
- Local stack: supabase CLI + colima (`colima start --cpu 2 --memory 4`; DOCKER_HOST=unix://$HOME/.colima/default/docker.sock). Colima died once mid-session — recheck `docker ps` if Supabase ECONNREFUSED on 54321. Seeded logins: customer@heard.test / maya@heard.test / admin@heard.test, all `password123`.
- Foundation PR #2 merged (tokens, primitives, chrome). Surfaces rebuilt via parallel agents on branches redesign/02–06.
- Pollinations image MCP: free tier flaky (fetch failed / 403 on direct URL); worked for 2 refs then died mid-session.
