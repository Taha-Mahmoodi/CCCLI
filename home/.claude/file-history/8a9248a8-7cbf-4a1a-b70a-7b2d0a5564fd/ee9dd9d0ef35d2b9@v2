# AGENTS.md

The universal entry point. Any capable coding agent can run this pipeline by
reading this file. There is nothing to install and no program to execute — the
markdown is the product and your agent is the runtime.

## What this is

`portfolio.me` turns a person into a deployed portfolio site: interviewed,
positioned, designed, built, and live on infrastructure they chose. It is a
research → strategy → design → copy → build → deploy → verify pipeline with four
human gates.

## Read these first, in order

1. [`PRINCIPLES.md`](./PRINCIPLES.md) — 25 binding rules. Five are **hard** and
   cannot be skipped, waived, or traded: evidence-backed claims (`§5`),
   accessibility basics (`§12`), reversible deploys (`§15`), Gate C (`§16`), and
   identity safety (`§20`).
2. [`PIPELINE.md`](./PIPELINE.md) — the map: loops, gates, deploy targets, agents.
3. The loop you are on, in [`loops/`](./loops).

## Run the loops in order

| # | Loop | Gate |
|---|---|---|
| 0 | [Bootstrap](./loops/00-bootstrap.md) — capabilities, run folder, `inbox/` | — |
| 1 | [Substance & Strategy](./loops/01-substance.md) — interview, documents, scrape, peers, synthesis | **A** |
| 2 | [Design](./loops/02-design.md) — direction and images, then craft and prototypes | **B1**, **B2** |
| 3 | [Copy](./loops/03-copy.md) — case studies in their voice | — |
| 4 | [Build](./loops/04-build.md) — code to the images, all three states | — |
| 5 | [Share & Convert](./loops/05-share.md) — OG image, meta, contact path | — |
| 6 | [Deploy](./loops/06-deploy.md) — their target, snapshot first | **C** |
| 7 | [Verify](./loops/07-verify.md) — live, three widths, honest grade | — |

Updating a site this pipeline already built? Enter at
[`loops/08-rerun.md`](./loops/08-rerun.md) instead of Loop 0.

## Supporting doctrine

| File | Governs |
|---|---|
| [`BRAND.md`](./BRAND.md) | Archetype, positioning, voice, the translation table |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | How many pages, routing, and the blog |
| [`STYLES.md`](./STYLES.md) | What it looks like: 32 styles and how to collide them |
| [`CRAFT.md`](./CRAFT.md) | How it renders: the technique arsenal |
| [`MODELS.md`](./MODELS.md) | Which model tier runs which step |
| [`SKIPPING.md`](./SKIPPING.md) | What each step costs to leave out |

## What you never delegate

Subagents cannot talk to a human. **You** run the interview, **you** hold every
gate, and **you** run the deploy step — it holds credentials and it is the
irreversible one.

Agents in [`agents/`](./agents) do autonomous work only: mining evidence, charting
peers, generating design images, prototyping techniques, drafting case studies,
building sections, and verifying the live site. Dispatch each at the tier its work
needs ([`MODELS.md`](./MODELS.md)).

If your platform has no subagents, run those steps yourself in the same order. The
pipeline degrades to sequential; it does not break.

## The rules you enforce at every step

- Creativity is the baseline; the obvious answer is the failure mode (`§1–2`)
- Reinvent every component every run; name what was invented (`§3`)
- Bring 2–3 options to every gate (`§4`)
- Every claim traces to `EVIDENCE.md`, or it does not ship (`§5`, hard)
- Generate every visual. No hotlinked stock, ever (`§10`)
- Vendor and self-host everything before production (`§9`)
- Three states on every technique; alt text everywhere; 4.5:1 (`§12`, hard)
- Shell under 100KB and painting alone; heavy layer deferred (`§13`)
- Push and deploy as the subject, with their credentials (`§20`, hard)
- Snapshot before you overwrite; document the rollback (`§15`, hard)
- Gate C is never skipped, collapsed, or assumed (`§16`, hard)
- Skipping is allowed. Silent degradation is not (`§18`)

## Scripts

Two, both standard-library Python, no dependencies:

```bash
python3 scripts/preflight.py <dir | file | url>   # mechanical gate before Gate C
python3 scripts/preflight.py <target> --check-urls --evidence runs/<slug>/EVIDENCE.md
python3 scripts/badge.py                          # regenerate the badges
```

`preflight.py` checks what a machine can check: alt text, reduced-motion states,
`lang`, CDN assets, hotlinked stock, trackers, the share layer, the shell budget,
and whether every figure on the site appears in `EVIDENCE.md`. It does not judge
design, prose, or truth. That is the human's call at the gate.

## Platform notes

| Platform | Entry |
|---|---|
| Claude Code | `/portfolio.me <subject>`, or the `portfolio.me` skill |
| Cursor | `.cursor/rules/portfolio.me.mdc` |
| Codex | `.codex-plugin/plugin.json` → this file |
| Gemini CLI | `gemini-extension.json` → this file |
| opencode | `opencode.json` → this file |
| Cline / Windsurf | `.clinerules` / `.windsurfrules` |
| Anything else | Point it at this file and name the subject |

## Attribution

Every forged portfolio carries a small **Forged with portfolio.me · PIIIX** credit
in the footer, plus the marker comment `<!-- forged-with: portfolio.me -->`
(`§19`). The badge is [`assets/badges/forged-with.svg`](./assets/badges/forged-with.svg).

It stays visible, and the human can delete it by hand. Tell them it is there and
that removing it is fine. Never re-add it after they have.
