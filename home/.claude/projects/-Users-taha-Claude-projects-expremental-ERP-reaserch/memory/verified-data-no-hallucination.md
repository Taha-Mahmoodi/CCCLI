---
name: verified-data-no-hallucination
description: "User demands real, web-verified, cited data with no hallucination and an explicit double-check pass"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6eceea2e-45ab-4947-8f5c-5ff63e3ba671
---

For research tasks the user explicitly requires **real, verified data — no made-up facts or hallucinations — and a double-check pass on results.**

**Why:** they are building a real system ([[sap-s4hana-research-report]]) and will act on the findings; wrong specifics (table names, dates, version facts) would mislead the build.

**How to apply:**
- Verify specific facts (names, dates, table/code identifiers) via web search/fetch against primary/authoritative sources before stating them; cite sources inline.
- Never invent identifiers — omit or mark `(unverified)` what you can't confirm.
- Run an independent re-verification pass on load-bearing facts and surface a confidence/caveats section listing what's solid vs. uncertain.
- They asked me to **ask clarifying questions before starting** large tasks — do that (scope, format, depth) rather than guessing.
