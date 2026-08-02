export const meta = {
  name: 'heard-surface-rebuild',
  description: 'Rebuild the five Heard UI surfaces per DESIGN_SPEC_V2 as parallel issue→branch→PR agents',
  phases: [{ title: 'Rebuild', detail: 'one worktree agent per surface' }],
}

const RESULT = {
  type: 'object',
  properties: {
    surface: { type: 'string' },
    issueUrl: { type: 'string' },
    prUrl: { type: 'string' },
    branch: { type: 'string' },
    verification: { type: 'string', description: 'typecheck/lint/test results' },
    notes: { type: 'string', description: 'deviations, shared-component change requests, risks' },
  },
  required: ['surface', 'prUrl', 'branch', 'verification'],
}

const COMMON = `
You are rebuilding one surface of "Heard" — a two-sided marketplace where customers pay to talk with companion listeners who are all blind or visually impaired. Companionship, never therapy. This is a FULL UI/UX redesign to premium editorial quality (reference bar: teww.org). You are inside a git worktree of the repo; the redesign foundation is already merged on this checkout.

READ FIRST (in the repo root):
1. DESIGN_SPEC_V2.md — the complete design spec. Your surface's section in §6 is your blueprint. Follow §3-§5 and §9 (contrast cheat-sheet) exactly.
2. CLAUDE.md — golden rules. WCAG 2.2 AA/AAA, ≥48px targets, semantic HTML, no state by color alone, all copy via messages/en.json, server-first, no new dependencies.
3. The foundation primitives you build with (already restyled, do NOT modify them): components/ui/{Button,Card,Chip,Tag,StatusBadge,Avatar,StatCard,VoicePlayer,Field,Select,Dialog,Toast,DataTable,Section,Availability}.tsx and components/shared/{AppHeader,MarketingFooter,ArcField,NavLink,Container,Logo,SafetyBanner}.tsx, components/motion/Reveal.tsx. Read the ones you use. Key facts: Card is borderless (interactive prop for hover lift), Section has tones page|surface|tint|band(teal)|ink, StatCard is flat/editorial, Avatar takes available?: boolean, globals.css provides .kicker and .numeral classes, --text-numeral, rounded-tile, shadow-lift.

HARD CONSTRAINTS:
- NEVER modify: app/globals.css, components/ui/*, components/shared/*, components/motion/*, lib/*, supabase/*, any server action file (actions.ts) beyond imports if a component moved, package.json.
- Colors and Logo: untouchable.
- Keep ALL existing functionality: forms, server actions, links, data display. This is a visual/UX rebuild of page and feature components, not a behavior change.
- messages/en.json: you may ADD keys only inside your namespace blocks, and only via targeted Edit insertions (find an existing key line in the namespace and insert after it). NEVER rewrite/reformat the whole file (other agents are editing other namespaces in parallel).
- Design taste: no three-identical-card rows where the spec calls for editorial rows; use tonal Section bands for rhythm; kickers above headings; oversized serif numerals for stats/steps; hairline separation instead of boxes; generous whitespace; sentence case. Avoid the generic patterns the spec bans.
- Tests: existing behavior/a11y tests must pass. If a test asserts an old styling detail (a class, a DOM shape) update the assertion to the new markup while preserving the behavioral/a11y contract. Never delete a test to make it pass.

GIT WORKFLOW (do all of it yourself, no approval needed):
1. First: gh issue create --title "<surface> redesign: <short>" --body "<why + scope + definition of done>" — capture the issue number N.
2. git checkout -b <branch> (branch name given below).
3. Implement. Then: npm install --no-audit --no-fund (worktree has no node_modules), then npm run typecheck && npm run lint && npm run test — all must pass. Do NOT start a dev server (port is taken by the main session).
4. Commit ALL your changes with author identity Taha-Mahmoodi <85902429+Taha-Mahmoodi@users.noreply.github.com> and end the message with:
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01LNuidX4hTo1eMcGoRyxZ8o
5. git push -u origin <branch>
6. gh pr create with a FULL description: what/why, per-page changes, a11y notes, verification results, "Closes #N". End the body with:
🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01LNuidX4hTo1eMcGoRyxZ8o
7. Do NOT merge the PR — the orchestrator merges sequentially.

Return JSON only (the schema is enforced): surface, issueUrl, prUrl, branch, verification (exact pass/fail summary), notes.
`

const SURFACES = [
  {
    key: 'marketing',
    branch: 'redesign/02-marketing',
    prompt: `Surface: MARKETING. Files you own: app/(marketing)/** , components/sections/** , components/mockups/BrowserFrame.tsx, app/not-found.tsx, app/error.tsx. en.json namespace: marketing.* (+ page.* for 404/error if that's where their copy lives — check).

Build DESIGN_SPEC_V2 §6 "Home" exactly: (1) editorial hero on cream — kicker, display headline, sub, primary CTA + quiet sign-in, trust line, ArcField bleeding from the right edge (absolute, hidden on small screens if it crowds); (2) stats band (Section tone=band) — three oversized cream serif numerals (.numeral) + captions, staggered baselines on desktop, thin hairlines (border-surface/20); reuse existing marketing.stat* keys; (3) how-it-works as three numbered editorial ROWS (01/02/03 pale-teal .numeral left, serif title + one sentence, hairlines between, small amber icon chip right) — NOT cards; add the three step copy keys to marketing.* if missing; (4) "Voices" (tone=surface): three listener-style preview cards with VoicePlayer (static marketing content — add marketing.* keys for three short intro transcripts with warm names e.g. Maya/Walter/Inés matching seed listeners; VoicePlayer simulates playback without audioUrl, that's fine); (5) quote section — one big serif italic pull-quote with giant pale-amber decorative quotation mark, off-grid (add keys); (6) become-a-listener split: left teal block (serif headline + amber CTA using existing marketing.becomeListener), right side the existing /gallery/provider-dashboard.png inside BrowserFrame (restyle BrowserFrame subtly: borderless, shadow-md, rounded-tile); (7) add <MarketingFooter /> to app/(marketing)/layout.tsx after <main>. Keep the Gallery screenshots section OUT (the new Voices+split sections replace it) — delete components/sections/Gallery.tsx usage from the page but leave public/gallery assets alone. Update/replace components/sections/* as needed (you own them). Also restyle app/not-found.tsx and app/error.tsx: ArcField or arc mark, serif statement, one primary Button home; keep existing copy keys.
Stagger Reveal delays; every section gets aria-label via Section label prop as before.`,
  },
  {
    key: 'auth',
    branch: 'redesign/03-auth',
    prompt: `Surface: AUTH. Files you own: app/(auth)/layout.tsx, app/(auth)/signin/page.tsx, app/(auth)/signup/page.tsx, components/auth/SignInForm.tsx, components/auth/SignUpForm.tsx. en.json namespace: auth.*.

Build DESIGN_SPEC_V2 §6 "Auth": keep the split-panel concept but elevate it. Left teal panel: Logo tone="onPrimary", ONE giant serif statement (existing auth heading copy), the three checklist lines (keep copy), ArcField whisper at the bottom edge (low opacity, aria-hidden), generous padding. Right panel: white, minimal — form title in serif, fields via Field/Input primitives (they're already 52px), single full-width primary Button, quiet link to the other auth page. Panel container: rounded-tile, shadow-md (Card or direct), min-h to feel composed on desktop, stacks cleanly on mobile with the teal panel as a compact header band. Preserve ALL form behavior: server actions, error display (Field error prop), role selection on signup (customer vs listener — make the role choice a pair of big radio tiles ≥48px with clear selected state: teal fill + check, not color alone), redirects. Check existing SignUpForm for the exact fields before redesigning.`,
  },
  {
    key: 'customer',
    branch: 'redesign/04-customer',
    prompt: `Surface: CUSTOMER. Files you own: app/(customer)/** (pages + layout only, NOT actions.ts logic), components/customer/**, components/session/CallStage.tsx, components/session/SessionFlow.tsx. en.json namespaces: browse.*, listener.*, booking.*, session.*, summary.*, account.*, favorite.*, receipt.*.

Build DESIGN_SPEC_V2 §6 for: Browse (serif title + count + filter chips row — restyle BrowseFilters using Chip/Select primitives, ≥48px; 3-col grid on xl; ListenerCard: Avatar with available ring, serif name + star rating with tabular numeral, VoicePlayer strip, max 3 topic Tags, hairline, price serif tabular left + primary "View profile" Button right pinned bottom); Listener profile (editorial header: large Avatar, display serif name, rating + Availability + FavoriteButton on one row; VoicePlayer big centerpiece; flat hairline sections for topics/languages; pricing as three flat duration tiles serif price + minutes caption; review rows; booking CTA prominent — sticky right column on desktop if the current layout supports it simply, otherwise prominent inline); Booking page (single column max-w-2xl: listener recap row, duration as three big radio tiles with serif prices — selected = teal fill + check icon, keyboard operable; notes field; hairline total row serif tabular; primary confirm; keep BookingForm's action wiring exactly); Account (flat hairline groups per spec: upcoming bookings as list rows with join Buttons, past sessions DataTable, favorites as mini cards row, settings as link rows; no card boxes except genuinely elevated things); Session flow (CallStage: immersive Section tone=ink full-height feel — breathing concentric arcs behind a big serif tabular timer (respect reduced motion — CSS animation only), listener name + Avatar, oversized labeled controls; rate/tip after-screen on cream: star buttons ≥48px with labels, tip Chips, textarea via Field). KEEP all server-action wiring, mock call flow, and states (loading/error/empty) working. Empty states get the arc mark + one serif sentence + primary action.`,
  },
  {
    key: 'provider',
    branch: 'redesign/05-provider',
    prompt: `Surface: PROVIDER. Files you own: app/(provider)/** (pages + layout, NOT actions.ts logic), components/provider/**, components/session/ProviderSessionFlow.tsx, components/dashboard/DashboardHeader.tsx. en.json namespace: provider.* (+ session.* keys ONLY if a provider-specific key is missing — prefer reusing; the customer agent owns session.* broadly, so avoid adding there unless strictly needed and clearly provider-suffixed).

Build DESIGN_SPEC_V2 §6 "Provider dashboard": display serif greeting (DashboardHeader); availability as a full-width band — teal Section band when available (cream text, "Go offline" ghost-on-band button with AA contrast: use white text + border-surface/40) vs sunk well when offline; "At a glance" as flat StatCard row in a hairline grid (grid with divide-x/divide-y borders, no boxes); incoming requests as elevated white Card rows with Accept (primary) / Decline (ghost); recent sessions + payout history via the restyled DataTable (no wrapper cards); recent feedback as quote rows (serif italic quote, stars, tip StatusBadge); profile health as a compact two-column checklist with success dots + labels (flat rows). Sessions page: DataTable, filters if present restyled with Chips. Onboarding (OnboardingFlow): numbered serif stepper (01-04 .numeral small, teal for current, labels always visible), one clean panel per step, VoiceIntroRecorder gets the big round record button treatment consistent with VoicePlayer; AvailabilityToggle: a real labeled switch ≥48px with visible on/off text. KEEP all wiring (actions, toasts, states).`,
  },
  {
    key: 'admin',
    branch: 'redesign/06-admin',
    prompt: `Surface: ADMIN. Files you own: app/(admin)/** (pages + layout, NOT actions.ts logic), components/admin/**. en.json namespace: admin.*.

Build DESIGN_SPEC_V2 §6 "Admin": Overview page — replace the 14 identical white boxes with three labeled groups (kicker heading per group: existing admin.* group labels "Strategic"/"Operational"/"Needs attention" — check exact keys) of flat StatCards in hairline-divided grids (divide-x divide-y border-border, no boxes); "Needs attention" numerals turn alert color when > 0 and the tile links to the relevant admin page (whole tile clickable with proper link semantics); keep the Configuration note as a quiet flat row. Approvals: ProviderApprovalCard → elevated white Card row: Avatar + name + languages/topics Tags + VoicePlayer inline + Approve (primary) / Reject (ghost) with the existing reason Dialog; pending StatusBadge. Users: UsersTable via restyled DataTable + AdminUserSearch with Field/Input + suspend/reinstate Buttons (danger/ghost). Reports: ReportCard → flat hairline rows with StatusBadge + resolve action. Activity: AdminActivityTables via DataTable, grouped with kicker headings. PayoutRunner: StatCard row + primary run Button + result toast (keep logic). KEEP all wiring and admin actions exactly.`,
  },
]

phase('Rebuild')
log('Spawning 5 surface agents (worktrees): marketing, auth, customer, provider, admin')
const results = await parallel(
  SURFACES.map((s) => () =>
    agent(
      COMMON + '\nYour branch name: ' + s.branch + '\n\n' + s.prompt,
      { label: 'rebuild:' + s.key, phase: 'Rebuild', schema: RESULT, isolation: 'worktree' },
    ),
  ),
)
const ok = results.filter(Boolean)
log(`Done: ${ok.length}/5 surfaces returned`)
return { results: ok, missing: SURFACES.filter((s, i) => !results[i]).map((s) => s.key) }