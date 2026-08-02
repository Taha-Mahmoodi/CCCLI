---
name: yildizim-messenger
description: "Private 2-person self-destructing messenger with duress/decoy concealment layer — design phase, pushed as research doc to github.com/Taha-Mahmoodi/Yildizim (private), 2026-07-12"
metadata: 
  node_type: memory
  type: project
  originSessionId: be328bd6-9dc7-4a68-afc7-0a0d6ce8c5d4
---

Building a private, two-person-only web messenger (working name "Yıldızım") with a whole-session self-destruct system (distinct from per-message disappearing messages) and a concealment layer: the app's default public face is a working astronomy-themed calendar/date-converter, with a hidden passcode-as-date entry mechanism unlocking the real chat, and a separate duress passcode that wipes the chat and reveals a horoscope-dashboard decoy instead of an empty chat.

Full design decisions so far (platform, auth, data model, security audit findings/fixes, self-destruct mechanics) are written up in `~/Documents/Yildizim/README.md`, committed and pushed to the private repo `github.com/Taha-Mahmoodi/Yildizim` as a design-research document. Local clone lives at `~/Documents/Yildizim`.

**Status as of 2026-07-12**: design/brainstorming phase only — nothing has been built. Still open: exact scope of the calendar/horoscope decoy features, original UI/visual direction (explicitly requested to not resemble any existing messenger), standard-feature edge cases, and the formal implementation plan. Session ended with user saying "we will continue this in future" — pick up from the README's "Open Questions" section (§8) rather than re-deriving earlier decisions.

**Why:** User wants strict privacy — no one besides the two users should know the app exists, hence the calendar/horoscope disguise and the emphasis on a real security audit (client-side passcode-check flaw, Supabase RLS/Storage/backup pitfalls, PWA on-device data leakage, push-notification content leakage) before any implementation starts.

**How to apply:** Before continuing this project, read the current `README.md` in the repo (don't re-ask already-answered brainstorming questions — they're all recorded there). Continue in brainstorming mode until the concealment layer and UI direction are finalized, then move to writing-plans. GitHub account for this repo is Taha-Mahmoodi (main account) — see [[github-accounts]].
