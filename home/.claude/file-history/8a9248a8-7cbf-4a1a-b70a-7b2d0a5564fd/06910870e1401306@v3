# Loop 1 — Substance & Strategy

**Goal:** end this loop knowing what is true about the subject, what they want this
to feel like, who it is for, and what it therefore has to look like. Every design
decision downstream is derived from this loop's output. Nothing after it guesses.

**Output:** `BRIEF.md` (the one source) and `EVIDENCE.md` (every claim, sourced).

```text
1a INTERVIEW ─► 1b DOCUMENTS ─► 1c SCRAPE + GAP ─► 1d SYNTHESIS ─► Gate A
   vision +        inbox/          APIs, peers,       BRIEF.md
   brand Qs        mined           empty quadrant     + translation table
```

The order is deliberate. The interview comes first because it is the only source of
the story, and because answers given before a scrape are unprimed. Documents
corroborate. The scrape verifies and fills gaps.

---

## 1a — Interview (`§0`)

**The conductor runs this. Never delegate it** — a subagent cannot talk to the human.

Ask **one question at a time**. Open-ended. Do not offer multiple choice: the answer
has to be theirs, and a list of options contaminates it with yours. Follow the
thread where it goes. React to what they actually said before moving on.

### Vision

> What should someone feel in the first three seconds, before they've read a word?
>
> What's the one project that, if they only see one thing, has to be it — and why
> that one?
>
> Name a site you've seen that made you jealous. What specifically did it do?
>
> If this site were a physical space, what is it: a workshop, a gallery, a lab, a
> bar, a cathedral?
>
> Should it feel like it was made in 1972, 2004, or 2041?
>
> What's the sound of it? Silence counts as an answer.

### Strategy

> Someone recommends you in a room you're not in. What do they say?
>
> What do you turn down, and what does turning it down cost you?
>
> Who's the closest thing you have to a rival, and what do they get wrong?
>
> What did you believe about your work five years ago that you now think is wrong?
>
> If someone hires you expecting X and gets Y instead, what are X and Y?
>
> What's the unglamorous thing you're better at than almost anyone?
>
> Which is worse: being called safe, or being called chaotic?
>
> What do you want to be asked to do in three years that nobody asks you now?

### The practical set

> Who is this for, and what decision are they making when they land on it?
>
> Which projects earn a slot? For each: what broke, what it cost, what happened.
>
> Must-haves — anything you explicitly want in it.
>
> Do-nots — colors, words, styles, an ex-employer. Anything at all.
>
> What here cannot be named? Clients, numbers, screenshots under NDA (`§21`).
>
> Do you have a photo you want used, or should the design work without one? (`§22`)
>
> Where does it deploy? (Walk the deploy square from `PIPELINE.md`.)
>
> One page, or several? And do you write, or intend to?

That last question decides the stack, so it cannot wait for the build. A blog means
the human publishes without you, which hand-authored HTML cannot support. Walk
[`ARCHITECTURE.md`](../ARCHITECTURE.md) and settle the shape before Gate A.

Ask whether they will actually write, and take the honest answer. A blog nobody
writes is dated evidence that they stopped.

Invite references throughout: sites, images, a moodboard, a song, a building. Feel
is an input.

**Record verbatim.** Their actual sentences become the verbal identity in `§BRAND`
and get quoted in Loop 3. Paraphrase destroys the only voice sample you have.

If they don't know an answer, offer directions and let them react. Do not stall.

## 1b — Documents

Read everything in `runs/<slug>/inbox/`: résumé, case-study docs, screenshots,
design files, old site exports, performance reviews, talks.

Mine for: claims worth corroborating, numbers, dates, roles, and visual material
the subject already owns. Treat documents as evidence, not truth — a résumé is a
claim like any other. Log every extraction to `EVIDENCE.md` with the filename.

Dispatch `evidence-miner` for this. It is autonomous work.

## 1c — Scrape and gap analysis

Two jobs. The first verifies; the second finds the opening.

### Scrape (`evidence-miner`)

```bash
gh api users/<user> --jq '{login,name,bio,company,blog,followers,public_repos}'
gh api "users/<user>/repos?per_page=100&sort=updated" \
  --jq '.[] | select(.fork==false) | {name,description,language,stars:.stargazers_count,updated:.updated_at}'
gh api graphql -f query='query{user(login:"<user>"){contributionsCollection{contributionCalendar{totalContributions}}}}'
```

Plus: their existing site, blog, LinkedIn, Dribbble, talks, published writing.

Its real job is to **corroborate and to surface gaps** — "this repo has 400 commits
and no README, what was it?" Bring the gap list back to the human. Those questions
are worth more than the scrape itself.

### Peer analysis (`peer-analyst`)

Pull 6–10 portfolios of people in the same category. Chart each on: archetype,
style family, palette, structure, and opening move. Find where they cluster, and
find the empty quadrant.

This is evidence, not opinion. If every peer is a Sage in monochrome Swiss, that is
a fact about the market and a strategy input. The run either occupies the gap or
states in writing why not (`BRAND.md`).

## 1d — Synthesis

Now write the strategy, following [`BRAND.md`](../BRAND.md) exactly:

1. **Archetype** — primary plus shadow, each backed by a quote or a piece of work
2. **Positioning** — the forced sentence. If it doesn't compile, the strategy isn't done
3. **Anti-positioning** — the explicit "we are NOT" list. Rewrite until one entry hurts
4. **Verbal identity** — lexicon, banned words, rhythm, extracted from their sentences
5. **Category** — compete in one, or name a new one
6. **Proof ladder** — every claim ranked, weak links cut or demoted
7. **Brand color** — sampled from their real work or logo (`§8`), never invented
8. **The translation table** — every row filled. A blank row is a design decision
   downstream with no derivation.

## Write the outputs

**`EVIDENCE.md`** — every claim, its source, and its rank on the proof ladder.
Anything unsourced is cut or marked as attributed speech (`§5`, hard rule).

**`BRIEF.md`** — nine sections: interview record (verbatim), evidence summary,
competitive map and the gap, archetype, positioning and anti-positioning, verbal
identity, audience and their decision, narrative spine and the project list, and
the translation table.

> ## Gate A — human decision
>
> Present: the archetype and why, the positioning sentence, the anti-positioning
> list, the competitive gap you found, which projects earn a slot, the site shape
> (single page, multi-page, or multi-page with a blog), and the deploy target. Bring
> 2–3 readings of the strategy where it's genuinely ambiguous (`§4`), not one answer.
> They approve, adjust, or send you back. Do not proceed without a decision.
>
> The site shape is settled here and not revisited. Discovering at Loop 4 that the
> case studies need their own URLs means rebuilding the shell, the nav, and the
> share layer.

## Skip costs

| Skipping | Costs |
|---|---|
| 1a Interview | The story. You get a résumé: what was built, never why it mattered. No voice sample, so the copy goes generic. Highest-cost skip in the pipeline. |
| 1b Documents | Corroboration for memory-only claims, and material they already own |
| 1c Scrape | Verification, and the gap questions that produce the best answers |
| 1c Peers | The empty quadrant. You design blind to what every competitor looks like, and `§3` gets much harder |
| 1d Synthesis | The translation table. Design stops being derivable and becomes taste |
