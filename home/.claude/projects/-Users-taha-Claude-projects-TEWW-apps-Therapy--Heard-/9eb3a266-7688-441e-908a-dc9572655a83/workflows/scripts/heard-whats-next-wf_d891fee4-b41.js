export const meta = {
  name: 'heard-whats-next',
  description: 'Assess the Heard codebase across 7 dimensions and synthesize a prioritized "what else" roadmap',
  phases: [
    { title: 'Assess', detail: 'one read-only agent per dimension, grounded in docs + code' },
    { title: 'Synthesize', detail: 'dedupe + rank into a roadmap' },
  ],
}

const COMMON = `
Project root is the cwd. "Heard" is a two-sided marketplace (customers pay to talk with companion
listeners who are all blind/visually impaired; non-clinical, never therapy; accessibility is the
product). Stack: Next.js 16 App Router, TS strict, Supabase (Postgres+Auth+Storage), Tailwind v4,
Zod, Vitest/RTL/jest-axe, Playwright. Mock mode (INTEGRATIONS_MODE=mock) via adapters in
lib/integrations/*. Money is integer cents in lib/pricing.ts. The MVP (M0–M9) and the
Listener/Customer/Admin dashboards (M10–M14) are all built and merged to main.

Governing docs at repo root: SPEC.md, BUILD_PLAN.md, DASHBOARDS_BUILD_PLAN.md,
DASHBOARDS_REQUIREMENTS.md, CLAUDE.md, README.md. READ the docs relevant to your dimension AND the
actual code (use Read/Grep/Glob). Report only REAL, grounded gaps — things actually missing,
partial, risky, or debt — not hypotheticals. For each, give a concrete file/doc pointer and a
specific recommendation. Be exhaustive within your dimension; it's fine to return many findings.`

const SCHEMA = {
  type: 'object', additionalProperties: false, required: ['findings'],
  properties: { findings: { type: 'array', items: {
    type: 'object', additionalProperties: false,
    required: ['title', 'status', 'severity', 'effort', 'detail', 'pointer', 'recommendation'],
    properties: {
      title: { type: 'string' },
      status: { type: 'string', enum: ['missing', 'partial', 'risk', 'debt', 'polish'] },
      severity: { type: 'string', enum: ['high', 'medium', 'low'] },
      effort: { type: 'string', enum: ['S', 'M', 'L'] },
      detail: { type: 'string' },
      pointer: { type: 'string' },
      recommendation: { type: 'string' },
    },
  } } },
}

const DIMS = [
  { key: 'spec-coverage', prompt: 'DIMENSION: Spec coverage & feature completeness. Read SPEC.md (all sections, esp. §5 booking/cancel policy, §11 routes, §12 out-of-scope), BUILD_PLAN.md, DASHBOARDS_REQUIREMENTS.md (the "later" columns + moderation/notifications), and CLAUDE.md "Out of scope". Identify what is specified-but-unbuilt or only partially built: the notifications table (is it created? used?), moderation/reporting beyond the minimal hook, reschedule/cancel edge cases vs SPEC §5, the downloadable receipt (real artifact vs link?), language/i18n actually switchable, performance analytics, messaging, spending summary, subscriptions. Distinguish "intentionally deferred (documented)" from "gap".' },
  { key: 'security-rls', prompt: 'DIMENSION: Security, RLS & data protection. Read all supabase/migrations/*.sql RLS policies + guard triggers, lib/supabase/* (client/server/admin/proxy), every "use server" action under app/**/actions.ts, and lib/db/queries.ts. Hunt for: tables missing RLS or with overly-broad policies, service-role key exposure to client, missing ownership/role checks in server actions, IDOR, injection (PostgREST .or/.filter), privileged-column writes, public reads leaking private fields (bg_check_ref/payout_account_ref), auth boundary holes in proxy.ts, and whether is_suspended is fully enforced everywhere it should be.' },
  { key: 'prod-readiness', prompt: 'DIMENSION: Production readiness & ops. Read .github/workflows/*, package.json scripts, .env.example, next.config.*, README.md, supabase/config.toml, and lib/integrations/*/real.ts. Assess: CI completeness (does it run typecheck/lint/test/build/e2e? does e2e have a DB?), env var completeness + secret handling, the INTEGRATIONS_MODE=real swap path (do real.ts stubs exist for Stripe/Zoom/Checkr and does the app compile with real?), deploy story (Vercel + Supabase migrations), error monitoring/logging, rate limiting, seed-vs-prod data safety, and any missing operational guardrails.' },
  { key: 'test-coverage', prompt: 'DIMENSION: Test coverage & quality gates. Read tests/** (unit, component, e2e), vitest/playwright configs, and cross-reference against app code. Identify untested surfaces: server actions (booking/session/review/admin), lib/db/queries (RLS behavior), pricing edge cases (overage rounding, commission, tips, cancellation), adapters, axe coverage per dashboard screen, and E2E gaps (cancel/reschedule, suspension enforcement, payout run, error/404). Note any flaky-by-design tests or missing assertions.' },
  { key: 'accessibility', prompt: 'DIMENSION: Accessibility (the product\'s whole point — WCAG 2.2 AA floor, AAA body). Read components/ui/*, the session/call screens (app/(customer)/session/**, app/(provider)/provider/session/**), Dialog, forms, and SPEC.md §10. Beyond the M14 dashboard pass, find remaining gaps: the app-wide <Link><Button> nested-interactive (<a><button>) pattern, reduced-motion handling, 200% zoom/reflow, focus order + focus trap in Dialog, live-region coverage on the live call (timer/captions/mute), form error association, skip-link correctness, and any icon-only controls. Verify contrast claims against the real @theme tokens in app/globals.css — do not guess ratios.' },
  { key: 'code-quality', prompt: 'DIMENSION: Code quality & tech debt. Skim the codebase for: duplicated logic that should be shared, dead code / orphaned i18n keys, error swallowing (empty catches, ignored results), any-typing or unsafe casts, inconsistent patterns across the three dashboards, the Link>Button polymorphism debt, magic numbers/literals (esp. money or commission outside lib/pricing.ts), and places that violate CLAUDE.md golden rules. Be specific with file:line.' },
  { key: 'ux-polish', prompt: 'DIMENSION: Product UX & polish. Read the page components across marketing/auth/browse/booking/session/account/provider/admin and the design brief (Interactive_Prototype_Design_Brief.md). Assess: empty/loading/error-state coverage, responsive/mobile behavior (the app is desktop-first 85%-width capped 1500px — does it degrade gracefully?), microcopy consistency vs the brief\'s voice, onboarding friction, discoverability of key actions (talk now, favorite, rebook, report), and any rough edges a real user would hit. Concrete, not vague.' },
]

phase('Assess')
const assessed = await parallel(DIMS.map((d) => () =>
  agent(`${COMMON}\n\n${d.prompt}`, { label: `assess:${d.key}`, phase: 'Assess', agentType: 'Explore', schema: SCHEMA })
    .then((r) => ({ dim: d.key, findings: (r?.findings ?? []) }))
))

const all = assessed.filter(Boolean).flatMap((a) => a.findings.map((f) => ({ ...f, dim: a.dim })))
log(`Assessment gathered ${all.length} findings across ${assessed.filter(Boolean).length} dimensions.`)

phase('Synthesize')
const ROADMAP_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['topRisks', 'quickWins', 'roadmap', 'deferred'],
  properties: {
    topRisks: { type: 'array', items: { type: 'string' }, description: 'highest-severity correctness/security items to fix first' },
    quickWins: { type: 'array', items: { type: 'string' }, description: 'high-value low-effort (S) items' },
    roadmap: { type: 'array', items: {
      type: 'object', additionalProperties: false, required: ['rank', 'theme', 'severity', 'effort', 'items', 'rationale'],
      properties: {
        rank: { type: 'number' },
        theme: { type: 'string' },
        severity: { type: 'string', enum: ['high', 'medium', 'low'] },
        effort: { type: 'string', enum: ['S', 'M', 'L', 'XL'] },
        items: { type: 'array', items: { type: 'string' } },
        rationale: { type: 'string' },
      },
    } },
    deferred: { type: 'array', items: { type: 'string' }, description: 'intentionally-out-of-scope items (documented), for completeness' },
  },
}
const synthesis = await agent(
  `You are the synthesis lead. Below are raw assessment findings (JSON) from 7 dimensions of the ` +
  `Heard codebase. Dedupe overlapping items, drop anything that is clearly a documented intentional ` +
  `deferral (list those under "deferred"), and produce a PRIORITIZED roadmap. Rank themes by ` +
  `(severity × value ÷ effort). Surface the top correctness/security risks first, then quick wins, ` +
  `then the ranked roadmap of larger themes. Be concrete and honest — this product's users are blind, ` +
  `so accessibility and safety regressions matter most.\n\nFINDINGS JSON:\n${JSON.stringify(all)}`,
  { label: 'synthesize', phase: 'Synthesize', schema: ROADMAP_SCHEMA }
)

return { dimensionCount: assessed.filter(Boolean).length, findingCount: all.length, ...synthesis, rawByDim: assessed.filter(Boolean).map((a) => ({ dim: a.dim, count: a.findings.length })) }
