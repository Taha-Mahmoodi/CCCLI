---
name: git-workflow
description: "Heard git/GitHub workflow — private repo Taha-Mahmoodi/heard, PR-per-task then merge to main"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9eb3a266-7688-441e-908a-dc9572655a83
---

The Heard project lives at **github.com/Taha-Mahmoodi/heard** (private). `gh` is authed with two accounts — the **active one must be Taha-Mahmoodi** (`gh auth status`); `gh auth setup-git` is configured so plain `git push` uses the right token.

**Why:** the user wants every task tracked through GitHub with a reviewable PR per task, not direct commits to main.

**How to apply — after each task/milestone:**
1. Branch off main (e.g. `m1-data-model`), commit the work there.
2. `git push -u origin <branch>`.
3. `gh pr create --base main --title "Mx — ..." --body "..."` (summarize what + verification).
4. `gh pr merge <n> --merge --delete-branch`, then `git checkout main && git pull --ff-only && git remote prune origin`.

End commit messages with the `Co-Authored-By: Claude Opus 4.8` trailer and PR bodies with the Claude Code generated-with line.

M0 went in via PR #1 (history was restructured so an empty `chore: initialize repository` root commit is main's base and M0 merged on top). CI (`.github/workflows/ci.yml`) runs typecheck+lint+test on each PR.

Related: [[heard-build-plan]]
