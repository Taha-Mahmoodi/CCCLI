---
name: inter-face-plugin
description: "inter.face — cross-agent design plugin extracted from the design halves of portfolio.me + webcrab + systemcicy; repo PIIIX-org/inter.face (private), spec v2 done, research in flight"
metadata: 
  node_type: memory
  type: project
  originSessionId: a37ae9f9-eb70-4000-aa63-8f4f998a4172
  modified: 2026-07-29T08:26:58.151Z
---

**github.com/PIIIX-org/inter.face** (private, created 2026-07-28, identity Taha-Mahmoodi).
Local clone `~/Documents/inter.face`. Flip to public when ready to ship — Taha has not
decided yet.

A design-only pipeline: a six-row translation table in; `DIRECTION.md` + `tokens.json` +
one design image per surface + one measured runnable prototype per technique out. Stops
before code. Two human gates. Ships to seven agents (Claude Code, Codex, Cursor, Windsurf,
Cline, Gemini, opencode) via the adapter pattern copied from [[atlas-erp-working-clone]]'s
sibling `portfolio.me`.

**Why it exists:** the design halves of `portfolio.me`, `webcrab`, and `systemcicy` have
drifted badly — only 65 of 388 `STYLES.md` lines still match between the first two, and
only systemcicy knows how to design a tool rather than a page. This is the union.

**Scope decided by Taha:** web + mobile + tablet + desktop. "Universal" means *cross-agent*,
not cross-purpose.

**Status 2026-07-28:** spec v2 committed (`docs/superpowers/specs/`). Five audits done
(`docs/audit/`). Research run 1 done (WCAG 2.2). Four `deep-research` workflows in flight;
three more queued (icons+tokens, rule-breaking, industry verticals). **No plugin files
built yet** — agreed sequence is audit → research → fold into spec → build once.

**Findings that shape the build:**
- Accessibility in all three parents is a *verification* concern, never a design one —
  zero ARIA/focus-management/live-regions across ~5,000 lines despite §12 being HARD. It
  moves into Loop 1.
- Loop 1 is ~70% already built in Taha's own gstack `/design-consultation` +
  `/design-shotgun`. The genuine product is Loop 2 — nobody anywhere builds a runnable
  proof of a technique and measures it before the design commits.
- `DIRECTION.md` must be at *rendered-style* resolution (hex/px/ms, paired color tokens),
  not brief resolution — otherwise the handoff re-opens every decision.
- Amended principle: not "no catalogs" but **no subject-indexed catalogs, and no silent
  fallback** (ui-ux-pro-max matches "funeral home" → Smart Home IoT dashboard).
- WebFetch summarizers were caught fabricating normative W3C wording twice. Every
  standards quote that ships gets re-derived from raw HTML.

See [[loop-background-workflow-limitation]] — the research workflows died at a session
boundary and needed `resumeFromRunId`.
