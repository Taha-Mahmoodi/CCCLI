# Third Eye World — Engineering Build Instruction Package (v1.0)

**Author:** Said Mohaddes Sadeqi
**Affiliation:** Third Eye Worldwide
**Date:** July 2026

## Abstract

- **Build a sensory-neutral spine, not an accessible Instagram.** Every post/thread/object is stored once in a canonical non-visual data model and rendered losslessly to speech, non-speech audio, braille, haptics, low-vision visuals, and IVR/voice-phone — no projection is "primary." This is the falsifiable core; if you cannot demonstrate lossless multi-sensory parity of a single object (Stage 0 gate), do not proceed.
- **Two things are non-negotiable and gate the whole build:** (1) an inclusion + safety floor (braille/low-vision/audio parity, IVR/USSD gateway, and core anti-impersonation via voice provenance and out-of-band safe-word verification, because Microsoft's VALL-E showed a usable voice clone can be synthesized "with only a 3-second enrolled recording of an unseen speaker"); and (2) rejection of engagement-maximizing design in favor of finite, time-boxed "episodes/digests" for a population at documented elevated loneliness risk.
- **The business model is genuinely unresolved and must not be treated as settled.** Plan for cooperative/nonprofit/public-philanthropic/subscription/creator-fee funding as the base case; ad-based monetization is unlikely to close for this market. Several headline features (earcon social vocabulary, finite-digest well-being benefit, audio "glanceability") are conjecture and must pass Stage 1 experiments before broad build.

---

## 1. Purpose & Context for the Team

**What Third Eye World is.** Third Eye World (TEW) is a voice-first, blind-first digital social ecosystem for blind and low-vision (BLV) users. "Blind-first" is a specific architectural commitment, not a marketing phrase: the platform is designed *from* a temporal/acoustic/haptic ontology rather than retrofitting a visual product with a screen reader.

**Why it exists.** Per the WHO Fact Sheet on blindness and vision impairment, "Globally, at least 2.2 billion people have a near or distance vision impairment," and — per Orbis International — "89% of the world's visually impaired [live] in low or middle income countries, particularly in Asia or Sub-Saharan Africa" (about 55% are women). BLV people are at documented elevated risk of loneliness and social isolation, which correlate with depression, sleep disturbance, cardiovascular disease, and increased mortality risk. Dunlop et al. (*British Journal of Visual Impairment*, 2025), reviewing Brunes et al.'s 2019 study of 736 Norwegian adults with visual impairment, report that "loneliness was more prevalent among those who were severely sight impaired (blind)" than partially sighted (Brunes found moderate-loneliness prevalence of 28.7% and severe of 19.7%). A social platform for this population therefore has a duty of care: it must be well-being-oriented, globally reachable, and safe by design.

**The prime directive.** Build FROM non-visual primitives. The visual rendering is just one projection of a canonical model, and it is built last or in parallel — never first. Any ticket that starts "the screen shows…" and works backward to audio is a red flag and should be rejected in code review.

**What the research found (and this package implements):**
- A **sensory-neutral spine** is the falsifiable commitment that distinguishes blind-first from ordinary accessibility.
- **Voice-first but NOT voice-only.** Speech is serial, slow, public, and fatiguing; non-speech audio must carry structural load.
- **Reject infinite scroll / engagement maximization**; prefer finite episodes with a clear end.
- **Interdependence by design**: giving and receiving help is a first-class feature.
- **Voice is a spoofable biometric.** Anti-impersonation is core, not peripheral.
- **Global South / offline-first is mandatory.**
- **Audio moderation at scale is hard and biased**; require transparent, contestable, human-in-the-loop moderation.
- **The BLV privacy threat model is distinct** (shoulder-surfers the user can't see, PINs voiced aloud, cameras capturing bystanders).
- **Accessibility beyond screen readers**: braille, low-vision, deafblind, haptics as first-class.
- **AI with confabulation and dependency safeguards.**
- **Identity without images.**
- The business model is an **honest open problem**.

---

## 2. Product Vision & Non-Negotiable Principles (Hard Constraints)

These are acceptance criteria, not aspirations. Each has a testable form.

1. **Sensory-neutral spine.** One canonical object → many lossless projections. *Acceptance:* any content object can be fully consumed and acted upon through each supported projection with no information available only in one modality.
2. **Voice-first, not voice-only.** *Acceptance:* structural navigation, status, and identity are conveyable without speech (earcons/spearcons/haptics), and every speech output has terse and verbose modes plus adjustable rate.
3. **Finite by design.** *Acceptance:* no infinite scroll anywhere; every feed/session has a defined end state ("You're all caught up").
4. **Interdependence is a feature.** *Acceptance:* asking for and offering help are first-class, reciprocal, reputation-building actions.
5. **Anti-impersonation is core.** *Acceptance:* voice provenance/consent ledger, verified-voice signaling, and out-of-band safe-word verification ship in the inclusion+safety floor (Stage 2), not later.
6. **Global South reachable.** *Acceptance:* a feature-phone user on 2G with no smartphone and no data plan can perform core social actions via IVR/USSD/SMS/WhatsApp.
7. **Transparent, contestable moderation.** *Acceptance:* no silent shadowbanning; every enforcement action is disclosed to the affected user with the triggering reason and an appeal path.
8. **BLV privacy threat model.** *Acceptance:* private-audio paths, observation-resistant PIN entry, camera bystander/document detection, an audio "screen-curtain," and minimal audio retention.
9. **Accessibility peers, not tiers.** *Acceptance:* totally-blind, low-vision, and deafblind modes are peers; braille is a first-class output path.
10. **Well-being over engagement.** *Acceptance:* success metrics measure connection quality and user-reported well-being, never time-on-app or session count as a primary KPI.

---

## 3. What We Are Building vs. Explicitly NOT Building

**Building:** a canonical non-visual content model; a multi-sensory projection layer; finite audio "episodes/digests"; live audio rooms with social presence; voice identity and vouching-based reputation; a voice-provenance and anti-impersonation trust layer; transparent human-in-the-loop moderation; an IVR/USSD/SMS/WhatsApp offline-first gateway; AI description/summarization/translation/navigation with uncertainty disclosure; a BLV-specific privacy/security layer.

**NOT building:**
- **NOT infinite scroll** or any engagement-maximizing/variable-reward feed.
- **NOT a screen-reader-retrofitted visual app.**
- **NOT voice-only** (speech cannot be the sole carrier of structure).
- **NOT engagement-maximizing recommendation**; recommendation is transparent and user-tunable.
- **NOT follower-count-based status**; reputation is reciprocity/vouching-based.
- **NOT silent shadowbanning.**
- **NOT ad-based monetization** as the assumed base case.
- **NOT unrestricted AI companions**; companions (if built) ship only with strict dependency guardrails and are gated on validation.
- **NOT a new language** ("Third Eye Language" means evolved registers/genres/conventions, not a constructed language).

---

## 4. Core Architecture: The Sensory-Neutral Spine

### 4.1 Concept
A single **canonical interaction model** stores meaning and structure independent of any sensory form. A **projection layer** deterministically renders each object to any supported modality. No projection is authoritative; the canonical object is.

### 4.2 Conceptual Data Model (canonical entities)
- **Actor** — a participant (human or agent). Fields: stable ID, chosen self-description (text + optional self-recorded audio), voice-identity signature reference, earcon/auditory signature, verified-voice status, reputation graph edges (vouches, reciprocity), locale/language, preferred verbosity, preferred projections, accessibility profile (blind / low-vision / deafblind / other).
- **Utterance/Post** — the atomic content object. Fields: authored content in a **modality-neutral structured representation** (semantic text + structured markup for emphasis/structure + optional original audio + attached media with mandatory descriptions), provenance record, timestamps, thread references, content-warning/sensitivity tags, language.
- **Thread** — an ordered/branching set of Utterances with explicit structural relations (reply, quote, help-request, help-offer).
- **Room** — a live or asynchronous audio space; has presence roster, spatial layout metadata, roles (host, speaker, listener, moderator, agent), recording-consent state.
- **Episode/Digest** — a finite, time-boxed collection of objects with an explicit start and end, generated per-user.
- **Relation** — reputation/vouch/reciprocity edges; help transactions.
- **ProvenanceRecord** — voice/content provenance and consent assertions (see §9).
- **RenderingHints** — optional per-object authoring hints (e.g., "this is a joke," pronunciation, emphasis) that inform, but never gate, projections.

**Key rule:** any attribute that affects meaning must live on the canonical object, never only in a rendering. Alt text/descriptions for attached media are **mandatory** at authoring time (AI-assisted, human-confirmable), because a media object with no description is information available only in the visual projection — a spine violation.

### 4.3 The Projection/Rendering Pipeline
Canonical object → **Projection Resolver** (selects modalities from the consumer's accessibility profile + device capabilities + bandwidth) → **Modality Renderers**:

- **Speech renderer** — emits SSML (W3C standard; `<prosody rate=…>` controls speaking rate in WPM, `<break>`, `<emphasis>`, `<voice>`, `<lang>`) to a TTS engine. Supports terse/verbose modes and per-user rate. Default speaking rate is user-configurable; experienced screen-reader users often consume speech well above conversational rates, so support a wide range (0.5×–4×+) and per-context overrides.
- **Non-speech audio renderer** — maps structure/status/identity to earcons (abstract musical motifs), auditory icons (ecological/real-world sounds), and spearcons (time-compressed speech). Evidence: spearcons outperform traditional/hybrid auditory cues in navigation efficiency, accuracy, and learning rate, with learnability comparable to normal speech (Walker et al., *Human Factors*, 2013). A meta-analysis (*Auditory Perception & Cognition*, 2023) compares icons/earcons/spearcons/speech across accuracy, reaction time, workload, and dual-task interference — use it to select cue types per task.
- **Spatial-audio renderer** — positions sound sources via HRTF/binaural rendering (Web Audio API `PannerNode` HRTF mode; for higher fidelity, custom HRTF convolution or ambisonic decoding via libraries like Google Omnitone or IRCAM binauralFIR). Requires headphones for correct localization.
- **Braille renderer** — emits Unicode Braille Patterns (U+2800–U+28FF) and uses WAI-ARIA braille semantics (`aria-braillelabel`, `aria-brailleroledescription`, which must always have non-braille equivalents) to drive refreshable braille displays via platform braille APIs/BRLTTY. First-class, not derived from the speech string.
- **Haptic renderer** — maps a standardized haptic vocabulary (see §7) to platform haptic APIs (iOS Core Haptics, Android Vibrator/VibrationEffect, Web Vibration API where available).
- **Low-vision visual renderer** — high-contrast, magnification-friendly, reflow-safe visual layout meeting WCAG 2.2 (contrast, text resize, touch-target, and reflow criteria). A peer projection, not the master.
- **IVR/voice-phone renderer** — renders objects to DTMF-navigable / speech-recognition voice menus over PSTN; terse by necessity.

**Parity contract (Stage 0 gate):** an automated conformance test must prove that for a corpus of representative objects, each projection exposes the same set of semantic facts and the same set of available actions. Any fact/action present in one projection and absent in another fails the build.

---

## 5. Feature Specifications by Domain

Each domain: *Purpose · Research basis · Requirements · Acceptance criteria · Priority.* Priority is **MVP**, **Later**, or **Gated** (blocked on a Stage-1 experiment).

### 5.1 Voice-First Interaction
- **Purpose:** primary interaction is conversational and auditory.
- **Research basis:** voice-first-not-voice-only; listening-fatigue/cognitive-load management.
- **Requirements:** conversational navigation assistant; adjustable speech rate; terse/verbose toggle; barge-in (interrupt TTS); "repeat/slower/skip" universal commands; whisper/private-audio mode; consistent verb grammar across the app.
- **Acceptance:** any task completable by voice within a defined command grammar; speech rate adjustable 0.5×–4×+; every long output has a terse form; user can interrupt at any time.
- **Priority:** MVP.

### 5.2 Non-Speech Audio & Spatial Audio
- **Purpose:** offload structure/status/identity from speech to reduce fatigue and add "glanceable" awareness.
- **Research basis:** earcons/auditory icons/spearcons; audio "glanceability" layer (Gated).
- **Requirements:** a standardized, documented earcon/auditory-icon/spearcon library (§7); spatialized presence in rooms; consistent mapping across the app; user-adjustable non-speech volume independent of speech.
- **Acceptance:** users can identify core events/objects by non-speech audio alone after a short onboarding; spatial positions in a room are distinguishable with headphones.
- **Priority:** MVP for basic earcons; **Gated** for the "audio glanceability layer" and social earcon vocabulary learnability (Stage 1).

### 5.3 Navigation (Finite Episodes, Spatial Rooms, Rotor/Gesture/Braille)
- **Purpose:** navigate without vision and without infinite feeds.
- **Research basis:** reject infinite scroll; finite digests; rotor/gesture grammars from platform accessibility.
- **Requirements:** finite Episode/Digest generator with explicit end; rotor-style attribute navigation (by author, thread, unread, help-requests); consistent gesture grammar (§7); braille-navigable structures; NO endless auto-loading.
- **Acceptance:** every feed terminates with an explicit "caught up" state; navigation works via touch gestures, keyboard, braille display, and voice equivalently.
- **Priority:** MVP.

### 5.4 Identity & Profiles Without Images
- **Purpose:** identity that does not depend on photographs.
- **Research basis:** voice identity; chosen self-description; reputation via reciprocity/vouching; audibly-signaled avatars/earcon signatures.
- **Requirements:** chosen self-description (text + optional self-recorded intro); an **earcon/auditory signature** per actor; verified-voice badge; reputation surfaced as reciprocity/vouches, NOT follower counts.
- **Acceptance:** an actor is recognizable across projections (name, self-description, earcon signature, optional verified voice); no follower-count leaderboard exists.
- **Priority:** MVP (earcon signatures Later if needed).

### 5.5 Live Audio Rooms & Social Presence
- **Purpose:** synchronous voice community.
- **Research basis:** voice-first sociality; spatial audio for presence; moderation constraints.
- **Requirements:** scalable rooms with roles; spatialized speaker presence; recording-consent state enforced and audible; in-room moderation controls; graceful low-bandwidth degradation.
- **Acceptance:** rooms scale to target concurrency (separate small publisher set from large listener set); recording state is always disclosed; moderators can act in real time.
- **Priority:** MVP (spatial presence Later/Gated).

### 5.6 Safety/Trust/Reputation & Anti-Impersonation
- **Purpose:** prevent voice-clone impersonation and build durable trust.
- **Research basis:** Microsoft's VALL-E (Jan 2023 arXiv, "Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers," trained on 60,000 hrs of speech from 7,000+ speakers) can "synthesize high-quality personalized speech with only a 3-second enrolled recording of an unseen speaker as an acoustic prompt"; provenance/consent ledger; verified voice; out-of-band/safe-word verification.
- **Requirements:**
  - **Voice provenance & consent ledger:** record when a voice is enrolled, consented uses, and whether an utterance's audio is claimed as authentic-human, synthetic-with-consent, or unverified.
  - **Verified-voice signaling:** a badge/earcon indicating a verified authentic-human voice for that actor.
  - **Safe-word / out-of-band verification:** for high-stakes interactions (help requests involving money, sensitive disclosures), support a pre-agreed safe word and an out-of-band challenge.
  - **Deepfake/synthetic-voice detection** as a signal (not a sole gate), acknowledging detector limitations (below).
  - **Content-provenance standards:** apply C2PA/Content Credentials (now ratified as an ISO standard; supports audio) to attached media and, where feasible, to synthetic-voice assertions; layer watermarking (Google SynthID audio, Meta AudioSeal) where a first-party generator is used.
- **Acceptance:** any utterance carries a provenance state; users can trigger safe-word verification; verified-voice status is visible/audible across projections.
- **Priority:** **Core / Stage 2 floor** (provenance ledger, verified voice, safe-word MVP; detection as a Later-improving signal).
- **Honest limits — anti-spoofing does not generalize.** The **ASVspoof 5 challenge (Interspeech 2024)** — the first edition using large-scale crowdsourced data (Multilingual LibriSpeech) plus adversarial attacks — saw baseline systems (RawNet2, AASIST) degrade to **EER > 29%** (vs. 0.22% for the top ASVspoof 2019 system and 1.32% for the best ASVspoof 2021 logical-access system), with top-5 closed-condition submissions reaching only sub-15% EER. Adversarial attacks (Malafide, Malacopula) and neural codecs (Encodec) degraded detection most, and overfitting to known attacks was explicit. Commercial vendors publish high numbers (Pindrop claims ~99% accuracy and >90% on unseen deepfakes; Resemble Detect ~94.2% on clean audio in an independent blog test; ID R&D IDLive Voice needs ~3s of speech) but these are **vendor-reported, not standardized benchmarks**, and independent tests show open-source detectors flagging synthetic audio only ~78% of the time and all tools struggling with compressed/phone-quality audio. **Treat detector scores as advisory; provenance metadata and out-of-band verification are the real trust backbone** (metadata and watermarks are strippable — use layered defense).

### 5.7 Mental Health & Anti-Addiction
- **Purpose:** protect a loneliness-vulnerable population from well-being-hostile design.
- **Research basis:** elevated loneliness risk (§1); reject engagement maximization.
- **Requirements:** finite sessions; no variable-reward mechanics; usage-awareness and natural stopping points; opt-in "quiet hours"; no dark patterns; connection-quality nudges (reciprocity, small groups) over reach-maximizing nudges.
- **Acceptance:** no infinite feed; no streaks/variable-reward loops; session end states present; well-being survey instrument integrated.
- **Priority:** MVP.

### 5.8 Creator Tools & Monetization
- **Purpose:** let creators produce accessible audio-first content and (possibly) earn.
- **Research basis:** monetization is unresolved; creator memberships/tips and accessibility-as-a-service as candidate models.
- **Requirements:** audio-first authoring with mandatory descriptions for any media; creator memberships/tips; an optional accessibility-as-a-service marketplace (e.g., paid human description/verification); transparent, tunable (non-engagement-maximizing) discovery.
- **Acceptance:** creators can publish fully-accessible content; at least one non-ad revenue path is instrumented for experimentation.
- **Priority:** Stage 3 (creator memberships/tips), with hooks in MVP.

### 5.9 Content Moderation (Audio at Scale)
- **Purpose:** keep users safe without silencing disabled/multilingual/non-standard-dialect creators.
- **Research basis:** ASR transcription loses tone/sarcasm; ASR is biased against minority dialects and multilingual speakers — Harris et al. ("Modeling Gender and Dialect Bias in Automatic Speech Recognition," *Findings of EMNLP* 2024, Georgia Tech & Stanford) found that across wav2vec 2.0, HuBERT, and Whisper, "SAE [Standard American English] transcription significantly outperformed each minority dialect" (AAVE, Spanglish, Chicano English) on 13 hours of podcast audio, with men transcribed more accurately than women; opaque moderation/shadowbanning disproportionately harms marginalized creators.
- **Requirements:** transcription + classification as **triage only**; human-in-the-loop review with full audio + confidence-scored transcript; language ID before ASR with graceful fallback; **no silent shadowbanning**; disclosed enforcement with reason; appeals routed to different reviewers than the initial decision; **community juries** for contestable cases; transparency reports; log decisions and policy violations, not full transcripts, with defined retention.
- **Acceptance:** every enforcement action is disclosed with a reason and an appeal path; appeal reviewers differ from initial reviewers; dialect/language fairness is measured and reported.
- **Priority:** MVP for transparency/appeals; community juries Stage 3.

### 5.10 Accessibility Beyond Screen Readers (Braille / Low-Vision / Deafblind / Haptic)
- **Purpose:** serve the full BLV spectrum as peers.
- **Research basis:** braille as first-class (note refreshable-braille cost barriers); low-vision as peer; deafblind mode (braille+haptic, no audio reliance); haptic vocabularies.
- **Requirements:** first-class braille output (Unicode braille + ARIA braille semantics + BRLTTY/platform braille); low-vision mode (WCAG 2.2 contrast/resize/reflow); **deafblind mode** relying on braille + haptics with zero audio dependency; standardized haptic vocabulary.
- **Acceptance:** a deafblind user can complete core social actions with braille + haptics and no audio; low-vision mode meets WCAG 2.2 AA; all structure is braille-navigable.
- **Cost note:** refreshable braille displays commonly cost several thousand dollars (piezoelectric-crystal actuators run $6–$10 each, pushing device cost to $2,000–$8,000); Orbit Reader-class devices target the several-hundred-dollar range. Do not assume braille-display ownership; braille output must degrade gracefully and never be the sole path.
- **Priority:** Stage 2 floor (braille + low-vision), deafblind mode Stage 2/3.

### 5.11 Global South / Offline-First
- **Purpose:** reach the 89% of BLV people in LMICs, including feature-phone and no-data users.
- **Research basis:** offline-first mandatory; IVR/USSD/SMS/WhatsApp; low-bandwidth codecs; low-resource-language TTS/ASR gaps. (GSMA notes over 40% of mobile connections in Sub-Saharan Africa are still on 2G.)
- **Requirements:**
  - **IVR** dial-in (PSTN) for full core social actions by voice.
  - **USSD** session menus via aggregator (e.g., Africa's Talking) with `CON`/`END` session semantics; works on 2G feature phones with no internet; sessions time out ~180s.
  - **SMS** notifications/actions; **WhatsApp Business API** bridge.
  - **Low-bandwidth audio** via **Opus** (RFC 6716; voip mode ~16–24 kbps intelligible, ~32 kbps clean voice; DTX + in-band FEC for lossy networks — this is the WhatsApp voice-note range).
  - **Offline caching / store-and-forward** sync patterns for intermittent connectivity.
  - **Low-resource-language TTS/ASR** with honest coverage mapping (see §6); fallbacks where a language is unsupported.
- **Acceptance:** a feature-phone user with no data plan can post, listen to a digest, and respond via IVR/USSD; audio works on constrained 2G links.
- **Priority:** Stage 2 floor (IVR/USSD/SMS core), WhatsApp Later.

### 5.12 AI Integration
- **Purpose:** description, summarization, translation, and navigation assistance with honesty guardrails.
- **Research basis:** image/scene description with confidence signaling + verify affordances; confabulation safeguards; on-device vs cloud trade-offs; transparent tunable recommendation; AI companions only with dependency guardrails.
- **Requirements:**
  - **Scene/image description** with **uncertainty disclosure** and a **verify affordance** (escalate to a human, or cross-check). Precedent: Be My Eyes' "Be My AI" (GPT-4-powered) and Microsoft Seeing AI; users report high utility but real misidentification (users describe "a tendency to misidentify less focused items… it will make its best guess").
  - **Summarization/digest** for finite episodes.
  - **Translation** across languages.
  - **Conversational navigation assistant.**
  - **Confabulation safeguards:** disclose confidence, cite/limit claims, and warn that longer/more-detailed descriptions hallucinate more. (On the standard CHAIR metric, hallucination *rises* with description length — SOTA methods report CHAIR_I ~16.7 at 64 tokens vs ~30.6 at 128 tokens; MMHal-Bench shows LLaVA-1.5-7B hallucinating in ~61.5% of responses. Small on-device models — Moondream, MiniCPM-V, Llama 3.2 Vision — are flagged for higher hallucination/error rates. This matters because blind users want *detailed* descriptions, exactly where hallucination is worst.)
  - **On-device vs cloud:** prefer on-device for privacy-sensitive camera input where quality suffices; use cloud for hard scenes with explicit user awareness that the image leaves the device.
  - **Recommendation:** transparent and user-tunable, never engagement-maximizing.
  - **AI companions:** only with strict dependency guardrails; **Gated**.
- **Acceptance:** every AI description carries a confidence signal and a verify path; recommendation settings are user-visible and tunable; camera-to-cloud requires disclosure.
- **Priority:** MVP for description/summarization/translation with safeguards; companions Gated.

### 5.13 Privacy & Security (BLV Threat Model)
- **Purpose:** defend against threats the user literally cannot see.
- **Research basis:** shoulder-surfers unseen; PINs voiced aloud; cameras capturing bystanders/sensitive docs; need private-audio paths, observation-resistant PIN, camera bystander/document detection, audio screen-curtain, minimal retention.
- **Requirements:**
  - **Private-audio paths:** bone-conduction/earbud/whisper mode so sensitive output isn't broadcast.
  - **Observation-resistant auth:** OneButtonPIN-style haptic PIN entry (single button, counted vibrations imperceptible to bystanders). In the Watson et al. study (*Proceedings of the ACM on Human-Computer Interaction*, 2022; U. Waterloo & RIT; 9 BLV + 10 sighted "shoulder surfers"), "Every participant was able to successfully guess users' PINs using traditional methods, but no one could successfully guess code input using OneButtonPIN" (entry accuracy 83.6% vs 78.1% traditional). Prefer **passkeys/WebAuthn** where accessible, with carefully screen-reader-tested flows and accessible multi-path recovery (avoid QR-only; announce timers; support autofill).
  - **Camera bystander/document detection:** warn when a bystander face or sensitive document is in frame before capture/description.
  - **Audio "screen-curtain":** an equivalent to the visual screen-curtain that suppresses sensitive audio output in public contexts.
  - **Minimal audio retention:** default to not storing raw audio/voiceprints; short retention windows; user-controlled.
- **Acceptance:** PIN entry is observation-resistant; sensitive output can be routed privately; camera warns on bystanders/documents; raw audio retention is minimized and disclosed.
- **Priority:** Stage 2 floor (observation-resistant auth, private audio, retention), camera detection Later.

---

## 6. Recommended Technology Stack & Build-vs-Buy Guidance

Real options with trade-offs; the team retains judgment.

**TTS (build-on-open or buy):**
- *Open:* **Piper** (natural, efficient, good for on-device/low-resource), **Coqui XTTS v2** (multilingual, future uncertain since Coqui's backer wound down), **eSpeak-NG** (robotic but tiny and huge language coverage — good last-resort fallback), **Meta MMS-TTS** (1,100+ languages but with notable gaps, e.g., excludes Pashto).
- *Buy:* **Azure Neural TTS** (broad coverage incl. some low-resource locales — e.g., the only verified commercial Pashto voices in one 2026 study), Google Cloud TTS, Amazon Polly.
- *Guidance:* multi-engine abstraction; pick per-language by quality; fall back to eSpeak-NG for unsupported languages rather than failing.

**ASR (build-on-open or buy):**
- *Open:* **OpenAI Whisper** (trained on 680k hrs, ~100 languages, robust; large models need 8GB+ VRAM), **Vosk**/**Kaldi** (streaming/live), **NVIDIA NeMo**; SSL backbones (wav2vec 2.0, HuBERT, WavLM, XLS-R) for fine-tuning low-resource languages.
- *Buy:* Google STT (low latency), Azure.
- *Guidance:* run **language ID before ASR**; fine-tune Whisper for priority low-resource languages (documented WER gains, e.g., Welsh 31.86%→18.06% after LoRA fine-tuning); never assume English.

**Real-time audio infrastructure (buy-managed then self-host):**
- **LiveKit** (open-source, Apache-2.0, Go, SFU; SDKs across 11 frameworks; Agents framework for AI participants; DTLS-SRTP by default with optional E2EE via WebRTC Insertable Streams). *Alternatives:* **mediasoup** (mature, flexible), **Janus** (battle-tested, SIP gateway plugin for PSTN bridging), managed **Agora/Daily/Twilio/Amazon Chime**.
- *Architecture:* **SFU** for group rooms (forwards without re-encoding; scales; separate small publisher set from large listener set); P2P only for 1:1 (P2P scales O(N²), breaks down above ~4 participants); MCU only to bridge PSTN/legacy SIP. Use **simulcast** for heterogeneous networks.
- *Guidance:* start on managed (LiveKit Cloud) for MVP; self-host when scale/cost/data-sovereignty demand it. Note: E2EE (Insertable Streams) precludes server-side recording/AI on that stream.

**Telephony / Global South (buy aggregator + open telephony):**
- **Africa's Talking** (USSD/Voice/SMS/Airtime across multiple African markets, free sandbox, `CON`/`END` USSD semantics); **Twilio**/**Vonage** for global voice/SMS; **WhatsApp Business API**.
- *Open telephony:* **Asterisk** / **FreeSWITCH** for self-hosted IVR.
- *Codec:* **Opus** (mandatory in WebRTC; 6–510 kbps; SILK+CELT; DTX + FEC; voip mode ~16–32 kbps for voice).

**AI / VLM (buy API + on-device):**
- *Cloud VLMs:* GPT-class, Claude, Gemini. Per-image token mechanics differ sharply — Gemini uses a flat ~258 tokens/image regardless of resolution (cheapest for high-res); OpenAI tiles at ~170 tokens/512px tile + 85 base (~765 tokens for 1024²); Anthropic ~1,380 tokens/megapixel (~1,334 for 1024², most expensive per image). An independent 2026 comparison spanned ~13× per-image cost (Qwen VL Max $0.0003 → Claude $0.0040) with ~1.2–2.5s/image latency. Cloud accuracy is higher but adds latency, per-image cost, and sends user images off-device.
- *On-device VLMs:* **Apple Foundation Models** framework (on-device ~3B model, image input on newer OS; no per-token cost, offline, private), **Google Gemini Nano** (~3.25B), **Llama 3.2 Vision** (11B/90B), **Moondream 2** (~2B; runs <4GB VRAM; captioning/VQA/OCR), **Qwen-VL** (3B–72B). On-device trades some accuracy for privacy/latency/cost — the right default for camera input capturing sensitive surroundings.
- *Guidance:* on-device first for privacy-sensitive scenes; cloud with explicit disclosure for hard scenes; always attach a confidence signal and verify path.

**Anti-spoofing / provenance (buy signal + open + standards):**
- *Detection vendors:* **Pindrop**, **ID R&D (IDLive Voice)**, **Resemble Detect** — treat published accuracy as vendor-reported, not standardized. *Open baselines:* AASIST/RawNet2 (ASVspoof).
- *Provenance:* **C2PA/Content Credentials** (ISO standard; supports audio) for media and synthetic-voice assertions; **Google SynthID** / **Meta AudioSeal** watermarking where a first-party generator is used.
- *Guidance:* detection is advisory only (poor generalization to unseen attacks — see §5.6); provenance + watermark + out-of-band verification as layered defense.

**Auth (build-on-standard + open):**
- **Passkeys / WebAuthn (FIDO2)** with rigorously screen-reader-tested flows (avoid QR-only, announce timers, support autofill, accessible recovery with multiple paths — audits found accessibility defects common before/after passkey flows and inconsistent autocomplete for screen-reader users); **OneButtonPIN-style** haptic PIN as an observation-resistant local factor. Use a maintained WebAuthn server library; consider an identity platform to avoid rolling crypto.

**Client platform APIs:**
- iOS **UIAccessibility/VoiceOver**, **Core Haptics**; Android **accessibility/TalkBack**, **VibrationEffect**; Web **WCAG 2.2 / WAI-ARIA** (incl. braille semantics), **Web Audio API**, **Web Vibration API**; **BRLTTY**/platform braille for refreshable displays.

**Federation (decision required):**
- **ActivityPub** (W3C; the Fediverse — Mastodon, PeerTube, Pixelfed) for interoperability — see §13 for the ghettoization-vs-federation decision.

---

## 7. Non-Visual "Design System" (Shared Spec the Team Must Build)

This is a first-class deliverable, versioned like a visual design system.

- **Earcon library:** abstract musical motifs for structural events (new episode, end-of-feed, reply, mention, help-request, error, success). Documented pitch/timbre/rhythm; consistent across app. (For prototyping, CC0 corpora like BeepBank-500 exist.)
- **Auditory-icon library:** ecological sounds for object types/actions where a real-world metaphor exists.
- **Spearcon usage:** time-compressed speech for menu/list items to speed navigation; generated deterministically from labels.
- **Haptic vocabulary:** named patterns (confirm, warn, incoming, boundary, count-tick for PIN) mapped to Core Haptics / VibrationEffect; must be distinguishable and documented; drives deafblind mode.
- **Spatial-audio conventions:** where categories of sources sit in the HRTF field (e.g., self center, speakers arced front, system left, notifications right); consistent so position carries meaning.
- **Speech verbosity levels:** at least terse / standard / verbose, with a defined rule for what each includes; plus per-user rate.
- **Gesture grammar:** a consistent verb set (next/previous, activate, rotor-change, back, help) mapped identically across touch, keyboard, braille, and voice.

**Deliverable:** a living "Sensory Style Guide" with audio/haptic assets, semantics, and code bindings. Earcon social-vocabulary **learnability is Gated** (Stage 1).

---

## 8. Data Model & APIs Direction (Conceptual)

- **Core entities:** Actor, Utterance/Post, Thread, Room, Episode/Digest, Relation, ProvenanceRecord, RenderingHints (see §4.2).
- **Projection API:** `resolveProjections(object, consumerProfile, deviceCaps, bandwidth) → [Projection]`; each renderer implements a common interface `render(object) → modalityOutput` and must pass the **parity contract** conformance test (same facts + same actions across modalities).
- **Provenance API:** `assertProvenance(utterance, state, consent)` and `verifyOutOfBand(actor, challenge)`.
- **Moderation API:** `triage(utterance) → {labels, confidence}` (advisory) → `humanReview(case)` → `discloseAction(actor, reason, appealPath)`.
- **Gateway API:** channel adapters (IVR, USSD, SMS, WhatsApp, app) that all read/write the same canonical objects — a channel is just another projection + input path.
- **Interoperability:** design objects to map to **ActivityPub** Activity Streams 2.0 where possible, so federation remains an option (decision pending, §13).

---

## 9. Security, Privacy & Trust Engineering Requirements (Concrete)

1. **Data minimization:** default to not persisting raw audio; store derived structured content. If voiceprints/embeddings are created, treat them as **special-category biometric data**.
2. **Biometric legal compliance:** voiceprints are explicitly biometric identifiers under **Illinois BIPA** (the only U.S. biometric law with a private right of action; statutory damages $1,000/$5,000 per violation) and a **GDPR Article 9 special category** requiring explicit consent. Also account for Texas CUBI, Washington, and the EU AI Act. *Requirement:* explicit opt-in consent before creating any voiceprint; allow full disable of speaker-ID/voice-embedding creation; published retention schedule; deletion rights; DPIA before deployment.
3. **Encryption:** TLS in transit; encrypt biometric templates at rest; consider E2EE for private rooms (LiveKit Insertable Streams) — noting E2EE precludes server-side recording/AI on that stream.
4. **On-device processing** preferred for camera/voice where feasible (FIDO2/passkey pattern: templates never leave device).
5. **Observation-resistant auth:** OneButtonPIN-style haptic entry; passkeys/WebAuthn with accessible flows and multi-path recovery.
6. **Provenance & consent ledger:** per-utterance provenance state; consent records for every voice processed.
7. **Audio screen-curtain & private-audio paths** enforced in public contexts.
8. **Camera bystander/document detection** before capture/description.
9. **Anti-impersonation** layered defense: verified voice + provenance + advisory detection + out-of-band safe word.

---

## 10. Moderation & Governance Operations

- **Pipeline:** language-ID → ASR (confidence-scored) → classifier triage → **human review with full audio + transcript + user history** → decision. Transcription/classification never auto-punish for nuanced categories (tone/sarcasm/dialect).
- **Reviewer interface:** audio playback with waveforms, low-confidence words flagged, plain-language model rationale, quick actions; QA sampling (a share of decisions silently re-reviewed) to catch drift/bias; target review times kept short with escalation on reviewer disagreement.
- **No silent shadowbanning:** every action disclosed to the user with the triggering reason.
- **Appeals:** easy to file; show what triggered the action; routed to **different reviewers**; successful appeals become training data.
- **Community juries:** panels of users adjudicate contestable/borderline cases.
- **Transparency reports:** periodic public reporting incl. dialect/language fairness metrics.
- **Retention:** log decisions and policy violations, not full transcripts; defined expiry (a common pattern is 90-day auto-expiry).

---

## 11. Staged Build Plan with Falsifiable Gates

**Stage 0 — Commit to the spine; prove lossless multi-sensory parity.**
- Deliverable: canonical object model + projection layer for ONE object type across speech, non-speech audio, braille, haptic, low-vision visual, and IVR.
- **Gate:** automated parity conformance passes (same facts + actions across all projections). *If it fails, stop and redesign.*

**Stage 1 — Validate the riskiest bets before building broadly (all Gated).**
- **Experiment A:** RCT of finite-digest vs infinite-scroll on well-being for BLV users. *Gate:* finite design must not be worse on well-being and should show benefit.
- **Experiment B:** earcon/spearcon **social-vocabulary learnability** study. *Gate:* users learn and retain the core vocabulary to a target accuracy.
- **Experiment C:** audio **"glanceability" layer** usability. *Gate:* users gain awareness from non-speech audio without added fatigue.
- *Features dependent on these (glanceability layer, social earcon vocabulary, finite-digest as the core feed) do not go to broad build until gates pass.*

**Stage 2 — Build the inclusion + safety floor (before growth features).**
- Braille + low-vision + audio parity in production; IVR/USSD/SMS gateway; core anti-impersonation (provenance ledger, verified voice, safe-word verification); observation-resistant auth; minimal-retention privacy; transparent moderation with appeals.
- **Gate:** a feature-phone user can perform core actions; a deafblind user can perform core actions with braille+haptics; observation-resistant auth resists a shoulder-surfer test; every enforcement action is disclosed and appealable.

**Stage 3 — Governance + monetization.**
- Community juries; creator memberships/tips; accessibility-as-a-service marketplace; transparency reporting cadence; federation decision executed (if chosen).
- **Gate:** at least one non-ad revenue path validated with real users; governance process demonstrably contestable.

**MVP vs Later vs Gated summary:** MVP = spine + voice-first + finite navigation + identity + basic rooms + AI description/summarization/translation with safeguards + transparency/appeals + core privacy. Stage 2 floor = braille/low-vision/deafblind, IVR/USSD/SMS, anti-impersonation, observation-resistant auth. Later = WhatsApp bridge, spatial presence, camera bystander detection, earcon signatures. Gated = finite-digest well-being claim, earcon social vocabulary, audio glanceability, AI companions.

---

## 12. Success Metrics & Acceptance Criteria (Well-Being-Oriented)

- **Multi-sensory rendering parity:** % of object types passing the parity conformance test = target 100% for shipped types. (Primary architectural KPI.)
- **Inclusion floor:** core-action completion rate via IVR/USSD on a feature phone; deafblind core-action completion via braille+haptics; low-vision WCAG 2.2 AA conformance.
- **Anti-impersonation efficacy:** % of utterances with a provenance state; safe-word verification availability; time-to-flag suspected impersonation; (advisory) detector performance tracked but not sole gate.
- **Moderation fairness/contestability:** appeal availability = 100% of actions; appeal overturn rate by dialect/language/region (monitored for disparity); % actions disclosed with reason = 100%; zero silent shadowbans.
- **Well-being (NOT engagement):** user-reported connection quality and loneliness measures over time; reciprocity/help-transaction completion; explicit stopping-point usage. **Do not** use time-on-app, session count, or DAU as primary success KPIs.

---

## 13. Honest Risks, Open Problems & Decisions Required

**Unproven / conjectural (must pass Stage 1 before broad build):**
- That finite digests beat infinite scroll on well-being for this population.
- That a learnable earcon/spearcon **social** vocabulary can carry structural load at scale.
- That an audio "glanceability" layer improves awareness without adding fatigue.
- That AI companions can be offered without harmful dependency.

**Genuinely unresolved:**
- **Business model / funding.** No ad-based model is likely to close for this market. Base case: cooperative / nonprofit / public-benefit / philanthropic / subscription / creator-fee / accessibility-as-a-service. This is a leadership decision, not an engineering default.
- **Ghettoization vs federation.** A blind-first network risks isolating users from mainstream social graphs. **ActivityPub** federation preserves interoperability (a Mastodon-style network where users on different servers interact) but complicates moderation, provenance, and network effects — the Fediverse shows both centralization tendencies within instances and social-graph fragmentation across incompatible protocols (ActivityPub vs Nostr vs AT Protocol). Decide deliberately.

**Known technical limits to state plainly:**
- Synthetic-voice detection does **not** generalize to unseen attacks (ASVspoof 5 baselines hit EER > 29%); provenance and out-of-band verification are the real backbone.
- ASR is biased against minority dialects/multilingual speakers — hence human-in-the-loop.
- On-device VLMs trade accuracy for privacy; all AI description can confabulate, more so on longer/detailed descriptions — hence uncertainty disclosure + verify affordances.
- Refreshable braille hardware is expensive ($2,000–$8,000 typical) and not universally owned — braille must never be the sole path.
- Low-resource-language TTS/ASR has real coverage gaps (e.g., MMS-TTS excludes Pashto) — plan fallbacks and honest per-language coverage.

**Decisions required before/at kickoff (checklist):**
1. **Funding model** to pursue (co-op / nonprofit / subscription / creator-fee / hybrid)?
2. **Federation:** standalone vs ActivityPub-federated (and moderation implications)?
3. **Biometric posture:** do we ever create voiceprints? If yes, jurisdictions, consent UX, retention, and BIPA/GDPR compliance plan.
4. **Priority languages/markets** for Stage 2 (drives TTS/ASR investment and IVR/USSD aggregator choice).
5. **Managed vs self-hosted** real-time audio at launch (LiveKit Cloud vs self-host / mediasoup / Janus).
6. **On-device vs cloud AI default** and the disclosure UX when images leave the device.
7. **Recording/E2EE policy** for rooms (E2EE precludes server-side moderation/AI on that stream).
8. **Governance charter:** how community juries are constituted and bounded.

---

## 14. Appendix

### 14.1 Glossary
- **Sensory-neutral spine:** the canonical, modality-independent content/interaction model.
- **Projection:** a rendering of a canonical object into one modality (speech, braille, haptic, etc.).
- **Earcon:** abstract musical sound representing an event/object.
- **Auditory icon:** real-world/ecological sound with a metaphoric relation to its referent.
- **Spearcon:** time-compressed speech cue.
- **HRTF/binaural:** head-related transfer function; spatializes mono sources for headphones.
- **SSML:** Speech Synthesis Markup Language (W3C); controls rate/pitch/emphasis/pauses/voice.
- **SFU:** Selective Forwarding Unit; forwards media without re-encoding for scalable rooms.
- **USSD:** session-based feature-phone protocol (`*123#`), no internet required.
- **IVR:** interactive voice response over PSTN.
- **Opus:** open royalty-free audio codec (RFC 6716), efficient at low bitrates.
- **C2PA / Content Credentials:** signed content-provenance standard (ISO); supports audio.
- **OneButtonPIN:** haptic, observation-resistant PIN entry for BLV users.
- **WebAuthn/passkeys:** FIDO2 public-key authentication.
- **BIPA / GDPR Art. 9:** biometric-data legal regimes (voiceprints are covered).
- **ActivityPub:** W3C federation protocol (the Fediverse).
- **ASVspoof:** the standard anti-spoofing/deepfake-speech detection challenge series; EER is its error metric.
- **Deafblind mode:** braille + haptic interaction with no audio reliance.

### 14.2 Requirement → Research-Basis Mapping
- Sensory-neutral spine, parity contract (§4, §11 Stage 0) → sensory-neutral spine thesis.
- Voice-first-not-voice-only, verbosity/rate, non-speech audio (§5.1–5.2, §7) → speech is serial/fatiguing; earcons/spearcons carry structure (Walker et al. 2013).
- Finite episodes / anti-addiction (§5.3, §5.7) → reject infinite scroll; loneliness-risk duty of care (Dunlop et al. 2025; Brunes et al. 2019).
- Interdependence/help features (§5.4, §5.8) → interdependence-by-design.
- Voice provenance, verified voice, safe word (§5.6, §9) → VALL-E 3-second clone; anti-impersonation core; ASVspoof 5 generalization failure.
- IVR/USSD/SMS/WhatsApp, Opus, offline (§5.11, §6) → 89% in LMICs (Orbis/WHO); offline-first mandatory.
- Transparent contestable moderation, community juries (§5.9, §10) → ASR dialect bias (Harris et al., EMNLP 2024); shadowban harms.
- Braille/low-vision/deafblind/haptics (§5.10, §7) → accessibility beyond screen readers; braille cost barriers.
- AI with uncertainty/verify, on-device vs cloud (§5.12) → confabulation safeguards (CHAIR/MMHal-Bench); Be My AI precedent.
- BLV privacy, OneButtonPIN, screen-curtain (§5.13, §9) → distinct BLV threat model (Watson et al. 2022).
- Identity without images, reputation via vouching (§5.4) → identity without images.
- Business model open; federation question (§13) → honest open problems.
- Staged build with falsifiable gates (§11) → recommended staged plan.
