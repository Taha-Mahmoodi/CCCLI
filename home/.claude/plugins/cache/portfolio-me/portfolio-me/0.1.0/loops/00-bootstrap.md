# Loop 0 — Bootstrap

**Goal:** confirm you can actually do the work before you promise any of it.

**Output:** a capability line in `runs/<slug>/REPORT.md`. Nothing else.

---

## The eight capabilities

| # | Capability | Native check | If missing |
|---|---|---|---|
| 1 | **Shell + git** | `git --version` | Stop. Nothing works without it. |
| 2 | **GitHub API** | `gh auth status` | `gh auth login`, or skip the scrape half of Loop 1c and say so |
| 3 | **Web fetch / search** | your own tools | Loop 1c peer analysis is unavailable; record the skip |
| 4 | **Headless browser** | `browse` skill, or Playwright | Loops 2b, 4, and 7 lose their screenshots. This is the one to fix. |
| 5 | **Image generation** | `imagegen-frontend-web` or equivalent | Loop 2a runs as written concepts instead of images; Gate B1 gets worse |
| 6 | **Image sampling** | `python3 -c "import PIL"` | `pip install Pillow`, or use ImageMagick, or `§8` gets guessed |
| 7 | **Prose skills** | `stop-slop`, `copywriting`, `ogilvy` | Install via `find-skills`. Loop 3 degrades without them |
| 8 | **Deploy CLI** | depends on target — see below | Loop 6 becomes handoff mode |

Check them, report what you have in one line, and move on. Do not spend a long time
here.

## The deploy CLI

Cannot be checked until the target is known, which happens in Loop 1a. Re-run this
row after Gate A.

| Target | Check |
|---|---|
| GitHub Pages | `gh auth status` |
| Netlify | `netlify --version` |
| Vercel | `vercel --version` |
| Cloudflare Pages | `wrangler --version` |
| VPS (nginx or Docker) | `ssh <host> 'echo ok'`, then `docker --version` on the host if relevant |
| cPanel | `lftp --version` or `curl --version` with FTPS |
| S3 + CloudFront | `aws sts get-caller-identity` |
| Handoff | nothing |

Missing CLI is not a blocker. Say which one, offer to install it, and continue —
the target only has to work by Loop 6.

## Set up the run

```bash
mkdir -p runs/<slug>/{shots,prototypes,inbox}
cp runs/_template/*.md runs/<slug>/
```

`<slug>` is the subject's handle or name, lowercased and hyphenated. `inbox/` is
where the human drops documents for Loop 1b. Tell them it exists now, so the
material is there by the time you need it.

## What not to do here

Do not research the subject. Do not propose a design. Do not ask the interview
questions — those belong to Loop 1a and they work better when they open the
conversation rather than following a capability audit.

## Skip cost

Skipping bootstrap costs you a failure in Loop 6 or 7 instead of a two-minute check
in Loop 0. Nothing else. It is the cheapest loop to run and the most annoying one
to have skipped.
