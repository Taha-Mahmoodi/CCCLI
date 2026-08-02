# Deploy — Cloudflare Pages

**When to pick this:** the site is heavy, the audience is global, and unlimited free bandwidth on a fast edge decides it.

---

## Prerequisites

| Need | Check |
|---|---|
| Wrangler | `npx wrangler --version` |
| Authenticated | `npx wrangler whoami` |
| A Pages project | `npx wrangler pages project list` |
| A built site directory | `ls dist/index.html` |

CI reads `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from the
environment. The human creates the token with **Cloudflare Pages: Edit** scope
and exports it. Never commit it, never log it, never echo it (`§15`).

Create the project once:

```bash
npx wrangler pages project create <project> --production-branch main
```

## Snapshot

**Hard rule (`§15`). No snapshot, no deploy.**

```bash
mkdir -p runs/<slug>/snapshot

# Every deployment, newest first. The top production entry is the rollback.
npx wrangler pages deployment list --project-name <project> \
  > runs/<slug>/snapshot/deployments.txt

# Keep the id alone, in one file, so the rollback line is copy-pasteable
grep -Eo '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' \
  runs/<slug>/snapshot/deployments.txt | head -1 > runs/<slug>/rollback-ref.txt

wget --mirror --page-requisites --no-parent --quiet \
  -P runs/<slug>/snapshot/live/ https://<domain>/
```

First deploy: write `NEW-SITE` into `rollback-ref.txt`.

## Deploy

Preview first, on a branch name that is not the production branch:

```bash
npx wrangler pages deploy dist \
  --project-name <project> --branch preview
```

That returns a `<hash>.<project>.pages.dev` URL. Look at it at three widths
(`§14`). Then:

```bash
npx wrangler pages deploy dist \
  --project-name <project> --branch main \
  --commit-message "deploy <slug> $(date -u +%FT%TZ)"
```

Headers and redirects are plain files in the publish directory:

```
# dist/_headers
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

```
# dist/_redirects
https://www.<domain>/*  https://<domain>/:splat  301
/cv                     /resume.pdf              302
```

Both files must land in the uploaded directory, not the source tree. A build
step that does not copy them ships a site with no headers and no redirects.

## Rollback

```bash
npx wrangler pages deployment tail --project-name <project>   # confirm what is live
```

Promote the known-good deployment back to production:

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/<project>/deployments/$(cat runs/<slug>/rollback-ref.txt)/retry" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Or in the dashboard: **Workers & Pages → the project → Deployments → the
previous production deployment → Rollback**. Two clicks and it is done. Every
deployment is retained and immutable, so any past build is a valid target.

Confirm:

```bash
curl -sI https://<domain>/ | head -1
```

## Domain and TLS

Zone on Cloudflare, which is the normal case here:

```bash
npx wrangler pages domain add --project-name <project> <domain>
```

The `CNAME` records are created for you and proxied (orange cloud). Apex flattening
is automatic, so an apex `CNAME` works where other DNS providers would refuse it.

Zone elsewhere:

```
@    CNAME  <project>.pages.dev.     (needs ALIAS/ANAME support)
www  CNAME  <project>.pages.dev.
```

The certificate issues in minutes. Set **SSL/TLS → Full (strict)** and turn on
**Always Use HTTPS**. Pick one canonical host and 301 the other with a
`_redirects` line.

```bash
curl -sI http://<domain>/ | grep -i '^location'
curl -sI https://www.<domain>/ | head -1
```

## Forms and conversion

A Worker, per `loops/05-share.md`. Pages Functions put it in the same project:
a file at `functions/api/contact.js` becomes `POST /api/contact` with no
separate deploy.

```js
// functions/api/contact.js
export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  if (form.get("company")) return Response.json({ ok: true });   // honeypot

  const from = String(form.get("from") ?? "");
  const note = String(form.get("note") ?? "");
  if (!from.includes("@") || note.trim().length < 10)
    return Response.json({ error: "Check the email and the message." }, { status: 400 });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "site@<domain>", to: env.CONTACT_TO,
      reply_to: from, subject: `Portfolio contact from ${from}`, text: note,
    }),
  });
  return Response.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
}
```

Secrets go in **Settings → Variables and Secrets** as encrypted values, read
from `env` at runtime, present in no file in the repository (`§15`). Add a
Cloudflare rate-limiting rule on `/api/contact` before it goes public.

Post it once from the deployed site and confirm the mail lands before Gate C.

## Gotchas

- **25MB per file.** A hero video or an unoptimized PSD-export PNG hits this and
  the whole upload fails, sometimes with a generic error. Check the largest file
  before deploying: `find dist -size +20M`.
- **20,000 files per deployment.** A framework that emits a file per route can
  approach it on a large case-study set.
- **`_headers` and `_redirects` are easy to lose.** They live in the output
  directory. Confirm they shipped: `ls dist/_headers dist/_redirects`.
- **Free tier bandwidth is unlimited, requests are not.** Pages static assets are
  unmetered; Functions invocations are capped at 100,000/day on the free plan. A
  form cannot reach that; a Function on the render path could.
- **Rocket Loader and auto-minify break things.** Cloudflare's optimizations
  reorder scripts and can wreck a WebGL init or an inline module. Turn them off
  for this zone rather than debugging a bug that only exists in production.
- **Preview deployments are public URLs.** Unlisted, not private. Nothing public
  before Gate C (`§16`).
