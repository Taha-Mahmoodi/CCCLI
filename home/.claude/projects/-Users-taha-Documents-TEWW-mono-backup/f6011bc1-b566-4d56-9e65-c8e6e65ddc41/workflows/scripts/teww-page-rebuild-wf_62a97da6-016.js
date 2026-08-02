export const meta = {
  name: 'teww-page-rebuild',
  description: 'Rebuild TEWW public pages per TEWW_REDESIGN_SPEC as parallel issue→branch→PR agents',
  phases: [{ title: 'Rebuild', detail: 'one worktree agent per page surface' }],
}

const RESULT = {
  type: 'object',
  properties: {
    surface: { type: 'string' },
    issueUrl: { type: 'string' },
    prUrl: { type: 'string' },
    branch: { type: 'string' },
    verification: { type: 'string' },
    notes: { type: 'string' },
  },
  required: ['surface', 'prUrl', 'branch', 'verification'],
}

const COMMON = `
You are redesigning one surface of the Third Eye Worldwide public website (teww.org) inside a git worktree of the TEWW-mono-backup monorepo. The night-first foundation ("Sight Beyond Sight") is already merged: read TEWW_REDESIGN_SPEC.md at the repo root FIRST — §1 concept, §3 design language, §5 your page, §6 hard contracts. The design system lives in frontend/app/styles/ (tokens in 00-tokens.css: night default with saffron gold --brand, violet --accent, Literata display serif + Manrope body; .btn-primary/.btn-secondary/.btn-accent, .section-heading/.section-eyebrow/.section-title are already restyled — reuse them).

FULL CREATIVE AUTHORITY on layout and section structure (the owner explicitly allowed restructuring sections/tabs within pages). KEEP ROUTES AND DATA SACRED:
- Every CMS field the page currently renders must still render (getContent() from lib/cms/db, exact field names, visibleSorted, the projects→programs fallback). Losing content = failure.
- Keep generateMetadata() → readSeoOverrides + JsonLd wiring per page.
- Keep RichText/HtmlContent usage; CMS strings contain <em> — the house style (already in CSS) renders em in titles as Literata italic gold; keep using RichText for those fields.
- VoiceAssistant contract: each route keeps at least one h1/h2 AND one p inside <main>.
- Keep all form behavior, validation, char counters, aria/roles/labels, required-field signalling. WCAG 2.2 AA minimum in ALL THREE themes (night default, light "Day", high-contrast) — check your colors against the theme tokens; never hard-code palette colors, always var(--…). State never by color alone.
- ≥44px tap targets; visible focus (global rule exists).

FILE OWNERSHIP — HARD RULE: modify ONLY the files listed in YOUR scope below (plus adding new component files under your listed component dirs). NEVER touch: frontend/app/globals.css, app/styles/00-tokens.css, 01-shell-nav.css, 02-base-sections.css (EXCEPTION only if your scope says so), 08-footer-prose.css, components/Nav.tsx, Footer.tsx, LogoAnimated.tsx, VoiceAssistant.tsx, AudioTour.tsx, layout.tsx, lib/**, backend/**, shared/**, frontend/data/seed.json, anything under app/ad-min or components/admin. Other pages' files belong to other agents running in parallel — touching them causes merge conflicts.

Design language reminders: kickers = Manrope 700 uppercase tracked gold (.section-eyebrow); headlines = Literata 600, -.015em; oversized Literata numerals for numbered rows/stats; surfaces flat night with 1px var(--border) + var(--bg-elevated) cards, hover border-strong + translateY(-2px); gold hairlines for structure; echo-ripple arcs or braille-dot textures as ONE decorative motif max per viewport (CSS-only, aria-hidden); no glassmorphism (nav only), no old blue/orange remnants, no light-on-gold text ever (gold fills take var(--brand-fg)).

PROCESS (all yourself, no approval):
1. gh issue create --repo Taha-Mahmoodi/TEWW-mono-backup --title "<surface> redesign: <short>" --body "<why + scope + DoD>" — note issue number N.
2. git checkout -b <branch given below>.
3. Implement. Then: npm install --no-audit --no-fund (worktree lacks node_modules; it's a workspace monorepo — run at repo root), then npm run typecheck -w frontend and npm run test -w frontend — both must pass. Do NOT start dev servers or touch the database.
4. Commit everything, author "Taha-Mahmoodi <85902429+Taha-Mahmoodi@users.noreply.github.com>", message ending with:
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01LNuidX4hTo1eMcGoRyxZ8o
5. git push -u origin <branch>; gh pr create with FULL description (what/why, per-section changes, data-contract notes, a11y notes, verification, "Closes #N") ending with:
🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01LNuidX4hTo1eMcGoRyxZ8o
6. Do NOT merge — the orchestrator merges sequentially.

Return JSON per the schema: surface, issueUrl, prUrl, branch, verification (exact results), notes (deviations/risks/shared-file needs).
`

const SURFACES = [
  {
    key: 'home',
    branch: 'redesign/02-home',
    prompt: `Surface: HOME (/). Your scope: frontend/app/page.tsx, frontend/components/home/**, frontend/components/cards/** (StoryCard/TimelineRow — documents page consumes these too, keep their props), app/styles/09-home-values-timeline.css, app/styles/18-home-extras.css, PLUS (exception) the .hero* rules inside app/styles/02-base-sections.css and .hero rules inside 10-responsive-fixes.css — touch ONLY .hero-prefixed selectors there, nothing else.

Build spec §5 Home: replace the photo-led hero with a NIGHT hero — deep gradient night sky (CSS), a slow breathing echo-ripple field radiating from a single gold point (CSS/SVG, aria-hidden, respects reduced-motion), kicker, CMS heroTitle via RichText (em renders italic gold automatically), heroSub, CTA row (Donate = .btn-primary gold now — fix the current violet .btn-accent usage; secondary ghost; keep the "Listen to audio tour" button and its wiring). Keep the hero impact strip data (impactStats) as a gold hairline row. Sections: statsBand → keep data, restyle as editorial numerals; coreValues → numbered editorial rows (01…) with oversized pale-gold Literata numerals, hairlines, NOT cards; "What We Build" projects grid → night cards with status chips (keep ProjectCard usage or restyle in 18-home-extras.css); stories/timeline (blogs/stories fields + StoryCard/TimelineRow) → replace the old pink/violet/orange gradient cards with night-editorial cards: bg-elevated, 1px border, gold meta line, Literata italic titles — NO leftover old-palette gradients anywhere; keep the archive timeline data visible. Keep the CTA band component usage (its .cta-band styles are foundation-owned — do not edit them). Order/composition of sections is yours to improve.`,
  },
  {
    key: 'about',
    branch: 'redesign/03-about',
    prompt: `Surface: ABOUT (/about). Your scope: frontend/app/about/**, frontend/components/about/**, app/styles/06-about.css, app/styles/12-about-extras.css.

Build spec §5 About: keep Subnav (Overview/Mission/Team) wiring; FAQ (faqs field) → 01–05 rows with oversized Literata numerals, gold hairlines, accordion behavior + aria kept (FaqItem); mission section: the Rumi passage becomes a big Literata italic pull-quote with gold em; stat tiles (StatTile is shared with volunteers — restyle via your CSS classes, not the component file, unless the component is about-only: CHECK first); team (team/board fields) → monogram tiles: gold Literata initials on night, name + role + bio, board rows as editorial list; "board seats open" card → night card with gold border accent; founder's series (founder-series items) → book-index rows: big numeral, Literata italic title, read-time, gold rule between rows. All CMS fields keep rendering.`,
  },
  {
    key: 'projects',
    branch: 'redesign/04-projects',
    prompt: `Surface: PROJECTS (/projects + /projects/[slug]). Your scope: frontend/app/projects/**, frontend/components/projects/**, app/styles/17-projects.css.

Build spec §5 Projects: listing (items with status/tags) → editorial night cards: Literata title, one-line desc, status as a small gold-outline chip (e.g. "Hardware · Validated"), whole card is the link with visible focus; consider a featured-first layout (first project larger) since the Third Eye Kit is the flagship — your call. "Rest of the ecosystem" prose block → flat editorial with gold hairline frame. Support/donate CTA section stays (uses shared .cta-band or its own — check; do not edit .cta-band styles). Project DETAIL page (ProjectDetail + [slug]): restyle via 17-projects.css — hero block, spec/status rows as hairline table, back link. Keep every CMS field, JsonLd, metadata.`,
  },
  {
    key: 'media',
    branch: 'redesign/05-media',
    prompt: `Surface: MEDIA (/media). Your scope: frontend/app/media/**, frontend/components/media/**, app/styles/04-media.css, 14-media-extras.css, 19-media-video.css.

Build spec §5 Media: keep Subnav tabs (Photos/Podcasts/Videos) + all filter logic. Photos: the archive is intentionally empty-with-copy (photos field may be empty) — design a dignified night empty-state with the accessibility-promise band ("every image will be described") as a gold-hairline feature row; keep contribute-a-photo CTA + mailto. PhotoTile/Lightbox restyled for when photos exist (night frames, described-badge). Podcasts: "coming soon" feature (PodcastComingSoon) → night editorial with gold waveform-like motif (CSS), guest pitch form (PodcastGuestForm) keeps ALL fields/validation, restyled inputs on night. Videos: video cards (videos field: category/title/desc, "Awaiting YouTube link" pending state) → night cards with category chips, 16:9 frames kept (19-media-video.css), pending state as quiet gold-dashed placeholder, filter pills already restyled by foundation. All CMS fields keep rendering.`,
  },
  {
    key: 'documents',
    branch: 'redesign/06-documents',
    prompt: `Surface: DOCUMENTS (/documents). Your scope: frontend/app/documents/**, frontend/components/documents/**, app/styles/05-documents.css, 13-documents-extras.css. Do NOT touch components/cards/** or 09-home-values-timeline.css (home agent owns them — you consume whatever StoryCard ships with; your page-specific wrappers/styles live in your files).

Build spec §5 Documents: keep Subnav (Research/Stories/Book) + Topic filter. Research (blogs field) → editorial article rows/cards: Literata titles, author monogram, read-time meta in gold; newsletter band (NewsletterForm — keep all behavior) → night band with gold hairlines. Stories (stories field + FeaturedStory) → keep the editorial open-call copy prominent; featured story as a big night editorial block. BOOK tab (BookTab, founder's memoir chapters) → make it feel like a real book: chapter index with oversized Literata numerals, italic chapter titles, read-times, "Excerpt coming soon" as quiet gold-dashed state; the intro paragraph set larger in Literata. All CMS fields keep rendering.`,
  },
  {
    key: 'give',
    branch: 'redesign/07-volunteers-donate',
    prompt: `Surface: VOLUNTEERS + DONATE (/volunteers, /donate). Your scope: frontend/app/volunteers/**, frontend/app/donate/**, frontend/components/volunteers/**, frontend/components/donate/**, app/styles/03-page-hero-donate.css, 15-volunteers-extras.css, 16-donate-extras.css, PLUS in 07-volunteers-values.css ONLY the volunteer/role/step/form/pillar rules — do NOT touch the .cta-band block (foundation-owned).

Volunteers (spec §5): stats row (stats field) → gold Literata numerals with hairlines; roles (roles field) → two-column editorial list: role name Literata, requirement + hours as small meta chips, hover gold border; steps (steps field) → numbered vertical timeline with gold connector line; VolunteerForm → night form styling, keep EVERY field, checkbox grid, char counter, validation, status messaging, required-field signalling. Donate (spec §5): DonateWidget (monthly/one-time toggle, amount input, details form) → gold-forward night widget, the "no payment is taken on this page" notice stays prominent (.donate-payment-notice restyled by foundation — reuse); impactBreakdown → hairline editorial rows (keep order + copy); transparency section → flat editorial with gold rules; other-ways-to-give accordion/rows kept. The .page-hero styles in 03 are shared visual base for subpage heroes — you may refine them but keep the class contract (other pages use them); prefer additive changes. All CMS fields keep rendering.`,
  },
  {
    key: 'system',
    branch: 'redesign/08-system-assistant',
    prompt: `Surface: SYSTEM PAGES + TE ASSISTANT UI. Your scope: frontend/app/{[slug],story-detail,blog-detail,privacy,coming-soon,confirmed}/**, frontend/app/not-found.tsx + error.tsx (if present — check), frontend/lib/pages/** is READ-ONLY (server-HTML class hooks — restyle the classes, do not change the HTML builders unless a class is missing), app/styles/11-assistant.css, 20-pages-misc.css, 21-assistant-extras.css, 22-utilities.css (additive only).

Work: (1) TE voice assistant panel (#te-panel) + floating button + PTT states in 11-assistant.css: night surface, gold live/listening states, keep ALL ids, roles, aria, and state classes exactly (tests cover behavior; VoiceAssistant.tsx is protected — CSS only). (2) Audio tour launch overlay (currently RED) + mini player (21-assistant-extras.css + 20): recompose night/gold — the overlay becomes a calm night dialog with gold ring motif; keep tour-title/tour-desc ids and all buttons. (3) Coming-soon page + countdown, confirmed, 404/500/error pages → night + single ripple motif + Literata statement (styles in 20-pages-misc.css; page tsx files in your scope may be restructured). (4) story-detail/blog-detail/[slug] + .prose pages: restyle detail-page classes in 20 (reading-progress bar → gold, article typography Literata headings, meta rows) without touching lib/pages HTML builders. All content flows keep working.`,
  },
]

phase('Rebuild')
log('Spawning 7 TEWW page agents (worktrees): home, about, projects, media, documents, give, system')
const results = await parallel(
  SURFACES.map((s) => () =>
    agent(
      COMMON + '\nYour branch: ' + s.branch + '\n\n' + s.prompt,
      { label: 'rebuild:' + s.key, phase: 'Rebuild', schema: RESULT, isolation: 'worktree' },
    ),
  ),
)
const ok = results.filter(Boolean)
log(`Done: ${ok.length}/7 returned`)
return { results: ok, missing: SURFACES.filter((s, i) => !results[i]).map((s) => s.key) }