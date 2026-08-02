# Deploy — Netlify

**When to pick this:** the site needs a working contact form and nobody wants to run a server for it.

---

## Prerequisites

| Need | Check |
|---|---|
| Netlify CLI | `netlify --version` (`npm i -g netlify-cli`) |
| Authenticated | `netlify status` |
| A site linked to this directory | `netlify link` then `netlify status` |
| A built site directory | `ls dist/index.html` |

CI or a non-interactive shell reads `NETLIFY_AUTH_TOKEN` from the environment.
The human creates that token and exports it themselves. Never commit it, never
log it, never echo it into the transcript (`§15`).

## Snapshot

**Hard rule (`§15`). No snapshot, no deploy.**

```bash
mkdir -p runs/<slug>/snapshot
SITE_ID=$(netlify api getSite --data '{}' | jq -r .id)

# The deploy that is live right now. This id is the rollback.
netlify api listSiteDeploys --data "{\"site_id\":\"$SITE_ID\"}" \
  | jq '[.[] | select(.state=="ready")][0] | {id, created_at, commit_ref}' \
  > runs/<slug>/snapshot/live-deploy.json

jq -r .id runs/<slug>/snapshot/live-deploy.json > runs/<slug>/rollback-ref.txt

# The bytes, in case the account itself is the thing that goes wrong
wget --mirror --page-requisites --no-parent --quiet \
  -P runs/<slug>/snapshot/live/ https://<domain>/
```

First deploy to a fresh site: write `NEW-SITE` into `rollback-ref.txt`.

## Deploy

Draft first. Always. It is free, it is instant, and it is the last chance to
look at the real thing on the real CDN before it carries the subject's name.

```bash
# Preview build, a throwaway URL, nothing public changes
netlify deploy --dir=dist --message "draft <slug> $(date -u +%FT%TZ)"
```

Open the draft URL, screenshot it at three widths, confirm it (`§14`). Then:

```bash
netlify deploy --prod --dir=dist \
  --message "deploy <slug> $(date -u +%FT%TZ)"
```

`netlify.toml` at the repo root, for headers and redirects:

```toml
[build]
  publish = "dist"
  command = "npm run build"     # omit both lines for hand-authored HTML

[[redirects]]
  from = "https://www.<domain>/*"
  to = "https://<domain>/:splat"
  status = 301
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Rollback

```bash
SITE_ID=$(netlify api getSite --data '{}' | jq -r .id)
netlify api restoreSiteDeploy --data "{
  \"site_id\":\"$SITE_ID\",
  \"deploy_id\":\"$(cat runs/<slug>/rollback-ref.txt)\"
}"
```

Or in the UI: **Deploys → the previous ready deploy → Publish deploy**. Two
clicks, effective in seconds, no rebuild. Every deploy is retained as an
immutable atomic snapshot, so any past deploy is a valid rollback target.

Confirm:

```bash
curl -sI https://<domain>/ | head -1
```

## Domain and TLS

Two ways. Netlify DNS is the one that fails least.

**Netlify DNS.** Point the registrar's nameservers at the four Netlify servers
shown in the dashboard. Apex, `www`, and the certificate all resolve
automatically.

**External DNS.**

```
@    ALIAS/ANAME  apex-loadbalancer.netlify.com.
www  CNAME        <site-name>.netlify.app.
```

A registrar with no `ALIAS`/`ANAME` support forces the apex onto a fixed `A`
record at `75.2.60.5`, which is documented but less resilient. Prefer moving
DNS to Netlify over pinning an IP.

```bash
netlify api addDomain --data "{\"site_id\":\"$SITE_ID\",\"domain\":\"<domain>\"}"
```

Let's Encrypt issues once the DNS check passes. Pick one canonical host in the
dashboard, apex or `www`, and let the other 301 to it.

```bash
curl -sI http://<domain>/ | grep -i '^location'
curl -sI https://www.<domain>/ | head -1
```

## Forms and conversion

Netlify Forms is native, which is the reason this target exists in the list
(`loops/05-share.md`).

```html
<form name="contact" method="POST" data-netlify="true"
      netlify-honeypot="company-website" action="/thanks/">
  <p hidden><label>Leave blank: <input name="company-website"></label></p>

  <label for="from">Email</label>
  <input id="from" name="from" type="email" required>

  <label for="note">What are you working on?</label>
  <textarea id="note" name="note" required></textarea>

  <button type="submit">Send</button>
</form>
```

Notification email is configured in **Site settings → Forms → Form
notifications**. 100 submissions/month on the free tier.

The honeypot is a real field with a real label, hidden from sight, ignored by
humans and filled by bots. It stays keyboard-reachable and labelled (`§12`).

Submit it once for real, from the deployed site, before Gate C. A form that was
written but never sent does not exist.

## Gotchas

- **Build-time detection.** Netlify finds forms by parsing the HTML it receives
  at deploy time. A form injected by JavaScript after load is invisible to the
  parser and posts into a 404. Ship a static form in the HTML, or add a hidden
  static copy alongside the dynamic one.
- **`--dir` and `netlify.toml` disagree.** The CLI flag wins. Deploying with
  `--dir=.` when `publish = "dist"` uploads the source tree, including
  `node_modules`, and publishes an empty site.
- **Missing `--prod` is silent.** `netlify deploy` without it produces a draft
  URL and changes nothing live. Reading "Deploy complete" and assuming the site
  is live is the classic mistake here.
- **The honeypot name must not collide** with a real field name, or every
  legitimate submission is dropped as spam with no error anywhere.
- **`_redirects` and `netlify.toml`.** Both work; `netlify.toml` rules evaluate
  first. Splitting rules between the two makes ordering unreadable. Pick one.
- **Form submissions are not in the deploy snapshot.** Rolling back a deploy does
  not restore or remove collected data. Export it separately if it matters.
