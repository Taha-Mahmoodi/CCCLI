# Loop 6 — Deploy

**Goal:** put it live on the infrastructure they chose, reversibly.

**Input:** the built site, the target from Gate A.

**Output:** a live URL, and a documented rollback.

---

## The conductor runs this. Never delegate it.

Deploy holds credentials and it is the irreversible step. It is not agent work.

## Gate C comes first — hard rule (`§16`)

Nothing becomes publicly visible under someone's name before they have seen it.

> ## Gate C — human decision
>
> Show the local screenshots: three widths, both color modes, reduced motion. Walk
> the copy. State what is about to happen, to which host, at which URL, and what
> the rollback is. Get an explicit yes.
>
> **This gate cannot be skipped, collapsed, or assumed.** Not for time pressure, not
> because earlier gates were skipped, not because the human said "just ship it"
> three loops ago. Approval to build is not approval to publish.

## Confirm the identity — hard rule (`§20`)

Before the first push and again before deploy:

```bash
git config user.email          # the subject's, not yours
gh auth status                 # the account that owns the target repo
```

Forging for someone else means using their authenticated identity, then switching
back afterward. A commit credited to the wrong person is a real problem. Deploy
credentials belong to the subject.

## Snapshot before you overwrite — hard rule (`§15`)

Whatever is live now gets captured before it stops being live.

```bash
# git-backed targets
git rev-parse HEAD > runs/<slug>/rollback-ref.txt

# file-backed targets
ssh <host> 'tar czf ~/site-backup-<date>.tar.gz /var/www/<site>'

# platform targets
netlify api listSiteDeploys --data '{"site_id":"…"}' | head
```

No snapshot, no deploy. A bad deploy with a snapshot is an inconvenience. A bad
deploy without one destroyed something.

## Credentials

Never committed, never logged, never echoed into the transcript. Read from the
environment or the host's own credential store. If a token has to be created, the
human creates it and pastes it into their environment — you do not handle it.

## The adapters

One file each in [`../deploy/`](../deploy). Every adapter documents: prerequisites,
the deploy command, the rollback command, DNS and TLS, and the verification URL.

| Target | Adapter |
|---|---|
| GitHub Pages | [`pages.md`](../deploy/pages.md) |
| Netlify | [`netlify.md`](../deploy/netlify.md) |
| Vercel | [`vercel.md`](../deploy/vercel.md) |
| Cloudflare Pages | [`cloudflare.md`](../deploy/cloudflare.md) |
| VPS — nginx | [`vps-nginx.md`](../deploy/vps-nginx.md) |
| VPS — Docker | [`vps-docker.md`](../deploy/vps-docker.md) |
| cPanel / shared | [`cpanel.md`](../deploy/cpanel.md) |
| S3 + CloudFront | [`s3.md`](../deploy/s3.md) |
| Handoff / local | [`handoff.md`](../deploy/handoff.md) |

## Domain and TLS

Custom domain: set the DNS records, wait for propagation, confirm the certificate
issued before declaring it done. `https://` has to work, `http://` has to redirect
to it, and the apex and `www` both have to resolve somewhere deliberate.

A site that only answers on one of the two is half-deployed.

## Hand over the keys

The run does not end at a deployed site. It ends when the subject can publish
without you.

This matters most with a blog. If adding a post requires an agent run, they will not
add posts, and a blog with three old entries reads as evidence they stopped. It
applies to any site: a portfolio the owner cannot update is a dependency, not an
asset.

Write a `CONTRIBUTING.md` in **their** repository covering:

1. **How to add a post or project** — exact file path, the frontmatter fields, one
   complete worked example they can copy
2. **How to preview locally** — one command
3. **How it goes live** — the command, or the git push that triggers it
4. **What not to touch** — the token file, the shell, the layout templates, and what
   breaks if they do

Then test it: follow your own instructions to publish one post. Instructions that
were written but never followed do not work.

## Record it

Into `runs/<slug>/REPORT.md`: the live URL, the target, the deploy command that ran,
the rollback command, the snapshot location, and the date.

The rollback goes in the report because the person who needs it will be reading the
report, at speed, at a bad moment.

## Skip cost

Skipping deploy is a legitimate end state — handoff mode. The output is a build
folder and instructions, and the human deploys it themselves. Say so plainly rather
than implying the site is live.
