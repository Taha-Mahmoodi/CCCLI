# How to run it

## Claude Code

Install as a plugin, then:

```
/git-a-portfolio <name or handle>
```

Or point at the skill directly: "read `skills/git-a-portfolio/SKILL.md` and run the
pipeline for <subject>."

## Any other capable agent

Point it at this repo and say:

> Read `PRINCIPLES.md`, then `skills/git-a-portfolio/SKILL.md`. Execute the loops in
> `loops/` in order for <subject>. Stop at every gate and wait for my decision.

There is no program to install. The pipeline is markdown; the agent is the runtime.

## What it will ask you

**Loop 0** — nothing. It checks its own capabilities and makes a run folder.

**Loop 1** — the interview. One question at a time, open-ended. This is the part
that decides whether the output is a portfolio or a résumé with a gradient. Budget
real time for it. It will also ask where the site deploys.

Drop any documents you have — résumé, case studies, screenshots, old site — into
`runs/<slug>/inbox/` before this loop.

**Gate A** — you approve the strategy: archetype, positioning, which projects make
the cut.

**Gate B1** — you pick the concept from rendered design images.

**Gate B2** — you approve the techniques, motion, and performance budget.

**Gate C** — you see the finished site before it goes public. This gate is not
skippable.

## Skipping

Say so. Any step except four is optional. The agent states the cost once, records
it, and moves on. See [`SKIPPING.md`](./SKIPPING.md).

In a hurry: ask for **express mode**.

## What you get

A live site on the infrastructure you picked, its source in your own repository, and
`runs/<slug>/REPORT.md` with an honest confidence grade and the rollback command.
