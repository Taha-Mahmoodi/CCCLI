# Architecture

How many pages the site has, how they route, and what happens when the subject wants
to publish without re-running the pipeline.

This is decided at **Gate A**, before any design work, because it changes the stack,
the build, the share layer, and the deploy adapter. Deciding it at build time means
rebuilding.

---

## The decision

Ask at intake. Three shapes, and the answer follows from what they actually have.

| Shape | When it's right | Cost |
|---|---|---|
| **Single page** | Under four projects, no writing, one audience, one decision | Cheapest. No routing, one OG image, one deploy artifact |
| **Multi-page** | Deep case studies that deserve their own URL, more than one audience, work worth linking to individually | Routing, per-page meta, a real nav |
| **Multi-page + blog** | They write, or intend to. Senior people almost always do | Everything above, plus a publishing path they own |

Default to single page for a thin portfolio, multi-page the moment a case study is
long enough that someone would want to send just that link.

## Language

The same kind of decision, asked in the same breath at Gate A: what language, and
whether there is more than one.

**One language, whatever it is.** The common case, including a site entirely in
Persian, Arabic, Japanese, anything — this is not "i18n," it is just the site's
one language. `§17` already covers it: `dir="rtl"` and logical properties where
the script needs them, a font that actually renders it, never a transliterated
or mangled name.

**More than one, with a switcher.** A real decision with a real cost, not a
box to check. Ask which it actually is:

- **Full parity** — every page, every case study, in both languages, kept in
  sync on every re-run. The honest, expensive answer.
- **Primary plus a lighter secondary** — one language carries the full site, the
  other carries the essentials (about, contact, a language note on the home
  page). Cheaper, and often more honest than a full translation nobody keeps
  current — a stale secondary language reads worse than an absent one.

Say which was chosen in `BRIEF.md`. A secondary language quietly allowed to rot
is the same failure `loops/09-rerun.md`'s rot check watches for elsewhere.

**Strategy is derived once; voice is not.** `BRAND.md`'s archetype and
positioning are conceptual, not linguistic — they do not change per language.
The verbal identity does: lexicon, rhythm, and the subject's own sentences from
`§11` do not survive mechanical translation. Multi-language copy in Loop 3 gets
written in each language from what the subject actually said in it, not
translated from one into the other. If they were only interviewed in one
language, say so in `BRIEF.md`, and treat the other language's copy as a
known-thinner pass rather than pretending it carries the same voice.

The build mechanics — logical CSS properties, per-language fonts, the switcher
itself — belong to `loops/04-build.md`. The search-facing side — `hreflang`,
per-language sitemaps or meta — belongs to `loops/06-seo.md`.

## Why a case study wants its own URL

A hiring manager sends one link to a colleague. If everything lives on one page, they
send the whole page and hope the colleague scrolls. A dedicated URL is a citation.

Same logic drives the share layer: a per-page OG image and description means the
case study unfurls as itself in Slack rather than as the portfolio homepage
(`loops/05-share.md`).

Anchors on a single page are not a substitute. They do not get their own meta, they
do not appear separately in search, and a deep-linked anchor drops the reader
mid-context with no idea what they landed in.

## The blog changes the stack

This is the part that breaks a hand-authored site.

Everything else in this pipeline is built once by an agent. A blog is written
**repeatedly, by the human, without you**. If publishing a post requires an agent
run, they will not publish. The architecture has to hand them a path they own.

| They will publish via | Then the stack is |
|---|---|
| Writing a markdown file and pushing | Static site generator with a content collection |
| A CMS UI | SSG with a headless CMS, or a platform with one built in |
| Not at all, they just want the section to exist | No blog. Say so, and do not build machinery for a use that will not happen |

Ask which, honestly. A blog nobody writes is worse than no blog: it is dated
evidence that they stopped.

### The stack consequence

`PRINCIPLES.md` defaults to hand-authored HTML and CSS. That default holds for single
page and survives multi-page. **It does not survive a blog.** Hand-editing HTML for
every post is exactly the friction that stops people writing.

| Site shape | Stack |
|---|---|
| Single page | Hand-authored HTML and CSS |
| Multi-page, static content | Hand-authored, or a generator if the case-study count makes hand-editing the bottleneck |
| Any blog | A generator with markdown content collections. Astro is the default: static output, zero JS by default, and it survives every deploy target |

The generator is a build-time tool. The output is still static, still deployable to
all nine targets, and still under the `§13` budget. A generator does not mean
shipping a framework to the browser.

## Routing

Flat and readable. The URL is part of the design.

```
/                     home
/work/<project>       case study
/about                if it earns a page
/writing              blog index
/writing/<slug>       post
/uses  /now           only if they actually want them
```

Rules: no `/index.html` in a public URL, trailing slashes consistent, slugs
lowercase and hyphenated, and slugs never change once published — a dead URL that
someone bookmarked is a broken citation. If a slug must change, redirect it.

**Replacing an existing site is the same rule at a larger scale.** Every URL
the old site answered — indexed, bookmarked, linked from somewhere the subject
does not control — is a citation this run can break. Ask about this at intake
(`loops/01-substance.md`) and build the actual redirect map in
[`loops/06-seo.md`](./loops/06-seo.md), where it belongs beside the sitemap
and canonical work it protects.

## Nav

Multi-page needs real navigation, and `§3` applies: invent it for this subject
rather than reaching for a top bar by reflex. Whatever it is, it satisfies the
non-negotiables — keyboard reachable, current page indicated, works at 360px, and
present on every page including the deepest post.

## What multi-page changes in each loop

| Loop | Change |
|---|---|
| **1** | Ask the shape at intake. Ask whether they will actually write |
| **2a** | Design images per template, not per section: home, case study, blog index, post. A template covers every instance |
| **2b** | Techniques are assigned per template. A heavy hero on the home page is fine; the same on every post is not |
| **3** | Copy is per page. Blog posts are the subject's, not yours — you build the machinery and write at most a seed post they approve |
| **4** | The shell contract spans pages. Tokens, nav, and the head are shared; per-page code is not |
| **5** | Per-page meta and OG. An RSS feed for the blog, which costs nothing and is the one thing writers ask for |
| **6** | `sitemap.xml` covers every real page. Canonical and structured data confirmed per template, `BreadcrumbList` added below the home page |
| **7** | Some adapters need routing config: `_redirects`, `vercel.json`, `.htaccess`, or an nginx `try_files` |
| **8** | Verify every template at three widths, not just the home page |

## Per-page share layer

Each page carries its own `title`, `description`, `og:title`, `og:description`,
`og:image`, and canonical URL. A case study that unfurls as the homepage wastes the
click.

OG images per page can be generated at build time from the page title using the same
visual language (`§10`). One template, N images, no manual work per post.

## The blog's own requirements

- **RSS.** Cheap, and it is what writers ask for first
- **Dates.** Published, and updated when it materially changes. A post with no date is
  a post nobody trusts
- **Reading time** if the design wants it, computed rather than typed
- **Drafts** that do not publish, and do not leak into RSS or the sitemap
- **Code blocks** with real syntax highlighting done at build time, not a runtime
  highlighter in the `§13` budget
- **Tags** only if there are enough posts to need them. Three posts do not need taxonomy
- **A written post is evidence.** It goes in `EVIDENCE.md` like anything else, and it
  is often the strongest proof a thin portfolio has (`BRAND.md`)

## Handing over the keys

The run does not end at a deployed site. It ends when the subject can publish without
you. Loop 7 delivers, in their repository:

1. How to add a post: the exact file path, the frontmatter fields, one worked example
2. How to preview locally: one command
3. How it goes live: the command, or the git push that triggers it
4. What not to touch: the token file, the shell, the layout templates

Write it as a `CONTRIBUTING.md` in their repo. Test it by following it yourself to
publish one post.

A pipeline that builds a beautiful site the owner cannot update has built them a
dependency, not a portfolio.

## Skip cost

Skipping the architecture decision means defaulting to single page. That is often
right, and it is cheap to be wrong about only while nothing is built yet. Discovering
at Loop 4 that three case studies need their own URLs means rebuilding the shell,
the nav, and the share layer.

Skipping the handover means they come back to you for every post, or stop posting.
