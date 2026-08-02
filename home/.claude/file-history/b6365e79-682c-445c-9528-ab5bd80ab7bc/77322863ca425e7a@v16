# Craft

[`STYLES.md`](./STYLES.md) is **what it looks like**. This file is **how you
render it**.

The separation is load-bearing. A style is a destination: a palette, a type
system, a spatial logic, a mood. A technique is the means of arriving: a shader,
a filter, a timeline, a solver. One style is reachable through a dozen
techniques, one technique serves a dozen unrelated styles. Confuse the two and
you get decoration chosen before intent, which is how a run ends up looking like
every other WebGL portfolio.

The order is fixed. The style is chosen at **Gate B1**. Techniques are assigned
**per section** in **Loop 2b (Craft)** to serve that style, each one proven in a
standalone runnable prototype before any section is designed to depend on it.

---

## The mandate

Advanced visual technique is the point. This pipeline exists to produce work
that could not have come out of a template, and the technique layer is where
that becomes visible in the first three seconds.

Pull from whatever best showcases capability. Free rein to look up how to use
any of it: the papers, the shadertoy, the library docs, someone's blog post from
2013. Free rein to pull open-source libraries from a CDN while prototyping.
Everything gets vendored, committed, and self-hosted before ship under `§9`.

**The list below is a starting position, not a boundary.** Nothing here is
required and nothing here is exhaustive. If the right answer for this subject is
a technique with no name yet, build that instead. You have total creative
freedom to design in whatever way best illustrates capability, bounded only by
`§7` (the work is the hero), `§12` (three states) and `§13` (the two tiers).

---

## The arsenal

### Rendering and GPU

The heavy layer. All of it is tier two under `§13`, none of it in the LCP path.

| Technique | What it is | Where it earns its place |
|---|---|---|
| Raymarching + SDFs | Geometry defined as a distance function, marched per pixel | Impossible forms, infinite repetition, soft shadows and ambient occlusion for free. A hero that could not be modeled |
| Domain warping (fbm) | Noise fed into the coordinates of more noise | Organic movement that never loops visibly. Clouds, ink, marble, smoke, atmospheric backgrounds |
| Metaballs / marching squares | Implicit blobs meeting and merging on a field | Liquid identity, merging nav states, anything that should feel alive rather than placed |
| Reaction-diffusion | Two chemicals competing on a grid, Gray-Scott | Growth over time. Patterns that develop as the visitor watches. Strong for biotech, research, and process narratives |
| Cellular automata | Grid state stepping under local rules | Emergent texture from near-zero bytes. Good for systems, infrastructure, and generative-art subjects |
| Voronoi / Delaunay | Space partitioned by proximity to seed points | Shattering, crystalline structure, cracked surfaces, map-like division of a portfolio grid |
| Caustics | Refracted light patterns on a surface | Water, glass, liquid depth. Sells a scene as physical rather than drawn |
| Screen-space reflections | Reflections resolved from the depth buffer | Wet floors, polished surfaces, product-grade renders without cubemaps |
| Feedback loops (ping-pong FBO) | Rendering into a buffer that reads its own previous frame | Trails, decay, persistence, echoes. The cheapest route to a signature look |
| GPGPU particle systems | Particle state stored in textures, stepped in a shader | Millions of points at 60fps. Data made physical, dissolves, formations |
| Curl-noise flow fields | Divergence-free noise driving velocity | Motion that reads as fluid without a fluid solver. Smoke, wind, drift |
| Instanced geometry at 10k+ | One mesh, many transforms, one draw call | Density as a statement. Fields, crowds, repetition at a scale that reads as effort |
| Marching cubes / point clouds | Volumes turned into surfaces, or scans left as points | Scanned or reconstructed subject matter. Reads as data rather than illustration |
| MSDF text in WebGL | Signed-distance glyph atlases | Type that lives inside the 3D scene at any scale, warped, lit, and still crisp |
| WebGPU compute + WebGL fallback | Compute shaders where available, degrade to WebGL | Simulation budgets WebGL cannot reach. Only with the fallback actually built |
| Volumetric / god rays | Light scattering through a participating medium | Atmosphere and depth. Turns a flat scene into a space with air in it |
| Procedural terrain / noise geometry | Mesh displaced by noise fields | Landscape, topography, mapped data as physical relief |

### Post-processing and treatment

The pass after the render. Cheap relative to what they buy, and where `§10` gets
satisfied: generated imagery becomes yours by what you do to it in the browser.

| Technique | What it is | Where it earns its place |
|---|---|---|
| Bloom | Bright regions bleeding into their neighbors | Makes emissive things read as light rather than pale color. Almost always the first pass worth adding |
| Chromatic aberration | Channel separation at the edges | Lens realism at rest, energy under motion. Scale it with scroll velocity |
| Film grain | Animated noise over the composite | Kills banding, unifies CSS and canvas layers, adds material to flat gradients |
| Displacement | One texture pushing another's UVs | Transitions, hover distortion, heat and liquid. The workhorse of interactive treatment |
| Film LUT grading | A 3D color lookup applied to the final frame | One pass that makes every layer share a single grade. The difference between colored and art-directed |
| Ordered dithering / halftone / posterize | Quantized tone with a structured pattern | Print, plotter, newsprint, early-computing references. Also compresses beautifully |
| ASCII / character shaders | Luminance mapped to a glyph atlas | Technical and terminal-native subjects. High risk of cliche, so only with a reason |
| Anaglyph / lenticular | Offset stereo channels | Dimensional effects without a headset. Best in small doses on a single moment |
| Depth-map parallax | Generated image plus generated depth, displaced on pointer | Turns one flat generated frame into a scene with volume. High payoff per byte |
| Vignette | Falloff toward the frame edge | Directs the eye. Invisible when correct and obvious when missing |
| Motion blur | Accumulated or velocity-buffer smear | Speed that reads as speed. Essential when things move fast enough to strobe |
| Edge detection / sobel | Gradient magnitude as an outline | Blueprint, x-ray, and diagram registers. Pairs well with posterize |

### CSS and SVG native

Zero dependencies, tier one, consistently underused. Reach here first. A
technique that ships in the shell costs nothing against the heavy budget.

| Technique | What it is | Where it earns its place |
|---|---|---|
| SVG filters | `feTurbulence`, `feDisplacementMap`, `feColorMatrix` | Procedural noise, warping, and duotone on live DOM. Text and images, no canvas needed |
| The gooey filter | `feGaussianBlur` into `feColorMatrix` contrast | Metaball merging on real HTML elements. Nav items that fuse, cursors that stretch |
| Masks | Alpha and luminance masking | Reveals, scroll-tied wipes, text that windows onto media |
| Clip-paths | Geometric and path-based clipping | Non-rectangular layout. Animatable, and the fastest exit from the card grid |
| `mix-blend-mode` | Compositing between stacked layers | Inverting cursors, type that reacts to what passes behind it, layered color that cannot be faked with opacity |
| `backdrop-filter` | Filtering what sits behind an element | Real depth in sticky UI. Blur, saturate, and grade the background layer |
| `@property` | Typed, animatable custom properties | Gradients, angles, and colors that actually interpolate. Unlocks CSS-only effects that used to need JS |
| `animation-timeline` | Native scroll-driven animation | Scroll effects off the main thread with no library. Check support, then fall back to `ScrollTrigger` |
| Container queries | Components responding to their own box | Real art direction per component rather than per viewport. The correct tool for a project card that lives in three contexts |
| CSS anchor positioning | Elements tethered to other elements | Annotations, tooltips, and marginalia that hold their relationship without JS measurement |
| OKLCH gradients | Perceptual color space interpolation | Gradients with no gray dead zone in the middle. Free by default in CSS Color 4, which interpolates in Oklab unless an endpoint uses legacy sRGB syntax — `hex`, `rgb()`, `hsl()`. Write at least one endpoint as `oklch()` or `color(srgb …)` or the browser silently falls back to muddy sRGB mixing |
| Morphing SVG paths | Interpolation between path definitions | Logos that transform, section markers that become something else |
| Houdini paint worklets | Custom paint in a background image | Procedural texture inside CSS layout. Support is narrow, so always with a static fallback |
| Conic / repeating gradients | Gradient functions used as pattern | Texture and moire at zero cost. Halftones, guilloche, radial rhythm |
| `text-wrap: balance` / `pretty` | Native line-break optimization | Headlines that break where a designer would break them. One declaration |
| Scrollbar styling | `scrollbar-color`, `scrollbar-width`, `::-webkit-scrollbar*` | Consumes the token accent and surface, never the browser default gray. Match the style's character — thin and overlay for something quiet, thick and square for a terminal or data-brutalist run. Never `scrollbar-width: none` — hiding it removes an affordance, the same mistake as hiding a skip link with `display: none` |
| `::selection` | Background and text color for highlighted text | The accent token, checked at the same ≥4.5:1 the rest of the page holds. The default browser blue is the tell that nobody thought about it |

### Information design

Zero dependencies, same as the group above. This is not chart styling — it is which
channel carries the value, decided before a single pixel renders.

| Technique | What it is | Where it earns its place |
|---|---|---|
| Position-first encoding | The value sits on a shared scale as a position, not as a length, angle, area, or color alone | Position judgments run 1.4–2.5× more accurate than length and 1.96× more accurate than angle, with 5.3–7.3× fewer catastrophic misreads (Cleveland & McGill). Any stat block, comparison table, or before/after figure |
| Perceptually-uniform color scales | Sequential scales built lightness-dominant, dark reading as more. Diverging scales mark their break with both hue and lightness together. Qualitative scales hold saturation and lightness near-constant and vary hue alone | ColorBrewer's construction grammar. A scale built this way survives greyscale and holds together for colorblind readers by construction. Caps near 7–9 classes before further division reads as noise |
| No rainbow, ever | Jet and rainbow-family colormaps stay off the table regardless of the palette elsewhere on the page | A bright mid-range band reads as a false peak — measured brighter than the true data maximum by a wide margin. The distortion hits every reader, not only colorblind ones |

### Motion and input

Motion is where a portfolio proves the person can control time. Every entry here
is bound by `§12`: a designed reduced-motion state ships with it.

| Technique | What it is | Where it earns its place |
|---|---|---|
| Scrubbed scroll timelines | Progress tied to scroll position | Scroll as a scrub head. The visitor controls the story instead of watching it |
| View Transitions API | Native cross-document and same-document morphs. Cross-document needs `@view-transition { navigation: auto; }` on both pages, same-origin only, and browsers without support just ignore the unknown at-rule — safe with zero fallback code | Continuity between pages. A project thumbnail that becomes the case study hero, because the browser keeps the new state live rather than snapshotting it, so anything still running (a playing video) keeps running through the transition |
| Custom cursors | The pointer replaced or augmented | Signals a designed environment within one second. Costs almost nothing |
| Magnetic elements | Targets attracted to the pointer within a radius | Interactive surfaces that feel weighted. Best on a few elements only |
| Spring and inertia physics | Motion resolved by simulation rather than easing | Motion that responds to how the input arrived. Nothing else feels this alive |
| Cursor-as-light-source masks | The pointer driving a mask or light position | Reveals, spotlights, and darkness the visitor navigates by hand |
| Per-glyph 3D transforms | Individual characters in 3D space | Headlines that assemble, rotate, and settle. High effort, high recall |
| Kinetic typography | Type as the animated subject | When the words are the work. Writers, brand strategists, and anyone verbal |
| Variable fonts on all axes | Scroll or cursor driving every available axis | Optical size, slant, width, grade, and custom axes. **Weight alone is the amateur signal.** Read the font's axis list and use what is there |
| Character and text animation | Split, stagger, and sequence at glyph or word level | Entrances with rhythm. Splitting is the enabler for most of this group |
| Audio-reactive via Web Audio | Analyser output driving visual parameters | Musicians, sound designers, and anything with an audio dimension. Opt-in only |
| Scroll-velocity distortion | Speed of scroll feeding a shader or filter | The site responds to how fast someone moves. Subtle, and immediately felt |
| Pointer-tilt / device-orientation | Gyroscope or pointer position driving parallax | Depth on mobile where there is no hover. Always with a permission-aware fallback |
| Haptics | Vibration on supported devices | Confirmation you feel. Sparingly, and never on scroll |

### Whole-page

Decisions that apply to the whole site. Made once, early, and they set the
ceiling for everything else.

| Technique | What it is | Where it earns its place |
|---|---|---|
| A designed preloader | The first designed moment, composed and art-directed | It is not a spinner. It earns its seconds by being worth watching, and it buys the heavy layer time to arrive. If it has nothing to say, ship no preloader at all |
| Art-directed dark and light | Two designs, each composed on its own terms | An inverted palette is a settings toggle. Two art directions is a portfolio. Different imagery, grade, and contrast per mode |
| Real depth and parallax | Layers with genuine spatial separation | Space that continues behind the content. The cheapest way to stop looking like a document |
| Sound design | Considered audio on interaction and ambience | Opt-in, never autoplay, always with a visible mute. When it fits, nobody else did it |
| Procedural texture synthesis | Surface generated rather than downloaded | Grain, paper, fabric, and noise at zero request cost, tuned exactly to the palette |
| Generated-then-treated imagery | Image tool output run through in-browser treatment | `§10`. Duotone, displacement, dithering, or grain applied in the browser. Raw output never reaches the page |
| Generated illustration | One consistent line weight, palette, and construction logic applied to every drawn mark | The counterpart to generated-then-treated imagery for a subject where photorealism is wrong. Also how a signature icon gets made when a library glyph would not carry the identity, per `§10` |
| The absence states | The 404, the empty blog index, the failed contact submission — pages nobody plans to design | The single likeliest place a visitor meets the generic template underneath everything, because it is the page nobody thought to design. Built from the same collision and concept as the rest of the site, never a framework default |

**One drawn thing and five drawn things need the same hand.** A single
illustrated icon reads as intentional. Five illustrated icons in five different
stroke weights read as clip art assembled under deadline. Pick the construction
rule once — stroke weight, corner treatment, how a shadow falls, how many
colors — state it in `DIRECTION.md`, and hold it across every mark the run
draws, icon or scene alike.

### Typographic craft

This group is unglamorous. It is also what separates good from expensive. Nobody
compliments the hanging punctuation. Everybody registers its absence as an
unnamed cheapness. Run this pass on every project, last, after the real copy
from Loop 3 is in place.

| Technique | What it is | Where it earns its place |
|---|---|---|
| Optical alignment | Correcting for what the eye sees over what the box measures | Quotes, bullets, and large type that look misaligned when they are mathematically correct |
| Real kerning pairs | Manual correction on display-size pairs | Headlines. `font-kerning` handles body text and fails on the pairs people actually look at |
| Ligatures | Contextual and discretionary glyph substitution | Editorial and serif registers. Check `dlig` and `swsh` on the chosen face and use them deliberately |
| Optical sizing | `opsz` axis matched to rendered size | Display cuts at display sizes, text cuts at text sizes. One property, visible difference |
| Hanging punctuation | Quotes and hyphens set outside the measure | Pull quotes and lists with a clean left edge |
| Baseline grid | A shared vertical rhythm across all type | Sections that feel composed rather than stacked. Enforced with a spacing scale, verified with an overlay |
| Fluid type with `clamp()` | Type scaling continuously between bounds | One scale that works from 320px to 2560px. Set a real ratio, not arbitrary numbers |
| Hyphenation and justification | `hyphens`, `hyphenate-limit-chars`, language attributes | Justified text without rivers. Requires `lang` set correctly, which `§17` requires anyway |
| Testimonial attribution | Name and role set distinctly from the quote itself — a different weight, size, or family register | The credibility signal is often the role as much as the name; give both room rather than shrinking one to fit |

**The giant decorative quote mark is a reflex, not a decision.** An oversized
stylized `"` floating beside the text is one of the most common testimonial
patterns on the web, and it competes with the words for the attention `§7`
says the work should have. Real typographic quotes — the `quotes` CSS
property, a genuine `<blockquote>`/`<q>` — do the job invisibly. Where the
quote lives is already decided: `loops/03-copy.md` says beside the claim it
corroborates, and how that renders follows the collision already chosen —
marginalia for an Editorial/print run, a plain inline break for anything
quieter.

---

## Component motion

How the patterns nearly every run eventually needs — a panel, a collapse, an
overlay, a confirmation — actually move, once `§12`'s three states are handled
elsewhere.

| Technique | What it is | Where it earns its place |
|---|---|---|
| Drawer and sheet motion | Slide on `transform` matched to the anchored edge, backdrop opacity in tandem | A draggable sheet drops the duration token for spring and inertia physics, so it responds to release velocity instead of animating on rails |
| Accordion and disclosure height | `grid-template-rows: 0fr` to `1fr` on the wrapper, or `interpolate-size: allow-keywords` where supported | Real height animation with no `max-height` guess and no JS `scrollHeight` measurement. Native `<details>` gets `::details-content` instead of a hand-built accordion |
| Modal entrance and exit | Scale and fade together, never one alone | Fade alone reads flat, scale alone reads like a bug. Motion character still comes from the archetype; the focus contract in [`loops/04-build.md`](./loops/04-build.md) governs regardless |
| Toast and notification motion | Slide plus fade from one fixed stacking edge, never blocking, never trapping focus | The inverse contract from a modal. `aria-live="polite"` for routine confirmations, `role="alert"` only to interrupt |
| Lightbox navigation | Next/prev as real, independently-labeled buttons, not a bare arrow-key handler | ARIA's carousel pattern deliberately keeps navigation on labeled buttons rather than a custom keybinding, so any input method that can activate a button can advance the image |

### Opening and closing a sheet

Scroll-lock the body while it's open, or the page behind it creeps as someone
scrolls the sheet itself.

Open and close are allowed to run asymmetric. `--p-ease-entry` arriving,
`--p-ease-in-out` — faster — leaving: a sheet that closes as slowly as it
opened reads like it's resisting dismissal.

A draggable sheet drops duration and easing tokens entirely for spring and
inertia physics. A fast flick dismisses, a slow release rubber-bands back to
its snap point. Multiple snap points — peek, half, full — are one spring
settling at a different target each time, never three separate CSS
transitions stapled together.

### Sequencing multiple toasts

One fixed stacking edge for the whole run, never chosen per toast.

A new toast pushes the stack. An old one leaving animates the gap closed
rather than letting the ones above it snap into place.

The dismiss timer pauses on hover and on focus. A toast timing out while
someone is mid-read or reaching for its action button is the exact failure
this rule exists to prevent.

The live region exists in the DOM from first paint, with content injected
into it rather than the region itself arriving at toast time — some screen
readers miss an `aria-live` region that shows up after the page has already
loaded.

### Navigating a lightbox

Next and previous are real buttons, each with its own accessible label —
"Next image," never a bare chevron with no name — using the button element's
own keyboard semantics. ARIA's carousel pattern is explicit about this: it
does not prescribe arrow keys for advancing, and activating next or previous
should not move focus, so a visitor can repeat the action as many times as
they want without re-finding it in the tab order. Wiring the arrow keys on
top as a convenience is fine. The buttons are the part that has to work
regardless.

`Escape` closes the lightbox, the same as any dismissible overlay.

Preload the adjacent image the moment the current one is showing, so the
common case of clicking next never shows a loading state at all. What a
lightbox does when the network is slow enough that preloading loses the race
is the same open question as loading states generally — not solved here.

---

## Prototype before you design around it

This is the rule of Loop 2b. A technique is not available to the design until it
has been proven.

1. **Research it.** Look up how it actually works. Read the reference
   implementation. Do not reason about a shader from memory.
2. **Build it standalone.** One self-contained runnable HTML file in
   `runs/<slug>/prototypes/`, opening in a browser with no build step. Real
   content where it matters: the actual typeface, palette, and project image.
3. **Screenshot it.** Look at it with your eyes per `§14`. A prototype that was
   never viewed was never tested.
4. **Check frame rate.** Measure it. Record the number, viewport, and machine.
5. **Record the verdict.** Passed, failed, or passed with constraints, in
   `DIRECTION.md` alongside the byte cost.

A technique that fails prototyping does not reach Gate B2. It does not get
proposed, promised, or built anyway on the theory that it comes together in
integration. Failing here costs one file and twenty minutes. Failing in Loop 4
costs the section, the layout designed around it, and the copy written to fit.
That asymmetry is the reason this loop exists.

---

## The two-tier performance budget

`§13` in practice. Two tiers, and the boundary between them is not negotiable.

| | Tier 1: Shell | Tier 2: Heavy |
|---|---|---|
| Budget | Under 100KB total | Declared per run at Gate B2 |
| Contains | HTML, critical CSS, subset fonts, minimal JS, everything in **CSS and SVG native** | Everything in **Rendering and GPU** and **Post-processing**, physics solvers, generated imagery |
| Must | Paint something real alone | Load after first paint |
| LCP | Under 1.5s | Never in the LCP path |
| If it fails | The run fails | The site still works |

A gradient hero, an SVG filter, a clip-path reveal, and a `@property` animation
all sit in tier 1 and cost close to nothing.

### Motion that doesn't cost layout shift

LCP is not the only budget in this section — CLS is a Core Web Vital too, and it is
failed by the animation choices this file spends the most time recommending.

Compositor-thread properties — `transform` (translate, scale, rotate, skew) and
`opacity` — never trigger a layout shift, by definition. Animating `top`, `left`,
`width`, `height`, or `box-shadow` does, every time, on every frame. The fix is
never "animate it more carefully"; it is animating a different property. A hover
lift moves on `transform: translateY()`, never on `top`. A glow grows on a
pseudo-element's `opacity`, never on `box-shadow` spread.

### Deferring a WebGL scene

1. Ship a **static poster** in the shell. A gradient, an SVG, or a treated still
   from the scene itself, composed and art-directed. It is what the LCP measures.
2. Load the scene module dynamically after first paint. `import()` behind
   `requestIdleCallback`, or behind the intersection observer below.
3. Cross-fade the canvas over the poster when the first frame is genuinely ready,
   rather than when the module resolves.
4. If the load fails, the poster stays. That is the `§12` fallback already in
   place, at no extra cost.

### Intersection-observer gating

Nothing below the fold initializes before it is near the viewport. Nothing
off-screen keeps running.

- Instantiate on intersection with a `rootMargin` of roughly one viewport.
- Stop the render loop when the canvas leaves the viewport. Restart on re-entry.
- Stop on `visibilitychange` when the tab is hidden.
- Cap the pixel ratio at `Math.min(devicePixelRatio, 2)`, lower on large canvases.

One unthrottled always-on render loop drains a laptop battery and undoes every
other performance decision in the run.

**A technique that cannot be deferred has to justify its bytes.** In the shell
it competes directly against the fonts and the copy, and it wins only by being
the thing the site is about. Usually the honest answer is the tier-1 technique
that gets 80% of the effect for 2% of the weight. That group is large and listed
above.

---

## Every technique ships three states

`§12`, non-negotiable, no exceptions at any gate. A technique with one state is
unfinished, and unfinished is not shippable.

| State | What ships | What it is for |
|---|---|---|
| **Full** | The technique as designed | Capable hardware, motion allowed |
| **Reduced motion** | A **designed** still frame | `prefers-reduced-motion: reduce`. Composition and grade intact |
| **No GPU** | A no-WebGL, no-canvas rendering | Context loss, old GPUs, blocked or software-rendered contexts |

### The reduced-motion state is a design deliverable

`animation: none` on a layout that assumed motion produces a broken page.
Elements sit at `opacity: 0`, sequences never complete, and the person who gets
motion sick gets a blank screen.

The reduced state is a frame someone art-directed. Pick the moment in the
animation that reads best as a still, compose it, grade it, ship that. A visitor
who never saw the full version should not know anything is missing. Honor the
preference at both layers: the CSS media query, and
`matchMedia('(prefers-reduced-motion: reduce)')` for JS and shader work, with a
listener so a mid-session change is respected.

### Context loss

`webglcontextlost` fires on tab switches, driver resets, GPU pressure, and
memory reclaim on mobile. It is a normal event, not an edge case.

- Listen for `webglcontextlost` and call `preventDefault()` on it.
- Show the fallback immediately. The static poster from the deferral pattern is
  already the right thing.
- Handle `webglcontextrestored` by rebuilding resources, or leave the fallback in
  place. Both are valid. Silently showing a black rectangle is not.
- Never let the render loop keep calling into a lost context.

### Feature detection

Detect capability, never user agent.

- WebGL2: attempt `getContext('webgl2')`, then `'webgl'`, branch on null.
- WebGPU: check `navigator.gpu` and await `requestAdapter()`. A present
  `navigator.gpu` with a null adapter is a real case.
- CSS: `@supports` for `backdrop-filter`, `animation-timeline`, anchor
  positioning, and anything else with partial support. Author the fallback first
  and let `@supports` upgrade it.
- Skip tier 2 entirely when `navigator.connection.saveData` is set.

### Testing all three

All three get verified before Gate C, each with a screenshot in the run report.

| State | How to test |
|---|---|
| Full | Normal load, screenshot at mobile, tablet, desktop per `§14` |
| Reduced motion | OS-level setting, or DevTools rendering emulation |
| No GPU | Force it. Call `loseContext()` from the `WEBGL_lose_context` extension, or disable hardware acceleration and reload |

---

## Libraries

Free rein while prototyping. Pull any of these from a CDN and move fast.

| Library | What it is for | Rough weight |
|---|---|---|
| three.js | The general-purpose 3D engine. Scene graph, loaders, materials, post-processing | ~600KB min, ~150KB tree-shaken |
| ogl | Minimal WebGL. Same primitives, far less surface | ~40KB |
| GSAP + ScrollTrigger | Timelines, easing, and scroll orchestration. Still the most reliable sequencer | ~70KB combined |
| Lenis | Smooth scroll that keeps native scroll semantics | ~10KB |
| Motion | Spring-first web animation on the WAAPI | ~20KB, ~5KB mini |
| Matter.js | 2D rigid-body physics | ~90KB |
| Rapier | Rust and WASM physics, 2D and 3D, fast | ~500KB WASM |
| p5 | Creative-coding sketches, fastest path to a generative idea | ~900KB |
| regl | Functional WebGL. Excellent for pure shader work with no scene graph | ~30KB |
| Theatre.js | Visual sequencer with a real editor, exports JSON | ~150KB, editor dev-only |
| Lottie | After Effects animation playback | ~250KB plus JSON |
| Splitting | Splits text into per-character and per-word elements | ~5KB |
| curtains.js | DOM elements mapped to WebGL planes with shaders | ~60KB |
| PixiJS | Fast 2D WebGL renderer. Particles, filters, sprites | ~400KB |
| TSL / three-shader-language | Node-based shaders authored in JS, compiles to WebGL and WebGPU | Part of three.js |
| Lucide | Open-source icon set, 1,500+ glyphs on a consistent grid, tree-shakable | ~1KB per icon |
| AnimateUI | Lucide icons pre-built with Motion enter/exit and interaction states | ~2KB per icon, on top of Motion |

Weights are approximate and exist so the tier decision is informed. Check the
real number for the version you pull and record it in `DIRECTION.md` next to the
technique it serves.

**Icons split the same way imagery does under `§10`.** A hamburger, a close X, a
chevron, a platform's own logo — the shape is the usability contract or someone
else's trademark, and reinventing it costs recognition for no gain. Pull these
from a set like the ones above. A signature icon that carries the identity — the
download CTA, a mark used nowhere else — is generated, same as any other visual
on the page, because that's the one a stranger could actually recognize as this
run's.

### The hard rule

**Every library gets downloaded, committed, and self-hosted before ship.** `§9`,
no exceptions.

- Vendor the exact built file used in the prototype. Pin and record the version.
- Remove every CDN `<script>` and `@import` before the Loop 4 build passes
  complete.
- Grep the built output for `unpkg`, `jsdelivr`, `cdnjs`, and `googleapis`. A
  hit is a build failure.

A dead CDN takes the site down with it, permanently, on someone's name, years
after anyone is watching. Vendoring is a one-time cost that buys against that
forever.

---

## When the technique is wrong

`§7` enforcement. The work is the hero, and this is the file most likely to
forget it.

**If the technique is more memorable than the project it frames, the technique
is wrong.** Not overtuned, not slightly heavy. Wrong. Remove it.

**If it does not serve the vision recorded at intake, cut it.** However good the
prototype was, however long it took. A raymarched hero on a subject whose brief
says quiet, editorial, and precise is a failure with excellent frame rate. The
prototype budget was spent to learn this cheaply, and the learning only pays if
you act on it.

**Impressive and irrelevant is still a failure.** The most common way this
pipeline fails is a site nobody can fault and nobody can describe the subject from.

### The check

Before a technique goes into the build, answer in one sentence:

> **Name the thing this technique makes the viewer understand about the subject.**

Real answers: the particle dissolve shows the scale of the dataset the subject
worked with. The displacement on hover reveals the before-state of the redesign.
The type on every variable axis is the point, because the subject designs
typefaces.

If the answer is that it looks good, that it is technically hard, or that the
section felt empty, remove it. No gate exists to grant an exemption.

Run the check again at Gate B2, and once more in Loop 4 with the real copy in
place. Techniques that survived an empty layout often stop making sense once
there are words on it.

---

## Invention

The arsenal is a floor. Everything on it has been done, and a run that only
executes from this list produces competent work that pattern-matches to something.

**Combining two techniques into something unnamed is the highest-value move in
this pipeline.** Reaction-diffusion as a displacement map. A gooey SVG filter
driven by scroll velocity. Variable-font axes wired to an audio analyser.
Marching squares over the alpha of live DOM text. Container queries switching
which shader a component runs. Combinations are where `§3` gets satisfied,
because nobody else did that one. Ways in:

- Feed a technique from one group into a technique from another.
- Apply a heavy-layer idea with a tier-1 tool and find out what the constraint
  forces.
- Use a technique for the thing it is worst at, deliberately.
- Take the standard combination and invert which layer drives which.

Record every invention in `DIRECTION.md`: what was combined, what it produces,
what it cost, and the one sentence from the check above. That entry is what `§3`
asks for when it requires every run to state what it did that nobody else did.
