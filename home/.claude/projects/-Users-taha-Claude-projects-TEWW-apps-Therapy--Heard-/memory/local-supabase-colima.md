---
name: local-supabase-colima
description: "How to run the local Supabase stack for the Heard project (Colima, DOCKER_HOST, analytics disabled)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 9eb3a266-7688-441e-908a-dc9572655a83
---

The Heard app uses a **local Supabase CLI** stack on a **Colima** container runtime (no Docker Desktop installed).

**Why:** the user chose local Supabase; Docker Desktop wasn't present, so Colima + the docker CLI were installed via Homebrew.

**How to apply:**
- Start the runtime: `colima start` (already configured `--cpu 2 --memory 4`).
- Supabase/Docker CLI commands need the Colima socket: `export DOCKER_HOST="unix://$HOME/.colima/default/docker.sock"`.
- `supabase start` then exposes the API at `http://127.0.0.1:54321`; get keys with `supabase status -o env` and put them in `.env.local` (gitignored).
- The **analytics (Vector) container is disabled** in `supabase/config.toml` (`[analytics] enabled = false`) because it bind-mounts the Docker socket, which Colima's virtiofs mount rejects. Don't re-enable it locally.
- The Next app talks to Supabase over HTTP (54321); it does NOT need DOCKER_HOST — only the supabase CLI does.

Related: [[heard-build-plan]], [[supabase-ssr-version]]
