# Styles

This file is the visual vocabulary: **what it looks like**. [`CRAFT.md`](./CRAFT.md)
is the technique arsenal: **how you render it**. They are separate on purpose, and
collapsing them is how runs end up templated.

The distinction is sharp because techniques carry no opinion. `backdrop-filter`
builds the layered translucency of liquid glass, and it also builds the flat frosted
panels of a Swiss layout where the blur is the only softness on the page. A noise
shader is film grain in a cinematic grade and paper tooth in a risograph print. A
spring is playful in a claymorphic world and clinical in a blueprint. The style is
the opinion; the technique is a means of getting there.

The order is fixed. **Style is chosen at Gate B1 with the concept**, from the brief,
the archetype, and the vision. **Techniques are assigned in Loop 2b to serve the
style already chosen.** Reaching for a style because you want to use a shader is the
tail wagging the dog, and it shows in the output. Everything below is a starting
position under `§3`. Read [the guardrails](#the-guardrails) before you pick.

---

## Surface and material

**Glassmorphism.** Translucent panels over a substrate worth seeing through to,
legible from the blur behind them, never from a fill. Depth reads as blur radius,
nearest layer blurring hardest, each panel edged with a 1px light-catching border.
**Implies** `backdrop-filter`, z-layering, `color-mix()` borders. **Fails** as gray
rectangles on a flat background, and breaks `§12` under body copy. **Right when** the
background is itself content.

**Liquid glass.** Apple's 2025 material language, where the panel refracts rather
than merely blurs: content bends passing under the edge, specular highlights track
the light, the shape lenses on scroll. Real implementation is an SDF and shader job;
`backdrop-filter` alone gets glassmorphism with a borrowed name. **Implies** WebGL,
an SDF panel, scroll-linked light, a hard `§13` budget. **Fails** as chrome that
buries the work (`§7`). **Right when** the work is material or hardware.

**Neumorphism / soft UI.** Every element extruded from one background hue by a
matched shadow pair, dark and light, cast from a single committed angle. No borders
and almost no color: form is entirely shadow, in one narrow tonal band. It fails
contrast by default and ships only with the fix in
[Style and accessibility](#style-and-accessibility). **Implies** dual `box-shadow`,
one hue. **Fails** as putty with invisible affordances. **Right when** exactly one
object is extruded and the rest is flat.

**Claymorphism.** Inflated rounded volumes with large radii, soft occlusion at the
base, a bright saturated palette, and heavy rounded type. Objects read as pressable
toys with thickness, lifted by a diffuse colored shadow. **Implies** big
`border-radius`, layered colored shadows, spring press. **Fails** as childish, which
sinks a senior portfolio faster than anything here. **Right when** the work is
consumer and the copy stays serious.

**Skeuomorphic revival.** Real material simulation, never nostalgic gloss: paper
with visible fiber, ink bleeding into it, embossed metal with a directional brush,
edges worn where a thumb rests. One material, simulated honestly. **Implies**
generated textures per `§10`, displacement maps, per-material lighting. **Fails** as
2010 iOS pastiche the moment two materials share a surface. **Right when** the work
has a physical antecedent.

**Aerogel / frosted depth.** Milky diffuse layers with no light source, where depth
reads as accumulated haze and nothing has a hard edge. Separation comes from density,
the palette stays desaturated, light bleeds between planes. **Implies** stacked
low-opacity fills, large soft blurs, a fog gradient. **Fails** as washed-out mush
when every layer sits at one density. **Right when** hierarchy rides on type alone.

## Structural

**Swiss / International.** A visible modular grid, one family at a strict scale,
flush-left ragged-right setting, objective photography on grid intersections.
Whitespace is structural, color appears once, every alignment is provable against the
column. **Implies** CSS Grid with named lines, a mathematical scale, one `§8` accent.
**Fails** as an agency template, the most-copied system in design. **Right when**
dense work needs an authoritative frame, with a collision applied.

**Brutalism.** Raw HTML honesty: system fonts, default link blue, visible borders,
unstyled form controls, layout that reveals the DOM instead of disguising it.
**Implies** near-zero CSS, system font stacks, native controls, no motion.
**Fails** as an excuse for laziness, indistinguishable from an unfinished build.
**Right when** credibility comes from substance and refusing to decorate is the
position.

**Neo-brutalism.** Thick black borders, hard offset shadows with no blur, saturated
flat blocks, heavy grotesque type at aggressive sizes. Elements rotate slightly and
overlap without softening; interaction moves the shadow, never fades anything.
**Implies** solid `box-shadow` offsets, 2-4px borders, transform on hover.
**Fails** as Gumroad cosplay, the most saturated style on the web right now.
**Right when** the collision partner supplies the restraint.

**Bento.** A dense grid of unequal self-contained cards sized by importance rather
than content length, uniform radii, consistent gaps, reading as one object at a
glance. **Implies** CSS Grid with spanning areas, container queries, per-card art
direction. **Fails** as a dashboard with nothing to show, and hides narrative because
every card is equal in reading order. **Right when** many small things matter at once.

**Editorial / print.** Magazine mechanics carried honestly onto screen: measured
columns, real hyphenation, drop caps on the baseline grid, pull quotes breaking the
measure, marginalia, running heads and folios. Type does the work; images are plates.
**Implies** `hyphens`, `text-wrap: pretty`, `initial-letter`, a serif with optical
sizes, self-hosted per `§9`. **Fails** past a 75-character measure, or when columns
force scroll-up reading on mobile. **Right when** the case studies are long.

**Swiss-punk / Ray Gun.** The Swiss grid built, then deliberately violated: type
overlapping, rotated, set in conflicting families, letters cropped by the viewport.
Type becomes image and legibility becomes a variable the designer controls.
**Implies** absolute positioning over a grid, `mix-blend-mode`, variable-font
extremes. **Fails** as noise when the grid was never built, since the violation only
reads against visible order. **Right when** the audience reads sophistication.

## Atmospheric

**Cinematic dark.** A single key light with real falloff, deep vignette, grain sized
to the viewport, blacks lifted and tinted. Content sits in pools of light and the
space between them is genuinely dark. **Implies** radial key, grain shader or SVG
turbulence, LUT via `feColorMatrix`, controlled bloom. **Fails** when the grade
crushes body copy below 4.5:1 and grain eats small type. **Right when** the work
benefits from being lit.

**Aurora / mesh gradient.** Large soft color fields drifting across each other with
no visible edges and no repeat. OKLCH interpolation keeps midpoints saturated instead
of gray, and motion is slow enough to be felt without being watched. **Implies**
OKLCH gradients, canvas or WebGL mesh, grain against banding. **Fails** as the
default AI landing page, the most generated look of the last three years.
**Right when** it is a substrate for another style.

**Glow / neon.** A dark substrate with emissive accents that actually bloom, light
spilling past its source and tinting what it lands on. Edges glow from the inside,
shadows take the accent hue, two emissive colors at most. **Implies** layered
`box-shadow` bloom or a real bloom pass, dark tokens, hue-matched shadows.
**Fails** as halation that makes every string of text fringe. **Right when** the
emission points at the work.

**Vaporwave / Y2K.** Chromed type with environment reflection, cyan and magenta
gradient meshes, CRT scanlines and phosphor bleed, grids receding to a horizon,
deliberate JPEG and VHS artifacts. The nostalgia is specific to 1995-2003 hardware
and reads as costume unless committed to fully. **Implies** SVG chrome gradients, a
CRT shader, chromatic aberration, dithering. **Fails** as kitsch that dates the
subject. **Right when** the audience shares the reference.

**Solarpunk.** Organic growth forms and botanical geometry under warm optimistic
light: curves derived from phyllotaxis, never arbitrary blobs, terracotta and sage
and brass, layouts that branch instead of stacking. **Implies** generative SVG
growth, warm gradients, curved layout paths, organic easing. **Fails** as generic
eco-branding with a leaf icon and a green button. **Right when** the work is climate,
agriculture, health, or civic.

## Motion-native

In these four the behavior **is** the aesthetic. A still screenshot cannot represent
them, which makes the `§12` reduced-motion design a first-class deliverable.

**Kinetic.** Nothing is at rest: type in perpetual motion, marquees running at
different rates by depth, letters responding to pointer velocity, composition
recomposing continuously. Stillness is used once, as punctuation. **Implies**
scroll-velocity input, variable-font axis animation, transform-only compositing.
**Fails** as exhausting, and unreadable when the thing in motion is the thing being
read. **Right when** the work is performance or sound.

**Physics-world.** Spring, inertia, mass, and collision are the interaction model.
Elements have weight, throwing them works, they settle rather than snap, and they
occupy space other elements respect. Nothing uses a duration; everything uses a
stiffness. **Implies** a physics loop, spring tokens instead of easing curves, a
valid resting layout. **Fails** as a toy when the physics never resolves into
something readable. **Right when** the play makes a point.

**Scroll-cinema.** The page is a film reel scrubbed by the scrollbar: scroll position
maps to a timeline, sections pin while their contents advance, and the sequence has
shots, cuts, and cadence. **Implies** pinned containers, scrubbed timelines,
`will-change` discipline, a real `§13` budget. **Fails** as hijacked scroll that
fights the user and strands anyone landing mid-page. **Right when** the work has
narrative order and one story to tell.

**Spatial / 3D-world.** The site is a navigable space with camera, depth, and
position. Sections are places, navigation is movement, and the sense of where you are
does the work a menu usually does. **Implies** WebGL or CSS 3D, a camera rig,
level-of-detail, a no-WebGL fallback per `§12`. **Fails** as a maze where nobody
finds the case study, which is `§7` violated structurally. **Right when** a flat page
would misrepresent the work.

## Technical and data

**Terminal.** Monospace throughout on a real fixed cell grid, blinking block cursor,
phosphor color on near-black, scanlines and slight CRT curvature at the edges, output
persisting in scrollback. **Implies** `ch` units, a monospace with box-drawing
coverage, a CRT shader, typed-output timing. **Fails** as a gimmick with a fake
prompt that takes three commands and breaks on the fourth. **Right when** the
terminal is where the subject's work happens.

**Blueprint.** Drawing conventions applied literally: dimension lines with arrowheads
and measurements, section callouts, leader lines to annotations, hatching, a title
block, a consistent line-weight hierarchy. **Implies** SVG line work, precise stroke
tokens, annotation positioning, a drafting typeface. **Fails** as decoration when the
dimensions are fake and measure nothing. **Right when** the callouts annotate real
work.

**Data-brutalist.** Dense tables, sparklines, and charts as the aesthetic itself,
never as supporting evidence. Rules are hairlines, numbers tabular, alignment
decimal, and the interest comes from the density of true information. **Implies**
`font-variant-numeric: tabular-nums`, table semantics, inline SVG charts. **Fails**
the moment the numbers are decorative, which breaks `§5` outright. **Right when**
`EVIDENCE.md` can carry every number on the page.

**Wireframe / vector.** Line art only: no fills, hidden-line removal, contours
describing volume through stroke alone, weight variation carrying depth. **Implies**
SVG or WebGL line rendering, hidden-line computation, stroke-only tokens, draw-on
animation. **Fails** as thin and cold at sizes where strokes vanish. **Right when**
the work is structural and the outline is the honest view.

## Textural

**Risograph.** Two or three spot inks printed in separate passes with visible
misregistration, halftone dots in the shadows, paper grain showing through, and
overprint areas producing a third color neither ink has. **Implies** separated
channels, `mix-blend-mode: multiply`, per-channel offset, a halftone shader, paper
per `§10`. **Fails** as a filter when the misregistration is uniform, since real
registration error drifts. **Right when** the subject prints.

**Xerox / degraded.** Photocopy artifacts as the medium: blown highlights, crushed
blacks, toner scatter at the edges, a slight skew, and generational loss where a copy
of a copy has lost its midtones. **Implies** threshold and dither passes, noise
displacement, per-element skew, a high-contrast duotone. **Fails** as illegible on
body copy instead of on images and headers. **Right when** the work is zine or
archival.

**Collage.** Layered scraps at mixed scale with torn edges, tape and staples, cast
shadows from real height differences, elements rotated off axis. The composition is
assembled, never laid out. **Implies** irregular SVG masks, per-element shadow
and rotation, generated paper and tape, deliberate z-order. **Fails** as chaos with
no reading order, losing `§6` immediately. **Right when** the practice is genuinely
multidisciplinary.

**Ink / sumi.** Brush dynamics as the whole language: strokes with real pressure
variation, wet bleed into fiber, dry-brush breakup at speed, negative space treated
as the subject. One color, one gesture per composition. **Implies** SVG
variable-width paths, bleed via displacement, generated fiber, stroke-order
animation. **Fails** as a stock brush texture, which reads as clip art instantly.
**Right when** restraint is the position.

## Reductive

**Radical minimalism.** Type and space, nothing else: no borders, no cards, no
shadows, no illustration. Hierarchy comes only from size, weight, and distance, and
the whitespace is measured, never left over. **Implies** one family with real
weights, a precise spatial scale, optical alignment, single-property motion.
**Fails** as unmemorable when the copy is weak, since there is nothing else to look
at. **Right when** the writing is strong.

**Monochrome plus one accent.** A single hue's full tonal range carries structure,
and exactly one accent sampled from reality per `§8` appears only where attention
must go. The accent never decorates. **Implies** an OKLCH lightness ramp, one accent
token, usage rules stated in `DIRECTION.md`. **Fails** as forgettable, the most
common way a run looks competent and generic at once. **Right when** it is the
discipline layer under a louder partner.

**ASCII / text-only.** The page is characters: art drawn in a fixed cell grid, layout
built from box-drawing glyphs, images dithered into character density. Nothing is
rendered that could not be pasted into a text file. **Implies** monospace with full
box-drawing coverage, `ch` and `lh` units, semantic HTML underneath per `§12`.
**Fails** as unreadable to screen readers and unusable below 400px. **Right when**
the constraint is the point.

---

## Collision

This is the most important section in the file. A single named style is one search
away from being everyone else's site. The un-templated work lives where two styles
are held in tension, because the constraints of one force the other to behave in ways
its own tradition never asks of it.

| Collision | What it produces that neither parent has |
|---|---|
| **Liquid glass over a blueprint substrate** | A technical drawing is flat and authoritative by convention. Put a refractive lens over it and the dimension lines bend as you scroll, so precision becomes something you look *through*. The drawing gains depth without losing its claim to accuracy. |
| **Risograph texture on a Swiss grid** | The grid asserts machine order; the misregistration asserts a hand and a press. Together they read as a printed object instead of a rendered page, and the grid stops looking like every other agency site because it is visibly ink. |
| **Terminal chrome around a physics world** | The monospace frame promises determinism and fixed cells. The contents obey springs and collide. A frame that cannot bend around contents that will not sit still is the whole idea, and neither style contains it alone. |
| **Editorial print with a spatial 3D reveal** | Columns, drop caps, marginalia, then the page turns out to have depth and the columns are planes standing in space. Reading becomes navigation and the reader's position in the document becomes literal. |
| **Brutalist structure with a cinematic grade** | Raw exposed structure and system fonts, lit with a single key and a vignette. The honesty stops reading as unfinished and starts reading as staged, a claim neither raw HTML nor a film grade makes on its own. |
| **Neumorphism inside radical minimalism** | The style that normally fails by covering a page in soft mush is reduced to one extruded object in an empty field. It becomes sculptural, and the contrast failure disappears because nothing has to be read off it. |
| **Ink gesture across data-brutalism** | Dense tabular numbers with one brush stroke laid over them. The gesture asserts that a person read these numbers and had a view, which a table cannot say and a painting cannot evidence. |
| **Vaporwave chrome under Swiss typography** | Y2K materials disciplined by an unforgiving grid and one type family. The nostalgia survives, the kitsch collapse does not, because the layout refuses to join in. |

**Picking a collision that serves the brief.** One parent comes from the archetype and
positioning in `BRAND.md`. The other comes from something materially true about the
subject: their medium, their tools, the physical object their work becomes, the room
they work in. Both must be defensible in one sentence each against `BRIEF.md`. If
only one is defensible, you have a style plus a decoration, and the decoration reads
as arbitrary to everyone who sees it.

**The load-bearing rule:** one parent carries structure, the other carries surface.
Two structural parents fight over the grid and produce mush. Two surface parents
produce noise with no bones. Name which parent is which in `DIRECTION.md` before you
build anything.

## Subversion

The second route out of template. Take one style and break exactly one of its own
rules, and the rule you break has to be the one the style is most identified by.
Break two and you have a different style executed badly.

- **Swiss where one element never obeys the grid.** A single photographic plate hangs
  past the margin in every section, at the same overhang each time. The grid is
  provable everywhere else, which is what makes the overhang read as a decision.
- **Brutalism with immaculate type.** Everything raw, default, unstyled, except the
  typography, which gets real optical sizing, hyphenation, and hung punctuation. The
  refusal to decorate becomes selective and therefore intentional.
- **Cinematic dark that turns the lights on once.** One section drops the grade
  entirely and goes flat daylight white. The return to darkness afterwards hits
  harder than the darkness ever did alone.
- **Glassmorphism with no blur.** The panels refract and catch light at their edges
  and nothing behind them softens. Legibility improves, `§12` gets easier, and the
  material reads as harder and more precise than glass usually does.
- **Editorial print where the margin is the main column.** Marginalia carries the
  primary narrative and the body text becomes the aside. The reader learns a new
  hierarchy in about four seconds and remembers it.
- **Terminal with one full-color photograph.** Everything is phosphor and monospace
  except a single image at full fidelity. It becomes the most important object on the
  site with no layout emphasis at all.

State the broken rule explicitly in `DIRECTION.md`. A subversion nobody can name is
indistinguishable from an inconsistency.

## The guardrails

This section is `§3` enforced.

- **The vocabulary names a starting position, never a destination.** Ship a named
  style unmodified and the run failed. No entry above is a finished answer.
- **Every run states in `DIRECTION.md` what it did to the style that nobody else
  does** — the collision, subversion, or invention applied, in one sentence a
  stranger could check the site against.
- **The vision beats the style.** If the vision or `BRIEF.md` says "quiet, like a
  printed book," liquid glass is off the table regardless of how good the prototype
  looks. A prototype is not an argument against the intake from `§0`.
- **The archetype from `BRAND.md` pulls a shortlist, never a single answer.** It
  narrows the field to three or four candidates. Treating it as a lookup table is how
  every Sage becomes Swiss and every Creator becomes neo-brutalist.
- **Anti-positioning from `BRAND.md` bans styles outright.** If the strategy says
  "never look like a crypto site," glow-neon and chrome are gone. Honor it as
  absolutely as the `§0` do-nots.
- **The list is open.** Invent one, name it, describe it in the format above, and add
  it to the run. An invented style with a real name and stated mechanics beats the
  best-executed entry on this page, because nobody can pattern-match it.

## Style and accessibility

`§12` is **[HARD]**. These styles fight it hardest, and each ships with its fix or
does not ship.

| Style | What it fights | The fix that ships |
|---|---|---|
| **Neumorphism** | Form is shadow on one hue, so nothing has a contrast ratio | Extrusion is for containers only. Every label, value, and control state gets a real foreground token at ≥4.5:1. Focus is a hard visible ring, never a deeper shadow. |
| **Glassmorphism / liquid glass** | Text contrast changes with whatever scrolls behind it | An opaque or near-opaque scrim behind every text run, measured against the *worst* frame of the moving substrate, never a screenshot. |
| **Cinematic dark** | Vignette, grade, and grain push small type below threshold | Measure contrast on the rendered pixels after grade and grain, not on the tokens. Body copy stays out of the vignette falloff. Grain opacity drops on text layers. |
| **Kinetic / physics / scroll-cinema** | Motion is the design, so removing motion removes the site | An art-directed still per `§12`: a composed frame with type at rest that someone designed. Scroll-cinema degrades to a paginated document, same content, same order. |
| **Spatial / 3D-world** | Navigation depends on a camera and a GPU | Keyboard traversal between named places, a text route to every section, and a no-WebGL fallback that is a real page, never an apology. |
| **Terminal** | Scanlines and CRT curvature reduce legibility and can trigger | Curvature and scanline opacity behind `prefers-reduced-motion` plus a visible toggle. Body text renders on the flat layer above the effect. |
| **ASCII / text-only** | Screen readers read the art as character soup | `aria-hidden` on the art, `role="img"` with a written alt on the block, and real semantic HTML carrying the content underneath. |
| **Glow-neon / vaporwave** | Saturated emission on dark causes halation and fringing | Glow applies to non-text elements only. Text uses a desaturated stop of the same hue at full contrast. Chromatic aberration never touches a glyph. |
| **Data-brutalist** | Density defeats zoom and reflow | Real table semantics with scoped headers, horizontal scroll containers that are keyboard reachable, and a stated minimum readable width. |

## Light and dark as two designs

Per [`CRAFT.md`](./CRAFT.md)'s art-directed modes, a style often needs a genuinely
different treatment in each mode. Never `filter: invert()`. Choose per-mode ink,
substrate, shadow direction, and accent chroma deliberately. These break under naive
inversion:

- **Neumorphism.** Inverting the shadow pair puts the light source underneath, which
  no physical object does. Keep the light direction identical in both modes and
  change only the surface hue and the shadow spread.
- **Glassmorphism.** Blur reads as depth on dark and as haze on light. Light mode
  needs more opacity, a heavier border, and less blur to say the same thing.
- **Cinematic dark.** There is no light version of a lit set. Light mode is a second
  art direction: a printed still with the grade baked in as a duotone, no vignette,
  no bloom.
- **Glow / neon.** Emission requires darkness. In light mode the glow becomes ink
  saturation and weight, and the accent moves from emissive to dense.
- **Risograph.** Paper is the substrate. Dark mode is a black-paper print run with
  inks chosen for it, and the halftone dot inverts to open rather than filled.
- **Blueprint.** White-on-blue and blue-on-white are both real print conventions.
  Switch between them on purpose, with line weights retuned, since hairlines that
  read on dark disappear on white.
- **Aurora / mesh.** OKLCH stops that stay saturated on dark go chalky on light. Each
  mode needs its own stop list, never a lightness shift.

Declare in `DIRECTION.md` whether the two modes are one design in two palettes or two
art directions. If the chosen style appears above, the answer is two art directions,
and both get built and screenshotted under `§14`.
