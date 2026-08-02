export const meta = {
  name: 'dev-seed-research',
  description: 'Survey genuinely public-domain content sources for fit with Lucifer\'s Diary (modern literary erotica), inventory the project\'s existing tag-seed pattern + dependencies, and draft a complete synthetic Prisma seed script — return a decision menu (PD-content vs synthetic) with both ready to execute.',
  phases: [
    { title: 'Research', detail: 'parallel: PD-source survey, project inventory, synthetic seed plan draft' },
    { title: 'Synthesis', detail: 'consolidated decision menu with both options costed out' },
  ],
}

const PD_SURVEY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    sources: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          url: { type: 'string' },
          legalStatus: { type: 'string', description: 'Confirmed PD? CC0? CC-BY-NC? Verified or claimed?' },
          approximateRelevantVolume: { type: 'string', description: 'Rough count of works in the literary-erotica / sensual-prose category' },
          era: { type: 'string', description: 'Era of available works (Victorian / Renaissance / Modern / etc)' },
          voiceFit: { type: 'string', description: 'Honest assessment of fit with a modern slow-burn-literary-erotica site' },
          tagFit: { type: 'string', description: 'Would the existing 591-tag taxonomy of Lucifer\'s Diary map onto this content?' },
        },
        required: ['name', 'url', 'legalStatus', 'approximateRelevantVolume', 'era', 'voiceFit', 'tagFit'],
      },
    },
    modernPDExists: { type: 'string', description: 'Honest answer: is there a usable pool of CC0 / verified-PD MODERN erotic fiction online?' },
    overallVerdict: { type: 'string', description: 'Plain-English assessment of whether PD content is a viable path for this use case' },
  },
  required: ['sources', 'modernPDExists', 'overallVerdict'],
}

const PROJECT_INVENTORY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    tagSeedScript: { type: 'string', description: 'Path + pattern of the existing tag-seeding script' },
    tagCount: { type: 'integer', description: 'Total tags currently in the taxonomy' },
    adultTagCount: { type: 'integer' },
    fakerInstalled: { type: 'boolean' },
    fakerVersion: { type: 'string' },
    prismaVersion: { type: 'string' },
    seedScriptConvention: { type: 'string', description: 'How existing scripts in backend/scripts/ are structured + invoked' },
    schemaShapeNotes: { type: 'string', description: 'Required fields on Story / Chapter / Series for an insert' },
  },
  required: ['tagSeedScript', 'tagCount', 'fakerInstalled', 'seedScriptConvention', 'schemaShapeNotes'],
}

const SYNTHETIC_PLAN_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    filePath: { type: 'string' },
    cliArgs: { type: 'array', items: { type: 'string' } },
    safetyGuards: { type: 'array', items: { type: 'string' } },
    contentVolume: { type: 'object', additionalProperties: false, properties: {
      stories: { type: 'integer' },
      series: { type: 'integer' },
      chaptersPerSeries: { type: 'string' },
      totalChapters: { type: 'integer' },
    }, required: ['stories', 'series', 'chaptersPerSeries', 'totalChapters'] },
    markerStrategy: { type: 'string', description: 'How seeded rows are tagged so --purge can find them' },
    purgeLogic: { type: 'string' },
    titleGenerationApproach: { type: 'string', description: 'How realistic-but-non-copyrighted titles are generated' },
    excerptGenerationApproach: { type: 'string' },
    bodyGenerationApproach: { type: 'string' },
    tagSelectionAlgorithm: { type: 'string' },
    codeSkeleton: { type: 'string', description: 'Real TypeScript skeleton (~150-250 lines) showing the script\'s actual structure' },
  },
  required: ['filePath', 'cliArgs', 'safetyGuards', 'contentVolume', 'markerStrategy', 'purgeLogic', 'codeSkeleton'],
}

phase('Research')

const [pdSurvey, projectInventory, syntheticPlan] = await parallel([
  () => agent('Survey genuinely-public-domain content sources that could supply test fixtures for Lucifer\'s Diary, a modern literary erotica site. DO NOT scrape any content — ONLY produce metadata about sources (name, URL, volume, era, fit).\n\nSpecifically investigate:\n1. Project Gutenberg — search their catalog (via WebFetch / WebSearch) for the categories most relevant: "Erotic fiction", "Erotica", "Sex", "Romance" (classical-era only here), "Decameron" (Boccaccio), Casanova memoirs, "Fanny Hill" (Cleland, 1748), "My Secret Life" (anon, 1888), erotic poetry. For each: confirm Gutenberg lists it as Public Domain (their copyright header is authoritative), note the era, note the voice (Victorian / Classical / Renaissance vs modern).\n2. Standard Ebooks — they curate Gutenberg titles with modern editorial polish. Check if any sensual / romance / erotica titles are in their catalog.\n3. Wikisource — does any verified-PD erotica live there?\n4. Internet Archive — flag that "free to read" ≠ PD; most IA content is still in copyright. Be precise.\n5. CC0-tagged contemporary fiction collections — does ANY usable pool of modern CC0 / verified-PD erotica exist anywhere? Honest answer.\n\nReport via PD_SURVEY_SCHEMA. Be brutally honest about era / voice fit — a Victorian text on a contemporary literary-erotica site reads as wrong, and that\'s relevant to the user\'s actual decision.', { schema: PD_SURVEY_SCHEMA, label: 'pd-survey' }),

  () => agent('Inventory the existing Lucifer\'s Diary backend pieces relevant to building a new seed script. READ frontend/AGENTS.md context lives in the repo at /Users/taha/Claude projects/LucifersDiary — work from there.\n\nFind:\n1. The existing tag-seeding script (the README references `npm run seed:tags`). Read it: path, structure (top-level await? prisma client lifecycle? input data source?), how it\'s wired in backend/package.json scripts.\n2. The current count of tags in the taxonomy (parse docs/tag_taxonomy_3_tiers.md and/or docs/tag_extras.json). Split safe vs adult.\n3. backend/package.json — is @faker-js/faker installed? what version? what other relevant deps (prisma client, ts-node)?\n4. backend/prisma/schema.prisma — record the EXACT required fields for Story / Series / Chapter inserts (excluding auto-generated id/createdAt/updatedAt). Note relations to Tag via StoryTag / SeriesTag / ChapterTag join tables.\n5. The convention for running scripts in backend/scripts/ — are they .ts files? executed via ts-node? wired into npm scripts in package.json?\n\nReport via PROJECT_INVENTORY_SCHEMA. Use Read + Grep extensively; cite exact line numbers where useful.', { schema: PROJECT_INVENTORY_SCHEMA, label: 'project-inventory' }),

  () => agent('Draft a COMPLETE plan for backend/scripts/seed-dev-content.ts — a synthetic Prisma seed script that materializes 50 stories + 8 series (with 3-8 chapters each) for dev-only stress-testing of the recently-shipped GSAP animations (PRs #187–#191) on Lucifer\'s Diary.\n\nRequirements:\n\nVOLUME: 50 standalone Story rows, 8 Series rows with 3-8 chapters each (so ~40-60 total chapters).\n\nSAFETY GUARDS (non-negotiable):\n- Requires explicit `--confirm=dev` CLI flag; running without it prints a warning and exits with code 1.\n- Requires `LUCIFER_ENV=dev` env var to be set. Without it the script refuses to run.\n- Each seeded row is marked with a discoverable token (recommend: in a dedicated field if one exists, or as a known prefix like `[seed-dev]` in the title — pick the cleaner option based on schema).\n- Idempotent: rerunning the script does NOT duplicate rows. Either detects existing seed rows (by marker) and refuses, or skips them.\n- Supports `--purge` flag that wipes ONLY rows matching the marker (no other rows touched).\n- Supports `--dry-run` flag that prints exactly what WOULD insert (counts + first few titles) without actually writing to the DB.\n\nCONTENT GENERATION (the key constraint: no copyrighted material reproduced anywhere):\n- Titles: faker-driven with a literary-evocative twist. Approach: combine word-pools from faker.word.* with hand-curated mood words (suggestive but not explicit) — e.g. `${faker.word.adjective()} ${moodNoun}` or `The ${noun} of ${faker.person.firstName()}`. Output should sound brand-appropriate (think evocative literary titles, not graphic).\n- Excerpts: faker.lorem.sentences(3) modified to sound moody — prepend with one of a small pool of evocative openers. 100% original (faker-generated), not derived from any source.\n- Bodies: pure faker.lorem.paragraphs() — varied length from ~500 to ~10,000 words. Animation testing doesn\'t care what the body says, only how long it is.\n- Tags: read the existing tag taxonomy from the DB at script-runtime via prisma.tag.findMany(), pick 3-6 random tags per row weighted to include both safe and adult tags. Mix should match real-site distribution roughly.\n- isAuthorsChoice: 5% probability per story/chapter.\n- publishedAt: spread across the last 6 months, random.\n- Series.status: weighted mix of ONGOING / COMPLETE / HIATUS.\n- estimatedReadMinutes: computed from body word count.\n\nReport via SYNTHETIC_PLAN_SCHEMA. The codeSkeleton field should be a real TypeScript draft (~150-250 lines) showing argument parsing, env-guard, prisma lifecycle, content generators, tag-selection algorithm, marker logic, purge logic, dry-run logic — enough to commit and refine, not pseudo-code. Use the project-inventory findings (faker version, schema shape, script convention) — the synthesizer agent will pass them in via context.', { schema: SYNTHETIC_PLAN_SCHEMA, label: 'synthetic-plan' }),
])

log('Research complete. Synthesizing decision menu.')

phase('Synthesis')

const decision = await agent(
  'Synthesize a decision menu for the user comparing two options for populating their dev database with test content. The user has been pushing for "real content from non-copyrighted sources" — your job is to put genuine survey data + the synthetic alternative side by side so they can make a clear call.\n\n' +
  'INPUTS:\n\n' +
  'PD SURVEY: ' + JSON.stringify(pdSurvey) + '\n\n' +
  'PROJECT INVENTORY: ' + JSON.stringify(projectInventory) + '\n\n' +
  'SYNTHETIC PLAN: ' + JSON.stringify(syntheticPlan) + '\n\n' +
  'Output a JSON object with these fields:\n' +
  '- summary: 2-3 sentences capturing the headline finding (e.g. "PD pool exists but it\'s X works, Y era, Z fit — synthetic is more aligned with the test goal").\n' +
  '- pdOption: { viable: boolean, volume: string, voiceFit: string, fitForGSAPTesting: string, recommendation: "use" | "skip" | "use-some" }. Be honest.\n' +
  '- syntheticOption: { fileSummary: string, volumeSummary: string, safetySummary: string, runCommand: string, purgeCommand: string }.\n' +
  '- recommendation: "synthetic" | "pd-only" | "hybrid" — your single best call, with one sentence of why.\n' +
  '- readyToBuild: boolean — is the synthetic plan complete enough that a "yes, build" lands the script in develop within one focused PR? (Should be true.)\n' +
  '- whatBuildLooksLike: 4-6 bullet points describing the actual PR scope (files created/modified, what the user runs after merge).\n' +
  '- openQuestionsForUser: list of any genuine decisions the user still needs to make (be brief — only items that change the build).',
  {
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        summary: { type: 'string' },
        pdOption: { type: 'object', additionalProperties: false, properties: {
          viable: { type: 'boolean' },
          volume: { type: 'string' },
          voiceFit: { type: 'string' },
          fitForGSAPTesting: { type: 'string' },
          recommendation: { type: 'string' },
        }, required: ['viable', 'volume', 'voiceFit', 'fitForGSAPTesting', 'recommendation'] },
        syntheticOption: { type: 'object', additionalProperties: false, properties: {
          fileSummary: { type: 'string' },
          volumeSummary: { type: 'string' },
          safetySummary: { type: 'string' },
          runCommand: { type: 'string' },
          purgeCommand: { type: 'string' },
        }, required: ['fileSummary', 'volumeSummary', 'safetySummary', 'runCommand', 'purgeCommand'] },
        recommendation: { type: 'string' },
        readyToBuild: { type: 'boolean' },
        whatBuildLooksLike: { type: 'array', items: { type: 'string' } },
        openQuestionsForUser: { type: 'array', items: { type: 'string' } },
      },
      required: ['summary', 'pdOption', 'syntheticOption', 'recommendation', 'readyToBuild', 'whatBuildLooksLike'],
    },
    label: 'synthesize',
  }
)

return {
  pdSurvey,
  projectInventory,
  syntheticPlan,
  decision,
}
