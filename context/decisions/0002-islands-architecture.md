# 0002 — Server-rendered sections, motion as islands

**Status:** accepted (2026-10-22)

**Context.** The design is motion-heavy (reveals on scroll, parallax, ink fill,
hover wipes, cursor, loader, drawer). Making every section a client component
would ship and hydrate the whole page for what is mostly static content.

**Decision.** Every section is a Server Component. Motion is declared in markup
with `data-*` attributes (`data-reveal`, `data-line`, `data-hero`,
`data-fill`, …). Four client islands enhance it:

- `MotionRuntime` — one IntersectionObserver for reveals, one rAF-coalesced
  scroll handler (header, parallax, fill) gated by visibility, anchors, Lenis.
- `Loader`, `Cursor`, `ContactDrawer`.

They coordinate through `src/lib/motion.ts` (module state, no re-renders).
Hover effects (row wipes, link gaps) are pure CSS.

Pre-states (hidden/offset before animating) are applied by CSS under
`:root[data-js]`, set by an inline `<head>` script before first paint. Without
JS, everything renders final. An 8s failsafe reveals content if the runtime
never boots.

**Consequences.** `/` prerenders fully static. New animated elements need: a
`data-*` hook, a pre-state in `globals.css`, and handling in `MotionRuntime`.
