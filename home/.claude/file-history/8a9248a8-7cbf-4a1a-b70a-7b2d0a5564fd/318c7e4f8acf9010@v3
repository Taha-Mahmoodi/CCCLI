# How to run it

## Claude Code

Install as a plugin, then:

```
/portfolio.me <name or handle>
```

Or point at the skill directly: "read `skills/portfolio.me/SKILL.md` and run the
pipeline for <subject>."

## Any other capable agent

Point it at this repo and say:

> Read `PRINCIPLES.md`, then `skills/portfolio.me/SKILL.md`. Execute the loops in
> `loops/` in order for <subject>. Stop at every gate and wait for my decision.

There is no program to install. The pipeline is markdown; the agent is the runtime.

## What it will ask you

**Loop 0** — nothing. It checks its own capabilities and makes a run folder.

**Loop 1** — the interview. First it asks whether you'd rather do this live, one
question at a time, or record yourself answering alone and drop it in the inbox
— both are the real interview, recorded is not a shortcut, and it follows up
afterward either way. This is the part that decides whether the output is a
portfolio or a résumé with a gradient. Budget real time for it. It will also ask
where the site deploys.

Drop any documents you have — résumé, case studies, screenshots, old site — into
`runs/<slug>/inbox/` before this loop.

**Gate A** — you approve the strategy: archetype, positioning, which projects make
the cut.

**Gate B1** — you pick the concept from rendered design images.

**Gate B2** — you approve the techniques, motion, and performance budget.

**Gate C** — you see the finished site before it goes public. This gate is not
skippable. Alongside the preview, you'll see an independent second read of the
finished copy and concept — voice, claims, whether it still holds up now that
it's built — from an agent whose only job is arguing against the site before
you do.

Around the same point, you'll be asked once whether to add the run to the
public [showcase](./SHOWCASE.md) — entirely optional, and only a screenshot
and a short summary, never your evidence or interview. You'll also be asked
once whether you want a small, opt-in monitor added to your own repo — it
watches the live site weekly and opens an issue if something rots. It never
touches the site itself.

## Skipping

Say so. Any step except five is optional. The agent states the cost once, records
it, and moves on. See [`SKIPPING.md`](./SKIPPING.md).

In a hurry: ask for **express mode**.

## What you get

A live site on the infrastructure you picked, its source in your own repository, and
`runs/<slug>/REPORT.md` with an honest confidence grade and the rollback command.
