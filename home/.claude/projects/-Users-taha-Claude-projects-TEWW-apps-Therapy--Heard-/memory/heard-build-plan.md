---
name: heard-build-plan
description: "Heard project — what it is, milestone cadence, and current progress (M0–M14 done; full MVP + dashboards shipped)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 9eb3a266-7688-441e-908a-dc9572655a83
---

**Heard** is a two-sided marketplace where customers pay to talk with companion listeners who are all legally blind/visually impaired — non-clinical companionship, never therapy. Accessibility (WCAG 2.2 AA floor, AAA body) and provider dignity are the whole point. Stack: Next.js 16 App Router + TS strict + Supabase + Tailwind v4 + Zod + Vitest/RTL/jest-axe + Playwright. External services (payments/calls/background-check) are mocked behind adapters (`INTEGRATIONS_MODE=mock`); money is integer cents; all pricing in `lib/pricing.ts`; all copy via `messages/en.json`.

Governing docs live at repo root: `SPEC.md`, `BUILD_PLAN.md`, `CLAUDE.md`, `Interactive_Prototype_Design_Brief.md`. Design tokens are in `app/globals.css` (@theme), ported from the design system.

**Working agreement:** build milestone-by-milestone (M0→M9) with a **checkpoint** after each — stop, show it runs, get sign-off before the next.

**Progress:**
- **M0 (done, committed `4066c54` on main):** scaffold, design tokens, accessible UI primitives, i18n, email+password auth with customer/provider role selection (role persisted via a Postgres `handle_new_user` trigger that also creates a `providers` row status=pending), RLS on profiles/providers, SSR clients + `proxy.ts` (Next 16 renamed middleware→proxy) route guards, app shell + persistent crisis-safety affordance. 25 tests green.
- **M1 (done, PR #4):** full data model for all SPEC §4 tables + RLS on every table; `seed.sql` (admin + customer + 6 approved providers, all sign in with `password123`); `lib/db/queries.ts` (RLS-enforced reads, public provider reads omit bg_check_ref/payout_account_ref) + entity Zod schemas. `supabase db reset` clean; RLS verified. Seed gotcha: insert `auth.users` set-based with empty-string token columns (confirmation_token etc.) or GoTrue 500s on login; add an `auth.identities` row so accounts can sign in; no dollar-quoted functions in seed.sql (the runner's batcher breaks them).
- **M2 (done, PR #5):** integration adapters under `lib/integrations/{payments,calls,background-check}/{interface,mock,real,index}.ts` — call `getPayments()/getCalls()/getBackgroundCheck()`, never import mock/real directly; real stubs throw `// TODO` errors. `lib/pricing.ts` is the only place for money math (pure, integer cents, half-up commission from config). Payments mock takes an injected Supabase client (no server-only) so it's unit-testable. 66 tests.
- **M3 (done, PR #6):** provider onboarding (4-step audio-first → Storage voice-intro bucket, topics/languages, prices, availability, mock bg-check) + dashboard (Available-now switch, earnings, rating). Guard trigger freezes privileged provider columns so providers can't self-approve.
- **M4 (done, PR #7):** admin `/admin/providers` queue with voice-intro playback + approve/reject/suspend (service-role writes); role-guarded. VoicePlayer plays real audio via signed URLs. Verified: approve → browse-eligible; non-admins redirected.
- **M5 (done, PR #8):** `/browse` (approved-only, URL filters, voice players), `/listeners/[id]`, `/book/[providerId]` (createBooking → priceForBlock → payments.authorizeHold → confirmed), `/account`. Verified: booking confirmed + $24 authorized hold in payments ledger. 77 tests.
- **M6 (done, PR #9):** session lifecycle — pre-call → mock call (count-up timer = source of truth, mute, captions, end), provider mirror; on end → computeSessionAccounting → payments.capture → completed. Verified: $24 total / $1.20 commission / $22.80 earnings, payment captured.
- **M7 (done, PR #10):** rating + optional tip (no commission) on the summary; recompute provider rating; weekly mock payouts (admin "Run weekly payouts") shown on provider dashboard.
- **M8 (done, PR #11):** Report-a-problem hook writing to `reports` (RLS reporter-owned), shown in the global SafetyBanner when signed in; booking-confirmed live region; a11y verification.
- **M9 (done, PR #12):** Playwright E2E (2 happy paths pass), README handoff (seeded accounts password123, adapter-swap guide), verified INTEGRATIONS_MODE=real `next build` compiles all 16 routes to TODO stubs.

## ✅ MVP COMPLETE (M0–M9, PRs #1–#12 merged to main)
Full two-sided loop works end-to-end in mock mode: provider onboard → admin approve → customer browse/book → mock call + billing → rate/tip → weekly payout. Gotcha: Next 16 needs `allowedDevOrigins: ["127.0.0.1","localhost"]` in next.config or Playwright-driven server actions are silently blocked.

## ✅ DASHBOARDS PHASE COMPLETE (M10–M14, per DASHBOARDS_BUILD_PLAN.md + DASHBOARDS_REQUIREMENTS.md)
Built the fuller Listener/Customer/Admin dashboards, one milestone per PR, each ending green (typecheck, lint, axe, tests) and adversarially reviewed.
- **M10–M12 (merged):** shared foundation (`favorites` table + RLS, `admin_metrics_*` SQL views read via service-role behind an admin guard, accessible primitives StatCard/DataTable/StatusBadge), listener dashboard (availability, earnings via `lib/earnings.ts`, sessions, payouts, feedback, profile-health), customer dashboard (favorites, upcoming/past, receipts, settings).
- **M13 (PR #17):** admin dashboard — overview (strategic/operational/alert StatCards from the views), reports inbox (review/suspend), users (search + suspend/reinstate), read-only activity. Migration `20260608130000_m13_admin.sql` adds `profiles.is_suspended` + a `guard_profile_privileged_columns()` trigger (closed a role-escalation hole where a customer could PATCH their own `role`). 13/13 adversarial-review findings applied.
- **M14 (PR #18):** a11y/tests/polish — fixed StatusBadge success/warning AA contrast (added `--color-success-strong #236449` / `--color-accent-strong #8a4f15`; the base tones were 4.27:1 / 3.08:1), icons on colour-only badges, DataTable sort announcement i18n, accessible `app/error.tsx` + `app/not-found.tsx`. Enriched `seed.sql` with a real Casey↔Maya history (3 sessions, payments, payouts, tip, upcoming booking — integer cents per `lib/pricing.ts`) so every dashboard shows real data. Added 3 dashboard E2E paths + fixed a pre-existing broken `customer-journey` selector (`/account` CTA is "Join"/`account.join`, not "join the call"). 104 unit/component tests + 5 Playwright E2E green.

**Verification habit that paid off:** verify LLM contrast claims against the real `@theme` tokens (compute WCAG ratios) — the audit's `ink-soft` "failures" were actually 5.2–6.0:1 (pass); only the badge tones genuinely failed. Likewise `toast()` already announces to SR, so "error not announced" findings were false.

Fast-follows still out of scope: real Stripe/Zoom/Checkr, native mobile, subscriptions, editable commission. Schema + adapters ready.

Related: [[local-supabase-colima]], [[supabase-ssr-version]], [[git-workflow]]
