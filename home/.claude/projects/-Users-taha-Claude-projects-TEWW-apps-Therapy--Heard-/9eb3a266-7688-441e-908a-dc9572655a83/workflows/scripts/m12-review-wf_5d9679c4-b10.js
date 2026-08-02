export const meta = {
  name: 'm12-review',
  description: 'Adversarial multi-lens review of the M12 customer-dashboard diff',
  phases: [
    { title: 'Review', detail: 'one reviewer per lens over the diff' },
    { title: 'Verify', detail: 'two skeptics adversarially verify each finding' },
  ],
}

const FINDINGS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          file: { type: 'string' },
          location: { type: 'string', description: 'function / line / symbol' },
          title: { type: 'string' },
          detail: { type: 'string', description: 'what is wrong and why it matters' },
          suggestion: { type: 'string', description: 'concrete fix' },
        },
        required: ['severity', 'file', 'title', 'detail', 'suggestion'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    isReal: { type: 'boolean' },
    reason: { type: 'string' },
  },
  required: ['isReal', 'reason'],
}

const DIFF_INSTR = `The repo is at the cwd, on branch m12-customer-dashboard. Run \`git diff main...HEAD\` to see the full M12 customer-dashboard diff, and read any changed files for context (use Read/Grep/Bash). Project rules (CLAUDE.md): WCAG 2.2 AA accessibility; external services only via adapters (lib/integrations/*); money in integer cents, pricing only in lib/pricing.ts; RLS on every table; validate at the boundary + check role/ownership in every server action; server-only never in client bundles. Only report REAL, actionable issues INTRODUCED by this diff — not pre-existing code, not style nits. Be specific (file + location). If you find nothing real, return an empty findings array.`

const LENSES = [
  { key: 'correctness', prompt: `Review the M12 diff for CORRECTNESS bugs: logic errors, wrong data flow, missing null/empty handling, off-by-one, incorrect mapping between bookings/sessions/providers, broken links/routes, server/client boundary mistakes (functions passed to client components, server-only imported in client), revalidatePath gaps. ${DIFF_INSTR}` },
  { key: 'a11y', prompt: `Review the M12 diff for ACCESSIBILITY issues (the listener users are blind; this is the customer side but rules still apply): missing labels/aria, color-only status, non-semantic tables, focus/keyboard problems, icon-only controls, heading order, live-region gaps, controls without accessible names. ${DIFF_INSTR}` },
  { key: 'security', prompt: `Review the M12 diff for SECURITY / RLS / auth issues: server actions missing requireRole/ownership checks, the receipt route handler leaking another user's data, missing input validation (Zod) at boundaries, IDOR (acting on resources not owned by caller), service-role misuse, secrets/server-only leaking to client. Check favorites/cancel/reschedule/updateProfileName/receipt specifically. ${DIFF_INSTR}` },
  { key: 'money', prompt: `Review the M12 diff for MONEY + CANCEL-POLICY correctness: cancelBooking must release vs charge correctly per SPEC §5 (scheduled ≥1h before start → release; otherwise charge; a never-joined "now" booking → release), use the payments adapter (refund/capture) correctly, all amounts integer cents, no pricing math outside lib/pricing.ts, no double charge/refund. Check the capture vs refund branches and amounts. ${DIFF_INSTR}` },
  { key: 'reuse', prompt: `Review the M12 diff for REUSE / SIMPLIFICATION: duplicated logic that should reuse existing helpers/components, dead code, unnecessary complexity, inconsistent patterns vs the rest of the codebase, hardcoded user-facing strings that bypass messages/en.json. ${DIFF_INSTR}` },
]

phase('Review')
const reviewed = await parallel(
  LENSES.map((lens) => () =>
    agent(lens.prompt, { label: `review:${lens.key}`, phase: 'Review', schema: FINDINGS_SCHEMA })
      .then((r) => ({ lens: lens.key, findings: (r && r.findings) || [] }))
      .catch(() => ({ lens: lens.key, findings: [] }))
  )
)

const allFindings = reviewed.filter(Boolean).flatMap((r) =>
  r.findings.map((f) => ({ ...f, lens: r.lens }))
)
log(`Collected ${allFindings.length} candidate findings across ${LENSES.length} lenses`)

phase('Verify')
const verified = await parallel(
  allFindings.map((f) => () =>
    parallel([
      () => agent(
        `Adversarially verify this code-review finding from the M12 diff. Read the actual code (git diff main...HEAD + the file) and try to REFUTE it. Default to isReal=false if it's a false positive, pre-existing, out of scope, or already handled.\n\nLens: ${f.lens}\nSeverity: ${f.severity}\nFile: ${f.file} (${f.location || 'n/a'})\nTitle: ${f.title}\nDetail: ${f.detail}\nSuggestion: ${f.suggestion}`,
        { label: `verify:${f.lens}`, phase: 'Verify', schema: VERDICT_SCHEMA }
      ).catch(() => ({ isReal: false, reason: 'verify error' })),
      () => agent(
        `Second independent check. Is this M12 code-review finding a REAL, actionable bug/issue that should be fixed before merge? Read the code yourself. Be skeptical — confirm only if you can point to the concrete problem in the diff.\n\nLens: ${f.lens}\nFile: ${f.file} (${f.location || 'n/a'})\nTitle: ${f.title}\nDetail: ${f.detail}`,
        { label: `verify2:${f.lens}`, phase: 'Verify', schema: VERDICT_SCHEMA }
      ).catch(() => ({ isReal: false, reason: 'verify error' })),
    ]).then((verdicts) => {
      const reals = verdicts.filter(Boolean).filter((v) => v.isReal).length
      return { ...f, confirmed: reals >= 2, votes: reals, verdicts }
    })
  )
)

const confirmed = verified.filter(Boolean).filter((f) => f.confirmed)
const order = { high: 0, medium: 1, low: 2 }
confirmed.sort((a, b) => (order[a.severity] - order[b.severity]) || a.file.localeCompare(b.file))

log(`Confirmed ${confirmed.length} of ${allFindings.length} findings (both skeptics agreed)`) 
return {
  candidates: allFindings.length,
  confirmedCount: confirmed.length,
  confirmed: confirmed.map((f) => ({
    severity: f.severity, lens: f.lens, file: f.file, location: f.location,
    title: f.title, detail: f.detail, suggestion: f.suggestion,
  })),
}
