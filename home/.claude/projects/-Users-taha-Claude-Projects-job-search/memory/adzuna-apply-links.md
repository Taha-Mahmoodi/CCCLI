---
name: adzuna-apply-links
description: Adzuna apply links must use /details/ not /land/ — redirect tokens expire and 403
metadata: 
  node_type: memory
  type: project
  originSessionId: 4d667e24-5770-4862-b946-1a05b9fb92f5
---

Adzuna's API `redirect_url` is a `https://www.adzuna.com/land/ad/{id}?se=<token>&v=<sig>` link whose `se`/`v` signature tokens EXPIRE after a few days → returns **403** for every job. This made all apply links appear "broken" ~3 days after a scrape (2026-06-13 incident).

**Fix:** use the stable canonical page `https://www.adzuna.com/details/{id}?utm_medium=api&utm_source=8bc84984` instead. It never expires (returns 200 while the posting is live, 404 once the employer removes it).

Applied in engine `gci2bjyAWlDeGonJ` "Fetch & Normalize Jobs" Adzuna branch: `ApplyLink:'https://www.adzuna.com/details/'+(j.id||'')+'?utm_medium=api&utm_source=8bc84984'` (was `j.redirect_url`). Backfilled existing rows via the diag workflow `TkS86DvFo8kgoJXs` (now also rewrites Adzuna ApplyLinks).

Note: ~30% of Adzuna /details/ links 404 within days = posting removed by employer, not a bug — nothing recovers a dead listing. Keep jobs fresh via the daily run. JSearch `job_apply_link` is the original posting URL (LinkedIn/Workday/etc.) — fine as-is; some aggregators (Monster, WeWorkRemotely) bot-block scripts but open in a browser. Related: [[resume-quality-and-model]].
