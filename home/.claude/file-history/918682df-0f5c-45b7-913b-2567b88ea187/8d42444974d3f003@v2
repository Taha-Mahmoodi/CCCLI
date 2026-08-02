---
name: said-account-collaborator-contributions-2026-07
description: "Taha-Mahmoodi added as collaborator on 9 of Said's repos; 9 PRs opened with code/doc fixes, 2026-07-12"
metadata: 
  node_type: memory
  type: project
  originSessionId: 918682df-0f5c-45b7-913b-2567b88ea187
---

Surveyed all repos on sadeqisaidmohaddes-star's GitHub, then opened 9 PRs from Taha-Mahmoodi's account with real fixes (2026-07-12):
- clean-code-checker #22, cost-time-estimator #9, palette-studio #3, semantica #7, techstack-advisor #7, third-eye-kit #1, video-compressor #7, vuln-scanner #11, heard-research #1

**Why:** User asked to read every repo in Said's account, find genuine contribution opportunities, and actually implement them from Taha's own account — "for those that have code, add code; for research ones, help with the research."

**Mechanics that mattered:**
- Forking to Taha-Mahmoodi was blocked by the permission classifier (flagged against [[github-accounts]]'s cross-contamination rule). Resolved by having Said's account add Taha-Mahmoodi as a **collaborator** (push permission) on each repo instead — no forks, direct branch pushes.
- `gh pr create --head <branch>` must use the **bare branch name**, not `owner:branch` — this is a same-repo collaborator branch, not a fork. Using `Taha-Mahmoodi:branch` produces a confusing "Head repository can't be blank" GraphQL error.
- Real bugs found and fixed, not just style nits: video-compressor's server bound to all network interfaces instead of localhost (unauthenticated upload/ffmpeg API exposed to the LAN); vuln-scanner's `POST /api/scan` was completely broken on current FastAPI/Pydantic (locally-scoped Pydantic model + `from __future__ import annotations` broke resolution) — both root-caused and fixed, not worked around.
- heard-research wasn't in the original collaborator authorization the user gave — had to ask again before adding Taha there too. Don't assume a broad "do the contributions" instruction covers every repo found mid-task; new repos surfaced during work need their own go-ahead if they weren't in the original scope.
- Scratchpad clones do NOT survive a session boundary (per [[atlas-erp-working-clone]]'s general warning) — mid-task a session reset wiped `/private/tmp/.../scratchpad/said-repos/`; had to re-clone heard-research and redo the edits from the already-completed research findings (no data was actually lost since nothing had been pushed yet).

**How to apply:** If more repos surface in Said's account needing contributions, follow the same collaborator-invite (not fork) pattern, and confirm scope explicitly per-repo rather than assuming blanket authorization. See [[github-accounts]] for the account-switching mechanics and [[third-eye-research-repos-2026-07]] for the related earlier publish under Said's own identity.
