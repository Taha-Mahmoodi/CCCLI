# Third Eye World: A Blind-First, Voice-First Social Platform — Build Specification (v2.0)

**Author:** Said Mohaddes Sadeqi
**Affiliation:** Third Eye Worldwide
**Date:** July 2026
**Status:** Approved for build. This specification supersedes all earlier drafts, including the v1.0 Engineering Build Instruction Package previously published in this repository. All major decisions are settled unless explicitly marked open in §13.2.

## Abstract

- **Third Eye World is a voice-first social network for blind and low-vision (BLV) people, built blind-first rather than retrofitted from a visual product.** Every post and comment is a voice memo; the timeline plays memos sequentially, like radio; the interaction set is deliberately narrow (like, comment, skip). It ships as a nonprofit, free and open-source, with no advertising.
- **The problem this platform targets is loneliness, not engagement.** Vision impairment is associated with elevated social isolation — in a probability sample of 736 Norwegian adults with visual impairment, roughly half reported at least moderate loneliness (Brunes et al., 2019). Accordingly, the headline success metric is a validated loneliness instrument (the UCLA Loneliness Scale), not time-on-app.
- **Ten non-negotiable principles gate every feature decision** (§2): audio as medium rather than fallback, voice-first-not-voice-only, a stream that ends, no engagement machinery, triple-redundant action affordances, no timed/precise gestures, voice treated as biometric data, visible and appealable moderation, reachability without a smartphone, and blind governance of curation and moderation.
- **Two contested design decisions are recorded with their dissent rather than presented as unanimous:** the platform does not support sign-language video, instead treating text memos as first-class and read aloud by synthetic voice for the DeafBlind community (§3.3); and a later reversal of an earlier control-scheme recommendation replaces volume-button and tap-based controls, which are unreliable or against platform policy, with a redundant scheme of media-transport controls, voice commands, and screen-reader custom actions (§4).
- **The specification covers the full build surface**: interaction and control design, a Next.js web application and native iOS/Android apps, end-to-end encrypted direct messaging deferred to the native apps, backend and speech infrastructure, moderation, accessibility/privacy/legal compliance (including an honest WCAG 2.2 conformance claim that stops short of full AAA), a beta programme with explicit go/no-go gates, and a 9–12 month delivery timeline.
- **The business model, community sequencing, and long-term stewardship structure remain open decisions** for leadership (§13.2); everything else in this document is settled.

---

## 1. Introduction

### 1.1 Purpose and how to read this specification

This document is the single source of truth for building Third Eye World. Sections 1–2 establish what is being built and why. Sections 3–11 are the technical specification and should be built from directly. Sections 12–13 cover the beta programme, delivery timeline, and the decisions leadership still has to make.

Every decision recorded here came out of a multidisciplinary committee that included blind and low-vision people as core decision-makers, not advisors. Where a decision was contested, the dissent is recorded so it is clear it was argued, not assumed. **One rule governs every ticket:** if it starts from "the screen shows…" and works backward to audio, it is rejected. The platform is built from sound first.

### 1.2 The product

Third Eye World is a voice-first social network for blind and low-vision people. It is **blind-first, not blind-only** — sighted people are welcome, but they adapt to the interface, not the other way round.

The core loop: every post is a short voice memo (90-second soft cap, 3-minute hard cap); every comment is a voice memo; the timeline plays memos one after another, like radio; a user can like, comment, or skip, and that is the entire interaction set.

Deliberately absent: a follow graph, a ranking or recommendation algorithm, follower/like/view counts, images or video, and infinite scroll — the stream has an end.

Delivery order is web app first, then native iOS and Android; private messages ship with the phone apps, not the website (§7). The organisation is a nonprofit: free, open-source, no advertising.

### 1.3 Why it exists

Mainstream social media was built for sighted browsing and retrofitted for everyone else. Blind users carry the cost — describing images, navigating screen readers through visual layouts, and performing unpaid accessibility labour for sighted creators.

The deeper problem is loneliness. Vision impairment is strongly associated with social isolation: in a probability sample of 736 Norwegian adults with visual impairment, loneliness was more prevalent among those severely sight-impaired, with roughly half reporting at least moderate loneliness — well above general-population rates (Brunes et al., 2019). **That is the problem this product exists to address. Not engagement. Not growth. Loneliness.** Consequently, success is not measured in time-on-app; the headline metric is a validated loneliness scale (§12).

## 2. Non-Negotiable Design Principles

These are acceptance criteria, not aspirations. A feature that violates one of them does not ship.

1. **Audio is the medium, not a fallback.** Sound comes first; text and visuals are projections of it.
2. **Voice-first, never voice-only.** Speech is slow, serial, public, and tiring. Structure, status, and identity must also be conveyable by non-speech sound and by touch.
3. **The stream ends.** No infinite scroll, no endless autoplay. Every session reaches a natural stopping point.
4. **No engagement machinery.** No streaks, no variable rewards, no manufactured notifications, no vanity counts, no dark patterns of any kind.
5. **Every action has three routes.** Anything a user can do must be reachable by media controls, by voice, and by the screen reader's own menu. Nothing may live on a single gesture.
6. **No timed or precise gestures.** No triple-tap, no press-and-hold. Nerve damage from diabetes is common in this population, and such gestures exclude people.
7. **Voice is biometric data.** Every recording is treated as sensitive personal data. What is kept is minimised, and voice is never used as an authentication factor.
8. **Moderation is visible and appealable.** No silent shadowbanning. Every enforcement action is disclosed with a reason and a route to appeal.
9. **Reachable without a smartphone.** The product must work for someone on a basic phone with no data plan.
10. **Blind people govern it.** Curation and moderation leadership is majority-blind by rule.

## 3. Scope: What Is Built, and What Is Refused

### 3.1 Beta scope

| Area | Included |
|---|---|
| Posting | Record a voice memo; post a typed text memo (read aloud by synthetic voice) |
| Listening | Continuous audio timeline; skip, replay, pause |
| Interaction | Like; voice comment |
| Discovery | Channels/stations, community DJs, chronological order, shuffle, transcript search |
| Transcripts | Auto-generated for every memo, on by default, correctable by the author |
| Onboarding | Fully spoken, in the user's first language, teaches community norms |
| Identity | Handle, spoken self-description, voluntary tenure/role labels |
| Safety | Block, mute, report — each reachable in one step without sight |
| Messages | 1:1 voice DMs — phone apps only, not the website |
| Reach | IVR dial-in path for basic phones |

### 3.2 Explicitly refused

| Not building | Rationale |
|---|---|
| Infinite scroll | Well-being; the population is already at loneliness risk |
| Ranking algorithm | Nothing to rank at beta scale; it is the engine of compulsion at large scale |
| Follower/like/view counts | Vanity metrics harm creators and distort community |
| Images and video | Eliminates description labour; it is the entire point |
| Sign-language video | See §3.3 |
| Live audio rooms | Killed Clubhouse's retention; unmoderatable in real time |
| Group DMs (at beta) | Abuse surface too large for launch |
| Advertising | No ad model closes for this audience, and it would corrupt the mission |
| Voice as a login factor | A voice can be cloned from three seconds of audio |
| Volume-button controls | Prohibited by Apple; unreliable on Android (see §4) |
| Press-and-hold to record | Excludes users with nerve damage |
| AI companions | Documented dependency harms in isolated populations |

### 3.3 Sign language: the decision and its dissent

The platform does not support sign-language video. This was argued at length and decided against: sign languages are visual, and supporting them means adding video, which breaks three prior commitments — no video, low-bandwidth access for the Global South, and the audio-only identity of the product.

The committee did not stop at "no." The group the platform can genuinely serve is the DeafBlind community, who do not use video either — they read with refreshable braille displays. Consequently: text memos are first-class, so a DeafBlind user can post and reply in text, read everything on a braille display, and have their text memos read aloud into the audio stream by synthetic voice so blind users still hear them. No signing avatars are used, following the World Federation of the Deaf and WASLI's public opposition to avatars replacing human interpreters. The website carries an honest, publicly visible explanation of why there is no sign-language video, written with Deaf and DeafBlind advisors, with links to Deaf platforms that support signing properly.

**Recorded dissent:** for many culturally Deaf people, written text is a second language; text is not equivalent to signing, and the platform should not claim it is. This dissent stands in the public explanation.

## 4. Interaction and Control Scheme

This section reverses an earlier recommendation.

**What does not work.** Volume buttons are excluded: App Store Review Guideline 2.5.9 states that apps altering or disabling standard switches such as Volume Up/Down are rejected, and Apple has pulled apps for this; on Android, intercepting volume keys is inconsistent across manufacturers and OS versions and is user-hostile besides. Back Tap and Quick Tap are excluded as primary controls — they only launch system shortcuts, misfire with thick cases and imprecise taps, and offer no haptic confirmation; they may be offered as an optional convenience, but nothing critical depends on them. Custom whole-screen taps are excluded by default, since VoiceOver and TalkBack intercept single, double, and triple taps before the app ever sees them.

**What is actually built — four primary controls, always available:**

1. **Media transport controls.** Headphones and AirPods (double-press = next, triple-press = previous), lock screen, Control Center, notification shade. This is the true eyes-free surface — it works in a pocket. iOS: `MPRemoteCommandCenter` + `MPNowPlayingInfoCenter`. Android: `MediaSession` + `MediaStyle` notification. Web: Media Session API (`navigator.mediaSession.setActionHandler`).
2. **Voice commands.** "Next," "like," "comment," "replay," "record."
3. **Screen-reader custom actions.** Exposed through the VoiceOver Actions rotor and TalkBack custom actions — the screen-reader-native controls, which never conflict. iOS: `UIAccessibilityCustomAction`. Android: `AccessibilityNodeInfo.AccessibilityAction` / Compose `Modifier.semantics { customActions = ... }`.
4. **On-screen buttons.** Plain, large, correctly labelled; target size minimum 44×44 points.

**Optional "radio mode," opt-in only:** a user may switch on a mode where the whole screen becomes a tap surface — one tap = next, two taps = like — which requires silencing the screen reader on that surface (iOS: `accessibilityDirectTouchOptions` with `.silentOnTouch`, with `.requiresActivation` considered to prevent accidental triggers). This mode must be easy to enter and leave and must never be the default; it deliberately breaks normal screen-reader navigation on that surface, which is why it is scoped and opt-in.

**Recording** uses a start/stop toggle button — one press to start, one to stop — with spoken level feedback, never a hold, and is also available by voice command and rotor action.

## 5. Web Application

### 5.1 Architecture

The stack is **React + Next.js (App Router), server-rendered, delivered as a PWA**, chosen for the depth of audited accessible component libraries (React Aria, Radix) and the size of the talent pool. Svelte and Astro would give better default screen-reader behaviour but lost on ecosystem and hiring; that dissent is recorded.

The single most important fix is route announcements: single-page apps do not announce navigation to screen readers, so every route change must (1) move focus to the new view's `<h1>` (`tabindex="-1"` then `.focus()`) and (2) update a visually hidden `aria-live="polite"` region with "Navigated to {page title}." Both are required — focus alone is unreliable in NVDA+Firefox and VoiceOver+Safari.

Other hard rules: `role="application"` is never used, since it disables the screen reader's browse mode and destroys heading and landmark navigation; the audio player is a persistent region rendered outside the routed view tree so playback survives navigation; track changes are announced with `aria-live="polite"`, never `assertive`, and debounced so rapid skipping does not flood the screen reader.

### 5.2 Recording in the browser

Recording uses `getUserMedia` + `MediaRecorder`, supported in Chrome, Firefox, Edge, and Safari 14.1+ (macOS) / 14.5+ (iOS). Codec handling must not be hardcoded: Chromium writes `audio/webm;codecs=opus`, Safari writes `audio/mp4` (AAC) only and cannot write WebM. The implementation feature-detects with `MediaRecorder.isTypeSupported()`, tries in order `['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/wav']`, and reads back the actual `mediaRecorder.mimeType`; the transcoding pipeline accepts both. Chunks are streamed with `mediaRecorder.start(1000)` rather than buffering the whole recording, since iOS Safari otherwise runs into memory pressure. Where MediaRecorder is unavailable, the fallback is `<input type="file" accept="audio/*" capture>`, plus the IVR path.

### 5.3 Playback

`<audio>` elements handle transport; the next memo preloads on a second hidden element and swaps on `ended` for gapless radio. Browsers block audio until a user gesture — the user presses Play once, after which subsequent programmatic `.play()` calls in that session are permitted, and audio is never auto-started on page load. The Media Session API drives lock-screen and hardware-key control. Background playback in mobile browsers is unreliable, especially in iOS Safari, which is a primary reason the native apps exist.

### 5.4 Offline and installability

The service worker caches the app shell cache-first and audio network-first with a small LRU cache, kept deliberately small since iOS Safari caps the service worker cache around 50 MB and evicts aggressively. Recorded memos queue in IndexedDB and upload when connectivity returns, with the queue state surfaced accessibly ("One memo waiting to upload"). Web Push works on iOS 16.4+ only if the PWA is installed to the Home Screen, with delivery roughly 70–85% on iOS versus 90–95% on Android, so email or SMS fallback is always provided. Background sync is not supported on iOS, so queues flush on foreground.

### 5.5 Authentication

Authentication uses passkeys (WebAuthn), magic email links, and phone OTP, all of equal status; a user is never trapped in a passkey-only flow, since passkey ceremonies are known to confuse screen-reader users. Recovery uses a second registered channel plus copyable recovery codes read aloud during setup with a spoken warning — no security questions, no document upload. **Voice is never an authentication factor.**

## 6. Native Mobile Applications

### 6.1 Native, not cross-platform

The apps are built **Swift/SwiftUI for iOS and Kotlin/Jetpack Compose for Android**. Flutter draws its own interface and synthesises a semantics tree, with documented gaps in custom-action announcements and screen-reader reliability; React Native maps to native APIs but does not guarantee identical behaviour across platforms. For a product where screen-reader fidelity is the product, neither is acceptable. This roughly doubles mobile engineering cost, a cost the committee accepted deliberately; the dissent from the cost seat is recorded.

### 6.2 iOS

Full `UIAccessibility` labelling (label, value, trait, hint) on every control; `UIAccessibilityCustomAction` in the Actions rotor for like, comment, skip, replay, report, block, and mute; `AVAudioSession` category `.playback` (or `.playAndRecord` while recording), mode `.spokenAudio`; background audio mode enabled; `MPRemoteCommandCenter` for play, pause, next, previous, and skip forward/back; App Intents for Siri and Shortcuts ("Play my Third Eye World radio," "Record a memo"); compliance with Review Guideline 2.5.9, with microphone usage strings and privacy labels including audio declared.

### 6.3 Android

Full TalkBack labelling and custom actions; **Media3 `MediaSessionService`**, which auto-creates the required notification. On Android 14+, the foreground service declares `android:foregroundServiceType="mediaPlayback"` and requests both `FOREGROUND_SERVICE` and `FOREGROUND_SERVICE_MEDIA_PLAYBACK`; `ServiceCompat.startForeground(...)` must be called with `FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK` within 10 seconds of `startForegroundService()` or the app crashes, and the type must be declared on the Play Console App Content page. Testing spans Pixel, Samsung, and Xiaomi, since TalkBack gesture behaviour differs by manufacturer.

### 6.4 Audio ducking

Getting this wrong makes the app unusable — two voices talking at once is the single fastest way to make a blind user quit. On iOS, VoiceOver ducks audio automatically while it speaks, so the app must not implement its own ducking for VoiceOver; mode `.spokenAudio` causes the system to treat memos as speech and prefer pausing over ducking. On Android, the player is tagged with `AudioAttributes.CONTENT_TYPE_SPEECH`; the system then sends `AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK`, and `AudioFocusRequest.Builder.setWillPauseWhenDucked(true)` is set so the memo pauses rather than being talked over, with TalkBack detected via `AccessibilityManager.isTouchExplorationEnabled()` to time the app's own announcements.

### 6.5 Notifications

Notifications are relational only — "Someone replied to your memo," "A new memo in a channel you joined," "Your message request was accepted" — and never streaks, "you haven't opened the app in…" prompts, engagement bait, or badge counts tied to vanity metrics. They are batched, user-controllable, and quiet-hours aware.

## 7. Private Messaging

Direct messages ship with the phone apps, not on the website. Browser key storage is fundamentally weaker — no hardware-backed keystore, and IndexedDB is exposed to cross-site scripting — and Signal's browser library is archived and unmaintained. The phone apps have Keychain/Secure Enclave and Android Keystore, and libsignal is first-class there. The web app instead shows "Direct messages are available in the Third Eye World mobile app" and still lets users manage blocks and message requests.

| Element | Rule |
|---|---|
| Who can message | Nobody uncontrolled. A stranger may send one short memo into a request queue, with no notification; a thread opens only on acceptance. |
| Encryption | End-to-end by default (libsignal). Keys in Keychain/Secure Enclave and Android Keystore. |
| Metadata | Minimised, sealed-sender style. The social graph or contact lists are not retained. |
| Abuse reporting | Message franking — the recipient can cryptographically prove a reported memo is authentic without the platform having standing access to anyone's messages. |
| Crypto warning | A committing AEAD / encryptment scheme is used. AES-GCM is not used for franking — the "invisible salamanders" attack broke exactly this construction in a major product (Grubbs, Lu & Ristenpart, 2017). |
| Scanning | No client-side scanning, ever. |
| Retention | Ephemeral server-side. The only audio retained is what a user reports. |
| Rate limits | Tight caps on outbound requests for new accounts; suspected bad actors are silently shadow-queued. |
| Minors | Can only be messaged by existing connections. Age assurance is on-device attestation, never document upload. |
| Safety actions | Block, report, mute — each a first-class rotor action, media-control action, and voice command, one step, no sight required. |
| Scam protection | A spoken interstitial on first contact from a stranger: "This person is not in your communities. Never send money or share codes." Plus on-device detection of money and urgency language. |
| Group DMs | Deferred past beta. |

The scam-protection requirement is not hypothetical: confidence and romance scams disproportionately target isolated, elderly, and disabled people — the FBI's complaint centre logged over 19,000 romance-scam complaints in a single year with losses near $740 million, and Australian regulators recorded a 71% year-on-year rise in losses reported by people with disability. A voice channel manufactures intimacy faster than text.

**Recorded dissent:** the child-safety seat holds that refusing content scanning makes some abuse harder to detect proactively. The committee accepted behavioural and metadata detection but held the line against content scanning, consistent with the security-research consensus.

## 8. Backend and Infrastructure

### 8.1 Storage and delivery

Audio is stored in S3-compatible object storage, encrypted at rest, preferring a zero-egress CDN (Cloudflare R2 or equivalent), since egress is the dominant cost. Uploads are transcoded to Opus, mono, 16–24 kbps — sufficient for intelligible voice — while the original is kept for provenance, alongside a low-bitrate variant for constrained networks. At beta scale, a 90-second memo at 20 kbps is roughly 225 KB; five thousand users posting twice daily is around 68 GB of new audio a month, so storage is trivial and egress is near zero on the right CDN. Transcription is the real variable cost.

### 8.2 Data model (sketch)

```
users(id, handle, first_language, tenure_label, role, age_band, created_at)
memos(id, author_id, channel_id, audio_key, mime, duration_ms,
      is_tts, source_text, lang_id, created_at)
transcripts(id, memo_id, text, lang, engine, confidence,
            is_machine, corrected_text, created_at)
comments(id, memo_id, author_id, audio_key, transcript_id, created_at)
channels(id, name, description, dj_ids[], is_curated)
likes(memo_id, user_id, created_at)
reports(id, target_type, target_id, reporter_id, franking_proof,
        status, sla_due_at, created_at)
moderation_decisions(id, target_type, target_id, moderator_id,
                     action, rationale_code, created_at)
```

There is no follows table — there is no follow graph. Likes are per-user state only, so a user can find what they liked; they are never aggregated, counted, or displayed as a number. `moderation_decisions` logs decisions, not content: rationale codes, not message text.

### 8.3 Transcription

Transcription self-hosts **Whisper large-v3** (via faster-whisper on a GPU worker; whisper.cpp for cheap batch work), with cloud ASR only as a per-language fallback under a data-processing agreement with no-training and no-retention terms, given that voice is biometric data in transit. At beta volumes, self-hosting is materially cheaper than per-minute cloud pricing and keeps voices under the platform's control.

Language identification runs before ASR as a mandatory step: automatic speech recognition is measurably biased, with a five-system study across Amazon, Apple, Google, IBM, and Microsoft finding an average word error rate of 0.35 for Black speakers against 0.19 for white speakers (Koenecke et al., 2020). Routing everything through one English model would systematically mis-transcribe the users the platform most needs to serve.

Transcripts are always generated, on by default in the interface, and permanently labelled "machine transcript — may contain errors," with a one-step global toggle to turn display off. "Suggest a correction" writes to `corrected_text` and never overwrites the machine output, and a user is never penalised on the basis of a raw machine transcript alone — a human listens to the audio first.

### 8.4 Text-to-speech

**Piper** is the default text-to-speech engine (open source, 35+ languages, runs at the edge), with cloud neural TTS used per-language where Piper lacks coverage. Coqui XTTS is avoided in production, since its weights ship under a non-commercial licence and the company has shut down. Only generic voices are used — user voices are never cloned. TTS-rendered text memos are announced in the stream as "Text memo, read by synthetic voice."

### 8.5 API shape

The API surface is small, with cursor pagination and no ranking:

```
POST /memos
GET  /timeline?channel=&cursor=&shuffle=
POST /memos/:id/like
POST /memos/:id/comments
GET  /search?q=
POST /reports
```

Rate limits are token-bucket, per user and per IP, stricter for new accounts.

## 9. Moderation and Safety

The moderator console must itself be fully accessible, since the platform's moderators are blind — same WCAG standard as the product, keyboard- and screen-reader-complete, with audio review by buttons and shortcuts rather than drag-only scrubbing. Moderation is tiered: automated triage flags, humans decide, and machine transcripts assist but never determine outcomes. New accounts have reduced reach until established, both a safety measure and a way to keep review volume within human capacity. DM reports get a faster review SLA than public content. There is no silent shadowbanning — every action is disclosed with a reason and an appeal route, and appeals go to a different reviewer than the original decision. Community juries handle contested borderline cases. Transparency reports include moderation outcomes broken down by language and dialect, to detect the platform's own bias. Curation and moderation leadership is majority-blind as a governance rule, not a preference.

## 10. Accessibility, Privacy, and Legal Compliance

### 10.1 The honest accessibility claim

Full WCAG 2.2 Level AAA conformance is not claimed, and the platform will not pretend otherwise. One AAA criterion (1.2.6) requires sign-language interpretation for prerecorded audio, and the platform has deliberately decided against sign-language video (§3.3); claiming AAA regardless would be false, and a false accessibility claim is a legal exposure.

What is published:

> Third Eye World conforms to WCAG 2.2 Level AA in full, and additionally meets Level AAA criteria 1.4.6, 2.4.9, 2.4.12, 2.4.13, 2.5.5, 3.3.9, 2.2.3, and 2.3.2. Full Level AAA conformance is not claimed and, per W3C guidance, is not achievable for all content of this type — specifically 1.2.6 Sign Language, which conflicts with the deliberate design decision not to use sign-language video. Equivalent access is provided through machine transcripts, text memos rendered to speech, and refreshable braille display support.

Notably, 3.3.9 Accessible Authentication (Enhanced) — usually one of the hardest AAA criteria — is met comfortably, since passkeys and magic links involve no cognitive test. An accessibility statement with a feedback channel is published (required under the European Accessibility Act), a VPAT is produced, and accessibility overlays are not used, since they confer no compliance and the European Commission has said so.

### 10.2 Privacy and biometric law

Voice recordings are special-category biometric data under GDPR Article 9, and voiceprints are covered by Illinois BIPA. The platform requires explicit informed consent before any voice processing, given in speech as well as text and revocable; encryption at rest and in transit; documented retention and deletion, with erasure cascading to transcripts, likes, and backups; data-subject access request tooling from day one; audio watermarking for provenance, without ever treating a watermark as a deepfake detector, since detectors do not generalise to new generators; and a breach plan with 72-hour notification.

### 10.3 Threat model

| Threat | Mitigation |
|---|---|
| Account takeover | Passkeys; no voice authentication |
| Voice cloning and impersonation | No voice auth; provenance watermarking; report and appeal route |
| Corpus scraping for cloning | Authentication, rate limits, no bulk export |
| DM abuse and grooming | Consent gate, franking, fast human review, minors restricted, scam interstitials |
| Insider access to voice data | Least privilege, audit logging, breach plan |

### 10.4 Global South reach

Roughly nine in ten visually impaired people live in low- and middle-income countries; a smartphone-and-data product would exclude most of the people the platform exists to serve. The mitigation is an IVR path with missed-call callback — the user rings a number, the system calls back at no cost to them, and key presses navigate memos, a proven model in low-literacy, low-connectivity settings — combined with low-bitrate Opus, offline caching, an explicit data-saver mode showing approximate data used, and spoken onboarding in the user's first language. Beta languages are English, Spanish, Hindi, Swahili, and Arabic, chosen for population reach, Global South coverage, right-to-left support, and adequate speech technology; a West African language follows in the first post-beta wave, with IVR scripts in preparation.

## 11. Beta Programme

### 11.1 Testers

Blind and low-vision testers are recruited across several cities and countries through blind organisations, training centres, and DeafBlind organisations. The cohort includes screen-reader users across all four major readers, braille-display users, low-vision users, users with motor impairment (particularly diabetic peripheral neuropathy, the population that motivated rejecting timed gestures), and a minority of sighted testers. Testers are compensated through inclusive rails — mobile money such as M-Pesa where banking is inaccessible, plus device and data grants, with amounts kept private — and explicit, spoken, revocable consent is taken for voice and biometric processing, explaining transcription, storage, retention, and any third-party routing.

### 11.2 Testing method

Automated tools catch roughly half of accessibility issues — Deque's analysis across thousands of audits found automated testing identifies about 57% of issues by volume — so the remainder requires humans. Automated tooling includes axe-core, Lighthouse, WAVE, and Accessibility Insights, plus Accessibility Scanner on Android and Xcode Accessibility Inspector on iOS. Manual scripts run across NVDA (Firefox and Chrome), JAWS (Chrome), VoiceOver (macOS Safari and iOS), TalkBack (Android Chrome), Narrator, and Orca, with braille-display verification of transcripts, low-vision testing at 200–400% zoom, and motor testing to confirm no action requires fine timing or precision. Mobile testing is not optional, since over nine in ten screen-reader users use one on a phone.

### 11.3 Bug reporting

Bug reporting uses multiple accessible channels — an in-app voice bug report ("record a bug"), an accessible web form, email, and a phone or WhatsApp line — and never requires a screenshot. Device and screen-reader metadata are attached automatically, with consent.

### 11.4 Go/no-go gates

Wider launch does not proceed until all of the following hold: ≥90% task completion by real screen-reader users on core flows across all four readers; zero unresolved critical accessibility defects; the transcript labelling and correction loop working; moderation SLAs met, including the faster DM SLA; no unresolved P0 privacy or security findings; ≥99.5% crash-free sessions; the IVR path demonstrated in at least one Global South pilot; and the loneliness instrument administrable accessibly, with consent.

### 11.5 What is measured

The headline metric is the UCLA Loneliness Scale, administered in-app accessibly (spoken, labelled radio groups, no time pressure), opt-in with explicit consent, at onboarding and at intervals; results are private to the user and aggregated anonymously for programme evaluation. Also instrumented: onboarding completion, transcript correction rate, crash and error rates, speech latency, playback failures, and moderation SLA adherence. Never instrumented as a success measure: time-on-app, session counts, streaks, or engagement leaderboards. Analytics are privacy-preserving, cookieless, and self-hosted (Plausible or Matomo), with no third-party trackers.

## 12. Team, Timeline, and Budget

The team is roughly 10–13 people: a product lead; two web engineers (one accessibility lead); one iOS and one Android engineer, both accessibility-experienced; one backend/infrastructure engineer; one audio/ML engineer for speech; a part-time applied cryptographer for the DM work; a QA and accessibility testing lead; a community and trust-and-safety lead; and part-time DevOps, plus paid community DJs and moderators and compensated testers.

The timeline is roughly 9–12 months:

| Months | Work |
|---|---|
| 0–1 | Architecture, accessible design system, infrastructure, threat model, consent and legal |
| 2–4 | Web core: record, play, timeline, transcripts, channels, search; moderator console; self-hosted speech; five languages |
| 4–5 | Web beta by invite wave, with real screen-reader testers; loneliness baseline |
| 5–8 | Native iOS and Android; encrypted DMs |
| 8–10 | Mobile beta via TestFlight and Play closed testing; IVR pilot |
| 10–12 | Hardening, go/no-go gates, accessibility statement and VPAT, launch readiness |

Salaries dominate the budget; infrastructure is modest, in the low hundreds of dollars a month at beta scale with self-hosted speech and a zero-egress CDN, plus honoraria and device grants per the capped policy. Funding is expected from grants and disability-focused foundations, individual giving, and in-kind infrastructure, with a possible enterprise or earned-revenue leg later — no advertising. Community DJs and moderators are paid fixed monthly honoraria at roughly $25–40/hour equivalent, capped around $10,000 per person per year, never per view, since per-view creator funds have failed everywhere they have been tried.

## 13. Risks and Open Decisions

### 13.1 Two traps to avoid now

1. **Google Play.** A new personal developer account must run a closed test with at least 12 testers for 14 continuous days before production access; registering the nonprofit as an organisation developer account avoids this requirement, and should be done before any Android code is written.
2. **Audio ducking.** As described in §6.4, if the screen reader talks over the memos, the product is unusable — a small configuration detail with total consequences, to be verified in the first week of mobile work.

### 13.2 Open — leadership must decide

| Decision | Note |
|---|---|
| Which community launches first | One dense community, not a global launch — density beats breadth |
| Whether to fund a self-voicing "radio mode" engine | Larger build, better radio feel, less interoperable |
| Funding mix and lead funders | No single funder should exceed 25–30% of revenue |
| Long-term stewardship | Foundation now; cooperative ownership later? |

Everything else in this specification is settled.

## 14. Conclusion

Third Eye World's central claim is that a social platform for blind and low-vision people should be designed from an audio-first ontology rather than adapted from a visual one, and that its success should be measured against loneliness rather than engagement. The specification above commits that claim to a concrete, buildable form: a narrow interaction set, a control scheme with three redundant, screen-reader-safe routes to every action, a data model with no follow graph or vanity counts, and a beta programme gated on real accessibility outcomes rather than ship dates. The two hardest calls — refusing sign-language video while making text and braille first-class, and reversing the initial control-scheme recommendation once it conflicted with platform policy and real-world reliability — are recorded with dissent rather than smoothed over, on the view that a document a blind-led committee actually argued over is more trustworthy than one that reads as unanimous. What remains open is deliberately left to leadership rather than decided by default: which community launches first, how "radio mode" is funded, and how the organisation is governed over the long term.

## Glossary

**ASR** — automatic speech recognition; machine transcription.
**Custom actions** — extra actions a screen reader exposes through its own menu (the VoiceOver rotor, TalkBack custom actions), which do not conflict with screen-reader gestures.
**Direct Touch** — an iOS setting that lets an app receive raw taps by silencing VoiceOver on that region. Powerful, disruptive, opt-in only.
**Earcon** — a short abstract sound that conveys meaning without words.
**End-to-end encryption (E2EE)** — only sender and recipient can read a message; the server cannot.
**Franking** — cryptography that lets a recipient prove a reported message is authentic without giving the platform access to everyone's messages.
**IVR** — interactive voice response; navigating a service by phone keypad over an ordinary call.
**Opus** — an efficient open audio codec, good at low bitrates.
**PWA** — progressive web app; a website installable to the home screen with offline capability.
**Refreshable braille display** — hardware rendering text as physical braille; the primary access route for DeafBlind users.
**Rotor** — VoiceOver's control for switching navigation modes and reaching custom actions.
**WCAG 2.2** — the international web accessibility standard, at levels A, AA, and AAA.

## References

- Brunes, A., Hansen, M. B., & Heir, T. (2019). Loneliness among adults with visual impairment: prevalence, associated factors, and relationship to life satisfaction. *Health and Quality of Life Outcomes*.
- Koenecke, A., et al. (2020). Racial disparities in automated speech recognition. *Proceedings of the National Academy of Sciences*.
- Grubbs, P., Lu, J., & Ristenpart, T. (2017). Message franking via committing authenticated encryption. *CRYPTO 2017*.
- W3C Web Content Accessibility Guidelines (WCAG) 2.2.
- Apple App Store Review Guideline 2.5.9.
- EU General Data Protection Regulation, Article 9.
- Illinois Biometric Information Privacy Act (BIPA).

---

*Third Eye Worldwide · teww.org · Free, open-source technology for blind and low-vision people. Built from inside the experience.*
