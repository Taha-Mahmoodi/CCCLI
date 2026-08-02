# Skipping

Everything in this pipeline is optional except five things. The human decides how
much of it to run. Your job is to state the cost once, honor the answer, and record
it — not to argue, and not to quietly lower the bar without saying so.

## The five that never skip

| Rule | Why it can't be traded |
|---|---|
| `§5` Every claim traces to evidence | A fabricated metric is a lie told on someone's behalf to people making a hiring decision |
| `§12` Accessibility basics | Skipping it locks real people out of the site |
| `§15` Deploy is reversible | Without a snapshot, a bad deploy destroys what was there |
| `§16` Gate C | Nothing goes public under someone's name without them seeing it |
| `§20` Identity safety | A commit or a deploy under the wrong account is not cosmetic, and credentials belong to the subject |

If asked to skip one of these, say once that it's not available and offer the
nearest thing that is. Then continue with everything else.

## How a skip works

1. The human says skip. One sentence from you: what it would have caught.
2. They confirm. **That's the end of it** — never raise it again, never hedge the
   rest of the run with it.
3. Append to `runs/<slug>/SKIPS.md`: the step, their reason if given, the cost.
4. The confidence grade in `REPORT.md` reflects it.

Never skip a step on your own initiative to save time. Skipping is the human's call.

## The skip ledger

Each loop file repeats its own row. This is the whole map.

| Step | Skipping it costs you |
|---|---|
| **1a Interview** | The story. Scrape and documents give you a résumé — what was built, not why it mattered, what broke, or what it cost. Voice becomes generic because there are no real sentences to write like. Highest-cost skip in the pipeline. |
| **Architecture decision** | Defaults to single page. Cheap to be wrong about while nothing is built. Discovering at Loop 4 that three case studies need their own URLs means rebuilding the shell, the nav, and the share layer ([`ARCHITECTURE.md`](./ARCHITECTURE.md)). |
| **Handover** | They come back to you for every blog post, or stop posting. A site the owner cannot update is a dependency. |
| **1b Documents** | Corroboration for claims that live only in the subject's memory, and the visual material they already own. More claims get demoted to "attributed" under `§5`. |
| **1c Scrape + peer analysis** | The gap. Without the competitive map you're designing blind to what every peer already looks like, and `§3` gets much harder to satisfy. Also loses evidence corroboration. |
| **1d Synthesis / brand strategy** | The translation table. Design decisions stop being derivable from strategy and become taste — which is fine until someone asks "why does it look like this" and there's no answer. Archetype, positioning, and verbal identity all live here. |
| **2a Direction / design images** | Seeing the design before it's built. You'll be iterating in code instead, which is slower to change and biases toward whatever was built first. |
| **Gate B1** | The concept choice. You pick, they see it at Gate C. |
| **2b Craft / prototypes** | Proof the technique works before the design depends on it. Techniques that fail late are expensive; failing them in a standalone prototype is cheap. |
| **Gate B2** | The motion and technique review. Performance budget goes undeclared. |
| **3 Copy** | Real words. Design gets built around placeholder lengths, then breaks when actual text arrives. Case studies are the substance of a portfolio; skipping this ships a gallery. |
| **4 Build quality passes** | Cross-browser and responsive correctness caught before deploy rather than after. |
| **5 Share layer** | The unfurl. Link gets pasted into Slack or LinkedIn and shows a gray box — the first impression, before the site loads. Cheapest step in the pipeline to keep. |
| **5 Conversion path** | The reason the site exists. Someone decides to reach out and finds no way to. |
| **6 Deploy** | Nothing goes live. Output is a build folder plus run instructions. A legitimate end state — handoff mode. |
| **7 Verify** | Confirmation it renders on real devices. `§14` says look at it; skipping means the first person to see it live is a stranger. |
| **CV export** | A résumé that stays in sync with the site. |
| **i18n / RTL** | Only skippable when there is one language and it's LTR. Otherwise `§17` applies and it isn't optional. |
| **Legal (imprint/privacy)** | Only skippable when nothing is collected. If there's a form, EU users make it a legal requirement, not a preference. |

## Express mode

The pre-packaged skip set, for "I need something up by Friday":

- Runs: short interview (vision + audience + must-haves only), scrape, one concept,
  direct build, copy, share layer, deploy, verify.
- Skips: documents, peer analysis, full brand strategy, design images, prototypes,
  Gates B1/B2.
- Keeps: all four hard rules, and Gate C.
- Grade ceiling: **B**.

Offer it when the human signals time pressure. Don't default to it.

## Confidence grade

Goes at the top of `REPORT.md`, with the reason.

| Grade | Means |
|---|---|
| **A** | Full pipeline. Every claim corroborated, strategy derived, design validated at both gates, verified live on real devices. |
| **B** | Core intact, some validation skipped. Strategy or design review thinner than ideal. |
| **C** | Substance skipped — no interview, or no copy pass. Site is real; the story behind it is thin. |
| **D** | Multiple substance skips. Effectively a scraped résumé with good visual design. Say so plainly. |

Report the grade honestly. A **D** stated clearly is more useful than an **A**
claimed falsely — the point of the grade is that the human knows what they have.
