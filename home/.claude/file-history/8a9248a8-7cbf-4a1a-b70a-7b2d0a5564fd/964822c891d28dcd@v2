# Re-run

**Goal:** change a site this pipeline already built, without rebuilding or quietly
redesigning it.

**Input:** the prior `runs/<slug>/`, the live URL, and what the human wants changed.

**Output:** the updated site live, and the change recorded in `REPORT.md`.

**This is a mode, not a numbered loop.** Entered instead of Loop 0, it re-enters the
numbered loops wherever the change actually lands. Nothing here runs after Loop 8.

The most common request after the initial build is "add this project, don't redesign
it." Both halves are the instruction, which is why this mode starts by reading.

---

## Load the previous run

| File | What you take from it |
|---|---|
| `BRIEF.md` | Archetype, positioning, audience, verbal identity. New copy is written in the same voice |
| `DIRECTION.md` | Tokens, type system, the collision, the motion spec, the budget |
| `EVIDENCE.md` | Every existing claim and its source. Append to it, never rewrite it |
| `COPY.md` | The existing strings, the rhythm, the shape each section takes |
| `SKIPS.md` | What was skipped last time and what it cost. It carries forward |
| `REPORT.md` | The grade, the deploy target, the rollback command, the live URL |

**The design system is locked by default.** Same tokens, same type scale, same
collision, same motion spec. A new project uses the presentation `DIRECTION.md` already
invented, not the better one you thought of on the way in. `§3` bans reusing a design
across subjects; it does not ask one subject's site to be inconsistent with itself. A
re-run that quietly redesigns is the failure this mode exists to prevent. When the
change genuinely cannot be expressed in the existing system, stop: that is a Gate B1
conversation, never a call made inside a re-run.

**No prior run on disk** — someone else built it, or the record is gone. Infer the
system from the live CSS, write it into a fresh `DIRECTION.md`, and report it as
inferred rather than read. A reconstruction is not a brief.

## Classify the request

| Request | What it touches | Re-enters at |
|---|---|---|
| Add a project or a blog post | Copy, build, share, SEO, deploy, verify | Loop 3 |
| Update a claim or a number | Evidence, then copy. Re-check `§5` | Loop 1 evidence, then Loop 3 |
| Fix something broken | Build, then verify | Loop 4 |
| Sitemap, robots.txt, or an indexing change | SEO only | Loop 6 |
| Restyle or refresh | Direction and everything downstream | Loop 2, existing `BRIEF.md` |
| Strategy change: new audience, career pivot | All of it | Loop 1, full re-run |

Adding a post to a site that has no blog is structural before it is copy — see
[`../ARCHITECTURE.md`](../ARCHITECTURE.md).

**Restyle is not a re-run.** It re-enters at Loop 2 on the existing `BRIEF.md`, and
Gates B1 and B2 come back with it. Say so up front, so nobody expects an afternoon.

**A strategy change is a full re-run, and say so plainly.** Someone who moved from
design into research does not need a new hero line bolted onto an old brief. The brief
no longer describes the person, and patching it produces a site arguing for the job
they left, in the voice of who they used to be. That is a new interview.

## The rot check

Run this before the requested change. The site has been alone for months.

| Check | What rots |
|---|---|
| Every link | External ones first. They die quietly while the site keeps serving 200s |
| TLS and redirects | Certificate expiry, `http` still redirecting, apex and `www` both resolving |
| Third-party assets | A CDN reference `§9` should have prevented, or one a later hand-edit added |
| Present-tense claims | "Currently at X" when they left in March. Present tense is a claim about today |
| Contact path and details | Send a real message and confirm it arrives. Endpoints expire, handles change, the résumé link 404s |
| Images | Confirm they load. An `<img>` tag is not an image |
| Console | Zero errors. A browser release can break what shipped clean |

**Report rot separately from the requested change.** The human asked for one thing and
needs to know about the other. Never fold a rot fix in silently, never spend the run on
rot instead of the request. List it, state the cost, and let them decide.

## Evidence hygiene

New claims trace to `EVIDENCE.md` like every other claim (`§5`, hard). Old claims get
re-verified for currency. A number true in 2024 may be false now, and a stale metric is
a false claim even though it was once sourced. "40,000 monthly users," sourced to a 2024
dashboard, says nothing about today: re-source it, or date it — "40,000 monthly users as
of 2024" stays true permanently. Re-ask the `§21` list too. Clearance is a state rather
than a fact, and an NDA expires as easily as a product launches.

## Which gates apply

| Gate | Runs when |
|---|---|
| **A** | Strategy moved: new audience, new positioning, a different project set |
| **B1** | Design moved: new concept, new palette, a section shape that does not exist yet |
| **B2** | A new technique, or a change to the motion spec |
| **C** | **Always.** `§16`, hard |

> ## Gate C — human decision
>
> Show the changed surface at three widths, the copy diff, what is about to be
> overwritten, and the rollback command. Get an explicit yes. Approval from the
> original run does not carry — it approved a different site.

Adding a blog post needs Gate C and nothing else. Say that out loud when the human asks
what it takes, so re-runs stay light and people keep asking for them.

## Deploy and verify

Snapshot before overwriting (`§15`, hard), exactly as Loop 7 does. It matters more here
than on a first build: there is something live to lose, and it is the version the subject
has been sending to people.

Verification scopes to what changed plus the checks that catch collateral damage: the
changed page at 360, 768 and 1440; every link on the site rather than only the new ones;
console clean site-wide; the shell budget, because the change added bytes; axe on the
changed page; the unfurl, if meta or the OG image was touched.

**Say which subset ran, in the report.** A scoped verification described as a full one
is a false grade. When the change touched the shell, the tokens, or anything shared, the
scope is all of Loop 8 and there is no subset.

## The report

Append a dated section to the existing `REPORT.md`, or write `REPORT-<date>.md` beside
it when the original is long enough that appending buries the change. Record: what was
asked, what changed, what rot was found and whether it was fixed, which gates ran, which
verification subset ran, the deploy command, the new rollback reference, the date.

**State a grade only if verification actually re-ran.** A grade carried from the original
run describes the original site. When verification was scoped, scope the grade to the
changed surface and say so.

## Skip cost

Skipping this mode means treating an update as a fresh build: the design drifts because
nobody opened `DIRECTION.md`, the new claim ships unsourced because nobody opened
`EVIDENCE.md`, and the subject gets back a site they have to approve from scratch.
Skipping only the rot check keeps the change honest and leaves the dead link that has
been quietly costing them what the site exists to produce.
