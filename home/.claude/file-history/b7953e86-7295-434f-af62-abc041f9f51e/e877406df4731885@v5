# Loop 5 — Share & Convert

**Goal:** make the link look like something when it travels, and give the reader a
way to act when they decide to.

**Input:** the built site, `BRIEF.md`, `DIRECTION.md`.

**Output:** OG image, meta, structured data, favicons, a working contact path, and
— optionally — `cv.pdf`.

---

## Why this exists

Portfolios travel by link. Pasted into Slack, DMed to a hiring manager, posted on
LinkedIn. **The unfurl is the first impression** — it lands before the site does,
and it decides whether the link gets clicked at all.

And every portfolio has a job. Someone reads it, decides to act, and finds nothing
to act with. That is the whole pipeline wasted at the last inch.

Both are cheap. Both are usually missing.

## The OG image

Generate it with the same craft rules as the site (`§10`). **Not a screenshot** — a
screenshot at 1200×630 is unreadable and says nothing.

Design it: the name, the positioning line from `BRIEF.md`, the brand color, and one
element of the site's visual language so the unfurl and the site read as one thing.
1200×630, under 300KB, PNG. Test it dark and light — some clients composite on
their own background.

If the subject's photo belongs in it, use their real one (`§22`). Never generate a
face.

## Meta

```html
<title>Name — the positioning in five words</title>
<meta name="description" content="One sentence. What they do, who for.">

<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="https://…/og.png">
<meta property="og:url" content="https://…">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">
```

Absolute URLs on `og:image`. Relative paths silently fail in every unfurl.

## Multi-page

Every page carries its own `title`, `description`, `og:title`, `og:description`,
`og:image`, and `rel="canonical"`. A case study that unfurls as the homepage wastes
the click, and a citation is the whole reason it has its own URL
([`ARCHITECTURE.md`](../ARCHITECTURE.md)).

Generate per-page OG images at build time from the page title, using the site's
visual language. One template, N images, no manual work per post.

A blog also ships an RSS feed and a sitemap. The feed is the first thing writers ask
for and it costs nothing. Drafts appear in neither.

## Structured data

`Person` schema as JSON-LD: name, `jobTitle`, `url`, `sameAs` for their real
profiles, `knowsAbout`. Every field sourced from `EVIDENCE.md` (`§5`).

## Favicons

SVG favicon, 180px apple-touch-icon, `manifest.json` with theme color. Derived from
the site's visual language, not a letter in a circle by reflex — usually the
smallest legible fragment of the wordmark, or the accent shape reduced to its
plainest silhouette. Test it at 16px, where the browser tab actually renders it;
anything that only reads at favicon-preview size is not a favicon.

## The CV

Optional — ask. Not every subject wants a downloadable résumé; an agency site
or an inbound-only freelancer often doesn't. When they do, it's a second render
of material this pipeline already has, not new material: `EVIDENCE.md`'s proof
ladder and `BRIEF.md`'s positioning and project list, condensed from the case
studies Loop 3 already wrote rather than re-derived from scratch. Same rule as
everywhere else — every line traces to a source, `§5` still applies.

**Ask which it's for**, because the honest answer changes the design:

- **Styled to match the site** — carries the visual identity, reads as one
  thing with the portfolio. Right for a design-forward audience who will open
  it as a PDF and look at it.
- **Plain and parser-safe** — standard structure, no columns, no icons-as-text,
  nothing an ATS mangles. Right when the CV's first reader is software, and a
  human sees it only after it survives that pass.

When unsure which the audience needs, default to plain — a CV that never
reaches the human because a parser choked on it cost more than losing some
personality would have.

Author `cv.md`, render to PDF (`make-pdf` if available, or any HTML-to-PDF
capability the platform has), and publish it at a stable, predictable URL —
`/cv.pdf` at the root, not buried in a path that changes across runs — so the
résumé link below has something durable to point at. On a re-run that updates
a claim (`loops/09-rerun.md`), regenerate it in the same pass; a CV that quietly
drifts out of sync with the site is its own kind of rot.

## The conversion path

**Coupled to the deploy target.** A static host cannot take a form POST without a
third party; a VPS can. Pick from what the target actually supports:

| Target | Options |
|---|---|
| GitHub Pages, cPanel, S3 | `mailto:`, Formspree, Tally, or a link out |
| Netlify | Netlify Forms, native |
| Vercel | Serverless function |
| Cloudflare Pages | Worker |
| VPS (nginx or Docker) | A real endpoint. Rate-limit it |

Whatever it is, it gets tested end to end before Gate C. An untested contact form is
worse than a `mailto:` — it fails silently and nobody knows.

**The ask matches the audience.** A hiring manager gets `/cv.pdf` and an email, if
the CV above was built. A client gets a scoped inquiry. An investor gets a
calendar link. One clear action, derived from the decision named in `BRIEF.md`.

## Legal minimum

Only if something is collected. A form means an EU visitor makes an imprint and a
privacy line a legal requirement, not a preference. Skip entirely when nothing is
collected — that is the common case and it needs no page.

A privacy line and a cookie-consent banner are not the same requirement. The
privacy line is informational — what's collected, why, where it goes — and a
contact form alone earns one regardless of cookies. A consent banner is a
heavier, interactive requirement that only applies once a non-essential cookie
actually gets set, and following `loops/04-build.md`'s own analytics
preference order (the host's own server-side analytics, or a cookieless tool)
usually means one never does. Build the banner only when the subject insists
on something that sets one — `loops/04-build.md` has the spec.

The indexing decision, `robots.txt`, `sitemap.xml`, and structured data beyond
`Person` belong to [`loops/06-seo.md`](./06-seo.md), which runs right after this
one.

## Skip cost

Skipping the share layer means the best work in the pipeline shows up in Slack as a
gray box with a URL. Skipping the conversion path means someone decides to reach out
and finds no way to. These are the two cheapest steps here and the two most
expensive to have left out.
