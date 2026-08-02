# Avaye Zaryab — Headless WordPress Backend

The content backend for **Avaye Zaryab** (آوای زریاب): a headless WordPress theme
that exposes structured content through a clean API for a separate Next.js
front-end.

> A [Cyborg Tech Creative Agency](https://github.com/CyborgTech-co) project.
> Front-end: [`zaryab`](https://github.com/CyborgTech-co/zaryab).

---

## What it does

- **Headless CMS** — WordPress owns the content; the front-end owns the rendering
- **Custom post types** — structured content modeled with CPTs
- **Advanced Custom Fields** — rich, editor-friendly fields on every type
- **API-first** — content served to the front-end over the WordPress REST API

## Tech stack

| Layer | Technology |
|---|---|
| CMS | WordPress (headless) |
| Content model | ACF + Custom Post Types |
| API | WordPress REST API |
| Language | PHP |

## Structure

```text
zaryab_backend/
  functions.php     # Theme setup, CPTs, ACF, API wiring
  includes/         # Supporting PHP modules
  page-*.php        # Page templates
  style.css         # Theme header and base styles
  index.php         # Entry
```

## Getting started

1. Copy the theme into `wp-content/themes/` and activate it.
2. Install and activate **Advanced Custom Fields**.
3. Register the field groups and post types the front-end expects.
4. Point the [`zaryab`](https://github.com/CyborgTech-co/zaryab) front-end at
   this site's API base URL.
