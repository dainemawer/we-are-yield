# 0005 — WAAPI + JS scroll math over CSS scroll-driven animations

**Status:** accepted (2026-10-22)

**Context.** CSS scroll-driven animations (`animation-timeline: view()`) were
approved as an option for parallax and the mission ink-fill.

**Decision.** Keep the design's exact formulas in JS for now:

- Their progress curves (e.g. fill `(0.85vh − top) / (h + 0.35vh)`, the
  cubic-eased clip-open) don't map cleanly onto `view()` ranges, and Safari
  support would need a JS fallback anyway — two code paths for one effect.
- Work is cheap: one passive scroll listener, coalesced to one rAF, and only
  for elements an IntersectionObserver reports as near the viewport.

Time-based reveals use WAAPI (the design's own approach): compositor-friendly,
no library.

**Consequences.** If profiling ever shows scroll jank, the parallax image
transform is the first candidate to move to `view()`.
