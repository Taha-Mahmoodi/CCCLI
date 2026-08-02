---
name: supabase-ssr-version
description: "@supabase/ssr must be 0.10+ in Heard or typed queries resolve to never"
metadata: 
  node_type: memory
  type: project
  originSessionId: 9eb3a266-7688-441e-908a-dc9572655a83
---

In Heard, `@supabase/ssr` must be **0.10.x or newer**. The scaffold pulled 0.5.2, which is too old for `@supabase/supabase-js` 2.107: the `Database` generic did not flow through `createServerClient<Database>`, so every typed query (`.from(...).select(...)`) resolved its Row to `never` (e.g. `data.role` → "Property 'role' does not exist on type 'never'"). The direct `@supabase/supabase-js` client typed fine — only the ssr wrapper was broken. Upgrading to `@supabase/ssr@latest` (0.10.3) fixed it.

**How to apply:** keep `@supabase/ssr` current; if typed Supabase queries suddenly become `never`, check the ssr/supabase-js version pairing first. DB types are generated into `lib/supabase/database.types.ts` via `supabase gen types typescript --local`.

Related: [[local-supabase-colima]]
