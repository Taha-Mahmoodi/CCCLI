# Loop 7 — Deploy

**Goal:** put it live on the infrastructure they chose, reversibly.

**Input:** the built site, the target from Gate A.

**Output:** a live URL, and a documented rollback.

---

## The conductor runs this. Never delegate it.

Deploy holds credentials and it is the irreversible step. It is not agent work.

## Gate C comes first — hard rule (`§16`)

Nothing becomes publicly visible under someone's name before they have seen it.

Loop 8 exists because a static screenshot and the live render are not the same
claim (`§14`) — but Gate C happens before deploy, so it cannot review the live
site yet. What it reviews instead should be as close to real as it can get.

### Red-team it first

Before building the preview, dispatch `credibility-auditor` against the
finished site. Loop 3's prose passes and Loop 2a's category-reflex check were
both self-applied — the same agent grading its own work. This is the
independent second read, on the built site rather than a sketch: voice drift
against `BRIEF.md`, claim framing against `EVIDENCE.md`, the category-reflex
test run again now that it's real, and a check against `showcase/` for a
pattern-match.

It does not fix anything and it does not gate anything on its own — fold its
findings into what Gate C shows the human, so their judgment spends its time
on real decisions instead of catching what a second reader already could
have.

### Build the preview

**On Claude Code — publish it as an Artifact, not a screenshot.** This works
better than it sounds, because `§9` and `§10` already did the hard part: a
correctly built site has no CDN, no hotlinked image, no external request of
any kind — which is exactly what an Artifact requires. Flatten the built page
into one self-contained file (inline the stylesheet, inline each vendored
library's actual content as a `<script>` tag, embed images the page needs for
this review) and publish it. The human gets the real interactive render —
hover states, scroll-triggered motion, the WebGL layer running — inside the
side panel, not a static image standing in for it. For a multi-page site,
publish the home page plus one page per distinct template; a case study and a
blog post that share a template do not each need their own review artifact.

Large image sets can make a fully inlined file unwieldy. When that happens,
say so and fall back rather than silently shipping a slow or broken preview.

**Fallback, still on Claude Code.** When a technique genuinely cannot be
flattened — it depends on real file paths, a service worker, or something
else an inlined single file cannot fake — serve the build locally, take real
screenshots with a headless browser, or open it in an actual browser
alongside the human and look at it together. Reviewing it live, side by side,
beats a screenshot even when an Artifact is not possible.

**On any other platform.** Serve the built site locally and preview it there
— the platform's own dev server if it has one, otherwise a plain static
server. Whatever browser automation that platform provides takes it from
there; failing that, the human opens `localhost` themselves and confirms.
Local-and-live still differ (`§14`), but a live local render clears a much
lower bar of doubt than an image ever could.

> ## Gate C — human decision
>
> Show the preview — the Artifact, the live local render, or the browser
> looked at together, whichever tier applied — and `credibility-auditor`'s
> findings alongside it. Walk the copy. State what is about to happen, to
> which host, at which URL, and what the rollback is. Get an explicit yes.
>
> **This gate cannot be skipped, collapsed, or assumed.** Not for time pressure, not
> because earlier gates were skipped, not because the human said "just ship it"
> three loops ago. Approval to build is not approval to publish.
>
> A preview clears this gate. It does not replace Loop 8 — the live URL still
> gets its own look once it exists.

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

## Optional: a monitor that lives with the site

Offer this once, alongside `CONTRIBUTING.md`. Not automatic — ask.

A site left alone rots the same way `loops/09-rerun.md`'s rot check describes,
and nobody notices until they send the link to someone and it's broken. A yes
writes one more file into **their** repository:
`.github/workflows/portfolio-monitor.yml` — a scheduled GitHub Action, weekly by
default, that curls the live URL, checks the TLS certificate isn't close to
expiring, and runs a link check. On a failure it opens (or updates) a GitHub
Issue in their own repo and stops. **It never fixes anything, never redeploys,
and never runs Loop 9 itself** — alert only, so `§15` and `§16` hold by
construction instead of by discipline. On the next clean run, it closes the
issue it opened.

No third-party service, no webhook to configure, nothing beyond the token
GitHub Actions already provides. It runs on GitHub's infrastructure whether or
not any agent is around to notice — the site's own repo is what remembers to
check on it. And it's removable exactly like `§19`'s attribution credit: tell
them the file is there and that deleting it is fine.

## Record it

Into `runs/<slug>/REPORT.md`: the live URL, the target, the deploy command that ran,
the rollback command, the snapshot location, and the date.

The rollback goes in the report because the person who needs it will be reading the
report, at speed, at a bad moment.

## Skip cost

Skipping deploy is a legitimate end state — handoff mode. The output is a build
folder and instructions, and the human deploys it themselves. Say so plainly rather
than implying the site is live.
