# Deploy — GitHub Pages

**When to pick this:** the site is static, the subject already lives on GitHub, and free hosting on a repo they control is worth more than a form endpoint.

---

## Prerequisites

| Need | Check |
|---|---|
| `git` | `git --version` |
| `gh` CLI, authenticated | `gh auth status` |
| A repo the subject owns | `gh repo view <owner>/<repo> --json name,visibility` |
| Pages enabled (or enable it below) | `gh api repos/<owner>/<repo>/pages` |
| A built site directory | `ls dist/index.html` |

Public repo, or a paid plan. Pages on a private repo requires GitHub Pro or an
organization plan and will 404 silently otherwise.

Pick one publish mode and record it in `REPORT.md`:

| Mode | Source | Use when |
|---|---|---|
| `gh-pages` branch | branch root | Hand-authored or locally built output. The default here |
| `docs/` folder | `main` → `/docs` | No build step, no second branch to reason about |
| Actions workflow | build artifact | Astro or any build that should run on push |

## Snapshot

**Hard rule (`§15`). No snapshot, no deploy.**

```bash
mkdir -p runs/<slug>/snapshot

# The commit that is currently published
git fetch origin
git rev-parse origin/gh-pages > runs/<slug>/rollback-ref.txt

# The Pages configuration (source branch, custom domain, HTTPS enforcement)
gh api repos/<owner>/<repo>/pages > runs/<slug>/snapshot/pages-config.json

# The live bytes, if something is already serving there
wget --mirror --page-requisites --no-parent --quiet \
  -P runs/<slug>/snapshot/live/ https://<domain>/
```

If `origin/gh-pages` does not exist yet, write `NEW-SITE` into `rollback-ref.txt`
so the report says plainly that rollback means deleting the branch.

## Deploy

```bash
# Publish dist/ to the gh-pages branch, no extra dependency
git worktree add /tmp/gh-pages-publish gh-pages 2>/dev/null \
  || git worktree add -b gh-pages /tmp/gh-pages-publish

rsync -a --delete --exclude '.git' dist/ /tmp/gh-pages-publish/
touch /tmp/gh-pages-publish/.nojekyll
echo "<domain>" > /tmp/gh-pages-publish/CNAME   # only if a custom domain is used

git -C /tmp/gh-pages-publish add -A
git -C /tmp/gh-pages-publish commit -m "deploy: <slug> $(date -u +%FT%TZ)"
git -C /tmp/gh-pages-publish push origin gh-pages
git worktree remove /tmp/gh-pages-publish
```

Point Pages at the branch once:

```bash
gh api -X POST repos/<owner>/<repo>/pages \
  -f 'source[branch]=gh-pages' -f 'source[path]=/'
```

Actions mode instead of the branch:

```yaml
# .github/workflows/deploy.yml
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - uses: actions/deploy-pages@v4
```

Verify with eyes, not a status code (`§14`).

```bash
curl -sI https://<domain>/ | head -1
```

## Rollback

```bash
git push --force-with-lease origin \
  "$(cat runs/<slug>/rollback-ref.txt)":gh-pages
```

New site, nothing to restore:

```bash
gh api -X DELETE repos/<owner>/<repo>/pages
git push origin --delete gh-pages
```

Propagation through GitHub's CDN takes up to a minute. Re-check with a cache
buster: `curl -sI "https://<domain>/?$(date +%s)"`.

## Domain and TLS

Apex `A` records, plus `AAAA` if the registrar supports it:

```
@   A     185.199.108.153
@   A     185.199.109.153
@   A     185.199.110.153
@   A     185.199.111.153
www CNAME <user>.github.io.
```

Subdomain only: a single `CNAME` to `<user>.github.io.` and nothing at the apex.

The `CNAME` file in the publish root must contain exactly one hostname. GitHub
issues the Let's Encrypt certificate after the DNS check passes, usually inside
fifteen minutes. Then turn on the redirect:

```bash
gh api -X PUT repos/<owner>/<repo>/pages -F https_enforced=true
```

Confirm both directions:

```bash
curl -sI http://<domain>/  | grep -i '^location'   # expect https://
curl -sI https://www.<domain>/ | head -1           # expect 200 or a 301 to apex
```

## Forms and conversion

No server, no POST handling. Per `loops/05-share.md`, the options are `mailto:`,
Formspree, Tally, or a link out to a calendar or an existing profile.

| Option | Cost | Note |
|---|---|---|
| `mailto:` | none | Honest and unbreakable. Exposes the address to scrapers |
| Formspree | free tier | Third-party POST endpoint. Add the honeypot field |
| Tally / Typeform | free tier | Full page or embed. An iframe conflicts with `§9`, so link out instead of embedding |
| Link out | none | Calendar, LinkedIn, or the résumé PDF |

Whichever it is, submit it end to end before Gate C and confirm the message
arrives. Any third-party key goes in the form action URL only. Never commit,
log, or echo a credential (`§15`).

## Gotchas

- **Project site subpath.** `<user>.github.io/<repo>/` breaks every absolute
  path. `/assets/x.css` resolves to the domain root and 404s. Use relative paths,
  or set the framework's base to `/<repo>/`. A user site (`<user>.github.io`,
  repo named exactly that) serves from the root and has no such problem. This is
  the single most common way a Pages deploy renders unstyled.
- **`.nojekyll`.** Without it, Jekyll strips every path beginning with an
  underscore. Astro's `_astro/` directory disappears and the site loads naked.
- **The `CNAME` file gets wiped.** Any deploy that replaces the branch contents
  without rewriting `CNAME` drops the custom domain and the certificate has to
  reissue. The `echo` line above is not optional.
- **Limits.** 1GB repository, 100MB per file, 100GB/month soft bandwidth, 10
  builds per hour. A video-heavy portfolio hits the file limit first.
- **Cache.** Pages serves with a 10-minute CDN TTL. A deploy that looks like it
  did nothing usually did.
- **Case sensitivity.** The CDN is case-sensitive; macOS is not. `Hero.jpg`
  referenced as `hero.jpg` works locally and 404s live.
