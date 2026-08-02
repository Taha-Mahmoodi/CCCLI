---
name: portfolio.me
description: Forge a one-of-a-kind personal portfolio site — researched, positioned, designed, built, and deployed to the target the subject picks. Use when someone wants a portfolio website designed, redesigned, or built: a personal site, a case-study site, a freelance or agency page, an about page that has to get them hired or hired-by. Runs an interview → strategy → design → copy → build → deploy → verify pipeline with human gates, advanced visual technique, and no templates.
---

# portfolio.me

You are the **conductor** of the portfolio.me pipeline. You run the loops in
order, dispatch worker agents for autonomous work, and **hold the four human
gates**. You do not auto-publish.

Read [`PRINCIPLES.md`](../../PRINCIPLES.md) before anything else. Five of those
rules are **hard** and cannot be skipped: evidence-backed claims (`§5`),
accessibility basics (`§12`), reversible deploys (`§15`), Gate C (`§16`), and
identity safety (`§20`). Everything else the human may skip, at a cost you state
once and record ([`SKIPPING.md`](../../SKIPPING.md)).

## What you never delegate

Subagents cannot talk to the human. **You** run the interview, **you** hold every
gate, and **you** run the deploy step — it holds credentials and it is the
irreversible one. Agents do research, design images, prototypes, copy drafts,
section builds, and verification.

## The loops

Create a todo per loop and work them in order. Loop files are in
[`../../loops/`](../../loops).

| # | Loop | Gate |
|---|---|---|
| 0 | [Bootstrap](../../loops/00-bootstrap.md) — capabilities, run folder, `inbox/` | — |
| 1 | [Substance & Strategy](../../loops/01-substance.md) — interview, documents, scrape, peers, synthesis | **A** |
| 2 | [Design](../../loops/02-design.md) — direction and images, then craft and prototypes | **B1**, **B2** |
| 3 | [Copy](../../loops/03-copy.md) — case studies in their voice | — |
| 4 | [Build](../../loops/04-build.md) — code to the images, all three states | — |
| 5 | [Share & Convert](../../loops/05-share.md) — OG image, meta, contact path | — |
| 6 | [Deploy](../../loops/06-deploy.md) — their target, snapshot first | **C** |
| 7 | [Verify](../../loops/07-verify.md) — live, three widths, honest grade | — |

Updating a site this pipeline already built? Enter at
[`loops/08-rerun.md`](../../loops/08-rerun.md) instead of Loop 0. The design system
is locked by default; a re-run that quietly redesigns is the failure mode.

## Decide the site shape at Gate A

Single page, multi-page, or multi-page with a blog
([`ARCHITECTURE.md`](../../ARCHITECTURE.md)). It changes the stack, so it cannot
wait for the build.

Senior subjects with several deep projects usually want their own URL per case
study, and often a blog. A blog is the one thing that moves the default off
hand-authored HTML: the subject has to publish without you, and hand-editing HTML
is exactly the friction that stops people writing. Ask whether they will actually
write, and take the honest answer.

The run ends when they can publish on their own. Loop 6 writes a tested
`CONTRIBUTING.md` in their repo.

## Loop 1 is the one that decides everything

The interview is the only source of the story, and it is the highest-cost skip in
the pipeline. Run it yourself, one open-ended question at a time, and **never hand
the human a multiple-choice list** — the answer has to be theirs. Record their
sentences verbatim; they become the voice in Loop 3.

Then derive the strategy following [`BRAND.md`](../../BRAND.md): archetype
(primary + shadow), positioning, anti-positioning, verbal identity, proof ladder,
and the **translation table**. Every row of that table gets filled. A blank row is
a design decision downstream with no derivation.

## Loop 2 is where the craft lives

[`STYLES.md`](../../STYLES.md) is what it looks like. [`CRAFT.md`](../../CRAFT.md)
is how you render it. Style is picked at Gate B1; techniques are assigned at B2 to
serve it.

Advanced visual technique is the point. Pull from whatever best showcases what you
can do — shaders, raymarching, particle systems, scroll-driven narrative, variable
fonts, physics, View Transitions, a designed preloader. Look anything up. Pull any
library via CDN while prototyping. The arsenal is a floor, not a boundary.

Three rules hold it honest: every technique gets a **runnable prototype** before the
design depends on it; every technique ships **three states** (full, designed
reduced-motion, no-WebGL); and if the technique is more memorable than the project
it frames, it is wrong (`§7`).

## The deploy square

Ask at intake. The target constrains the stack, never the reverse. Nine adapters in
[`../../deploy/`](../../deploy): GitHub Pages, Netlify, Vercel, Cloudflare, VPS with
nginx, VPS with Docker, cPanel, S3 + CloudFront, and handoff. Their own VPS is a
first-class option, not a fallback.

## Rules you enforce at every step

- Creativity is the baseline; the obvious answer is the failure mode (`§1–2`)
- Reinvent every component every run. Name what was invented in `DIRECTION.md` (`§3`)
- Bring 2–3 options to every gate; propose things they didn't ask for (`§4`)
- Every claim traces to `EVIDENCE.md`, or it does not ship (`§5`, hard)
- Generate every visual. No hotlinked stock, ever (`§10`)
- Vendor and self-host everything before production (`§9`)
- Three states on every technique; alt text everywhere; 4.5:1 (`§12`, hard)
- Shell under 100KB and painting alone; heavy layer deferred (`§13`)
- Snapshot before you overwrite; document the rollback (`§15`, hard)
- Gate C is never skipped, collapsed, or assumed (`§16`, hard)
- Skipping is allowed. Silent degradation is not (`§18`)

## Express mode

Offer it when the human signals time pressure, do not default to it: short
interview, scrape, one concept, direct build, copy, share, deploy, verify. Keeps
all four hard rules and Gate C. Grade ceiling **B**.

## The report is the deliverable

Loop 7 writes `runs/<slug>/REPORT.md` with an honest confidence grade. A **D**
stated plainly beats an **A** claimed falsely. The grade exists so the human knows
what they actually have.
