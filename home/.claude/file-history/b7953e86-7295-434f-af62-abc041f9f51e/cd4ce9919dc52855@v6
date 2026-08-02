# Loop 2 — Design

**Goal:** decide what it looks like and how it renders, and prove both before a
single line of the real site is written.

**Input:** `BRIEF.md`, specifically the translation table.

**Output:** `DIRECTION.md`, one design image per section, one runnable prototype per
technique.

```text
2a DIRECTION ──────► Gate B1 ──────► 2b CRAFT ──────► Gate B2
   palette, type,     concept          technique per     motion +
   2-3 concepts,      picked           section, motion   budget
   image per section                   spec, prototypes  locked
```

---

## 2a — Direction

### Read the translation table first

Archetype pulls a **style shortlist** from [`STYLES.md`](../STYLES.md) — three
families, never one answer. Shadow archetype supplies the collision. Anti-positioning
bans styles outright; honor that absolutely. Positioning states what the hero has to
accomplish in three seconds.

### Palette

Sampled from reality (`§8`) — their logo, their product, their real work. Build out:
one accent from the sample, a substrate, a type scale of neutrals, and a state set.
Work in OKLCH so the gradients have no gray dead zone.

Art-direct **light and dark as two designs**, not one inverted (`CRAFT.md`). Some
styles collapse under naive inversion; `STYLES.md` names which.

### Type

Two families at most, one if the style earns it. Variable where the design drives an
axis. Self-hosted, subset, `font-display: swap`. Check the script renders (`§17`) —
a Persian or Arabic subject needs a face that actually draws it.

### Concepts

Top-tier work, and the conductor does it rather than a worker
([`MODELS.md`](../MODELS.md)). The collision, the opening move, and the thing nobody
expects are what `§1–3` are asking for, and a cheaper model reaches for the category
reflex those rules exist to prevent. Mention the tier once if the session is lower,
then carry on.

Generate **2–3 distinct concepts** (`§4`). Each states:

- The **collision or subversion** — this run's `§3` answer, written as one sentence.
  Which parent carries structure, which carries surface.
- The **opening move** — what happens in the first three seconds
- How **projects are presented** — invent it. Not a card grid by reflex: a flexible
  card layout places each project's attributes in a different spot from the next,
  so a reader comparing them scans back and forth hunting for what moved. A vertical
  list, a table, or a filmstrip holds a predictable position from item to item and
  is the more honest default whenever the projects genuinely are comparable.
- How **navigation** works
- **What happens when something's missing or wrong** — the 404, a failed contact
  submission, an empty blog index if there's one. Same concept as everything else,
  not a generic fallback (`CRAFT.md`)
- The **section list** and order, derived from the audience's decision

Run the category-reflex check on each: if it's guessable from "portfolio for a
[category]" alone, or from category-plus-obvious-twist, throw it out. Note one you
rejected and why, so the human sees the range.

Then check [`../showcase/`](../showcase) for a prior entry sharing this run's
archetype and style family — `peer-analyst`'s search already looked outward; this
looks at what this pipeline itself has already produced. A match does not kill the
concept, it forces the collision to differ from what is already there
([`../SHOWCASE.md`](../SHOWCASE.md)).

### Design images

Before dispatching: one line per section on what it is doing compositionally —
dense or sparse, text-led or image-led, where the eye lands first. This is the
composition brief `section-designer` reads to vary from its neighbors, and it
has to come from the conductor. A worker sees its own section and nothing on
either side of it, so it cannot know what to differ from unless it is told.

Dispatch `section-designer`, **one agent per section**. Each returns one horizontal
image of that section.

Never compress multiple sections into one board. Eight sections means eight images.
A compressed board hides exactly the detail the human needs to judge.

### Breaking the grid on purpose

Uniform grid submission is itself a tell. AI-generated and templated sites
converge on symmetric, evenly-filled layouts because deviating from one requires
a decision, and a default has none — the same reflex that produces the stock
indigo gradient and center-aligned everything (`STYLES.md`'s guardrails).

The test, for every element that deviates from the established grid, alignment,
type scale, or whitespace rhythm:

1. Name the specific rule being broken.
2. Give a one-sentence reason that is not "to look less generic" — emphasis,
   tension, a narrative beat, the collision itself.
3. Confirm the same rule holds everywhere else in the layout except at that one
   point.

A deviation that cannot answer all three reverts to the grid. This applies to
hero, about, and work-index sections — anywhere a visitor arrives to explore.
It does not apply to task-focused UI: a contact form that breaks its own field
alignment for tension is not this technique working, it is a bug.

> ## Gate B1 — human decision
>
> Present the rendered images per concept, the palette with its sampled source, the
> type system, and the collision sentence for each. They pick a concept, or pick
> pieces across concepts. Iterate here — it is far cheaper than iterating in code.

### When B1 rejects

How far back it goes depends on what was rejected. Diagnose that before
regenerating anything.

| What was rejected | Where it goes back to |
|---|---|
| **Execution** — wrong palette in the render, wrong crop, the image did not capture the concept | Regenerate the images with corrected direction. Same concept, same section list, same collision |
| **Concept** — the collision does not land, the opening move is wrong, projects are presented wrong | Back to 2a concept generation. New concepts, not a patch on the rejected one |
| **Strategy** — their reaction reveals the archetype, audience, or positioning was misread | Back to Gate A. Fix `BRIEF.md` first. Designing on a misread brief produces another rejection |

The third row is the one that gets missed. When the human says the images look fine
and still sounds unhappy, the brief is the suspect, not the render.

## 2b — Craft

### Assign techniques

For each section, assign a technique from [`CRAFT.md`](../CRAFT.md) that serves the
approved style. Style decides what's on the table; the technique executes it.

The test for every assignment: **name the thing this technique makes the viewer
understand about the subject.** No answer means remove it (`§7`). Impressive and
irrelevant is a failure.

### Prototype before you design around it

Dispatch `technique-prototyper`, **one agent per technique**. Each one:

1. Researches the technique freely — look up anything, pull any library via CDN
2. Builds a standalone runnable HTML proof
3. Screenshots it, measures frame rate under load
4. Builds all three states: full, designed reduced-motion, no-WebGL fallback

Prototypes live in `runs/<slug>/prototypes/`. A technique that fails here is cut
now, cheaply. The same failure in Loop 4 costs a rebuild.

### Motion spec

Write it down: easing curves, durations, stagger, scroll mapping, what triggers
what. Motion character comes from the archetype — a Ruler moves slowly and
inevitably; an Outlaw moves abruptly. Undocumented motion gets rebuilt three times.

### The performance budget

Declare it now, per `§13`:

- **Shell** — HTML, CSS, fonts, critical JS. Under 100KB. Paints something real
  alone. LCP under 1.5s.
- **Heavy layer** — shaders, 3D, physics. Lazy-loaded after first paint, gated on
  intersection, never in the LCP path. State the number.

A technique that cannot be deferred has to justify its bytes at this gate.

### Write `DIRECTION.md`

Concept and why it won. The collision, and which parent is structural. Palette with
hexes and sampled sources. Type system. Section-by-section technique assignment.
Motion spec. Both budget tiers. **What was invented** — the thing that exists in
this run and no other (`§3`). Prototype results including the failures.

> ## Gate B2 — human decision
>
> Show the prototype screenshots, the motion spec, and the budget. They approve the
> technique set, or cut what doesn't earn its place. This is the last stop before
> real code.

### When B2 rejects

Cut the technique, or swap it for another from [`CRAFT.md`](../CRAFT.md), then
re-prototype. A rejected prototype never gets argued into acceptance, tuned in the
build, or carried forward on the theory that it comes together in integration.

The replacement faces the same check the original faced: name the thing this
technique makes the viewer understand about the subject. Cutting with nothing in its
place is a valid outcome — the section ships in tier 1 and the budget improves.

### A rejection is information about the brief

Both gates. Record what the rejection **revealed** in `DIRECTION.md`, alongside the
new direction: what they reacted against, and what that says about the vision,
audience, or archetype that `BRIEF.md` failed to capture. Recording only the
correction throws away the more valuable half of it. A B1 rejection carries forward
into `DIRECTION.md` when it gets written at the end of 2b.

**Three rejections at the same gate means the brief is wrong, not the execution.**
Stop iterating. Re-open Loop 1d, fix the synthesis, and come back through Gate A.
The fourth attempt at the same gate has never worked.

## Skip costs

| Skipping | Costs |
|---|---|
| 2a design images | Seeing it before it's built. You iterate in code instead: slower, and biased toward whatever got built first |
| Gate B1 | The concept choice. You pick; they see it at Gate C |
| 2b prototypes | Proof the technique works before the design depends on it. Late failures are expensive |
| Gate B2 | Motion review, and the budget goes undeclared |
