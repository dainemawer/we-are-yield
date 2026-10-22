# 0004 — Lenis for smooth wheel scrolling

**Status:** accepted (2026-10-22)

**Context.** The design hand-rolls wheel hijacking (`preventDefault` on wheel +
a lerp loop at 0.085). That breaks trackpad momentum feel, nested scrollers
and some accessibility tooling.

**Decision.** Use Lenis (`lerp: 0.085` to match the design's feel), enabled only
for fine pointers without reduced motion; touch stays native. Dynamically
imported after hydration (not on the critical path). Stopped while the loader
or drawer holds a scroll lock; `<dialog>` is excluded via `prevent`.

**Consequences.** +~4KB gz, loaded lazily. Anchor scrolling goes through
`scrollToElement()` in `lib/motion.ts` so it uses Lenis when active.
