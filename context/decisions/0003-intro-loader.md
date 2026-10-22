# 0003 — Intro loader policy and LCP

**Status:** accepted (2026-10-22)

**Context.** The design's "Cinematic" loader holds the page for ~4.8s on every
load. That's a great first impression and a poor tenth one, and naïvely it
would delay LCP by ~5s. Daine left the call to us ("whatever is best for
performance and UX").

**Decision.**

- First ever visit → full (Cinematic) loader.
- Returning visitor, new session → the design's "Quick" pace (×0.55, ~2.6s).
- Same session, deep link (`/#…`), or `prefers-reduced-motion` → no loader.
- State in `sessionStorage` + `localStorage` key `yield:intro`, read by the
  inline IntroScript before paint, so the right mode applies with no flash.
- The loader is server-rendered (hidden by CSS unless selected) so it covers
  the page from the first frame.
- The hero headline paints in its final position _beneath_ the curtain; the
  loader tucks it away (WAAPI pre-state) before lifting and replaying it. LCP
  is therefore recorded at first paint (~0.4s locally observed), not after
  the curtain.

**Consequences.** Lighthouse runs with clean storage, so it always measures the
full loader. Timings in `loader.tsx` mirror the design exactly.
