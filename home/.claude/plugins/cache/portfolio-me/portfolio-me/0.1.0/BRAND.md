# Brand

The strategy layer. Loop 1d reads this file, runs it against the interview and
`EVIDENCE.md`, and writes the result into the run's `BRIEF.md`. Loop 2 opens
`BRIEF.md` and designs against it.

Everything here is skippable (see [`SKIPPING.md`](./SKIPPING.md)), at the cost that
design decisions stop being derivable. `§5` binds every claim this file produces.

---

## Why strategy comes first

A design decision has to be derivable from something. Without a strategy layer, a dark
cinematic hero is a preference, and the only defense of it is that you liked it. That
defense collapses the first time the subject asks why their site looks like this, and
it gives Gate B1 nothing to evaluate against.

Strategy makes the design falsifiable. Archetype narrows the style shortlist.
Positioning tells the hero what to accomplish in three seconds. Anti-positioning bans
techniques outright. Proof ranking decides which projects get a slot. With those
inputs, design review becomes an argument about fit rather than taste.

## Archetype

Twelve archetypes, read for how someone actually behaves at work.

| Archetype | At work |
|---|---|
| **Sage** | Needs to be right before they need to be liked. Explains the mechanism, teaches while shipping. |
| **Creator** | Judges the work by whether it is good, never by whether it landed. Rebuilds things that already function. |
| **Explorer** | Leaves before the job gets comfortable. The résumé reads as a map of new territory. |
| **Hero** | Volunteers for the hard assignment and finishes it. Talks in outcomes and deadlines. |
| **Magician** | Converts one state into another, makes the impossible routine. The demo does the arguing. |
| **Outlaw** | Attacks the accepted way of doing it. Ships things the field said were bad ideas. |
| **Ruler** | Builds order and hands it over. Standards, systems, governance, succession. |
| **Caregiver** | Measures themselves by the team's throughput. Picks up the unglamorous work nobody claims. |
| **Everyman** | Makes the thing usable by normal people. Allergic to jargon and to ceremony. |
| **Lover** | Obsessive about craft. How it feels carries the same weight as whether it works. |
| **Jester** | Uses humor to defuse and to expose. Makes serious work approachable without making it small. |
| **Innocent** | Keeps a simple thing simple. Refuses complexity, stays optimistic without being naive. |

### Primary plus shadow

**Pick two.** A pure archetype is a stereotype, and a stereotype designs a stock site.
The personality lives in the tension between a primary and a shadow, the second
impulse that bends the first. The shadow shows up under pressure, in the stories
about things going wrong, in the aside made forty minutes into the interview. It is
usually the archetype they would not have named for themselves.

| Pair | What it produces |
|---|---|
| **Creator / Outlaw** | The work exists to prove the standard approach was wrong. The site argues. Loud type, deliberate ugliness, the rejected version shown beside the shipped one. |
| **Creator / Caregiver** | The work exists to be handed to someone. The site teaches. Full process, generous captions, warm surfaces, nothing that makes a visitor feel stupid. |
| **Sage / Jester** | Deep expertise delivered without solemnity. Rigorous and funny. Precise structure with one component that behaves unexpectedly. |
| **Hero / Innocent** | Hard outcomes in plain language, no chest-beating. Short, blunt, almost empty. One number per project, no adjectives. |

The first two pairs share a primary and must not produce sites that resemble each
other in any respect. If they would, the shadow did no work and the pair is wrong.

### Evidence, not vibes

Per `§5`, the archetype is a claim and needs a source. Record it as:

```
Primary: Outlaw
  "Everyone told me not to rewrite the scheduler. I did it over a holiday
   weekend and then dared them to revert it." — interview 00:24:11
Shadow: Caregiver
  "The rewrite was for the on-call rotation. I was the one getting paged." — 00:26:03
```

Two quotes minimum per archetype, from the transcript or from the work itself: a commit
message, a README, a talk abstract. An archetype nobody can trace to a sentence they
said is invented, and inventing a persona is banned outright.

## Archetype to design constraint

A shortlist, never the answer. Style families named here are defined in
[`STYLES.md`](./STYLES.md).

| Archetype | Voice | Style pull | Motion character | Typographic pull |
|---|---|---|---|---|
| **Sage** | Precise, defines its terms, explains why | Swiss, editorial, blueprint | Deliberate, reveals information in order | Serif body at generous measure, grotesk labels |
| **Creator** | First person, process-forward, shows the mess | Collage, riso, bento, kinetic | Playful, materially inventive | Display-led, mixed weights, expressive |
| **Explorer** | Plainspoken, present tense, spatial | Cinematic dark, spatial 3D, scroll-cinema | Continuous drift, real depth | Wide grotesk, open tracking, minimal chrome |
| **Hero** | Short sentences, outcome first, strong verbs | Brutalism, editorial, radical minimalism | Decisive, single beat, no dawdling | Heavy condensed display, tight leading |
| **Magician** | Restrained, withholds then reveals | Aurora/mesh, glassmorphism, physics-world | Transformation is the point, state change carries meaning | Refined neo-grotesk, low weight contrast |
| **Outlaw** | Adversarial, names what it is against | Neo-brutalism, terminal, riso | Abrupt, snapping, ugly on purpose | Monospace, degraded or appropriated type, oversized |
| **Ruler** | Declarative, standards language | Swiss, bento, radical minimalism | Minimal, structural, obeys the grid | Institutional grotesk, strict scale, no exceptions |
| **Caregiver** | Second person, warm, framed as service | Editorial, bento, soft minimalism | Gentle easing, nothing sudden | Humanist sans, comfortable measure, high legibility |
| **Everyman** | Conversational, jargon stripped out | Editorial, bento, radical minimalism | Functional only, no decoration | Workhorse humanist, plain hierarchy |
| **Lover** | Sensory, detail-obsessed, slow | Cinematic dark, editorial, glassmorphism | Slow, weighted, tactile | High-contrast serif, large imagery, fine detail |
| **Jester** | Wry, short punchlines, self-aware | Collage, physics-world, kinetic | Springy, interactive, willing to surprise | Mixed display faces, deliberate mismatch |
| **Innocent** | Simple declaratives, no hedging | Radical minimalism, riso, flat editorial | Almost none, one soft transition | Rounded geometric or plain grotesk, large whitespace |

Three rules govern this table.

1. It is a **shortlist**. It narrows seventeen families to three. It never picks one.
2. `§3` applies in full. Two runs with the same archetype must not look alike. The
   shortlist is where a run starts, and `DIRECTION.md` still states what was done to
   the style that nobody else does.
3. **Gate B1 can override any row**, and the override gets written down: which row,
   what replaced it, why. An unexplained override is taste wearing a strategy costume.

The shadow pulls a second shortlist. The interesting concepts usually come from colliding
the two: a Ruler grid holding Jester content, a Sage structure in Outlaw materials.

## Positioning

One sentence, forced into this shape:

> For **[audience]** deciding **[decision]**, **[name]** is the **[category]** who
> **[differentiator]**, because **[proof from EVIDENCE.md]**.

If it does not compile, the strategy is not finished. Every clause is load-bearing. The
audience becomes `§6`. The decision becomes the structure. The category becomes the
hero line. The differentiator becomes the thing the site is built to prove. The proof
already exists in `EVIDENCE.md` before the sentence may be written. Filled in:

> For **seed-stage founders** deciding **who to trust with a first design system**,
> **Mira** is the **product designer** who **ships the system and the first three
> features herself**, because **she built Aster's system solo across 14 screens in six
> weeks** (interview 00:12:40, corroborated by commit history).

> For **hospital procurement committees** deciding **on a patient-monitoring vendor**,
> **Dr. Osei** is the **clinical engineer** who **has run the deployment from the ward
> side**, because **she ran the 2024 forty-bed pilot at St. Anne's and published its
> failure analysis** (uploaded pilot report, p.11).

A bad one:

> For **companies looking for great developers**, **Sam** is a **passionate full-stack
> engineer** who **delivers high-quality solutions**, because **he loves what he does**.

Diagnosis by clause. The audience is everyone, so `§6` has nothing to test sections
against. No decision is named, so the structure has no job. The category is a job title,
which puts him in a queue of ten thousand. The differentiator is adjectives with no
falsifiable content. The proof is a feeling and fails `§5` on its own. That sentence
produces zero design constraints, which is the real test of whether positioning is done.

## Anti-positioning

Write the "we are NOT" list explicitly. This is the half that makes the archetype
falsifiable. An archetype that rules nothing out is a horoscope, and a horoscope
constrains no design decision. Four rows minimum.

| Line | Example |
|---|---|
| Not competing on | Price, delivery speed, breadth of stack |
| Not claiming | Management experience, enterprise scale, formal credentials |
| Not for | Agencies buying commodity front-end hours |
| Not doing | Cute, corporate-safe, tech-startup-blue, dashboard screenshots |

Anti-positioning routes straight into build constraints. "Not corporate-safe" bans
the glassmorphism-and-gradient-mesh default. "Not for enterprise procurement" bans
the logo wall and the trust-badge row. "Not claiming scale" means no vanity metric in
the hero whatever the numbers happen to be. These land in the translation table as
banned styles and banned techniques, and Loop 2 treats them exactly as it treats the
human's explicit do-nots under `§0`. A list that bans nothing the run would plausibly
have done anyway is decoration. Rewrite it until one entry hurts.

## Verbal identity

Extracted from transcript sentences, never invented. This is what makes `§11` do
something beyond removing em dashes.

| Element | How to extract |
|---|---|
| **Lexicon** | 8–15 words and phrases recurring in their own speech. Take the ones with fingerprints: "throughput", "the ward", "shipped it dirty". Ignore common words. |
| **Banned words** | Their allergies plus the standard slop list: passionate, leverage, seamless, cutting-edge, innovative, robust, delve, journey, elevate, unlock, game-changing, transformative. |
| **Sentence rhythm** | Count words per sentence across three transcript paragraphs. Short and declarative, or long and clausal. Copy inherits the measured rhythm. |
| **Opening move** | How they start an answer: straight to the fact, a caveat first, a story first, a question back. The hero and every section intro use this move. |
| **"I don't know"** | Whether they say it flatly, deflect, or turn it into a question. Governs how uncertainty appears in case studies, and whether it appears. |
| **Failure talk** | Whether they name failures unprompted, when asked, or reframe them as learning. Sets whether case studies carry a "what broke" section and how blunt it is. |

Record three verbatim sentences alongside the analysis. Loop 3 writes copy against those
sentences, and the check is whether the subject would say the line out loud. When they
would not, the line gets rewritten however well it reads.

## Category strategy

**Compete in an existing category.** The audience already knows what a staff backend
engineer is, so the entire burden falls on the differentiator. This is the default
and it is fine.

**Name a new category.** The strongest move available, and almost nobody attempts it. A
named category converts a comparison into a definition: rather than ranking against a
queue, the subject becomes the reference implementation of a thing they named. Attempt
it when three conditions hold together.

1. The work genuinely sits between two recognized categories and is described badly by
   either.
2. The evidence supports the whole category, not one project inside it. A category
   with a single data point is a project with an inflated title.
3. The name is plain enough that the audience understands it without a paragraph of
   explanation. If it needs a glossary, it fails at the top of the page.

It is pretension when the existing category describes them accurately and the new name
only inflates it. "Full-stack engineer" becoming "Product Systems Architect" adds an
air of having something to hide. When in doubt, take the existing category and put the
work into the differentiator.

## Proof ladder

Every claim gets ranked before it gets designed around. Ties directly to `§5`.

| Rank | Level | Definition | What the site may do with it |
|---|---|---|---|
| 1 | **Shipped and measurable** | Live or delivered, outcome number traceable to a source | Hero line, headline figure, full case study |
| 2 | **Shipped** | Live or delivered, outcome described without a number | Case study, project card with outcome prose |
| 3 | **Contributed to** | Named role inside a larger effort they did not own | Credit line, role stated precisely, no implied ownership |
| 4 | **Studied** | Trained in it, no shipped instance | Background and context sections only. Never a headline. |
| 5 | **Asserted** | Their claim, nothing corroborates it | Attributed speech in their voice, in quotes, or cut |

Weak links get cut or demoted. They never get dressed up. A rank-4 claim promoted to
the hero by confident phrasing is the exact failure `§5` exists to prevent, and it is
worse here than anywhere else because the hero is what a hiring manager reads.

The ladder also decides slots. Projects earn their place in rank order, and a rank-2
project with a real story beats a rank-4 project with better screenshots. Fewer than
three rank-1 or rank-2 projects is a finding for Gate A, never a gap to fill with fluff.

## The thin portfolio

The ladder above assumes rank-1 and rank-2 work exists. Often it does not. A junior
two years in. A career changer whose evidence sits in a different field. Someone
whose entire output is internal tooling behind a login. Someone senior whose best
work is covered by `§21`. For all four the ladder tops out at rank 3 or lower.

This is a real and common case, not a failed intake. What changes is the strategy.
The honesty does not.

**Lead with trajectory and thinking rather than outcomes.** Someone with no shipped
metrics can still prove how they think, and how they think is exactly what the reader
of a thin portfolio is trying to work out — a hiring manager who already knows the
candidate is early and is deciding whether they are worth an hour. Outcomes are what
a senior portfolio has and a thin one does not. Reasoning is available to both.

| Lead with | What it proves |
|---|---|
| Process, shown at working resolution | Decisions get made rather than defaulted into |
| A decision and the tradeoff it cost | The beat a senior case study runs on, at smaller stakes |
| What they learned from something that failed | Judgment, and the ability to say it out loud |
| Work in progress, with its state stated | Direction and pace |
| A thing built to learn, labeled as such | Curiosity, and honesty about why it exists |
| Contributions to other people's projects | Rank 3, stated precisely: the role, never implied ownership |
| Writing | Thinking, at length, in public, under their own name |

Writing is the densest lane open to a thin portfolio, and when it carries real weight
the site needs somewhere to put it — see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

**Archetype fit shifts too.** Three of the twelve read well with no outcomes behind
them, and three read as costume.

| Archetype | On a thin portfolio |
|---|---|
| **Explorer** | Fits. Trajectory is the story, and moving through territory needs no arrival |
| **Creator** | Fits. Judged by whether the work is good, which is visible without a metric |
| **Innocent** | Fits. A simple thing kept simple. Small scope is the point |
| **Ruler** | Unearned. Claims authority over a system nobody handed them |
| **Sage** | Unearned. Claims to be right before anyone has checked |
| **Hero** | Unearned. Talks in outcomes and deadlines, and there are none yet to talk in |

**Thin is never fixed by inflation.** `§5` applies here with no allowance for career
stage. A rank-4 claim written in rank-1 language is the precise failure that rule
exists to prevent, and a thin portfolio is where the temptation is strongest.

It also does not work. "Architected a scalable microservices platform," from someone
eighteen months in, is detected instantly by the senior engineer it was written for.
They stop reading, and what they remember afterward is the inflation rather than the
inexperience. Padding converts a thin portfolio into a dishonest one, which is a
worse place to be.

Three honest projects with real thinking beat nine padded ones. Count is not the
signal, and a short site that is entirely true is the strongest thing available to
someone early.

## Competitive gap analysis

Loop 1c samples 6–10 portfolios from the subject's actual category. Chart them.

| Peer | Archetype read | Style family | Palette | Structure | Opening move |
|---|---|---|---|---|---|
| peer-01 | Ruler | Swiss | Off-white, near-black | Hero, logo wall, grid, contact | Name plus job title |
| peer-02 | Creator | Bento | Dark, purple accent | Hero, bento, case studies | Animated tagline |

Read the chart for what is missing. The useful output is the empty quadrant. Nine of
ten are dark and centered, so light and asymmetric is open. Every peer opens by naming
a job title, so opening with the work is open. Every peer sorts by recency, so sorting
by consequence is open. The run then does one of two things, in writing:

- **Occupy the gap.** The empty quadrant becomes a design input, feeding the style
  shortlist and the structure decision.
- **Decline it, with a reason.** Sometimes a quadrant is empty because it does not
  work for this audience. Procurement committees do not reward a terminal aesthetic.
  Name the audience constraint that closes it and move on.

Silence is the failure. A gap analysis that produces no decision was a slide.

## The translation table

The most important output of Loop 1d. It goes at the end of `BRIEF.md`, and Loop 2 opens
it and works from it instead of guessing.

| Strategy input | Design constraint it produces | Consumed by |
|---|---|---|
| Primary archetype | Style shortlist of three families, motion character, typographic pull | Loop 2a, Gate B1 |
| Shadow archetype | The collision applied to the primary style. This run's `§3` answer | Loop 2a, `DIRECTION.md` |
| Voice and lexicon | Copy rules: rhythm, banned words, opening move, whether failure gets a section | Loop 3 |
| Audience | Section list and depth. What gets explained, what gets assumed | Loop 2a, Loop 3, `§6` |
| Decision being made | Structure, and the order sections appear in | Loop 2a |
| Positioning | What the hero must accomplish in three seconds, as a testable sentence | Loop 2a, Gate B1 |
| Anti-positioning | Banned styles, banned techniques, banned copy moves | Loop 2a, Loop 2b, Loop 4 |
| Proof ladder | Which projects get a slot, in which order, at what depth | Loop 3 |
| Competitive gap | The occupied quadrant, or the written reason for declining it | Loop 2a |
| Brand color source | The sampled hex and where it came from, per `§8` | Loop 2a |

Fill every row. A blank row means a design decision downstream has no derivation and
gets made on taste, which is the condition this file exists to prevent.

## Failure modes

**The horoscope archetype.** Sage plus Creator plus Explorer, all true of everyone,
nothing ruled out. Test: name three design decisions this archetype forbids. If you
cannot, redo it.

**Positioning that is a slogan.** "Design that solves real problems" differentiates
nothing, because no competitor claims to solve fake problems. Test: write the inverse.
If no working professional would claim the inverse, the sentence is empty.

**Invented verbal identity.** A lexicon assembled from what someone in this field
probably says. It produces copy that sounds like a persona, and the subject reads it
at Gate C and says this is not how I talk. Every lexicon entry cites a timestamp.

**Strategy that never touches a design decision.** The most common failure. `BRIEF.md`
carries an archetype, a positioning statement, and a full verbal identity, and the
site would be identical without any of them. Test: delete the strategy section and ask
which design decisions become unjustifiable. If the answer is none, Loop 1d produced a
document rather than a strategy.
