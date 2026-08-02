export const meta = {
  name: 'gsap-plan-update',
  description: 'Update GSAP plan with the user\'s corrected demo URLs (T3 physics-based, T4 animate-scroll-position, T5 flexbox-filtering), fold in all concrete bugs from the prior critic, and re-run an adversarial completeness critique.',
  phases: [
    { title: 'Fetch new demos', detail: 'parallel: physics-based-effects (T3), animate-scroll-position (T4), flexbox-filtering (T5)' },
    { title: 'Update plan', detail: 'fold new demo references + prior critic bugs into a corrected plan' },
    { title: 'Re-critique', detail: 'adversarial completeness critic on the updated plan' },
  ],
}

const DEMO_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    url: { type: 'string' },
    title: { type: 'string' },
    technique: { type: 'string' },
    keyMechanic: { type: 'string' },
    gsapPlugins: { type: 'array', items: { type: 'string' } },
    isPaidPlugin: { type: 'boolean' },
    codeSnippet: { type: 'string' },
    a11yNotes: { type: 'string' },
    reactPort: { type: 'string' },
    fetchSuccess: { type: 'boolean' },
  },
  required: ['url', 'title', 'technique', 'keyMechanic', 'gsapPlugins', 'isPaidPlugin', 'fetchSuccess'],
}

phase('Fetch new demos')

const [physicsDemo, scrollDemo, filterDemo] = await parallel([
  () => agent('Fetch https://demos.gsap.com/demo/create-physics-based-effects/ via WebFetch. The user wants this technique applied to Like / Save / Share button click feedback in the reading view (per-button color flash + tactile feel). Report exhaustively: what physics technique is used (Physics2D? InertiaPlugin? CustomBounce? CustomEase? a spring expressed via gsap.timeline?), the verbatim JS snippet (up to ~80 lines), whether any historically-premium plugin is used (all such plugins became free post-2024 Webflow acquisition — still note which ones), the easing, and the React port using @gsap/react useGSAP. Crucially explain how to attach a per-element CSS-variable color flash inside / alongside the physics tween so each button (Like = --like / Save = --gold / Share = neutral) flashes its own color. If WebFetch cannot retrieve, set fetchSuccess=false and describe the canonical physics-based button click approach (InertiaPlugin for velocity-decay on release, CustomBounce for tactile rebound, or a hand-crafted spring timeline with overshoot).', { schema: DEMO_SCHEMA, label: 'fetch:physics' }),

  () => agent('Fetch https://demos.gsap.com/demo/animate-scroll-position/ via WebFetch. This is the user\'s canonical reference for smooth scroll back to a returning reader\'s last reading position. Report exhaustively: confirm whether it uses ScrollToPlugin (it almost certainly does — verify), the verbatim JS snippet showing the gsap.to(window, { scrollTo: ... }) call, easing curve, duration, autoKill handling, and any pause-on-user-interaction logic. Note specifics relevant to integration with the existing useReadingPosition hook in this repo (which already has window.scrollTo({ behavior: instant }) for the restore — this demo gives us the GSAP replacement). React port with useGSAP + Next.js notes. If WebFetch fails, set fetchSuccess=false and describe the canonical ScrollToPlugin pattern.', { schema: DEMO_SCHEMA, label: 'fetch:scroll' }),

  () => agent('Fetch https://demos.gsap.com/demo/flexbox-filtering/ via WebFetch. The user wants this technique applied to the tag-filter UX on the public site (TagBar on /browse, /search, /tag/[slug]) — when a tag toggles, cards smoothly reflow into / out of the visible set. Report exhaustively: confirm whether it uses the Flip plugin (likely yes), the verbatim JS snippet (up to ~80 lines) showing Flip.getState + Flip.from with options like absolute / simple / onEnter / onLeave, the easing, the stagger if any, and how the demo handles items leaving the filtered set vs entering. Crucially address the SERVER-SIDE FILTERING constraint in Lucifer\'s Diary — tag filtering navigates via URL params (Next.js App Router), so the DOM tree is replaced; explain whether this demo\'s pattern still works across a navigation or whether we need a client-side filter (or a bridge that carries Flip state across the server navigation). React / Next.js port using @gsap/react useGSAP. If WebFetch fails, set fetchSuccess=false and describe the canonical Flip-based flex-filter pattern (Flip.getState before re-render → React state update → useLayoutEffect Flip.from).', { schema: DEMO_SCHEMA, label: 'fetch:filter' }),
])

log('Three new demos fetched. Synthesizing updated plan.')

phase('Update plan')

const updatedPlan = await agent(
  'Read /private/tmp/claude-501/-Users-taha-Claude-projects-LucifersDiary/67ecbb13-285d-44f6-8a34-e81e12390dd9/tasks/wdjb4n7ct.output via the Read tool — this JSON file contains the original {research, plan, critique} from the prior workflow run. Parse it.\n\n' +
  'Produce an UPDATED plan that:\n\n' +
  'A. Updates T3 (Like / Save / Share click feedback) to mirror the PHYSICS-based-effects demo instead of the elastic / back.out ease the original plan used. NEW T3 DEMO: ' + JSON.stringify(physicsDemo) + '\n\n' +
  'B. Updates T4 (smooth scroll restore) to mirror the animate-scroll-position demo. NEW T4 DEMO: ' + JSON.stringify(scrollDemo) + '\n\n' +
  'C. Updates T5 (tag filter) to mirror the flexbox-filtering demo. NEW T5 DEMO: ' + JSON.stringify(filterDemo) + '\n\n' +
  'D. Fixes every concrete bug the original critic caught. Specifically:\n' +
  '   - T1: ChapterCard does NOT exist — drop it from filesToChange and instead name the actual chapter-list elements (under frontend/app/series/[id]/_components/ — use the Read tool to confirm the exact filename and the exact JSX element that should carry data-dock-item, or explicitly add to a "NOT in scope" list).\n' +
  '   - T1: The homepage hero conversion needs a NEW client wrapper file because frontend/app/page.tsx is a server component that exports metadata — add frontend/app/_components/HeroCardsList.tsx (or similar; use Read on page.tsx to pick a sensible path) to T1\'s filesToCreate.\n' +
  '   - T1: Add frontend/components/ContinueReadingRow.module.css to T1\'s filesToChange and explicitly name the :hover transform rule(s) to remove (use Read/Grep to find the line numbers).\n' +
  '   - T1: Specify exact tuning numbers (radius 200px, max scale 1.4, max lift 12px) inside the githubIssueBody so the implementer does not pick differently.\n' +
  '   - T3: Fix the QuoteShare integration — the current onShareClick signature has NO event arg (Read frontend/components/QuoteShare.tsx to verify). Plan must either widen the signature to onShareClick(target, index, e?: React.MouseEvent) and update the onClick call site, OR use a ref-per-button pattern with useRef + scope. Commit to one approach in the approach text.\n' +
  '   - T3: Either register `--pulse-flash` via @property in frontend/app/globals.css for smooth browser interpolation, OR drop the CSS-variable trick entirely and have GSAP tween box-shadow directly. Commit to one approach.\n' +
  '   - T3: Explicitly mention useRef<HTMLButtonElement>(null) + useGSAP({ scope: buttonRef }) setup for BOTH SaveButton and ShareButton, not just LikeButton.\n' +
  '   - T3: ShareButton flash color — recommend --text-muted (already defined in globals.css) so no new token is needed. State this as the chosen default in the approach text; if globals.css needs no change, do NOT list it in filesToChange.\n' +
  '   - T2: Add frontend/app/admin/_components/NotesPanel.module.css to T2\'s filesToChange. The panel-level transition: max-height 260ms on .panel.hasExpanded must be reconciled with the per-card height tween (either remove the transition or gate it).\n' +
  '   - T2: Commit to ONE mount strategy — either "always render both branches inside AutoHeightPanel" with a debounce guard on collapsed cards to prevent stray autosaves, OR "unmount on collapse" with useLayoutEffect to measure on mount. State which and why.\n' +
  '   - T2: The reduced-motion path must set overflow:hidden when open === false so collapsed content does not visually overflow during the synchronous transition.\n' +
  '   - T2: Address the per-card `transition: transform 180ms, box-shadow 220ms` on NoteCard `.card` — T1\'s dock hook writes to transform; T2 must either remove the transform transition OR coordinate via overwrite:auto on the GSAP setters. State explicitly.\n' +
  '   - T4: Specify the tween storage mechanism: `const tweenRef = useRef<gsap.core.Tween | null>(null)` so cleanup can tweenRef.current?.kill().\n' +
  '   - T4: Add `onUpdate: () => ScrollTrigger.update()` to the gsap.to(window, { scrollTo: ... }) call so any ScrollTrigger-driven reveals fire correctly during the programmatic scroll.\n' +
  '   - T4: Add a `restoringRef.current = true` guard that pauses useReadingPosition\'s onScroll write throttler while the restore tween is running (cleared on tween complete or kill), so the tween does not trigger 100+ wasted PATCH calls.\n' +
  '   - T4: Default to fixed 1.1s duration with power2.out (no distance-aware), and hash precedence: ANY hash (especially `#:~:text=...`) wins over the saved-position restore (skip the tween).\n' +
  '   - T5: Resolve the server-routing question by committing to the module-level flipBridge approach. Explicitly add <Suspense> boundaries to the parent pages\' filesToChange (frontend/app/search/page.tsx, frontend/app/browse/page.tsx) since CardGrid needs useSearchParams.\n' +
  '   - T5: Commit to Flip.from(state, { absolute: true, simple: true }) and pin the grid container\'s min-height during the tween to prevent reflow jumps.\n' +
  '   - T5: Add a Fast-Refresh-safe clear to the flipBridge — `if (typeof window !== "undefined" && module.hot) module.hot.dispose(() => bridge.clear())` or the Next.js equivalent. Document in code.\n' +
  '   - T5: Add frontend/components/ContinueCard.tsx and frontend/components/ContinueReadingRow.tsx to T5\'s filesToChange — these can appear on /search results with reading progress and also need data-flip-id.\n' +
  '   - T5: /tag/[slug] is OUT of scope — that route is a separate navigation, the flipBridge does not span it cleanly. Document this in the issue body.\n' +
  '   - Cross-cutting: T4 and T5 both modify frontend/lib/gsap.ts (plugin registration). The suggestedSequence rationale should call out that whichever lands first must accept multiple plugins in one registerPlugin() call.\n' +
  '   - Cross-cutting: Add a "## Test plan" section to each task\'s githubIssueBody — at minimum naming the manual test paths (devs server flow) since the repo does not appear to have Vitest/RTL.\n' +
  '   - Cross-cutting: Feature flag — recommend an env-var-gated rollout for T5 only (NEXT_PUBLIC_FLIP_TAG_FILTER), since it has the most production risk. T3 / T4 / T2 / T1 land without a flag.\n\n' +
  'E. Trim openQuestions to ONLY items that still genuinely need user input. The user has now answered: demo URLs (T3 / T4 / T5), Projects v2, and provided the corrected URLs. Remaining open questions should be a SHORT list (likely 2-4 items max).\n\n' +
  'Output the same structure as the original plan (5 tasks with id / title / useCase / gsapPlugin / demoReference / filesToChange / filesToCreate / approach / risks / reducedMotionPlan / estimatedPRs / githubIssueBody / changesFromOriginal — a new field describing what changed vs the original plan; suggestedSequence; openQuestions).\n\n' +
  'Use the Read tool freely to verify file paths and existing code. Be EXACT about file names — name what actually exists. Do not invent files like "ChapterCard.tsx" that are not in the repo.',
  {
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        tasks: { type: 'array', minItems: 5, maxItems: 5, items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            useCase: { type: 'string' },
            gsapPlugin: { type: 'string' },
            demoReference: { type: 'string' },
            filesToChange: { type: 'array', items: { type: 'string' } },
            filesToCreate: { type: 'array', items: { type: 'string' } },
            approach: { type: 'string' },
            risks: { type: 'array', items: { type: 'string' } },
            reducedMotionPlan: { type: 'string' },
            estimatedPRs: { type: 'integer' },
            githubIssueBody: { type: 'string' },
            changesFromOriginal: { type: 'string' },
          },
          required: ['id', 'title', 'useCase', 'gsapPlugin', 'filesToChange', 'approach', 'estimatedPRs', 'githubIssueBody', 'reducedMotionPlan', 'changesFromOriginal'],
        } },
        suggestedSequence: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { taskId: { type: 'string' }, rationale: { type: 'string' } }, required: ['taskId', 'rationale'] } },
        openQuestions: { type: 'array', items: { type: 'string' } },
      },
      required: ['tasks', 'suggestedSequence', 'openQuestions'],
    },
    label: 'synthesize:updated-plan',
  }
)

log('Updated plan synthesized. Running adversarial completeness critic.')

phase('Re-critique')

const newCritique = await agent(
  'You are a completeness critic. Review the following UPDATED implementation plan adversarially. This is a re-evaluation after the user supplied corrected demo URLs (T3 physics-based-effects, T4 animate-scroll-position, T5 flexbox-filtering) and after the original critic\'s 7 blockers + 29 gaps + 21 revisions were folded in.\n\n' +
  'Look specifically for:\n' +
  '- Tasks whose approach is still vague or has bugs\n' +
  '- Files that should be touched but are not listed (use the Read tool to verify if you need to)\n' +
  '- Risks that are not flagged\n' +
  '- Reduced-motion paths that do not actually work for the proposed technique\n' +
  '- Server-component vs client-component issues (GSAP needs "use client")\n' +
  '- SSR / hydration mismatches\n' +
  '- Existing code that would conflict with the proposed changes\n' +
  '- Sequencing problems (T4 + T5 both modify lib/gsap.ts; T1 + T2 both modify NoteCard)\n' +
  '- Original critic items that should have been addressed but are NOT in this updated plan\n' +
  '- Anything new the updated plan introduces that is itself problematic\n\n' +
  'UPDATED PLAN: ' + JSON.stringify(updatedPlan) + '\n\n' +
  'Output: { gaps: [string list], strongPoints: [string list], suggestedRevisions: [string list], blockers: [string list — items that MUST be resolved before any implementation begins], remainingFromOriginal: [string list — original critic items that are NOT addressed in this updated plan and still need attention] }. Be specific — cite file paths, hook names, exact concerns. Avoid generalities.',
  {
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        gaps: { type: 'array', items: { type: 'string' } },
        strongPoints: { type: 'array', items: { type: 'string' } },
        suggestedRevisions: { type: 'array', items: { type: 'string' } },
        blockers: { type: 'array', items: { type: 'string' } },
        remainingFromOriginal: { type: 'array', items: { type: 'string' } },
      },
      required: ['gaps', 'strongPoints', 'blockers', 'remainingFromOriginal'],
    },
    label: 'critique:updated',
  }
)

return {
  newDemos: { physicsDemo, scrollDemo, filterDemo },
  updatedPlan,
  newCritique,
}
