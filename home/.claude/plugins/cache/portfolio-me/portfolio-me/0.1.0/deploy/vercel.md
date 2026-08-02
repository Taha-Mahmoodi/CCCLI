# Deploy — Vercel

**When to pick this:** the contact path needs server code, the site is otherwise static, and per-commit preview URLs are worth the account.

---

## Prerequisites

| Need | Check |
|---|---|
| Vercel CLI | `vercel --version` (`npm i -g vercel`) |
| Authenticated | `vercel whoami` |
| Project linked to this directory | `vercel link` then `cat .vercel/project.json` |
| A built site directory | `ls dist/index.html` |

Non-interactive shells read `VERCEL_TOKEN` from the environment. The human
creates it and exports it. Never commit it, never log it, never echo it (`§15`).

`.vercel/` goes in `.gitignore`. It holds the project and org ids.

**Static or SSR.** Static. A portfolio has no per-request state, no
authentication, and no data that changes between two visitors. SSR buys nothing
here and costs a cold start on the LCP path, which `§13` will not absorb. Ship
static output and use one serverless function for the form. Reach for SSR only
when something on the page genuinely cannot be known at build time.

## Snapshot

**Hard rule (`§15`). No snapshot, no deploy.**

```bash
mkdir -p runs/<slug>/snapshot

# The deployment currently aliased to production. This URL is the rollback.
vercel ls --prod > runs/<slug>/snapshot/deployments.txt
vercel inspect <domain> > runs/<slug>/snapshot/live-deployment.txt

# Pull the exact production URL out and keep it alone in one file
grep -Eo 'https://[a-z0-9-]+\.vercel\.app' runs/<slug>/snapshot/live-deployment.txt \
  | head -1 > runs/<slug>/rollback-ref.txt

wget --mirror --page-requisites --no-parent --quiet \
  -P runs/<slug>/snapshot/live/ https://<domain>/
```

First deploy: write `NEW-SITE` into `rollback-ref.txt`.

## Deploy

Preview first. Every deploy without `--prod` gets its own immutable URL, which
is the thing to screenshot and check before anything public moves.

```bash
vercel                      # preview URL, nothing public changes
```

Look at it at three widths (`§14`). Then:

```bash
vercel --prod
```

`vercel.json` at the repo root:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": [
    { "source": "/cv", "destination": "/resume.pdf", "permanent": false }
  ]
}
```

Hand-authored HTML with no build step needs no `builds` key. Vercel serves the
repository root as static by default.

## Rollback

```bash
vercel rollback "$(cat runs/<slug>/rollback-ref.txt)"
```

Bare `vercel rollback` reverts to the immediately previous production
deployment, which is right when the bad deploy is the one that just happened.
The explicit URL is right when several have stacked up. Deployments are
immutable, so the target is guaranteed to be exactly what was live.

Confirm:

```bash
curl -sI https://<domain>/ | head -1
vercel inspect <domain> | grep -i age
```

## Domain and TLS

```bash
vercel domains add <domain>
vercel domains inspect <domain>     # prints the records to create
```

External registrar:

```
@    A      76.76.21.21
www  CNAME  cname.vercel-dns.com.
```

Vercel issues the certificate automatically once the records resolve, covering
both the apex and `www`. Set the canonical host in **Project → Settings →
Domains** by marking one as a redirect to the other. `http://` to `https://` is
handled by the platform and needs no configuration.

```bash
curl -sI http://<domain>/ | grep -i '^location'
curl -sI https://www.<domain>/ | head -1
```

## Forms and conversion

Serverless function, per `loops/05-share.md`. One file in `api/`.

```js
// api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { from = "", note = "", company = "" } = req.body ?? {};
  if (company) return res.status(200).json({ ok: true });        // honeypot
  if (!from.includes("@") || note.trim().length < 10)
    return res.status(400).json({ error: "Check the email and the message." });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "site@<domain>",
      to: process.env.CONTACT_TO,
      reply_to: from,
      subject: `Portfolio contact from ${from}`,
      text: note,
    }),
  });

  return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
}
```

The API key lives in `vercel env add RESEND_API_KEY production`, read at runtime
from `process.env`, and appears in no file in the repository (`§15`).

Post it once from the deployed site and confirm the mail arrives before Gate C.

## Gotchas

- **Function region latency.** A function defaults to `iad1` regardless of where
  the subject is. The static site is on the edge; the form POST is not. It is
  fine for a form and wrong for anything on the render path, which is one more
  reason the page itself stays static.
- **Rate limiting is not free.** The function is a public POST endpoint. Add a
  Vercel Firewall rule or a Redis-backed counter before it starts collecting
  spam.
- **Framework auto-detection guesses wrong.** A repo with a stray
  `package.json` gets treated as a Next.js project and the build fails on a
  hand-authored site. Set the framework to Other in project settings.
- **Preview URLs are public.** They are unlisted, not private. Unreleased work
  sits on a guessable-if-leaked URL. Do not paste one anywhere before Gate C.
- **Free tier is non-commercial.** A portfolio that sells services is a
  commercial use by Vercel's terms. Check before pointing a client's site here.
- **`vercel` without `--prod` changes nothing live.** Same failure mode as every
  platform in this directory: reading "Deployed" and assuming it is public.
