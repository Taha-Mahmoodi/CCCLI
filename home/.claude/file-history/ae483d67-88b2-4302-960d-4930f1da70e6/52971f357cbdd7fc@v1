# Third Eye World — Monorepo

Voice-first, **blind-first** social network for blind and low-vision people. Nonprofit, free, open-source, no ads. The problem it targets is **loneliness, not engagement** — the headline metric is a validated loneliness scale, not time-on-app.

Every post and comment is a short voice memo; the timeline plays memos sequentially like radio; the whole interaction set is like / comment / skip. No follow graph, no ranking algorithm, no vanity counts, no infinite scroll — the stream ends.

## Source of truth

The build specification (v2.0) governs every decision here:
https://github.com/sadeqisaidmohaddes-star/third-eye-world-paper

If a ticket starts from "the screen shows…" and works backward to audio, it is rejected. Build from sound first.

## The ten non-negotiables

Acceptance criteria, not aspirations — a feature violating one does not ship:

1. Audio is the medium, not a fallback.
2. Voice-first, never voice-only.
3. The stream ends.
4. No engagement machinery.
5. Every action has three routes (media controls, voice, screen-reader menu).
6. No timed or precise gestures.
7. Voice is biometric data.
8. Moderation is visible and appealable.
9. Reachable without a smartphone.
10. Blind people govern it.

## Layout

Delivery order per the spec is **web first, then native iOS and Android** (private messaging ships with the phone apps).

```
apps/
  web/        Next.js web app
  ios/        native iOS app (E2EE DMs)
  android/    native Android app (E2EE DMs)
services/
  api/        backend + speech infrastructure
packages/
  shared/     types, protocol, shared logic
```

Directories are added as each surface is built — nothing is scaffolded ahead of need.
