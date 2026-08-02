export const meta = {
  name: 'dev-prose-pool',
  description: 'Generate a pool of ~22 original literary-erotica fixture pieces (dark, sensual, atmospheric, suggestive register — NOT graphic) for Lucifer\'s Diary dev seed. Each piece has title, excerpt, body, suggestedTags. Six writer agents work in parallel with assigned variation axes (POV, tense, setting, mood) so the pool is non-uniform.',
  phases: [
    { title: 'Write', detail: '6 parallel writer agents, each producing 3-4 pieces in an assigned register' },
    { title: 'Assemble', detail: 'collate the pieces into a single typed module + draft the seed-script integration' },
  ],
}

const PIECE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string', description: 'Evocative literary title (no quotation marks, no period). 1-6 words.' },
    excerpt: { type: 'string', description: '2-3 sentence excerpt that pulls the reader in. Atmospheric, suggestive, not graphic.' },
    body: { type: 'string', description: 'Full piece, 600-2500 words. Dark / sensual / literary / atmospheric register. The sex is FELT (tension, proximity, breath, hands, deliberate omissions) — never catalogued or graphically depicted. Think Garth Greenwell / Mary Gaitskill / Melissa Febos — literary erotica that hits hard via restraint, not graphic description. Use paragraph breaks. Original to this generation; do NOT reference or paraphrase any existing copyrighted work.' },
    wordCount: { type: 'integer', description: 'Approximate word count of body (helps the seed script vary content)' },
    suggestedTags: { type: 'array', items: { type: 'string' }, description: 'List of suggested tag names (lowercase, hyphenated) that match the piece\'s themes — e.g. "slow-burn", "epistolary", "dom-sub-switch", "exhibitionism", "secrecy". The seed script will map these to the actual tag taxonomy via fuzzy match.' },
    notes: { type: 'string', description: 'One sentence on what makes this piece distinct (voice / tense / setting / POV) — helps verify variation across the pool.' },
  },
  required: ['title', 'excerpt', 'body', 'wordCount', 'suggestedTags', 'notes'],
}

const POOL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    pieces: { type: 'array', minItems: 3, maxItems: 5, items: PIECE_SCHEMA },
  },
  required: ['pieces'],
}

const BRAND_BRIEF = `Lucifer's Diary brand: dark, literary erotica — slow-burn, atmospheric, restrained. Tonal references: Garth Greenwell, Mary Gaitskill, Melissa Febos, Carmen Maria Machado, Anaïs Nin's diaries. NOT Literotica-style graphic porn. The sex is FELT (proximity, breath, hands, tension, what's deliberately NOT described) — never catalogued or graphically depicted body-part-by-body-part. Voice: literary, deliberate, image-driven. The site's tagline: "Dark erotica & sex stories... confessions kept after dark." Every piece should read like something a serious literary publication would print as transgressive fiction. Adult themes are fine and expected (desire, intimacy, transgression, kink-as-feeling-not-mechanics, consent-aware) — explicit graphic depiction is out of register.

CONSTRAINTS for every piece:
- Original to this generation. Do NOT paraphrase, reference, or "rewrite with substitutions" any existing copyrighted work.
- All characters are adults.
- The sex is suggested through tension, gesture, breath, proximity, what gets cut off, what's done in the dark — not catalogued anatomically.
- Each piece is self-contained — a short story, a confessional fragment, a letter, a scene. Not a chapter of something longer.
- Avoid using real public figures or recognizable real-world brands.`

phase('Write')

const batches = await parallel([
  () => agent(BRAND_BRIEF + '\n\nWrite 4 distinct pieces in the FIRST-PERSON, PAST TENSE register. Each between 800-1800 words. Variation axes within this batch:\n- Piece 1: A confessional letter the narrator never sends. Quiet, devastating, present-day setting.\n- Piece 2: A memory of a single night, told in retrospect. Domestic / hotel-room intimate setting.\n- Piece 3: A short story about meeting someone again after years. Sensual reunion in a public-but-private place (a library, an empty theatre, a closing bar).\n- Piece 4: An anonymous-narrator account of a long-running affair, fragmentary, told in flashes.\n\nReturn 4 pieces via the schema.', { schema: POOL_SCHEMA, label: 'writer:1p-past' }),

  () => agent(BRAND_BRIEF + '\n\nWrite 4 distinct pieces in the FIRST-PERSON, PRESENT TENSE register. Each between 600-1500 words. Variation axes:\n- Piece 1: A scene unfolding in real-time. A reader / writer ambiguous-power dynamic in a quiet office or studio.\n- Piece 2: An interior monologue while waiting — for someone to arrive, for someone to leave, for something to happen.\n- Piece 3: A short, dense piece set entirely during a single phone call.\n- Piece 4: A scene in the moment after — the room, the silence, the next words spoken.\n\nReturn 4 pieces via the schema.', { schema: POOL_SCHEMA, label: 'writer:1p-present' }),

  () => agent(BRAND_BRIEF + '\n\nWrite 4 distinct pieces in the THIRD-PERSON CLOSE register, varied tense. Each between 1000-2200 words. Variation axes:\n- Piece 1: Past tense. Two strangers on a slow train journey, mostly dialogue + interior. Cross a line by the end.\n- Piece 2: Present tense. A long-married couple, an unexpected request, the negotiation that follows.\n- Piece 3: Past tense. An asymmetric dynamic — teacher/former-student, editor/writer, doctor/patient (consensual adult, post-relationship) — with the years between them as the real subject.\n- Piece 4: Present tense. A scene in a queer space — bar / bathhouse / private party — written with affection and specificity. Sensual via lighting, music, brush of strangers.\n\nReturn 4 pieces via the schema.', { schema: POOL_SCHEMA, label: 'writer:3p-close' }),

  () => agent(BRAND_BRIEF + '\n\nWrite 3 distinct pieces in EPISTOLARY / DOCUMENT form. Each 600-1400 words. Variation axes:\n- Piece 1: A series of 5-8 letters between two correspondents over months — desire deepening through delay. Date each entry.\n- Piece 2: A diary entry, one night, dense and recursive. The narrator returns to the same image three times.\n- Piece 3: An email exchange (4-6 messages) that crosses from professional into intimate by the last message. Format as From/To/Subject blocks.\n\nReturn 3 pieces via the schema.', { schema: POOL_SCHEMA, label: 'writer:epistolary' }),

  () => agent(BRAND_BRIEF + '\n\nWrite 4 distinct pieces in a TIGHT, PROSE-POETRY register — short, dense, image-driven. Each between 300-700 words. Variation axes:\n- Piece 1: A fragment that reads as half-remembered. Heavy on the senses, light on plot.\n- Piece 2: A piece structured as a list (numbered or unnumbered) of small intimate things.\n- Piece 3: A piece that hinges on a single object (a key, a scarf, a photograph) and what it means.\n- Piece 4: A piece written as a confession addressed to "you" — the reader as the lover.\n\nReturn 4 pieces via the schema.', { schema: POOL_SCHEMA, label: 'writer:prose-poetry' }),

  () => agent(BRAND_BRIEF + '\n\nWrite 3 pieces with HIGHER-INTENSITY kink-aware content, kept within the literary register (psychological / emotional / power-dynamic depth, not anatomical catalogue). Each between 1000-2000 words. Variation axes:\n- Piece 1: A scene with explicit consent negotiation as part of the prose — the negotiation itself is sensual. Dom/sub or top/bottom dynamic, varied gender pairing of your choice.\n- Piece 2: A piece centered on aftercare and the texture of vulnerability afterward — the "scene" itself is referenced obliquely; the body of the piece is what follows.\n- Piece 3: An exhibitionism-themed piece: being seen, the awareness of being seen, the dynamic between performer and witness in a controlled setting. NOT graphic — psychological.\n\nReturn 3 pieces via the schema.', { schema: POOL_SCHEMA, label: 'writer:kink-literary' }),
])

const allPieces = batches.flatMap(b => (b && b.pieces) ? b.pieces : [])
log(`Pool size: ${allPieces.length} pieces total. Assembling.`)

phase('Assemble')

const assembly = await agent(
  'You are integrating a pool of ' + allPieces.length + ' original literary-erotica fixture pieces into the existing dev-seed script for Lucifer\'s Diary.\n\n' +
  'POOL (already validated, schema-conformant): ' + JSON.stringify(allPieces) + '\n\n' +
  'Produce TWO outputs:\n\n' +
  '1. `poolFileContent`: complete TypeScript source for a new file at `backend/scripts/dev-prose-pool.ts`. It should:\n' +
  '   - Export a typed const `DEV_PROSE_POOL` (or similar) — array of `{ title, excerpt, body, wordCount, suggestedTags }` objects.\n' +
  '   - Top-of-file comment explaining: this is the original literary-fixture pool for the dev seed; all pieces are original generated content (owned by the project); used by `seed-dev-content.ts` to provide real-feeling prose instead of faker.lorem for bodies.\n' +
  '   - The pool data should be valid TypeScript (proper string escaping for quotes/newlines, etc.).\n\n' +
  '2. `seedScriptDiff`: a description of the minimal edit needed in `backend/scripts/seed-dev-content.ts` to use the pool. The current script generates bodies via `generateBody(wordTarget)` which uses `faker.lorem.paragraph`. The new behavior:\n' +
  '   - Import DEV_PROSE_POOL from `./dev-prose-pool`.\n' +
  '   - When generating a story or chapter, pick a piece from the pool at random.\n' +
  '   - For body: use the piece\'s body verbatim if the seed wants a length close to wordCount; otherwise concatenate 2-3 random pool bodies separated by paragraph breaks to hit longer target lengths.\n' +
  '   - For title and excerpt of the seeded row: optionally derived from the pool piece (a fraction of seeded rows can reuse pool title/excerpt for verisimilitude; the rest use the existing faker title generator so the pool isn\'t obviously over-used).\n' +
  '   - Tags: when the pool piece has suggestedTags, the seed script should try fuzzy-match them against the real tag taxonomy (prisma.tag.findMany then case-insensitive includes match), and if matches found, prefer them over random tags for that row.\n' +
  '   Output the diff as a concrete description of what lines change in seed-dev-content.ts — name the helper functions to modify (generateBody, planStory, planSeries) and the new helpers to add (pickPoolPiece, derivedTagsFromPiece). The main agent will apply the edits manually.\n\n' +
  'Be specific in the diff — name the exact constants and function names. Don\'t hand-wave.',
  {
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        poolFileContent: { type: 'string' },
        seedScriptDiff: { type: 'string' },
        poolStats: { type: 'object', additionalProperties: false, properties: {
          count: { type: 'integer' },
          totalWords: { type: 'integer' },
          minWords: { type: 'integer' },
          maxWords: { type: 'integer' },
          uniqueSuggestedTags: { type: 'integer' },
        }, required: ['count', 'totalWords', 'minWords', 'maxWords', 'uniqueSuggestedTags'] },
      },
      required: ['poolFileContent', 'seedScriptDiff', 'poolStats'],
    },
    label: 'assemble',
  }
)

return {
  pieces: allPieces,
  assembly,
}
