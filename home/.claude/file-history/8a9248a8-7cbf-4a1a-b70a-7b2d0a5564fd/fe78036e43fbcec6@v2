# Loop 8 — Verify

**Goal:** confirm with your eyes that the live site works, and write down honestly
what this run actually produced.

**Input:** the live URL.

**Output:** `runs/<slug>/REPORT.md` with a confidence grade, and `shots/`.

---

## Look at it

Dispatch `site-verifier` against the **live URL**, never the local build. Local and
live differ in ways that matter: absolute paths, MIME types, compression, cache
headers, TLS, and whatever the host rewrites.

`HTTP 200` is not "it renders" (`§14`).

## The checklist

| # | Check | Pass condition |
|---|---|---|
| 1 | **Renders at 360 / 768 / 1440** | Nothing overflows, collapses, or overlaps. Screenshot each |
| 2 | **Both color modes** | Both are designed. Neither is an inversion artifact |
| 3 | **Reduced motion** | OS setting on: still a designed page, not a broken one |
| 4 | **No WebGL** | Blocked or unavailable: the fallback carries the section |
| 5 | **Keyboard** | Tab everything. Visible focus, no traps, skip link works |
| 6 | **axe** | Zero violations. Not "zero criticals" — and not the whole check; see 18 |
| 7 | **Contrast** | Body text ≥ 4.5:1 measured on the live render, including over translucency and imagery |
| 8 | **Alt text** | Every image. Descriptive, not filename |
| 9 | **Lighthouse** | Perf, a11y, best practices, SEO. Record all four |
| 10 | **Shell budget** | Under 100KB. LCP under 1.5s. Heavy layer deferred, not in the LCP path |
| 11 | **Frame rate** | 60fps under scroll on the heaviest section. Test throttled |
| 12 | **Every link** | Click all of them. Zero 404s, zero dead anchors |
| 13 | **Contact path** | Send a real test message. Confirm it arrives |
| 14 | **Unfurl** | Paste the URL into a real client. The OG image renders |
| 15 | **Console** | Zero errors on load and after a full scroll |
| 16 | **TLS and redirects** | `https` works, `http` redirects, apex and `www` both resolve deliberately |
| 17 | **Mobile browser** | A real phone if one is available. Emulation misses touch, and iOS Safari misses more |
| 18 | **Assistive technology** | A real screen reader — VoiceOver, NVDA — if available. Heading and landmark navigation makes sense, alt text reads sensibly spoken rather than just present, forms announce their labels. axe checks structure; this checks whether the structure actually works for someone using it |

## Why 18 is not just 17 plus one

`§12` is one of five rules this pipeline cannot skip. `axe` is a static linter
— it does not drive real focus, and it cannot tell you whether a screen
reader narrates the page in an order that makes sense. A hard rule enforced
by a check that catches roughly a third of real accessibility problems is
weaker than the doctrine claims to be. Row 18 is what makes the "accessible"
in "accessible by default" true rather than aspirational.

Same framing as row 17's "if available" — a real device beats emulation, and
a real screen reader beats a linter, but neither is always at hand. When
genuinely unavailable, say so in the report rather than silently skipping the
row; `§18` applies here too.

## Then look at the screenshots yourself

The agent reports. You look. An automated pass and a page that looks wrong are
compatible states, and only one of them is caught by a checklist.

## The report

`runs/<slug>/REPORT.md` opens with the confidence grade and the reason.

| Grade | Means |
|---|---|
| **A** | Full pipeline. Claims corroborated, strategy derived, design validated at both gates, verified live |
| **B** | Core intact, some validation skipped. Strategy or design review thinner than ideal |
| **C** | Substance skipped — no interview, or no copy pass. Real site, thin story |
| **D** | Multiple substance skips. A scraped résumé with good visual design. Say exactly that |

Read `SKIPS.md` and grade against it. **Report it honestly.** A **D** stated plainly
is more useful than an **A** claimed falsely — the grade exists so the human knows
what they have.

Then: live URL, the checklist with results, screenshots at all three widths,
Lighthouse numbers, what was skipped and what it cost, the rollback command, and
what would move the grade up.

## What to do with failures

Fix the ones that are fixable now, re-verify, and record both states. Log the rest
with what it would take. Never report a fix you did not confirm.

Do not paper over a failure with a caveat. If check 6 found violations, the report
says so, on the first page, not in a footnote.

## Skip cost

Skipping verification means the first person to see this site live is a stranger,
and the first person to find the broken thing is the person it was built to
impress.
