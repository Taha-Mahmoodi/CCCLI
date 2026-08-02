export const meta = {
  name: 'm14-a11y-audit',
  description: 'Adversarial WCAG/§4 accessibility + polish audit across all three Heard dashboards',
  phases: [
    { title: 'Audit', detail: 'one agent per dashboard screen + a primitives/shell sweep' },
    { title: 'Verify', detail: 'two refute-by-default skeptics per finding' },
  ],
}

const RUBRIC = `
You are auditing a dashboard screen of "Heard" (a marketplace where companion listeners are all
blind/visually impaired — accessibility is THE product) against its DASHBOARDS_REQUIREMENTS.md §4 rules
and WCAG 2.2 AA (AAA body contrast). Read the page file AND every component it renders (trace imports;
use Read/Grep). Project root is the cwd. Rules to check, concretely:

1. SEMANTIC TABLES: data uses real <table> with <thead>, <th scope>, <caption>; SR announces headers.
   Sortable columns must announce sort state (aria-sort) and be keyboard-operable (real <button> in <th>).
2. NO MEANING BY COLOUR ALONE: every status/state pill carries text + icon (not just a tone colour).
   Flag any StatusBadge/badge without an icon, or any state shown only via colour.
3. CONTRAST: body text >= 4.5:1 (AAA 7:1 preferred). Flag ink-soft/muted text on tinted backgrounds that
   may fall below 4.5:1. Be specific about the token pair.
4. KEYBOARD + FOCUS: everything operable by keyboard, logical order, visible focus never removed; no
   icon-only controls without an accessible name; clickable non-buttons.
5. LIVE REGIONS: state changes (availability toggle, suspend/reinstate, accept/decline, favorite,
   search results, cancel) are announced via aria-live / role=status / the Toast announce(). Flag actions
   that mutate state with NO announcement.
6. REDUCED DENSITY / PROGRESSIVE DISCLOSURE: screen isn't overcrowded; long lists are sliced or disclosed.
7. STAT CARDS labeled (number has a text label); any chart has an equivalent table + one-line text summary.
8. EMPTY / LOADING / ERROR STATES: each data region has an accessible empty state; async server actions
   surface errors accessibly (not swallowed); loading is handled (Suspense/skeleton or acceptable SSR).
9. COPY via messages/en.json (no hard-coded user-facing strings); money via lib/pricing.ts in cents.
10. HEADINGS/LANDMARKS: logical heading order (one h1 per page via DashboardHeader, h2 sections), regions
    labeled; skip-link target.

Only report REAL, actionable gaps that a blind keyboard/SR user would actually hit, or a concrete polish
defect (missing empty/error state). Do NOT report things that are already correct. For each finding give a
precise file path + location, the rule number, why it's a real problem, and a concrete fix.`

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['findings'],
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['severity', 'rule', 'file', 'location', 'title', 'detail', 'suggestion'],
        properties: {
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          rule: { type: 'string', description: 'rule number 1-10 from the rubric' },
          file: { type: 'string' },
          location: { type: 'string' },
          title: { type: 'string' },
          detail: { type: 'string' },
          suggestion: { type: 'string' },
        },
      },
    },
  },
}

const SCREENS = [
  { key: 'provider-dashboard', label: 'Listener (provider) dashboard', page: 'app/(provider)/provider/dashboard/page.tsx', comps: 'components/provider/{AvailabilityToggle,IncomingRequests,SessionsTable,PayoutsTable}.tsx' },
  { key: 'provider-sessions', label: 'Provider sessions list', page: 'app/(provider)/provider/sessions/page.tsx', comps: 'components/provider/SessionsTable.tsx' },
  { key: 'customer-account', label: 'Customer account dashboard', page: 'app/(customer)/account/page.tsx', comps: 'components/customer/{UpcomingBookings,PastSessionsTable,FavoriteListeners,FavoriteButton}.tsx' },
  { key: 'customer-settings', label: 'Customer settings', page: 'app/(customer)/account/settings/page.tsx', comps: 'components/customer/NameSettingForm.tsx' },
  { key: 'admin-overview', label: 'Admin overview', page: 'app/(admin)/admin/page.tsx', comps: 'components/ui/StatCard.tsx, components/dashboard/DashboardHeader.tsx' },
  { key: 'admin-reports', label: 'Admin reports inbox', page: 'app/(admin)/admin/reports/page.tsx', comps: 'components/admin/ReportCard.tsx' },
  { key: 'admin-users', label: 'Admin users', page: 'app/(admin)/admin/users/page.tsx', comps: 'components/admin/{UsersTable,SuspendUserButton,AdminUserSearch}.tsx' },
  { key: 'admin-activity', label: 'Admin activity', page: 'app/(admin)/admin/activity/page.tsx', comps: 'components/admin/AdminActivityTables.tsx' },
  { key: 'admin-providers', label: 'Admin approvals queue', page: 'app/(admin)/admin/providers/page.tsx', comps: 'components/admin/{ProviderApprovalCard,PayoutRunner}.tsx' },
  { key: 'primitives-shell', label: 'Shared primitives + dashboard shell', page: 'components/ui/DataTable.tsx', comps: 'components/ui/{StatCard,StatusBadge,Availability,Toast,Card}.tsx, components/dashboard/DashboardHeader.tsx, components/shared/AppHeader.tsx' },
]

phase('Audit')
const audited = await pipeline(
  SCREENS,
  (s) => agent(
    `Audit the "${s.label}" screen. Start at ${s.page} and also read its components: ${s.comps}. ` +
    `Trace any further imports you need (e.g. components/ui/DataTable.tsx, StatusBadge.tsx, lib/db/queries.ts). ` +
    RUBRIC,
    { label: `audit:${s.key}`, phase: 'Audit', schema: SCHEMA, agentType: 'Explore' }
  ).then((r) => ({ screen: s.key, findings: (r?.findings ?? []) })),
  (res) => parallel((res.findings).map((f) => () =>
    parallel([0, 1].map((i) => () =>
      agent(
        `You are skeptic #${i + 1}. A WCAG/§4 audit of Heard's "${res.screen}" screen produced this finding. ` +
        `Independently verify it by READING the cited code. Try to REFUTE it — default to real=false if the ` +
        `code already handles it, the claim is a stylistic nit, or it's not actually reachable by a user.\n\n` +
        `FILE: ${f.file}\nLOCATION: ${f.location}\nRULE: ${f.rule}\nTITLE: ${f.title}\nDETAIL: ${f.detail}\n` +
        `SUGGESTION: ${f.suggestion}\n\nReturn real=true ONLY if this is a genuine, actionable accessibility/` +
        `polish gap that a fix would meaningfully improve.`,
        { label: `verify:${res.screen}`, phase: 'Verify', agentType: 'Explore', schema: {
          type: 'object', additionalProperties: false, required: ['real', 'reason'],
          properties: { real: { type: 'boolean' }, reason: { type: 'string' } },
        } }
      )
    )).then((votes) => {
      const v = votes.filter(Boolean)
      const realCount = v.filter((x) => x.real).length
      return { ...f, screen: res.screen, realCount, votes: v.map((x) => x.reason) }
    })
  ))
)

const verified = audited.flat().filter(Boolean)
const confirmed = verified.filter((f) => f.realCount >= 1)
log(`Audit complete: ${verified.length} findings, ${confirmed.length} confirmed (>=1 skeptic).`)
return {
  totalFindings: verified.length,
  confirmedCount: confirmed.length,
  confirmed: confirmed.sort((a, b) => b.realCount - a.realCount),
}
