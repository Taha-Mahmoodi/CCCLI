---
name: teww-redesign
description: "TEWW-mono-backup night-first redesign — built, then fully rolled back at owner's request (2026-07-04)"
metadata: 
  node_type: memory
  type: project
  originSessionId: f6011bc1-b566-4d56-9e65-c8e6e65ddc41
---

A full "Sight Beyond Sight" night-first redesign of ~/Documents/TEWW-mono-backup (Third Eye Worldwide public site) was built and merged (PRs #3, #11–#17, #19, #21), then **rolled back** the same day at the owner's explicit request ("roll back everything to before you made any changes").

Rollback method: `git revert --no-commit 2dd3b11..HEAD` on a branch, one commit, PR #23, squash-merged. Non-destructive — no force-push, no history rewrite; the redesign commits stay reachable in history, this just undid their content. Verified `git diff 2dd3b11 HEAD` is empty (byte-identical to the pre-redesign commit) before merging. `main` is back to normal — no trace of the redesign in current files.

Why this matters for later: if the redesign is ever wanted back, PR #23 (the revert) can itself be reverted to restore it cleanly, rather than redoing the work. `TEWW_REDESIGN_SPEC.md` content and the design direction (indigo #100e17 night, saffron gold #e8a33d, Literata + Manrope) still exist in PR history if needed as a reference.

Local dev note: the Postgres dev DB (docker `teww-pg`) was left seeded with redesign content since Colima wasn't running at rollback time — harmless, since `data/seed.json` is reverted and a normal `npm run db:seed` next session will reseed pre-redesign content.
