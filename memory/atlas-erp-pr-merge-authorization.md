---
name: atlas-erp-pr-merge-authorization
description: User authorized automatic PR merging for Atlas ERP going forward
metadata:
  type: feedback
---

For the [[atlas-erp-working-clone]] project, the user has explicitly authorized merging PRs automatically going forward ("all the prs are merged you can merge them automaticaly from now on too", 2026-07-04). This overrides the general default of never self-merging without explicit per-instance approval.

**Why:** The stacked-PR workflow for building out Atlas ERP's frontend module-by-module was creating friction — waiting for manual merges between each slice paused the "do not pause unless necessary" build cadence the user wants.

**How to apply:** For this project specifically, after opening a PR (following the existing stacked-branch convention: branch off the current stack tip, commit, push, open PR against the previous branch), merge it automatically via `gh pr merge` once CI is green, then continue directly to the next slice/branch without waiting for the user. Still use judgment: if CI fails or a PR looks risky/unusual, surface it rather than merging blindly. This authorization is scoped to this project's routine feature-slice PRs, not to `main` promotion PRs or anything destructive (force-push, history rewrite) without separate confirmation.
