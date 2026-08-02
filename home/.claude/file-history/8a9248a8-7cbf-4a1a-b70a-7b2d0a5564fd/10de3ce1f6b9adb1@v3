# Loop 6 — SEO & Discoverability

**Goal:** make the site findable and correctly represented by search engines and AI
answer engines, without bending the voice `§11` exists to protect.

**Input:** the built site, `ARCHITECTURE.md` (the real page list), `BRIEF.md`
(positioning and audience), `EVIDENCE.md`, `COPY.md`.

**Output:** `sitemap.xml`, `robots.txt`, `llms.txt`, canonical tags confirmed,
expanded structured data, a heading and meta audit, and — once Loop 7 has put
the site live — search engine submission.

A portfolio nobody can find failed at being found, not at being built. This loop
is the difference.

---

## Governed by, not separate from

This is not a new binding rule. It is existing principles applied to search:
`§5` (structured data is a claim like any other — no source, no field), `§11`
(optimizing for a crawler never wins against sounding like a person), `§12`
(heading hierarchy and alt text already required for access serve search for
free), `§13` (Core Web Vitals are a ranking factor — the budget already pays for
this). Nothing here overrides them.

No new gate. SEO artifacts are part of what Gate C reviews before the site goes
public.

## The indexing decision

Ask, at Gate A if it was not settled there. Do not assume.

**Indexed** — anyone can find it through search. The default for someone job- or
client-hunting.

**Unlisted** — works for anyone with the direct link, invisible to search. Right
for a site shared only in DMs, or one that is not ready to be found yet.

The choice sets everything below. An unlisted site still gets a correct
`robots.txt`; it just tells crawlers to leave.

```
# indexed
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml

# unlisted
User-agent: *
Disallow: /
```

## `sitemap.xml`

Generated from the real, built page list — never hand-maintained, never guessed.
Walk `ARCHITECTURE.md`'s routing after Loop 4, not before: a page that was cut
during build has no business in the sitemap.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc><lastmod>2026-07-26</lastmod><changefreq>monthly</changefreq></url>
  <url><loc>https://example.com/work/project-name</loc><lastmod>2026-07-26</lastmod></url>
  <url><loc>https://example.com/writing/post-slug</loc><lastmod>2026-07-26</lastmod></url>
</urlset>
```

Drafts, redirected slugs, and anything `noindex` are excluded. `lastmod` is the
real commit date of that page, not today stamped on everything.

## `llms.txt`

The same job as `robots.txt`, aimed at AI answer engines instead of search
crawlers: a plain-markdown file at the site root that tells a model what the
site is and where the substance lives, so a citation is accurate rather than
guessed from a partial crawl.

```markdown
# Name

> One line: the positioning from `BRIEF.md`, verbatim.

## Work
- [Project name](https://example.com/work/project-slug): one real sentence, from EVIDENCE.md
- [Project name](https://example.com/work/other-slug): one real sentence, from EVIDENCE.md

## Writing
- [Post title](https://example.com/writing/post-slug): one real sentence

## About
- [About](https://example.com/about)
```

Same rule as everywhere else: every line traces to `BRIEF.md`, `COPY.md`, or
`EVIDENCE.md`. This is a summary of what the site already says, never a new
claim invented for the file. Skip it entirely for an unlisted site — the same
indexing decision that governs `robots.txt` governs this.

## Canonical URLs

Every page carries `rel="canonical"` pointing at its own absolute URL — already
required by `loops/05-share.md` for the unfurl. Confirm it here from the search
side: a case study whose canonical points at the homepage tells search engines
the case study does not really exist.

## Titles and descriptions

**Title**, one pattern per page type, under 60 characters so it does not get cut
in results:

| Page | Pattern |
|---|---|
| Home | `Name — the positioning in five words` |
| Case study | `Project — Name` |
| Blog post | `Post title — Name` |

**Meta description**, 120–160 characters, unique per page, written from
`BRIEF.md` and `COPY.md` — never invented here. It should contain the phrase a
person would actually type, because that is what a search result is: the pitch
for the click.

Every page gets its own. A description copied across pages is a page search
engines treat as a duplicate of another.

## Heading hierarchy

One `h1` per page, already required by `§12`. The search-specific check: the
`h1` should contain the page's real subject in the words a person would search
for — a case study's `h1` is `Redesigning the checkout flow`, not `Project
overview`. Confirm nesting has no skipped levels (`h1` → `h3` with no `h2`
between).

## Structured data, expanded

`loops/05-share.md` ships `Person` schema for the unfurl. This loop adds what
search and answer engines read for eligibility and rich results:

- **`WebSite`** on the home page, name and URL only. Add `SearchAction` only if
  the site actually has search — most portfolios do not, and a fake search
  action is a `§5` violation like any other fabricated field.
- **`BreadcrumbList`** on every page below the home page, for multi-page and
  blog sites (`ARCHITECTURE.md`).
- **`Article`** on every blog post: `headline`, `datePublished`,
  `dateModified`, `author` pointing at the `Person` object. Dates are real
  commit dates.
- **`ProfilePage`** wrapping `Person` on the about page, if there is one.

Every field traces to `EVIDENCE.md` or the built page itself. No field gets
invented to make the schema more complete than the site is.

## Content and keyword intent — audit, do not rewrite

This loop reads Loop 3's copy against the audience and decision named in
`BRIEF.md` and checks whether the real phrases a searcher would type — "hire a
[X] designer," "[skill] portfolio," the subject's own name — appear naturally
in headings and body copy that were already written for a person to read.

If they are missing, that goes back to Loop 3 as a small, targeted patch — not
a rewrite, and never a stuffing pass. **`§11` wins every time these two pull
against each other.** A heading that reads correctly to a hiring manager and
happens to match what they would search is the entire goal; a heading bent
toward a keyword and away from a human is a failure dressed as an optimization.

## Internal linking

A sitemap tells a crawler a page exists. Links from other pages tell it the
page matters. For multi-page and blog sites: case studies link to related work,
posts link to the case studies they discuss, the home page links to the
strongest 2–3 pieces rather than requiring a click through an index. A page
with no internal links in is effectively invisible regardless of the sitemap.

## Image SEO

Already paying for most of this under `§12`: descriptive alt text serves a
screen reader and a search engine identically. The one addition — file names.
`redesigning-checkout-before.avif`, not `IMG_4821.avif`. Free, and it costs
nothing extra since the file is already being named at build time.

## Performance is a ranking factor

Not a separate check — a reframe of `§13`. The shell budget and the deferred
heavy layer exist for the visitor first, but Core Web Vitals feed search
ranking directly. Loop 8's Lighthouse pass already measures this; nothing new
to build, just confirm the SEO score specifically, not only performance and
accessibility.

## After Loop 7 — submission

The steps above ship with the build, before deploy. This one only works once
the domain is live:

1. Verify the domain in Google Search Console and Bing Webmaster Tools, under
   the **subject's own account** (`§20` — their site, their credentials, not
   the operator's).
2. Submit `sitemap.xml` in both.
3. For an unlisted site: skip this section entirely. Submission is how a site
   becomes findable, which is the one thing an unlisted site asked not to be.

Record what was submitted, and under which account, in `runs/<slug>/REPORT.md`.

## Skip cost

| Skipping | Costs |
|---|---|
| `sitemap.xml` / `robots.txt` | Search engines still find the site eventually through links, slower and less completely |
| `llms.txt` | An AI answer engine still crawls and cites the site, working from a partial read instead of the summary that would have kept it accurate |
| Canonical audit | Duplicate-content confusion if the site is ever mirrored, staged, or migrated |
| Titles and descriptions | Generic or duplicate results in search, which reads as unmaintained |
| Structured data | No rich result, no breadcrumb in search, a weaker basis for an AI answer engine to cite the site correctly |
| Content and keyword audit | The site reads fine to a human who already has the link and stays invisible to one who does not have it yet |
| Submission | The site is indexed eventually anyway, just slower — this step only speeds up discovery, it does not gate it |
