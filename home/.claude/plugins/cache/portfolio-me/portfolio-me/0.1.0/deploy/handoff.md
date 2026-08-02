# Deploy — Handoff / local

**When to pick this:** nobody is putting this online today, and the deliverable is the folder plus everything needed to publish it later.

---

**This site is not live.** Handoff is a legitimate end state
(`loops/06-deploy.md`), and the one way it fails is by being described in
language that lets someone assume otherwise. No URL exists. Nothing is publicly
visible. Say that in the first line of the handover message, in `REPORT.md`, and
in the README that ships with the folder.

## Prerequisites

Nothing to authenticate, which is the point. What has to exist before the folder
leaves:

| Need | Check |
|---|---|
| A build that runs clean from scratch | `rm -rf dist && npm run build` |
| Or hand-authored HTML with no build | `ls index.html` |
| Every dependency vendored (`§9`) | `grep -rn "https://cdn\|googleapis" --include='*.html' --include='*.css' .` |
| Zero console errors and zero 404s | Open it and look |
| Gate C passed | The human has seen the real thing |

Gate C still applies. It is a hard rule (`§16`) and it is about the subject
seeing their own site before it is handed to anyone, including them.

The CDN grep must come back empty. A site handed over with a live CDN reference
works on the day of the handoff and breaks on a day nobody is watching.

## Snapshot

Nothing is live, so nothing is being overwritten. `§15` still gets satisfied,
because the state that matters is the exact source that produced this build.

```bash
git tag -a handoff-$(date -u +%Y%m%d) -m "handoff build for <subject>"
git rev-parse HEAD > runs/<slug>/rollback-ref.txt

mkdir -p runs/<slug>/snapshot
tar czf runs/<slug>/snapshot/handoff-$(date -u +%Y%m%d).tar.gz dist/
shasum -a 256 runs/<slug>/snapshot/handoff-*.tar.gz \
  > runs/<slug>/snapshot/handoff.sha256
```

The checksum settles the "is this the same folder you sent me" question later,
after it has been through email, a Drive folder, and a zip on someone's desktop.

## Deploy

There is no deploy. The step is assembling the handover so someone else can do
it without asking a question.

```
<subject>-portfolio/
├── README.md            run instructions, first line says it is not live
├── site/                the built output, ready to upload as-is
├── src/                 source, including the design tokens and CSS layer
├── assets/
│   └── LICENSES.md      every font, image, and library with its licence
├── deploy/
│   └── <target>.md      the adapter they will eventually want
└── runs/<slug>/
    ├── BRIEF.md  DIRECTION.md  COPY.md  EVIDENCE.md
    ├── shots/           the approved screenshots
    └── REPORT.md
```

`README.md` covers, in this order:

1. **This site is not live.** One line, at the top, unqualified.
2. **Look at it now.** `cd site && python3 -m http.server 8000`, then
   `http://localhost:8000`. Opening `index.html` with a `file://` path breaks
   module scripts and fetches, so give the server command rather than letting
   someone discover that alone.
3. **Rebuild it**, when there is a build step: the runtime version, `npm ci`,
   `npm run build`, and which directory the output lands in.
4. **Publish it**, pointing at the adapter in `deploy/` with the target already
   chosen, and naming the DNS records they will need.
5. **Change the text**, naming the file. Someone will want to update a job title
   in eighteen months without opening a terminal.
6. **The attribution line** (`§19`): it is in the footer, deleting it is fine,
   and it will not be re-added.
7. **What is not included.** No analytics, no form backend, no domain.

`LICENSES.md` lists every font with its licence and whether web embedding is
covered, every image with its origin, and every vendored library with its
licence file. A commercial font licensed for comps and shipped as a `woff2` is
a legal problem handed to someone who does not know they are holding it.

Ship the archive with its checksum:

```bash
tar czf <subject>-portfolio-$(date -u +%Y%m%d).tar.gz <subject>-portfolio/
shasum -a 256 <subject>-portfolio-*.tar.gz
```

## Rollback

Nothing to roll back. Nothing changed for anyone.

If the folder is superseded before it is ever published, the tag is the
reference:

```bash
git checkout "$(cat runs/<slug>/rollback-ref.txt)"
```

The real risk on this target runs the other direction: a handoff folder that
gets uploaded by someone else, months later, with no snapshot of whatever it
replaced. Put that warning in the README next to the publish instructions, and
point at the adapter's Snapshot section rather than restating it.

## Domain and TLS

None. No DNS record was created, no certificate was requested, and no hostname
resolves to this site.

Write down what the eventual publish will need, so it is answered before it is
asked:

| Question | Recorded in the README |
|---|---|
| Is a domain registered? | Registrar, or "none yet" |
| Who controls DNS? | The account that can create records |
| Apex, `www`, or both? | The decision, not the default |
| Which target? | The adapter already in `deploy/` |

A subject who has never bought a domain needs one sentence about what it costs
and where, and that certificates are free and automatic on every target in this
directory.

## Forms and conversion

The conversion path is coupled to the deploy target (`loops/05-share.md`), and
no target has been picked. What ships here works everywhere:

- **`mailto:` or a link out.** Static, hostless, unbreakable, correct on all
  nine targets. This is the default in handoff mode.
- **A third-party endpoint** already wired and tested, when the human wants it
  now: Formspree or Tally. Test it before the folder leaves, because nobody
  else will.

Do not ship a form that posts nowhere. An unwired `<form>` in the handoff folder
becomes a live form that silently drops every message the moment someone
uploads it. Either wire it and test it, or make the contact path a link.

Note in the README which section of the site changes when a target is chosen,
so the upgrade is a known edit and not an archaeology exercise.

## Gotchas

- **"Here is the site" reads as "the site is live."** Say it is not live, in the
  message, in the README, and in `REPORT.md`.
- **The build works only on the machine that built it.** Delete `node_modules`
  and `dist`, clone into a clean directory, and run the README instructions
  verbatim. A missing runtime version in the README costs a day later.
- **Absolute paths.** A site built for a domain root breaks when someone opens
  it from a subdirectory or a `file://` path. Use relative paths, and say which
  assumption was made.
- **Fonts, licensing.** The most common licence violation in a handoff. Check
  the web-embedding term for every font before it ships.
- **The folder arrives without the source.** Only `site/` gets forwarded, the
  source is lost, and the next edit is a rebuild from scratch. Ship one archive,
  with a checksum, containing both.
- **Someone publishes it and nobody records where.** Ask for the URL when it
  happens, and get it into `REPORT.md`.
- **Screenshots stand in for verification.** Handoff skips the live check in
  `loops/07-verify.md` by definition. Record that in `SKIPS.md` with its cost
  (`§18`): nobody has confirmed how this renders on a real host.
