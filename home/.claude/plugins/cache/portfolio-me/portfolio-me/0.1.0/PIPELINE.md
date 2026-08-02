# The pipeline

`portfolio.me` turns a person into a deployed portfolio site — researched,
positioned, designed, built, and live on infrastructure they chose. It runs eight
loops with human gates between them. It is an agent operating system: markdown
instructions a capable coding agent executes, not a program you install.

```text
 BOOTSTRAP ─► SUBSTANCE ─► DESIGN ─► COPY ─► BUILD ─► DEPLOY ─► VERIFY ─► runs/
    caps      & STRATEGY    2a dir    case    code to   their      live      report
              interview→    2b craft  studies  the      chosen    shots +
              docs→scrape                     design    target    grade
                   │          │  │                         │
                Gate A      B1  B2                      Gate C
```

## Why it exists

The default portfolio is a template with someone's name in it: the same hero, the
same card grid, the same three-column skills section, the same stock gradient. It
says nothing about the person, because nothing in it came from them.

This pipeline forces the opposite. The story comes out of an interview, not a
scrape. The look is derived from a brand strategy that can be defended, not from
taste. Every visual is generated rather than borrowed, every technique is proven in
a prototype before the design leans on it, and every claim traces to a source. The
result looks like *them*, works on a phone, and doesn't rot.

## The eight loops

| # | Loop | File | Output | Gate |
|---|------|------|--------|------|
| **0** | Bootstrap | [`loops/00-bootstrap.md`](./loops/00-bootstrap.md) | Capabilities ready; deploy target's CLI confirmed | — |
| **1** | Substance & Strategy | [`loops/01-substance.md`](./loops/01-substance.md) | `BRIEF.md`, `EVIDENCE.md` — vision, archetype, positioning, the gap, what's true | **A** |
| **2** | Design | [`loops/02-design.md`](./loops/02-design.md) | `DIRECTION.md`, design image per section, technique prototypes | **B1**, **B2** |
| **3** | Copy | [`loops/03-copy.md`](./loops/03-copy.md) | `COPY.md` — case studies, hero, about, in their voice | — |
| **4** | Build | [`loops/04-build.md`](./loops/04-build.md) | The site: coded to the images, vendored, responsive | — |
| **5** | Share & Convert | [`loops/05-share.md`](./loops/05-share.md) | OG image, meta, schema, favicons, the contact path | — |
| **6** | Deploy | [`loops/06-deploy.md`](./loops/06-deploy.md) | Live URL on their infrastructure, rollback documented | **C** |
| **7** | Verify | [`loops/07-verify.md`](./loops/07-verify.md) | Live shots at 3 widths, a11y + perf pass, `REPORT.md` + grade | — |

The binding rules are in [`PRINCIPLES.md`](./PRINCIPLES.md). Read them first. The
supporting doctrine: [`BRAND.md`](./BRAND.md) (strategy),
[`ARCHITECTURE.md`](./ARCHITECTURE.md) (how many pages, and the blog),
[`STYLES.md`](./STYLES.md) (what it looks like), [`CRAFT.md`](./CRAFT.md) (how you
render it), [`MODELS.md`](./MODELS.md) (which tier runs which step),
[`SKIPPING.md`](./SKIPPING.md) (what it costs to leave a step out).

There is also a mode rather than a loop: [`loops/08-rerun.md`](./loops/08-rerun.md),
entered instead of Loop 0 when updating a site this pipeline already built.

## The gates

Four stops. The human decides at each one.

| Gate | After | They decide |
|---|---|---|
| **A** | Loop 1 | Archetype, positioning, audience, which projects earn a slot, deploy target |
| **B1** | Loop 2a | The concept and style, from rendered design images |
| **B2** | Loop 2b | Techniques, motion character, performance budget |
| **C** | Loop 6 | The final site, before it becomes publicly visible. **Cannot be skipped** (`§16`) |

## Skipping

Everything except five rules is optional (`§18`, [`SKIPPING.md`](./SKIPPING.md)).
State the cost once, honor the answer, record it in `runs/<slug>/SKIPS.md`, and
carry it into the confidence grade. Never skip a step on your own initiative.

**Express mode** — the pre-packaged skip set for time pressure: short interview,
scrape, one concept, direct build, copy, share, deploy, verify. Grade ceiling **B**.

## The deploy square

Asked at intake, in Loop 1. **The target constrains the stack, never the reverse.**

| Target | Stack | Adapter |
|---|---|---|
| GitHub Pages | static | [`deploy/pages.md`](./deploy/pages.md) |
| Netlify | static or SSR | [`deploy/netlify.md`](./deploy/netlify.md) |
| Vercel | static or SSR | [`deploy/vercel.md`](./deploy/vercel.md) |
| Cloudflare Pages | static or SSR | [`deploy/cloudflare.md`](./deploy/cloudflare.md) |
| Own VPS — nginx | anything | [`deploy/vps-nginx.md`](./deploy/vps-nginx.md) |
| Own VPS — Docker | anything | [`deploy/vps-docker.md`](./deploy/vps-docker.md) |
| cPanel / shared host | static | [`deploy/cpanel.md`](./deploy/cpanel.md) |
| S3 + CloudFront | static | [`deploy/s3.md`](./deploy/s3.md) |
| Handoff / local | any | [`deploy/handoff.md`](./deploy/handoff.md) |

Default stack: hand-authored HTML/CSS with committed assets. Runs on all nine.
Astro when case-study volume earns it. An SSR framework only when the target runs
node and something on the page genuinely needs a server.

Every adapter snapshots what's live before overwriting and documents its rollback
(`§15`).

## Worker agents

Dispatched for autonomous work. The conductor holds every human-facing step and
every gate — subagents cannot talk to the human, so the interview, the gates, and
the deploy step are never delegated.

| Agent | Loop | Job |
|---|---|---|
| `evidence-miner` | 1b–1c | Mine the inbox, scrape the APIs, corroborate claims, list the gaps |
| `peer-analyst` | 1c | Chart 6–10 peer portfolios, find the empty quadrant |
| `section-designer` | 2a | One per section: generate the design image |
| `technique-prototyper` | 2b | One per technique: research it, build a runnable proof, screenshot it |
| `case-study-writer` | 3 | One per project: draft from evidence in the subject's voice |
| `section-builder` | 4 | One per section: code to the approved image |
| `site-verifier` | 7 | Live checklist, three widths, a11y, perf, report |

Each is dispatched at the tier its work needs ([`MODELS.md`](./MODELS.md)) — low for
mining, scraping, and checklists; mid for anything following a spec. The conductor
sets this without asking. What it cannot set is its own model, so the top-tier steps
(the interview, the synthesis, the concepts, every gate) are a one-line mention to
the human at the boundary and never a blocker.

## The run ledger

Each run writes to `runs/<slug>/`: `BRIEF.md`, `EVIDENCE.md`, `DIRECTION.md`,
`COPY.md`, `SKIPS.md`, `REPORT.md`, and `shots/`. The site's code goes to the
subject's own repository. This repo keeps only the record.

## Running it

Point your agent at this repo, give it the subject, and have it execute the loops in
order, stopping at each gate for your decision. See
[`HOW_TO_RUN.md`](./HOW_TO_RUN.md).
