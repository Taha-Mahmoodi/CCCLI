export const meta = {
  name: 'gsap-integration-research',
  description: 'Research GSAP demos + codebase impact for 5 GSAP-driven UX upgrades on Lucifer\'s Diary, then produce an implementation plan + completeness critique.',
  phases: [
    { title: 'Research', detail: 'parallel: 2 demos, GSAP docs, Next.js starters, 3 best-fit demo searches, 6 codebase inventories' },
    { title: 'Synthesize', detail: 'one consolidated implementation plan with gh-ready issue bodies' },
    { title: 'Critique', detail: 'adversarial completeness critic on the plan' },
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

const TECHNIQUE_REC_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    useCase: { type: 'string' },
    recommendedDemo: { type: 'string' },
    plugin: { type: 'string' },
    approach: { type: 'string' },
    codeSketch: { type: 'string' },
    rationale: { type: 'string' },
    a11yNotes: { type: 'string' },
  },
  required: ['useCase', 'plugin', 'approach', 'codeSketch'],
}

const INVENTORY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    area: { type: 'string' },
    files: { type: 'array', items: { type: 'string' } },
    components: { type: 'array', items: { type: 'string' } },
    currentBehavior: { type: 'string' },
    integrationPoints: { type: 'string' },
    notes: { type: 'string' },
  },
  required: ['area', 'files', 'components', 'currentBehavior', 'integrationPoints'],
}

const DOCS_SUMMARY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    coreAPI: { type: 'array', items: { type: 'string' } },
    pluginRegistration: { type: 'string' },
    freePluginsRelevant: { type: 'array', items: { type: 'string' } },
    paidPluginsToAvoid: { type: 'array', items: { type: 'string' } },
    licenseAsOfToday: { type: 'string' },
    useGSAPHookPattern: { type: 'string' },
    nextjsClientComponentGuidance: { type: 'string' },
  },
  required: ['coreAPI', 'pluginRegistration', 'freePluginsRelevant', 'useGSAPHookPattern'],
}

const STARTERS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    starters: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          url: { type: 'string' },
          description: { type: 'string' },
          relevantFor: { type: 'string' },
        },
        required: ['name', 'description'],
      },
    },
    keyPattern: { type: 'string' },
  },
  required: ['starters'],
}

phase('Research')

const research = await parallel([
  () => agent('Fetch https://demos.gsap.com/demo/macos-dock-effect/ via WebFetch and dig into the page source: get the HTML, CSS, and JS that drive the effect (the macOS dock magnification — cursor proximity scales nearby cards). Report exhaustively: GSAP function calls used (gsap.to, gsap.set, gsap.timeline, etc.), plugins (if any) registered, the proximity-distance math, the easing curve, and the actual JS snippet verbatim (up to ~80 lines). Also describe how it would port to React / Next.js using the useGSAP hook from @gsap/react. If WebFetch cannot retrieve the page content (e.g., JS-rendered SPA), say so EXPLICITLY in the technique field and set fetchSuccess=false, then describe the canonical mechanic from your knowledge: a mouseenter/mousemove listener + per-card distance calc + gsap.to(card, { scale: f(distance), x: f(distance), ease: ... }).', { schema: DEMO_SCHEMA, label: 'fetch:dock-demo' }),

  () => agent('Fetch https://demos.gsap.com/demo/animate-auto-height/ via WebFetch. This demo solves animating height from a fixed value to "auto" (which native CSS cannot). Report exhaustively: the technique (likely measuring with getBoundingClientRect then tweening, OR using the Flip plugin), the verbatim JS snippet, whether Flip plugin is used, the easing, and a Next.js / React port using useGSAP. If WebFetch cannot retrieve, set fetchSuccess=false and describe the canonical approach (measure scrollHeight, gsap.fromTo(el, { height: 0 }, { height: el.scrollHeight, onComplete: () => el.style.height = "auto" })).', { schema: DEMO_SCHEMA, label: 'fetch:auto-height-demo' }),

  () => agent('Fetch https://gsap.com/docs/v3/ (plus subpages on Plugins, useGSAP, and licensing as needed) via WebFetch. Produce a precise summary of: (1) core GSAP API surface (gsap.to / from / fromTo / timeline / set / registerPlugin), (2) the @gsap/react useGSAP hook pattern for Next.js client components — scope ref, contextSafe, deps, return cleanup, (3) the FREE plugins (post-2024 Webflow acquisition; verify all official premium plugins like SplitText / MorphSVG / DrawSVG / Inertia / Physics / MotionPath / CustomEase are free now, plus the always-free Flip / ScrollTrigger / ScrollTo / Observer). (4) licenseAsOfToday: state today\'s license status verbatim from gsap.com. (5) Next.js gotchas: registerPlugin must run only on client; useGSAP cleans up automatically when scope ref unmounts; SSR safety.', { schema: DOCS_SUMMARY_SCHEMA, label: 'fetch:gsap-docs' }),

  () => agent('Fetch https://stackblitz.com/@GSAP-dev/collections/gsap-nextjs-starters via WebFetch and list each starter in the collection: name, link, what it demonstrates (one sentence), and which of these effects it would be most relevant to — (a) macOS-dock hover on cards, (b) animate auto-height when a note expands, (c) button click feedback, (d) auto-scroll to saved position, (e) animated filter / reorder. Also extract the overall pattern across starters (useGSAP, registerPlugin location, "use client" directive usage, App Router vs Pages Router).', { schema: STARTERS_SCHEMA, label: 'fetch:nextjs-starters' }),

  () => agent('Goal: recommend the BEST GSAP-driven click-feedback animation for LIKE / SAVE / SHARE buttons in the Lucifer\'s Diary reading view. Color should be customizable per button (like = like-red, save = gold, share = neutral / gold). Search demos.gsap.com (WebFetch / WebSearch) for short, lively click micro-interactions on buttons — heart pop / pulse / burst / elastic press / ripple. Output: concrete recommendation with the demo URL (or canonical technique if no perfect demo exists), the GSAP plugin (likely core gsap.timeline is enough), a 3-5 sentence approach, and a ~30 line code sketch using useGSAP + contextSafe that reads a CSS var --button-color so per-element color customization is one line. The buttons MUST respect prefers-reduced-motion (skip the animation if matchMedia "(prefers-reduced-motion: reduce)" is true).', { schema: TECHNIQUE_REC_SCHEMA, label: 'find:button-click' }),

  () => agent('Goal: recommend the BEST GSAP technique for smooth auto-scroll back to a returning reader\'s saved scroll position on a story / chapter page. Search GSAP docs + demos.gsap.com via WebFetch / WebSearch. The canonical answer is the ScrollToPlugin (free). Output: concrete recommendation including registerPlugin(ScrollToPlugin) location, the approach in 3-5 sentences (must fire AFTER the page has rendered / hydrated so the target Y is reachable; use gsap.to(window, { scrollTo: { y, autoKill: true }, duration: 1.2, ease: "power2.inOut" }) where y comes from the existing /api/reading-positions hook), and a ~25 line code sketch with React / Next.js notes. Cover: autoKill (user-scroll cancellation), reduced-motion fallback (just window.scrollTo(0, y) instantly), SSR safety (only run on client), and how to coordinate with the existing TextFragmentScroller (which handles #:~:text= deep-link arrivals) so the two do not fight.', { schema: TECHNIQUE_REC_SCHEMA, label: 'find:scroll-restore' }),

  () => agent('Goal: recommend the BEST GSAP technique for smooth filter / reorder animation when tag filters toggle and the list of story cards re-orders. The canonical answer is the Flip plugin (free): Flip.getState before re-render captures positions; Flip.from after re-render animates each item from its old position to its new. Search GSAP docs + demos.gsap.com for a Flip filter / reorder demo. Output: concrete recommendation including the demo URL, the approach (Flip.getState → React state update → useLayoutEffect Flip.from), 3-5 sentences, and a ~30 line code sketch with React / Next.js notes. Cover: (1) capturing state BEFORE React commits the new order — useLayoutEffect or useGSAP with a sentinel, (2) absolute-positioning items briefly during the tween (Flip handles this), (3) reduced-motion fallback (skip Flip.from, just let React re-render), (4) server-side filter (URL params) vs client-side filter — Flip needs the SAME elements before / after, so server-driven re-renders are harder; client-side filtering is the natural fit.', { schema: TECHNIQUE_REC_SCHEMA, label: 'find:tag-filter' }),

  () => agent('Lucifer\'s Diary frontend codebase inventory. Repository root: /Users/taha/Claude projects/LucifersDiary. Frontend at frontend/. READ frontend/AGENTS.md FIRST — this is a modified Next.js.\n\nTask: Inventory ALL card components used in lists / grids / rails on the PUBLIC site (NOT admin). Find every component that renders a "card" displayed in a row / grid: StoryCard, SeriesCard, ChapterCard, HomepageItem, ResumeReadingRow contents, RecommendationsRow contents, related sections on story / chapter pages, search results, browse-page rails, tag-page rails. For each: file path, role, where it is used (grep usages). The user wants a macOS-dock-like proximity hover effect applied to every card row.\n\nUse Read + Grep extensively. Output (per INVENTORY_SCHEMA): list of card components and their files (in `components`), the row / grid containers they are rendered inside (CardGrid? ExpandableSection?) in `notes`, and the JSX structure currently around each card row in `integrationPoints` (where to hook a GSAP mousemove listener — probably the row container, with the cards as children).', { schema: INVENTORY_SCHEMA, label: 'inv:cards' }),

  () => agent('Lucifer\'s Diary frontend codebase inventory. Repository root: /Users/taha/Claude projects/LucifersDiary. Frontend at frontend/. READ frontend/AGENTS.md FIRST.\n\nTask: Inventory the admin notes list — NotesPanel + NoteCard at app/admin/_components/. The user wants the macOS-dock-like proximity hover effect on the row of note pills (when collapsed). Output: file paths, the JSX / CSS structure of the pill list (.panel > .list > NoteCard cards) in `notes`, where to attach the cursor listeners (probably .list container) in `integrationPoints`, and any existing CSS transitions that would need to be coordinated with GSAP (the recent PRs added hover lift via transform + box-shadow; GSAP will need to coordinate with those or supersede them — call this out).', { schema: INVENTORY_SCHEMA, label: 'inv:notes' }),

  () => agent('Lucifer\'s Diary frontend codebase inventory. Repository root: /Users/taha/Claude projects/LucifersDiary. Frontend at frontend/. READ frontend/AGENTS.md FIRST.\n\nTask: Inventory LikeButton and SaveButton across the codebase. The user wants a GSAP click-feedback animation on each, color customized per button. Output: file paths in `files`, the components in `components`, current click handlers + existing animation / transition in `currentBehavior`, where the click feedback should hook in (which element, which handler) in `integrationPoints`, and any per-button color CSS vars or constants already defined (e.g., --like in globals.css; --gold) in `notes`. Use Read + Grep extensively.', { schema: INVENTORY_SCHEMA, label: 'inv:like-save' }),

  () => agent('Lucifer\'s Diary frontend codebase inventory. Repository root: /Users/taha/Claude projects/LucifersDiary. Frontend at frontend/. READ frontend/AGENTS.md FIRST.\n\nTask: Inventory ShareButton and QuoteShare (the quote-share popover, recently enhanced with icons + deep-links to passages in PR #170). The user wants GSAP click-feedback on the share affordance. Output: file paths, current click handlers + existing animation / transition, where the click feedback should hook in, and notes on whether to also enhance the QuoteShare\'s menu pop-in animation with GSAP (it currently uses CSS keyframes added in PR #181).', { schema: INVENTORY_SCHEMA, label: 'inv:share' }),

  () => agent('Lucifer\'s Diary frontend codebase inventory. Repository root: /Users/taha/Claude projects/LucifersDiary. Frontend at frontend/. READ frontend/AGENTS.md FIRST.\n\nTask: Inventory the reading-position scroll-restore mechanism. The user wants GSAP-driven smooth auto-scroll to a returning reader\'s last scroll position. Find: (a) lib/useReadingPosition.ts (or equivalent), (b) where it is consumed — story / chapter reader pages (ReadingView), (c) the current behavior on return (instant scroll? no restore? something in between?), (d) the ReadingView component, (e) components/TextFragmentScroller.tsx (already does scroll + highlight for `#:~:text=` deep-links — note how it handles timing and whether it would conflict with a scroll-restore animation). Output: integration plan including the exact hook for inserting a gsap.to(window, { scrollTo: y }) tween, and whether to extend the existing TextFragmentScroller or write a new ScrollRestore component.', { schema: INVENTORY_SCHEMA, label: 'inv:scroll-restore' }),

  () => agent('Lucifer\'s Diary frontend codebase inventory. Repository root: /Users/taha/Claude projects/LucifersDiary. Frontend at frontend/. READ frontend/AGENTS.md FIRST.\n\nTask: Inventory the tag filtering UI. The user wants Flip-plugin-style smooth reorder when tag filters toggle. Find: (a) TagBar component (used on browse + tag pages), (b) how filtering works — server-driven via URL params (likely, given Next.js App Router) or client-side state filter, (c) the cards / list that re-orders when a filter changes, (d) the search page (app/search/page.tsx), (e) anywhere else there is a filter-list pattern (BlockedTagsButton? TagPicker in admin?). Output: files, components, current behavior (is filtering server- or client-side? this is critical for whether Flip can be used directly), integration points, and a note in `notes` on whether server-side filtering blocks Flip (since Flip needs the same DOM elements before and after; a Server-Component re-render swaps the tree) and what the workaround would be.', { schema: INVENTORY_SCHEMA, label: 'inv:tag-filter' }),
])

const dockDemo = research[0]
const autoHeightDemo = research[1]
const gsapDocs = research[2]
const starters = research[3]
const buttonRec = research[4]
const scrollRec = research[5]
const filterRec = research[6]
const inventoryCards = research[7]
const inventoryNotes = research[8]
const inventoryLikeSave = research[9]
const inventoryShare = research[10]
const inventoryScrollRestore = research[11]
const inventoryTagFilter = research[12]

log('Research phase complete: ' + research.filter(Boolean).length + '/13 agents returned data. Synthesizing plan.')

phase('Synthesize')

const plan = await agent(
  'You are the planning brain for a multi-task GSAP integration project on Lucifer\'s Diary (a Next.js literary erotica site, currently on develop branch).\n\n' +
  'INPUTS FROM RESEARCH PHASE:\n\n' +
  'DOCK DEMO: ' + JSON.stringify(dockDemo) + '\n\n' +
  'AUTO-HEIGHT DEMO: ' + JSON.stringify(autoHeightDemo) + '\n\n' +
  'GSAP DOCS SUMMARY: ' + JSON.stringify(gsapDocs) + '\n\n' +
  'NEXT.JS STARTERS: ' + JSON.stringify(starters) + '\n\n' +
  'BUTTON CLICK REC: ' + JSON.stringify(buttonRec) + '\n\n' +
  'SCROLL RESTORE REC: ' + JSON.stringify(scrollRec) + '\n\n' +
  'TAG FILTER REC: ' + JSON.stringify(filterRec) + '\n\n' +
  'INVENTORIES:\n' +
  '- Cards: ' + JSON.stringify(inventoryCards) + '\n' +
  '- Notes: ' + JSON.stringify(inventoryNotes) + '\n' +
  '- Like / Save: ' + JSON.stringify(inventoryLikeSave) + '\n' +
  '- Share: ' + JSON.stringify(inventoryShare) + '\n' +
  '- Scroll restore: ' + JSON.stringify(inventoryScrollRestore) + '\n' +
  '- Tag filter: ' + JSON.stringify(inventoryTagFilter) + '\n\n' +
  'PROJECT CONTEXT:\n' +
  '- Already installed: gsap ^3.15.0, @gsap/react ^2.1.2, lucide-react ^1.14.0, shadcn/ui suite, Tailwind v4.\n' +
  '- GSAP already in use at components/SiteHeader.tsx (mobile search-bar morph timeline) + lib/gsap.ts wrapper exposing prefersReducedMotion().\n' +
  '- Workflow: branch off develop, PR into develop, merge, user-commanded promotion to main. Backend is NestJS + Prisma at backend/; the public-site Next.js app is at frontend/.\n' +
  '- prefers-reduced-motion is honored elsewhere via CSS media queries; GSAP integrations must do the same (skip the tween or set duration to 0).\n' +
  '- The codebase has a modified Next.js flavor (see frontend/AGENTS.md). Treat it as such.\n\n' +
  'Produce a comprehensive plan as a JSON object covering EXACTLY 5 implementation tasks:\n' +
  'T1) macOS-dock hover effect on every card row on the public site + the notes list in admin\n' +
  'T2) animate-auto-height when expanding a note (in admin NotesPanel)\n' +
  'T3) GSAP click feedback on Like / Save / Share buttons, per-button color\n' +
  'T4) GSAP smooth auto-scroll back to last reading position on return\n' +
  'T5) GSAP Flip reorder when filtering by tags\n\n' +
  'For each task return: id (T1..T5), title (short imperative), useCase (one sentence), gsapPlugin (e.g., Flip / ScrollTo / "core" / "Observer"), demoReference (URL of the GSAP demo we will mirror), filesToChange (list of repo-relative paths), filesToCreate (list), approach (3-7 sentences, CONCRETE — name the React hook, the GSAP call, the integration point, the cleanup), risks (list), reducedMotionPlan (one sentence), estimatedPRs (1 or 2 — call out if backend changes too), githubIssueBody (markdown body suitable for `gh issue create` — must include sections: ## Goal, ## Files, ## Approach, ## Definition of done, ## Reduced motion).\n\n' +
  'Plus return: suggestedSequence (array of task IDs in implementation order, with one-sentence rationale per ordering choice), and openQuestions (a list of questions for the user that MUST be answered before any implementation begins — be honest about ambiguity, especially around: client-vs-server filtering for T5, whether T4 should override the existing TextFragmentScroller, the color palette for T3 click feedback per button, anything else).',
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
          },
          required: ['id', 'title', 'useCase', 'gsapPlugin', 'filesToChange', 'approach', 'estimatedPRs', 'githubIssueBody', 'reducedMotionPlan'],
        } },
        suggestedSequence: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { taskId: { type: 'string' }, rationale: { type: 'string' } }, required: ['taskId', 'rationale'] } },
        openQuestions: { type: 'array', items: { type: 'string' } },
      },
      required: ['tasks', 'suggestedSequence', 'openQuestions'],
    },
    label: 'synthesize:plan',
  }
)

log('Plan synthesized. Running adversarial completeness critic.')

phase('Critique')

const critique = await agent(
  'You are a completeness critic. The following implementation plan was just produced for a Next.js project. Review it ADVERSARIALLY for what is missing or wrong. Look specifically for:\n' +
  '- Tasks whose approach is too vague to act on (no named hook, no named GSAP call, no integration point)\n' +
  '- Files that should be touched but are not listed (e.g., next.config, package.json, globals.css, types)\n' +
  '- Risks that are not flagged\n' +
  '- Reduced-motion plans that are not actually achievable for the proposed technique\n' +
  '- Server-component vs client-component issues (GSAP needs "use client")\n' +
  '- SSR / hydration mismatches (e.g., mousemove listener on SSR-rendered card row)\n' +
  '- Existing code that would conflict (e.g., the recently-added CSS transitions on NoteCard.module.css would fight a GSAP transform tween — either remove the CSS transition on the relevant property or move it into the GSAP timeline)\n' +
  '- License / plugin gotchas\n' +
  '- Sequencing problems (e.g., T1 and T2 both change the same NoteCard files — should they merge into one PR?)\n' +
  '- Open questions the planner should have asked but did not\n' +
  '- Anything important the plan glossed over\n\n' +
  'PLAN: ' + JSON.stringify(plan) + '\n\n' +
  'Output: { gaps: [string list], strongPoints: [string list], suggestedRevisions: [string list], blockers: [string list — items that must be resolved before any implementation begins] }. Be specific. Cite file paths, hook names, and exact concerns — not generalities.',
  {
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        gaps: { type: 'array', items: { type: 'string' } },
        strongPoints: { type: 'array', items: { type: 'string' } },
        suggestedRevisions: { type: 'array', items: { type: 'string' } },
        blockers: { type: 'array', items: { type: 'string' } },
      },
      required: ['gaps', 'strongPoints', 'blockers'],
    },
    label: 'critique:plan',
  }
)

return {
  research: {
    dockDemo,
    autoHeightDemo,
    gsapDocs,
    starters,
    buttonRec,
    scrollRec,
    filterRec,
    inventoryCards,
    inventoryNotes,
    inventoryLikeSave,
    inventoryShare,
    inventoryScrollRestore,
    inventoryTagFilter,
  },
  plan,
  critique,
}
