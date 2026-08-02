export const meta = {
  name: 'm13-review',
  description: 'Adversarial multi-lens review of the M13 admin-dashboard diff',
  phases: [
    { title: 'Review', detail: 'one reviewer per lens over the diff' },
    { title: 'Verify', detail: 'two skeptics adversarially verify each finding' },
  ],
}

const FINDINGS_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { findings: { type: 'array', items: {
    type: 'object', additionalProperties: false,
    properties: {
      severity: { type: 'string', enum: ['high', 'medium', 'low'] },
      file: { type: 'string' }, location: { type: 'string' },
      title: { type: 'string' }, detail: { type: 'string' }, suggestion: { type: 'string' },
    },
    required: ['severity', 'file', 'title', 'detail', 'suggestion'],
  } } },
  required: ['findings'],
}
const VERDICT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { isReal: { type: 'boolean' }, reason: { type: 'string' } },
  required: ['isReal', 'reason'],
}

const DIFF = `The repo is at cwd, branch m13-admin-dashboard. Run \`git diff main...HEAD\` for the full M13 admin-dashboard diff; read changed files for context (Read/Grep/Bash). This adds: an admin dashboard (overview metrics from admin_metrics_* SQL views, reports/safety review UI, user management with suspend/reinstate, read-only activity tables), a profiles.is_suspended column + a profiles guard trigger (fixing a role-escalation hole), and suspension enforcement in booking/session. Rules (CLAUDE.md): WCAG 2.2 AA; adapters only; money integer cents (lib/pricing.ts); RLS on every table; validate at boundary + check role/ownership in every server action; service-role/server-only never reach the client. Only report REAL, actionable issues INTRODUCED by this diff. If nothing real, return empty findings.`

const LENSES = [
  { key: 'security', prompt: `SECURITY / RLS / privilege review of the M13 diff. Check: the new profiles guard trigger actually prevents non-admins changing role/is_suspended (and there's no OTHER write path that bypasses it); admin server actions (resolveReport, setUserSuspended, runWeeklyPayouts) all enforce requireRole("admin") and validate input; the admin_metrics_* views and admin reads can't be reached by non-admins; setUserSuspended can't be abused (e.g. suspending an admin, IDOR); suspension is actually enforced where it matters (booking + session start) and can't be trivially bypassed; no service-role/server-only leaking into client components. ${DIFF}` },
  { key: 'correctness', prompt: `CORRECTNESS review of the M13 diff: metric view nullability handling, wrong joins/aggregations, broken nav/routes, server→client boundary mistakes (functions to client components, server-only in client), missing revalidate, suspend-reinstate edge cases (provider status flip), search query correctness (ilike injection via PostgREST .or filter strings), pagination/limits. ${DIFF}` },
  { key: 'a11y', prompt: `ACCESSIBILITY review of the M13 admin dashboard diff: semantic tables (th scope, caption), no colour-only status, keyboard operability of suspend/review buttons and search, focus, live-region announcements for destructive admin actions, repeated/ambiguous link or button names across table rows, heading order, StatCard labeling. ${DIFF}` },
  { key: 'money', prompt: `MONEY review of the M13 diff: the admin_metrics_* views compute money correctly in integer cents (GMV, revenue/commission, earnings) and the UI formats via formatCents; no pricing math outside lib/pricing.ts; commission display reads PLATFORM_COMMISSION_RATE; revenue = commission, GMV = session totals — verify the SQL is right. ${DIFF}` },
  { key: 'reuse', prompt: `REUSE / SIMPLIFICATION review of the M13 diff: duplicated table/column logic that could share helpers, dead code or unused message keys, hardcoded user-facing strings bypassing messages/en.json, inconsistent patterns vs existing admin code, mid-file imports. ${DIFF}` },
]

phase('Review')
const reviewed = await parallel(LENSES.map((lens) => () =>
  agent(lens.prompt, { label: `review:${lens.key}`, phase: 'Review', schema: FINDINGS_SCHEMA })
    .then((r) => ({ lens: lens.key, findings: (r && r.findings) || [] }))
    .catch(() => ({ lens: lens.key, findings: [] }))
))
const all = reviewed.filter(Boolean).flatMap((r) => r.findings.map((f) => ({ ...f, lens: r.lens })))
log(`Collected ${all.length} candidate findings`)

phase('Verify')
const verified = await parallel(all.map((f) => () =>
  parallel([
    () => agent(`Adversarially verify this M13 finding. Read the real code (git diff main...HEAD + the file) and try to REFUTE it. Default isReal=false if false positive / pre-existing / out of scope / already handled.\nLens:${f.lens} Sev:${f.severity}\nFile:${f.file} (${f.location||''})\n${f.title}\n${f.detail}\nSuggestion:${f.suggestion}`,
      { label: `verify:${f.lens}`, phase: 'Verify', schema: VERDICT_SCHEMA }).catch(() => ({ isReal: false, reason: 'err' })),
    () => agent(`Second independent check — is this M13 finding a REAL, actionable issue to fix before merge? Read the code; be skeptical; confirm only with a concrete pointer.\nFile:${f.file} (${f.location||''})\n${f.title}\n${f.detail}`,
      { label: `verify2:${f.lens}`, phase: 'Verify', schema: VERDICT_SCHEMA }).catch(() => ({ isReal: false, reason: 'err' })),
  ]).then((v) => ({ ...f, votes: v.filter(Boolean).filter((x) => x.isReal).length }))
))
const confirmed = verified.filter(Boolean).filter((f) => f.votes >= 2)
const order = { high: 0, medium: 1, low: 2 }
confirmed.sort((a, b) => (order[a.severity] - order[b.severity]) || a.file.localeCompare(b.file))
log(`Confirmed ${confirmed.length} of ${all.length}`)
return {
  candidates: all.length, confirmedCount: confirmed.length,
  confirmed: confirmed.map((f) => ({ severity: f.severity, lens: f.lens, file: f.file, location: f.location, title: f.title, detail: f.detail, suggestion: f.suggestion })),
}
