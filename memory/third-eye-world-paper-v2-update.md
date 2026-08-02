---
name: third-eye-world-paper-v2-update
description: "third-eye-world-engineering-build renamed to third-eye-world-paper and content replaced with v2.0 build spec, 2026-07-18; established a new 'Taha pushes, Said credited' account pattern"
metadata:
  node_type: memory
  type: project
  originSessionId: 96cd4d28-3b56-4169-89cc-c966213ce828
  modified: 2026-07-18T13:21:41.351Z
---

On 2026-07-18, replaced the entire README of the public repo (then `sadeqisaidmohaddes-star/third-eye-world-engineering-build`, now renamed **`third-eye-world-paper`**) with a new v2.0 "Build Specification," reformatted as a research paper from a Telegram-sourced build document. Superseded the v1.0 "Engineering Build Instruction Package" pushed 2026-07-12 (see [[third-eye-research-repos-2026-07]]).

**Why the account setup is unusual:** user was asked to clarify since this deviated from the established pattern (all prior TEW research-paper pushes done entirely as Said, per [[github-accounts]]). User chose a hybrid: **Taha-Mahmoodi performs the git operations, but the commit is authored/committed as Said Mohaddes Sadeqi** (name + email set locally per-clone only, never globally) so the paper's attribution doesn't change. This required adding Taha-Mahmoodi as a collaborator (push permission) on this specific repo — it was not already in the 9-repo collaborator set from [[said-account-collaborator-contributions-2026-07]]. GitHub attributes the commit to Said's account on the strength of the committer email matching his verified GitHub email, regardless of which account's token performed the push.

**How to apply:** If more edits to this repo are needed, the same pattern applies — Taha's gh session pushes, but `git config user.name`/`user.email` in that local clone must stay set to Said's identity ("Said Mohaddes Sadeqi" / sadeqisaidmohaddes@gmail.com) unless told otherwise. Renaming/repo-settings changes (description, name) need admin, which Taha's collaborator grant doesn't include — those still require switching to sadqi's account temporarily via `gh auth switch`, per [[github-accounts]]'s switch-back discipline. Don't assume this hybrid pattern extends to the *other* research-paper repo (third-eye-ai-conversational-layer) or future new repos — it was confirmed for this one only.
