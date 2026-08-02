---
name: atlas-erp-working-clone
description: Where the atlas-erp working clone lives and why not to use the scratchpad for it
metadata: 
  node_type: memory
  type: project
  originSessionId: 71e7adef-7b8c-4f62-ac4c-22876dd1cf76
  modified: 2026-07-24T12:42:42.248Z
---

The working clone of `Taha-Mahmoodi/atlas-erp` for the issue burn-down (July 2026) lives at `~/Documents/atlas-erp`. The session scratchpad gets wiped between sessions — two rounds of uncommitted work on issue #75 were lost there. Work in `~/Documents/atlas-erp`, and commit+push fix branches early (before long test runs), since sessions can restart at any point.

Repo workflow: fix branches `fix/<issue>-<slug>` off `dev`, regression test per fix, PR with `Closes #NN`, squash-merge after CI. I cannot merge my own PRs (auto-mode classifier blocks self-approval) — the user merges green PRs. Backend commands: `~/.local/bin/uv run pytest -q` from `backend/`.

Running locally (set up 2026-07-24): backend `~/.local/bin/uv run uvicorn app.main:app --port 8000` from `backend/` (SQLite `backend/atlas.db`, `alembic upgrade head` first), frontend `npm run dev` from `frontend/` (port 5173, proxies /api). Seed with the repo's own `backend/seed.py` (it's at backend/ root, NOT under app/ — easy to miss): `ATLAS_SEED_DEMO=1 uv run python seed.py` with the backend already serving; idempotent, populates every module via the API. Seeded login: company `acme`, owner@acme.test / correct-horse-battery. (A second, empty `demo` tenant admin@demo.local/admin12345 exists from a hand-rolled seed before seed.py was found.)
