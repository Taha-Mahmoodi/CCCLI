# Loop 4 — Build

**Goal:** code the site to the approved design images, with real copy, vendored
dependencies, and all three states working.

**Input:** design images, `DIRECTION.md`, `COPY.md`.

**Output:** a working site in the subject's repository, not yet public.

---

## Stack

The deploy target picked at Gate A decides it (`PIPELINE.md`). Not taste.

**Default: hand-authored HTML and CSS** with committed assets. Runs on all nine
targets, has no build step to break, and nothing to update. Reach past it only when
the work demands it: Astro when case-study volume makes hand-editing HTML the
bottleneck, an SSR framework only when the target runs node and something on the
page genuinely needs a server.

A framework has to earn its bytes against `§13`.

## Fan out

Dispatch `section-builder`, **one agent per section**, each in an isolated worktree
so parallel edits don't collide. Each gets: its design image, its copy from
`COPY.md`, its technique assignment and prototype from `DIRECTION.md`.

The conductor owns the shell and assembles the sections into it. Section agents
write their section and nothing else. The next section is where that line falls,
exactly.

## The shell contract

Seven agents in seven worktrees invent seven naming schemes unless the names already
exist when they start. So they exist first.

**The conductor writes the token file before dispatching a single section agent.**
Not alongside the first one, not after one reports back. First.

Three rules the section agents work under:

- Consume tokens. Never define one.
- No literal where a token exists. `var(--p-space-6)`, never `48px`.
- A value the tokens do not have gets **reported back**, never invented locally. One
  agent's `--card-gap` is the thing that makes the assembled page look assembled.

### The token file

One prefix, declared once at the top of the file, used by everything. `--p-` below.
One token file per site, shared across every page and template — multi-page sites
and blogs get one shell, not one per template ([`ARCHITECTURE.md`](../ARCHITECTURE.md)).

```css
/* tokens.css — conductor-owned. Prefix: --p-. Sections read, never write. */
:root {
  /* color: surface, text, accent, state */
  --p-surface-0:  oklch(14% 0.02 265);   /* page */
  --p-surface-1:  oklch(19% 0.02 265);   /* raised */
  --p-surface-2:  oklch(24% 0.02 265);   /* raised on raised */
  --p-text-1:     oklch(96% 0.01 265);   /* body, ≥ 4.5:1 on surface-0 */
  --p-text-2:     oklch(74% 0.01 265);   /* secondary */
  --p-text-3:     oklch(58% 0.01 265);   /* non-essential only */
  --p-accent:     oklch(68% 0.19 32);    /* sampled, §8 */
  --p-accent-ink: oklch(16% 0.03 32);    /* text on accent */
  --p-state-hover:   oklch(74% 0.19 32);
  --p-state-focus:   var(--p-accent);
  --p-state-error:   oklch(62% 0.20 25);
  --p-state-success: oklch(68% 0.15 150);

  /* space: one scale, nothing between steps */
  --p-space-1: 0.25rem;  --p-space-2: 0.5rem;   --p-space-3: 0.75rem;
  --p-space-4: 1rem;     --p-space-5: 1.5rem;   --p-space-6: 2rem;
  --p-space-7: 3rem;     --p-space-8: 5rem;     --p-space-9: 8rem;

  /* type: one ratio, fluid between bounds */
  --p-font-display: "…", serif;
  --p-font-body:    "…", system-ui, sans-serif;
  --p-text-xs:   clamp(0.78rem, 0.76rem + 0.1vw,  0.84rem);
  --p-text-sm:   clamp(0.90rem, 0.87rem + 0.2vw,  1.00rem);
  --p-text-base: clamp(1.00rem, 0.96rem + 0.3vw,  1.15rem);
  --p-text-lg:   clamp(1.25rem, 1.16rem + 0.5vw,  1.50rem);
  --p-text-xl:   clamp(1.75rem, 1.50rem + 1.3vw,  2.50rem);
  --p-text-2xl:  clamp(2.50rem, 1.90rem + 3.0vw,  4.50rem);
  --p-text-3xl:  clamp(3.50rem, 2.20rem + 6.5vw,  8.00rem);
  --p-leading-tight: 1.05;  --p-leading-body: 1.55;  --p-measure: 66ch;

  /* radius */
  --p-radius-sm: 2px;  --p-radius-md: 6px;
  --p-radius-lg: 16px; --p-radius-full: 999px;

  /* shadow */
  --p-shadow-1: 0 1px 2px oklch(0% 0 0 / 0.24);
  --p-shadow-2: 0 6px 20px oklch(0% 0 0 / 0.28);
  --p-shadow-3: 0 24px 60px oklch(0% 0 0 / 0.36);

  /* motion: duration + easing, from the 2b motion spec */
  --p-dur-fast: 120ms;  --p-dur-base: 260ms;  --p-dur-slow: 640ms;
  --p-ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
  --p-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --p-ease-entry:  cubic-bezier(0.16, 1, 0.30, 1);

  /* z: every layer named. A bare integer anywhere else is a bug */
  --p-z-base: 0;    --p-z-raised: 10;  --p-z-sticky: 20;
  --p-z-overlay: 30; --p-z-nav: 40;    --p-z-modal: 50;  --p-z-cursor: 60;
}
```

The light-mode overrides live in this file too. Two art directions per
[`CRAFT.md`](../CRAFT.md) means two sets of color tokens, both conductor-owned.

### What else is shell-owned

| Shell-owned | Off-limits because |
|---|---|
| The document skeleton | `<head>`, meta, landmarks, skip link, section order. Two agents editing it is a merge conflict every time |
| The reset and base layer | One reset. An agent's local reset leaks past its section |
| Font loading | `@font-face`, `preload`, the subsets. Duplicated font requests blow `§13` silently |
| `tokens.css` | The contract itself |
| Shared motion primitives | The `prefers-reduced-motion` block, the easing set, the scroll-orchestration root, the intersection-observer helper |

The boundary as a rule an agent can check itself against:

> **If the change could affect a section you were not assigned, it is not yours.**
> Report it and keep building.

## Code to the image

The design image is the specification. Match it: spacing, scale, weight,
composition, color. Where the image is ambiguous, go back to `DIRECTION.md`; where
both are silent, make the call the style would make and note it.

Do not improve the design during the build. If something is genuinely wrong, say so
and get a decision. A build that quietly redesigns is a build nobody approved.

## Responsive images

The 100KB shell budget in `§13` assumes these. One 2400px JPEG spends the whole
thing on its own.

- **`srcset` with three widths at minimum**, and `sizes` describing the layout slot
  the image occupies rather than the image's own size
- **AVIF, then WebP, then a raster fallback**, in a `<picture>`. Source order is
  preference order; the browser takes the first type it understands
- **`width` and `height` on every `<img>`**, always, even when CSS resizes it. The
  browser reserves the box from the ratio before a byte arrives
- **`loading="lazy"` below the fold, never on the LCP image.** Lazy on the hero
  delays the exact metric the budget is measured by
- **`fetchpriority="high"` on the LCP image**, and preload it from the shell

**A hero image without `width` and `height` is the most common cause of CLS.** The
text lays out, the image arrives, everything below jumps. Costs two attributes.

```html
<picture>
  <source type="image/avif"
          srcset="hero-800.avif 800w, hero-1400.avif 1400w, hero-2400.avif 2400w"
          sizes="(min-width: 1100px) 60vw, 100vw">
  <source type="image/webp"
          srcset="hero-800.webp 800w, hero-1400.webp 1400w, hero-2400.webp 2400w"
          sizes="(min-width: 1100px) 60vw, 100vw">
  <img src="hero-1400.jpg"
       srcset="hero-800.jpg 800w, hero-1400.jpg 1400w, hero-2400.jpg 2400w"
       sizes="(min-width: 1100px) 60vw, 100vw"
       width="2400" height="1500"
       fetchpriority="high" decoding="async"
       alt="Describe what the image shows, per §12">
</picture>
```

Below the fold, the same block with `loading="lazy"` and no `fetchpriority`.

## Language and script

The decision was made in `ARCHITECTURE.md`. This is where it gets built.

**Logical properties are the default, not the RTL patch.** Write
`margin-inline-start`, `padding-inline-end`, `inset-inline-start` in the token
file and every component from day one — LTR-only and RTL-and-LTR cost the same
to build this way, and a site started with `margin-left` everywhere pays for
the conversion later whether or not it ever ships a second language. The
`tokens.css` from "The shell contract" above uses these; it is not an
afterthought bolted onto the existing token set.

**`dir` is set correctly, on `<html>` at minimum**, and per-element where a
single page legitimately mixes scripts (a name quoted in its original script
inside otherwise-LTR body copy). Never inferred from content at runtime when
it is knowable at build time.

**The font actually renders the script.** A Latin font silently falling back to
a system font for Arabic or Hebrew text is worse than choosing deliberately —
verify every weight used actually covers the script's full range before
vendoring it, not after a missing-glyph box turns up in review.

**A language switcher, if `ARCHITECTURE.md` called for one**, is shell-owned
like nav — present on every page, keyboard-reachable, and it switches the
whole page's `dir` and font stack along with the content, never text alone
while the layout stays mirrored wrong.

**Test the mirror.** An RTL page is not an LTR page with text flowing backward
— icons that imply direction (an arrow, a chevron) mirror with it, and ones
that do not (a logo, a play button) do not. Check both by eye; nothing in "The
three states" above catches a chevron pointing the wrong way.

## Video, audio, and live demos

A motion designer's portfolio is video first. So is a filmmaker's, a sound
designer's, and anyone whose work moves or makes noise.

- **Self-host per `§9`, or use a privacy-respecting embed, and say which in the run
  report.** Self-hosting is the default. A 40MB reel is the case where an embed wins,
  and then it is one that sets no cookies before play: `youtube-nocookie`, Vimeo with
  DNT, Cloudflare Stream
- **Poster frame, always.** A `<video>` without `poster` is a black rectangle until
  the first frame decodes, and that rectangle is often what LCP measures
- **Captions and transcripts are `§12`**, a requirement rather than a nicety. A
  `<track kind="captions">` on anything with speech, and a transcript in the page for
  anything carrying information. Audio work needs the transcript most
- **Never autoplay with sound.** No exception, no default-on toggle
- **Muted autoplay only for short ambient loops** — `muted playsinline loop`, a few
  seconds, no information inside it. It respects `prefers-reduced-motion`, and the
  poster is the designed still it falls back to
- **MP4 (H.264) and WebM**, both, MP4 last as the universal fallback
- **Weight is why video belongs in the heavy tier** (`§13`). `preload="none"`,
  poster in the shell, source swapped in on intersection or on click. A reel that
  starts downloading at page load has eaten the budget before anyone pressed play

### Live demos

An `<iframe>` to a running demo is a dependency on a server the subject may stop
paying for. If you embed one: `loading="lazy"`, `sandbox` set, a `title` on the
frame, and a visible fallback for when it is down, because a dead iframe renders as
nothing and reads as broken.

Most of the time the static screenshot plus a link is the better call. It always
renders, it costs a fraction of the bytes, and it survives the demo going away.

## Modals, drawers, and sheets

Any overlay carrying a project detail, a filter panel, or a lightbox is a modal
pattern, and `§12` applies to the contract as much as the render.

`aria-modal="true"` is legitimate only when both hold: the code prevents interacting
with anything outside the overlay, and the styling visibly obscures it. Setting the
attribute without both is worse than not setting it — it tells assistive tech the
background is unreachable while a mouse user can still click through it, which is a
harder failure than an unmarked overlay.

On close, focus returns to the element that opened it. Not the page top, not
wherever the layout happens to land. If that element no longer exists, focus goes
somewhere that keeps the workflow legible, never dropped to `<body>`.

How it moves — the drawer, the sheet, the toast — is in
[`CRAFT.md`](../CRAFT.md#component-motion). This section governs the contract;
that one governs the motion.

## The three states, per section

Non-negotiable (`§12`). Each section ships:

1. **Full** — the approved experience
2. **Reduced motion** — a designed still. Composition, grade, and hierarchy intact.
   Never `animation: none` on a layout that assumed movement.
3. **No WebGL** — a real fallback for context loss, old GPUs, and blocked contexts.
   Handle `webglcontextlost`. Feature-detect before you initialize.

Test all three. A state that was written but never run does not exist.

## Vendor everything

Prototypes pulled from CDNs freely. Production does not (`§9`).

```bash
mkdir -p vendor/
curl -sL <cdn-url> -o vendor/<lib>.min.js
```

Download it, commit it, reference it locally. Same for fonts — self-hosted, subset,
`font-display: swap`, no Google Fonts link. A public endpoint going down should
never take this site with it.

### Confirm the font license before you self-host it

A desktop or comp license and a webfont-embedding license are not the same
grant, and a font "free for personal use" is a common trap on a site built to
get someone hired or hired-by — that is commercial use of the license, whatever
the individual's employment status. Confirm before vendoring, not after:

| Source | Usually fine to self-host | Check anyway |
|---|---|---|
| Google Fonts, Fontsource | Yes — OFL or Apache, webfont embedding is the point | Confirm the specific family; a handful carry different terms |
| A type foundry, purchased | Depends entirely on the tier bought | The license file. "Desktop" and "web" are frequently sold separately |
| Something the subject already owns or licensed | Depends | Ask them directly, and get the license file, not just the font file |

Write `LICENSES.md` in the site's repo: every font, its license, and whether
web embedding is explicitly covered. Every vendored library too, while the
file exists — same idea, lower stakes. This is not only the handoff adapter's
job (`deploy/handoff.md`); it belongs to every run, because a font that goes
live on a domain is a bigger exposure than one sitting in a build folder, not
a smaller one.

No license file findable, and the subject can't produce one: do not vendor it.
Pick from the left column instead — the design survives a font substitution;
the subject does not want to discover this the way it usually gets discovered.

## Analytics

`§9` is no third-party analytics by default. The default holds unless the subject
asks, so ask them: do they want to know who visits at all? Plenty of people do not,
and a portfolio measures nothing perfectly well.

If they do want it, in order of preference:

1. **The host's own, when it needs no client script.** Cloudflare Web Analytics on a
   proxied domain and Netlify Analytics both measure server-side. Zero bytes on the
   page, nothing to block, nothing to load. Where the target supports it, this is the
   answer
2. **Privacy-respecting and cookieless.** Plausible, GoatCounter, Fathom. Small,
   no cookies, no cross-site profile
3. **Never Google Analytics by default.** It is the reflex answer, it is the heaviest
   option, and it puts a visitor's browsing into an ad network on someone's personal
   site

Anything that loads a script goes in the heavy tier (`§13`), after first paint, and
it triggers the privacy-notice requirement in [`05-share.md`](./05-share.md).
Collecting anything is what turns that page from optional into required.

## Quality passes

Run these before the loop closes:

| Pass | Check |
|---|---|
| **Responsive** | 360, 768, 1440. Real device shapes, not arbitrary breakpoints. Nothing overflows, nothing collapses, type stays readable |
| **Semantic** | One `h1`, headings in order, landmarks, lists that are lists, buttons that are buttons |
| **Keyboard** | Tab through everything. Visible focus. No traps. Skip link works. Any overlay meets the modal contract above, focus included |
| **Budget** | Shell under 100KB and painting alone. Heavy layer deferred and gated. LCP under 1.5s |
| **Cross-browser** | Chromium and WebKit at minimum. Safari breaks `backdrop-filter` and WebGL in ways Chrome does not |
| **Copy** | Every string from `COPY.md`. No placeholder survived. Alt text on every image |
| **Reduced motion** | Toggle the OS setting and look at it. It should still be a designed page |
| **Console** | Zero errors, zero 404s |
| **Absence states** | 404, empty blog index if there's one, and the failed-submission state are all built to the concept — none left as a framework default |

## Local screenshots

Screenshot at all three widths, both color modes, and in reduced-motion. Put them in
`runs/<slug>/shots/`. Look at them yourself before anyone else does (`§14`).

## Attribution

Add the footer credit and the marker comment (`§19`):

```html
<!-- forged-with: portfolio.me -->
```

Tell the human it's there and that deleting it is fine.

## Skip cost

Skipping the quality passes moves the discovery of every one of these problems from
before deploy to after, in front of whoever the site was built for.
