# Loop 3 — Copy

**Goal:** write the actual words, before the build, so the design gets built around
real text instead of placeholder blocks.

**Input:** `EVIDENCE.md`, `BRIEF.md` (verbal identity + proof ladder), `DIRECTION.md`.

**Output:** `COPY.md` — every string that appears on the site.

---

## Why this comes before Build

A portfolio is mostly prose. Three case studies, an about, a hero line, project
blurbs, and the small print. Build a layout around lorem ipsum and it breaks the
day real text arrives: the headline that fit at 4 words needs 9, the case study
that filled the column is three paragraphs longer, the blurb has no natural break.

Design around real lengths and none of that happens.

## The case study shape

Five beats. Dispatch `case-study-writer`, **one agent per project**.

| Beat | What goes in it |
|---|---|
| **Problem** | What was actually wrong, in the world, before this existed. Not "the client wanted a site." |
| **Constraint** | What made it hard. Budget, deadline, legacy system, team of one, a hostile stakeholder. The constraint is what makes the decision interesting. |
| **Decision** | The call they made and what they gave up making it. A decision with no tradeoff is a task. |
| **What broke** | The thing that went wrong. This beat is what separates a portfolio from a brochure, and it is the one people cut. Keep it. |
| **Outcome** | What happened, sourced (`§5`). Ranked on the proof ladder. Unmeasurable outcomes are stated plainly as unmeasurable. |

Depth comes from the audience in `BRIEF.md`. A hiring manager skims and wants the
decision. A collaborator reads and wants what broke. Write for the one named.

## Writing around an NDA

The five beats ask for what broke and a sourced outcome, and for most senior people
the strongest work is covered. `§21` handles this at intake: get the list of what
cannot be named before you write a word — clients, unlaunched products, numbers that
were never public, an employer with a press policy.

Then write the class of problem instead of the instance. The class carries the
weight. The logo does not.

**The client is the secret, the outcome is not.**

> Before: Cut checkout abandonment at Northwind Financial from 71% to 47% in a quarter.
>
> After: Cut checkout abandonment from 71% to 47% in a quarter, at a payments
> platform processing nine figures a year.

Nothing was lost. The number was doing the work the whole time.

**The number is the secret.**

> Before: Took Halcyon from $4M to $11M ARR as the first design hire.
>
> After: First design hire at a Series A developer-tools company. Owned onboarding,
> billing, and the dashboard through the growth stage. The revenue figures are
> covered and are not on this page.

A withheld outcome gets stated as withheld. Fudging it into "significant growth"
reads worse than the sentence admitting it is unavailable, because a reader can tell
which one is happening.

**All of it is the secret.**

> Before: Led the core ledger migration at [national bank]. Nothing in it ships as
> written.
>
> After: Moved a twenty-year-old core ledger off a mainframe at a national retail
> bank. Regulated environment, four-hour cutover window, no reversal path if it went
> wrong.

The constraint beat survives anonymization almost intact, and it usually carries the
case study when the outcome cannot. What made the work hard is rarely the
confidential part.

**The failure mode is mush.** Anonymize hard enough and the claim stops meaning
anything: "a client in the financial sector saw significant improvements across key
metrics." That helps nobody, and it reads as evasion — the reader assumes there was
never anything specific there. Test every rewrite by naming one thing the reader now
knows that they did not know before the sentence. No answer means cut the project
rather than ship the fog.

**It still traces.** An anonymized claim goes into `EVIDENCE.md` under `§5` exactly
as a named one does. `EVIDENCE.md` is a run file and not a public one: it holds the
real client, the real number, and the real source, while the site holds the class.
The identifying detail is withheld, never absent. Vagueness about who a claim
concerns does not make an unsourced claim shippable.

**The subject clears it, never you.** Collect every anonymized line into one list and
hand it to them at Gate C. Their yes is the record. In doubt it does not ship, and
that call is theirs.

## Voice

From the verbal identity section of `BRIEF.md`, which came from their own sentences
in the interview. Use their lexicon. Honor their banned words. Match their rhythm
and their opening move.

Quote them directly where the interview gave you something good. A real sentence
from the subject beats anything you write in their voice.

## The prose pass

Run in this order, per `§11`:

1. **`stop-slop`** — strip the AI tells first
2. **`copywriting`** — structure, hierarchy, what earns a line
3. **`ogilvy`** — does it sell the work, does every claim answer "so what?"

Hard bans: "not X, but Y" contrasts. Em-dash cadence as a tic. Three-item lists by
reflex. Hollow superlatives. Passive voice hiding who did what. "Passionate about."
"Leveraged." "Solutions."

## Everything else that is text

The hero line, and the sub-line if the design has one. Section headers. Project
blurbs. The about, in first person unless the archetype says otherwise. Alt text on
every image — descriptive, per `§12`, written now rather than improvised during the
build. The contact ask. The footer. Meta title and description for Loop 5. Error and
empty states — the 404, a failed submission, an empty blog index if there's one.
`CRAFT.md`'s absence-states entry covers why these aren't an afterthought.

## Testimonials

`§23` governs these. A testimonial is a claim made by someone who is not in the room
to be asked about it.

**Where they go.** Beside the claim they corroborate. A quote about the migration
belongs inside the migration case study, where it is doing work. A carousel of praise
at the bottom of the page is the section everyone scrolls past, and the audience
named in `BRIEF.md` reads it as decoration.

**How many earn a place.** Two or three that say something. A specific testimonial
about one hard thing outperforms a glowing general one by a wide margin: "she found
the race condition three of us had stared at for a week" lands, and "a pleasure to
work with, a true professional" does not, because the second is what people write
when they have nothing particular to say. Zero is a legitimate number. A weak
testimonial costs more than an absent one.

**Attribution.** A real name and a real role, both of them. "A former client" is what
an invented quote looks like, and readers know it on sight. A person who cannot be
named comes off the page.

**Permission.** The source has to exist and the person has to have agreed to be
quoted publicly. A LinkedIn recommendation is already public. A Slack message, a
private email, or a line lifted from a performance review is not, however good it is.
Where it is unclear, the subject asks them, and that happens before Gate C rather
than after. Record the source in `EVIDENCE.md` like any other claim.

**The ban.** Never write one. Never improve one. Never merge two into a better
sentence than either. Trim for length with an ellipsis and keep the words as spoken.
This is the most tempting fabrication in a portfolio and the most damaging, because
the person quoted can be shown it later.

## The evidence check

Before this loop closes, walk every factual claim in `COPY.md` against
`EVIDENCE.md`. Sourced claims ship. Unsourced claims get cut, or attributed to the
subject as speech. This is `§5` and it is a hard rule — no exceptions, no
"probably," no rounding a number up because it reads better.

## Skip cost

Skipping this ships a gallery: images with captions, and nothing that explains why
any of it mattered. The design also gets built around invented text lengths and
then breaks when the real words arrive. Case studies are the substance of a
portfolio.
