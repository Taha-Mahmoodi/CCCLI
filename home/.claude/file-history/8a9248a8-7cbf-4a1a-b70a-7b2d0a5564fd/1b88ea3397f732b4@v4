# Models

Which tier of model runs which step, and who decides.

Running every loop on the best available model works and wastes a lot of it. Running
every loop on the cheapest produces a portfolio that reads like one. Neither is the
answer, and the split is not where most people put it.

## The principle

**Tier follows the cost of being wrong, not the position in the pipeline.**

A step where a mistake is caught by the next command is cheap to get wrong. A step
whose output every later loop consumes is expensive to get wrong, and no amount of
downstream quality repairs it.

Three questions place any step:

1. **Is there a right answer a check could confirm?** Yes means low tier. Running
   `gh api`, extracting a date from a PDF, vendoring a library, and counting axe
   violations all have right answers.
2. **Is there a spec, and does the work follow it?** Yes means mid tier. Coding to an
   approved design image, charting peers against a fixed rubric, drafting to a
   five-beat shape.
3. **Does it require taste, synthesis, or reading a human?** Yes means top tier. No
   exceptions for time pressure, because this is the work that cannot be redone
   cheaply later.

## Where the intuition misleads

The natural instinct is cheap-early, expensive-late: discovery is just gathering, the
design is where it gets hard. That is backwards here.

**The interview is the most expensive step in the pipeline to get wrong.** It is the
only source of the story, the voice, and the strategy. Every later loop consumes
`BRIEF.md`. A shallow interview does not produce a shallow Loop 1, it produces eight
shallow loops, and no model at any tier repairs it in Loop 4. Asking a provoking
question, hearing the thing under the answer, noticing an evasion worth following,
and knowing when someone has just said the sentence the whole site should be built
around: that is top-tier work in the first ten minutes of the run.

What is genuinely mechanical early on is the **scrape and the document mining**.
`gh api` calls, extracting dates and numbers, listing repositories. That belongs at
the bottom tier, and it usually runs in parallel with the interview anyway.

## The map

Tiers are named rather than versioned so this file does not rot. Current mapping:

| Tier | Today | Character |
|---|---|---|
| **Low** | Haiku | Mechanical, verifiable, high volume |
| **Mid** | Sonnet | Follows a spec, produces structure |
| **Top** | Opus | Taste, synthesis, judgment, anything human-facing |

| Step | Tier | Why |
|---|---|---|
| **0 Bootstrap** | Low | Capability checks with right answers |
| **1a Interview** | **Top** | Reading a human. The output every other loop consumes |
| **1b Documents** (`evidence-miner`) | Low | Extraction from documents |
| **1c Scrape** (`evidence-miner`) | Low | API calls and listing |
| **1c Peers** (`peer-analyst`) | Mid | Charting against a fixed rubric |
| **1d Synthesis** | **Top** | Archetype, positioning, the translation table. The strategy is here |
| **Gate A** | **Top** | Presenting options to a human and hearing the reaction |
| **2a Concepts** | **Top** | The collision, the opening move, the thing nobody expects (`§1–3`) |
| **2a Design images** (`section-designer`) | Mid | Executes an approved direction |
| **2b Technique assignment** | **Top** | Which technique serves this subject, and the `§7` cut test |
| **2b Prototypes** (`technique-prototyper`) | Mid | Build it, measure it, report honestly |
| **Gates B1 / B2** | **Top** | Judgment on rendered work |
| **3 Case studies** (`case-study-writer`) | Mid | Drafting to the five-beat shape |
| **3 Voice pass** | **Top** | Sounding like them rather than like a model (`§11`) |
| **3 NDA rewrites** | **Top** | The line between anonymized-and-true and mush (`§21`) |
| **4 Section builds** (`section-builder`) | Mid | Coding to an approved image with the design settled |
| **4 Vendoring, budget, meta** | Low | Mechanical with a pass condition |
| **5 OG image and share** | Mid | Design work inside a settled system |
| **6 Sitemap, robots.txt, canonical** | Low | Generated from the real page list, right answer |
| **6 Structured data** | Low | Fields sourced from `EVIDENCE.md`, right or wrong |
| **6 Keyword-intent audit** | Mid | Reads Loop 3's copy against a fixed brief, does not rewrite it |
| **7 Credibility audit** (`credibility-auditor`) | **Top** | Independent judgment on voice, claim framing, and whether the built site still holds up — not a checklist |
| **7 Deploy commands** | Low | Adapter commands with right answers |
| **7 Gate C and go/no-go** | **Top** | Irreversible, and the one gate that never skips (`§16`) |
| **8 Checklist** (`site-verifier`) | Low | axe, Lighthouse, links, console. Pass or fail |
| **8 Looking at the screenshots** | **Top** | An automated pass and a page that looks wrong are compatible states (`§14`) |
| **9 Rot check** | Mid | Structured comparison against a known previous state |

## Who switches what

Two different mechanisms, and the difference matters.

**Workers: set automatically.** The conductor picks the tier when it dispatches, and
does not ask. Dispatching `evidence-miner` at low tier and `section-designer` at mid
is a routine call, and interrupting a human to confirm it is noise.

**The conductor: ask, never assume.** A conductor cannot change its own model. Only
the human can, with `/model`. So when a run is about to enter a top-tier stretch on a
lower-tier session, **say so once, in one line, and continue either way**:

> Loop 2a next, which is the concept work. It goes better on the top tier if you
> want to switch with `/model`. Say the word and I will carry on as is.

State it once at the boundary. Not at every step, not as a warning, not again after
they decline. Their answer stands for the rest of the run unless they revisit it.

## Escalate mid-loop when

The map is a default, and these override it:

- A low-tier worker reports something ambiguous rather than a result. Ambiguity is a
  signal the step was misfiled, not a reason to re-run it cheaper.
- Two attempts at the same step produce the same wrong answer.
- A gate rejection traced back to strategy rather than execution
  (`loops/02-design.md`). The brief was misread, which is top-tier work.
- The subject is a thin portfolio (`BRAND.md`). Less material means the reading of it
  matters more.
- Anything touching `§5`, `§21`, or `§23`. A judgment about what is true, what is
  confidential, and what someone else said is never a cost saving.

Never de-escalate mid-loop to save budget. Finish the step at the tier it started on.

## What this is not

Not a reason to skip work. A low tier on a step does not mean a shallower step, it
means the same step run by a model that is sufficient for it. If a step cannot be
done properly at its assigned tier, it was assigned wrong.

Not a quality excuse in the report. `REPORT.md` grades against `SKIPS.md`, and the
tier a step ran at is not a defense for a failed check.

## Skip cost

Skipping model selection means the run happens entirely on whatever model the session
is already using.

On a top-tier session: correct output, and materially more expensive than it needed
to be. Nothing is lost but budget.

On a low-tier session: the mechanical loops are fine and the judgment loops are
where it shows. The interview asks flatter questions and takes the first answer. The
concepts land closer to the category reflex `§1` exists to prevent. The voice pass
reads like a model writing in someone's voice rather than the person talking. None of
these fail a check in Loop 8, which is what makes this skip the quiet one: the site
passes, and it is a worse site.

Record the skip and note the session tier in `SKIPS.md`, so the grade means something.
