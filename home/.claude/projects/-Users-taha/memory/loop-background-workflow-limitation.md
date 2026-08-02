---
name: loop-background-workflow-limitation
description: "Backgrounded Workflow() calls die across ANY session/process boundary in this local CLI (not just /loop wakeups) — but resumeFromRunId replays completed agents from cache"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bfa58225-af24-41f5-9c61-f0e3cc2691bd
  modified: 2026-07-29T08:26:36.276Z
---

A `Workflow()` call backgrounded inside a `/loop` dynamic-mode iteration does not survive to the next wakeup in this local CLI session: the underlying process appears to cycle between turns, and any workflow with real work in flight (agent_count > 0) gets killed and reports "stopped ... previous process exited" on the next check-in. A workflow that completes instantly (e.g. an immediate arg-validation error) survives fine — it's specifically long-running background work that dies.

**Why:** Confirmed empirically 2026-07-19 on the `atlas tracking` field-force-app research task — two consecutive `Workflow({name: 'deep-research', ...})` launches inside a `/loop [auto]` iteration were killed mid-run (agent_count: 0 both times, nothing ever cached), while a resume call with no real work completed in 10ms. This isolates the cause to the background-worker-vs-session-boundary interaction, not the resume mechanism or the args.

**Broader than /loop — confirmed 2026-07-28** on the [[inter-face-plugin]] research: four backgrounded `deep-research` workflows, launched in an ordinary user-driven session (no `/loop`), all reported "stopped … previous process exited" when the session/process boundary was crossed. So the trigger is the process boundary itself, not the wakeup mechanism. Ordinary turn-by-turn sessions are **not** safe either if the session ends while work is in flight.

**The recovery that works:** `Workflow({scriptPath, resumeFromRunId})` with the *same args* — completed `agent()` calls replay from cache instantly and only the unfinished tail re-runs. All four resumed cleanly. Keep the `scriptPath` and `runId` from the launch result; they are the only way back. Note the 2026-07-19 observation that nothing was ever cached was a case where the workflows died with `agent_count: 0` (killed before any agent finished) — when agents *have* completed, the cache is real and resume is cheap.

**How to apply:** For substantive multi-step research, prefer doing the work inline in the same turn (direct WebSearch/WebFetch, or `Agent()` with `run_in_background: false`). If you do background a `Workflow()`, record its `scriptPath` + `runId` immediately and re-check on any session resume — do not assume a launched workflow is still alive. For work that genuinely must survive a restart, use a cloud `/schedule` job instead.
