---
name: webcrab-systemcicy-pipelines
description: "Two agent-OS pipelines built as siblings of portfolio.me — webcrab (commercial websites) and systemcicy (digital products), pushed to PIIIX-org 2026-07-27"
metadata: 
  node_type: memory
  type: project
  originSessionId: bdc0b337-2c53-4e71-90a2-e94ba016563f
  modified: 2026-07-27T16:20:56.380Z
---

Built 2026-07-27 at Taha's request, modeled on the structure of
[[atlas-erp-working-clone]]-adjacent work but specifically on
github.com/PIIIX-org/portfolio.me. Both are markdown "agent operating systems" —
doctrine files + loops + worker agents + run templates + a Claude Code plugin
manifest. No code, no program to install.

- **webcrab** — github.com/PIIIX-org/webcrab. Agency/company/product sites and
  landing pages. 9 loops (bootstrap → market → design → copy → build → capture →
  deploy → verify → **measure**), 4 gates, 9 agents, 9 deploy targets. Six hard
  rules; the distinctive ones vs portfolio.me are the redirect map (§13, don't
  break what ranks), consent-before-tracking (§16), and the funnel proven end to
  end with a real submission (§18). Loop 8 (post-traffic measurement) is the
  structural addition.
- **systemcicy** — github.com/PIIIX-org/systemcicy. ERPs, marketplaces, internal
  ops, SaaS. 10 loops with **Loop 4 repeating per vertical slice**, 5 gates
  (Gate D repeats, held with the *operator* not the sponsor), 9 agents, 7 runtime
  targets incl. on-prem. Seven hard rules; the distinctive ones are authorization
  proven by a test that fails when the check is removed (§7), isolation proven
  (§8), and a restore drilled before go-live (§10).

Local clones: `~/Documents/webcrab`, `~/Documents/systemcicy`. Pushed under the
Taha-Mahmoodi gh account (PIIIX-org org) — note the *active* gh account defaults
to sadeqisaidmohaddes-star, so `gh auth switch --user Taha-Mahmoodi` first; see
[[github-accounts]].

**Status: first draft, unreviewed.** Taha said he would read them both and then
iterate on each together. Nothing has been run through either pipeline yet.
