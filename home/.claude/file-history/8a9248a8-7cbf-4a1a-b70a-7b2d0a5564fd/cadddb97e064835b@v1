# Principles

These are the rules that separate a forged portfolio from a templated one. Every
loop enforces them.

Five of them are **hard** (`§5`, `§12`, `§15`, `§16`, `§20`) — they cannot be skipped,
waived, or traded away, because they are about integrity rather than quality. They
are marked **[HARD]**. Everything
else in this pipeline is skippable by the human, at a stated cost (see
[`SKIPPING.md`](./SKIPPING.md)).

---

## 0. Intake before anything. Get the vision and the strategy in their words.

Before you research, design, or build, get the human's intent — the vision *and*
the brand. Ask open-ended, provoking questions, one at a time. Never hand them a
multiple-choice list when the answer should be theirs.

- **The vision.** How should it *feel* in the first three seconds, before a word is
  read? Invite references — sites, images, a moodboard, a song, a building.
- **The strategy.** Who is it for, what decision are they making, what should be
  said about them in a room they're not in.
- **Must-haves.** Anything they explicitly want in it.
- **Explicit do-nots.** Colors, tropes, words, styles, an ex-employer. Honor these
  absolutely.

If they don't know yet, don't stall — offer directions and let them react.
Everything downstream serves this intake. Record it; check every later decision
against it.

## 1. Creativity is the baseline, not a mode you switch on.

At every design decision, in every loop, **the obvious answer is the failure mode.**
The expected hero, the default card grid, the seen-it-before scroll — those are
bugs. Generate genuinely novel options and choose the boldest one that still serves
the subject and the vision. A safe, predictable choice anywhere is a rule violation.

## 2. Think out of the box — as a hard rule, everywhere.

At each point, ask "what would nobody expect here, that would still be *right*?" —
and reach for that. Out-of-the-box is the floor, not the ceiling.

## 3. Reinvent every component, every run. Nothing is a template.

The styles in [`STYLES.md`](./STYLES.md) and the techniques in
[`CRAFT.md`](./CRAFT.md) are a **starting position, never a destination.** Ship a
named style unmodified and the run failed.

- Invent this subject's **navigation**, **project presentation**, and **section
  transitions** fresh. Do not reuse a previous run's answer.
- Every run states in `DIRECTION.md` **what it did to the style that nobody else
  does** — the collision, subversion, or invention applied.
- If someone could pattern-match your output to a previous run, it failed.

## 4. Propose; don't just execute. Offer ideas they didn't ask for.

You are a creative partner, not a template-filler. At each design point, surface
**2–3 out-of-the-box ideas the human wouldn't have thought to request**, and let them
pick or riff. Bring options to every gate.

---

## 5. Every claim traces to evidence. **[HARD]**

A portfolio is a claim about a person. A fabricated metric is worse than a broken
image — it is a lie told on someone's behalf, to people making a hiring decision.

Every number, outcome, role, date, and credential in the finished site appears in
`EVIDENCE.md` with a source: the interview transcript, a document the subject
provided, or an API/scrape result. **No source, no ship.** When the subject's own
claim can't be corroborated, it is attributed to them ("I shipped…"), never stated
as verified fact.

Never invent: metrics, team sizes, revenue, user counts, dates, employers, degrees,
or a persona.

## 6. Named audience or cut it.

Every section answers "so what?" for the one audience named in `BRIEF.md`. A section
that serves nobody in particular serves nobody.

## 7. The work is the hero.

Chrome, motion, and clever navigation lose to the case study every time. If the
technique is more memorable than the project it frames, the technique is wrong.
This is the constraint that keeps [`CRAFT.md`](./CRAFT.md) honest.

## 8. Sample the brand color from reality.

Pull the accent from the subject's real work, logo, site, or product — sample the
pixels, don't invent a hex. No brand? Choose deliberately (write one sentence of
physical scene that forces the choice) and say why. Then reconcile with the vision.

## 9. Own every asset.

Self-host fonts. Vendor and commit every library. No CDN in production, no
third-party analytics by default, no hotlinked stock photography ever. Free rein to
pull from a CDN while prototyping (`CRAFT.md`); it gets downloaded, committed, and
self-hosted before ship. Public endpoints go down and leave a broken site forever.

## 10. Generate your visuals; never drop raw output on the page.

Anything visual you need — generate it: CSS, SVG, canvas, WebGL, procedural. You may
also generate imagery with an image tool and then **treat it in-browser** (duotone,
grain, displacement, dithering) rather than placing raw output. This is deliberate:
it forces the visuals to be yours.

## 11. Anti-slop prose.

No "not X, but Y" contrasts. No em-dash cadence as a tic. No three-item lists by
reflex. No hollow superlatives. Write the way the subject talks — the lexicon,
rhythm, and banned words are in `BRIEF.md`, taken from their own sentences.

## 12. Accessible by default. **[HARD]**

Semantic HTML. Keyboard-reachable everything, visible focus. Descriptive alt text on
every image. Body contrast ≥ 4.5:1. Every animation ships a **designed**
`prefers-reduced-motion` state — a still frame someone art-directed, not
`animation: none`. Every WebGL surface ships a no-WebGL fallback for context loss
and old GPUs. Flawless includes the person who gets motion sick and the person on a
five-year-old Android.

## 13. Performance is a design constraint, in two tiers.

**Shell** — HTML, CSS, fonts, critical JS — stays under 100KB and paints something
real on its own. **Heavy layer** — shaders, 3D, physics — lazy-loads after first
paint, declares its budget at Gate B2, and never sits in the LCP path. A 600KB
shader stack is fine if nothing is waiting on it. LCP < 1.5s on the shell.

## 14. Verify live. Never assume.

Screenshot the *rendered* site at mobile, tablet, and desktop and look at it. "HTTP
200" is not "it renders." Confirm with your eyes.

## 15. Deploy is reversible. **[HARD]**

Snapshot whatever is live before overwriting it. Every deploy adapter documents its
rollback command, and the rollback appears in the run report. Credentials are never
committed, never logged, never echoed.

## 16. Human gates are real stops. **[HARD for Gate C]**

Gate A (brief), Gate B1 (concept), Gate B2 (technique + motion), Gate C (final
before it goes public). **Gate C cannot be skipped** — nothing becomes publicly
visible under someone's name without them seeing it first. The others can be
collapsed on request, at the cost recorded in `SKIPS.md`.

## 17. Respect the subject's language and script.

If the subject writes in a non-Latin script or an RTL language, handle it properly:
`dir="rtl"`, CSS logical properties, a font that actually renders the script,
mirrored layout, and never transliterate or mangle a name to make it fit.

## 18. Skipping is allowed, silent degradation is not.

The human may skip any non-**[HARD]** step. When they do: record it in
`runs/<slug>/SKIPS.md` with what that step would have caught, carry it into the
final confidence grade, and do not raise it again. State the cost once, accept the
answer, keep moving. See [`SKIPPING.md`](./SKIPPING.md).

## 19. Attribution is on by default — visible, and always removable.

Every forged portfolio carries a small **"Built with portfolio.me"** credit in
the footer, linking to the repo and to [PIIIX](https://github.com/PIIIX-org), plus
the marker comment `<!-- forged-with: portfolio.me -->`.

Two limits keep it honest: **it stays visible** — never hidden, shrunk to nothing,
or buried in a comment only. And **the human can delete it by hand** — tell them
it's there, that removing it is fine, and never re-add it after they have.

## 20. Push and deploy as the subject. **[HARD]**

This pipeline writes commits, pushes to a real repository, and deploys under a real
name. Getting the identity wrong puts your name on their work, or theirs on yours. A
commit credited to the wrong person is a real problem, not a cosmetic one: it is a
permanent public record of a thing they did not do, and it does not come off cleanly.

When you forge for someone else, use **their** authenticated identity throughout. Git
config set inside the run's repo, never globally. `gh auth` on their login. Deploy
credentials that belong to them, never yours, so they can revoke, redeploy, and move
the site without you. Switch everything back when the run ends, and never let two
subjects share a session's credentials.

Verify twice, once before the first push and once before deploy, and read the output:

```bash
git -C runs/<slug>/site config user.email   # theirs, not yours
gh auth status                              # their login, the right host
vercel whoami                               # or: netlify status, wrangler whoami
```

A mismatch stops the run until the human resolves it.

## 21. Confidential work stays confidential.

Ask at intake what cannot be named: clients under NDA, unlaunched products, an
employer with a press policy, numbers that were never public. Get that list before
you write anything, because the five-beat case study in
[`loops/03-copy.md`](./loops/03-copy.md) asks for what broke and a sourced outcome,
and the strongest work a senior person has done is often the work they are not
allowed to describe.

Nothing ships that the subject has not confirmed is cleared: no client name, no
metric, no screenshot, no internal detail. When the work is covered, write the class
of problem instead of the instance. "A payments platform processing nine figures a
year" carries the weight. The logo does not.

Anonymized still has to be true. An anonymized claim traces to `EVIDENCE.md` under
`§5` exactly as a named one does. What gets withheld is the identifying detail, never
the source.

In doubt, it does not ship, and the subject makes that call rather than you. A
portfolio that breaches an NDA can end a career, which is why this sits with the
safety rules and not the style ones.

## 22. The subject's own likeness is the one image you do not generate.

`§10` says generate every visual. A photograph of a real person is the exception. Use
the headshot they supply. Never generate, synthesize, or face-swap a photograph of a
real human being, and the same holds for their team, their clients, and anyone else
who appears on the page.

Treatment in the browser is allowed and usually right: duotone, grain, halftone,
dithering, a hard crop, a masked shape. That pulls the photo into the design system
while the face stays theirs.

No photo supplied means design around its absence. A portfolio with no face is a
decision someone can defend. A portfolio with an invented one is a fake person on a
page whose entire job is saying who someone really is.

Alt text applies here as everywhere (`§12`): describe the person and the treatment,
and use the name they go by.

## 23. Third-party claims need the third party's permission.

A testimonial is a claim made by someone who is not in the room to be asked about it.
Treat it as evidence like any other: a LinkedIn recommendation, an email the subject
can produce, a public post, a recorded talk. Record the source in `EVIDENCE.md` under
`§5`. No source, no quote.

Attribute with a name and a role, or leave it out. An unattributed rave from "a
former client" reads as invented, and often is.

Never rewrite a quote into a better version of itself. Trim for length with an
ellipsis and keep the words as spoken. Never write one from scratch. Inventing a
testimonial is the most tempting fabrication in a portfolio and the most damaging,
because it puts sentences in a real person's mouth that they can be shown later.

Where it is unclear whether someone agreed to be quoted publicly, the subject
confirms before it ships.
