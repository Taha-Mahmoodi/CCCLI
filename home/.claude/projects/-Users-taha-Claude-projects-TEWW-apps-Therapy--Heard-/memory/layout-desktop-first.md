---
name: layout-desktop-first
description: "Heard is desktop-first; the main section is 85% of viewport width, capped at 1500px"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9eb3a266-7688-441e-908a-dc9572655a83
---

Heard's layout is **desktop-first, then responsive down** — this overrides the design brief's "mobile-first" wording (the user corrected it after M0).

**Why:** the user wants the primary experience designed for desktop and the main content column to always read as a consistent proportion of the screen.

**How to apply:**
- The **main section spans 85% of the viewport width**, centred (7.5% gutters each side), **capped at 1500px** (`--container-app` in `app/globals.css` → `max-w-app`). Cap chosen so text lines stay readable for the low-vision audience on huge monitors.
- Use the shared **`components/shared/Container`** (`mx-auto w-[85%] max-w-app`) for the header inner, the page `<main>`, and the footer inner so they all align to the same column. Verified at 375/1280/1440/2400px.
- Write **desktop-first Tailwind**: base classes target desktop; use `max-md:` / `max-sm:` variants to adapt down (e.g. `grid-cols-3 max-md:grid-cols-1`, hero `text-display max-md:text-h1`, buttons `max-sm:w-full`). Don't default to mobile-first `sm:`/`md:` scaling-up.
- Focused forms are **not** centered mobile cards — the auth pages use a desktop-first **two-column split** (teal brand panel + form column) that stacks on mobile. `Logo` has a `tone="onPrimary"` white variant for the panel.
- **CSS gotcha:** `globals.css` element defaults live in `@layer base`, and headings use `color: inherit` (not a hard `color: ink`). Unlayered element rules beat Tailwind's layered `text-*` utilities, so a hard heading color made white-on-teal headings render as ink. Keep heading color inherited so a coloured parent (e.g. `text-surface` on a teal section) recolours them.

Related: [[heard-build-plan]]
