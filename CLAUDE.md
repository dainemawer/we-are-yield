@AGENTS.md

# We Are Yield — marketing site

Single-page landing site for Yield, implemented from the Claude Design file
"Yield Website" with motion that matches the design 1:1. Frontend only; the
contact form posts to a Resend Server Action.

## Read first

- `context/memory.md` — current state, open items, what's next. **Update it at
  the end of every working session.**
- `context/decisions/` — why things are the way they are (ADRs). Add one when
  you make a choice a future reader might question.

## Stack

Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript
strict · Tailwind CSS v4 · pnpm · Vercel (+ Web Analytics) · Playwright + axe.

## Commands

```bash
pnpm dev            # local dev
pnpm check          # lint + typecheck + prettier
pnpm build          # production build (must stay fully static: ○ /)
pnpm test:e2e       # e2e + a11y, against a production build (run build first)
```

## How the code is laid out

- `src/config/site.ts` — **all** copy-adjacent facts: URLs, email, services,
  values, outbound links. Links set to `null` render as inert text; never ship
  `href="#"`.
- `src/content/*` — long-form copy (homepage prose, privacy policy) shared by
  the pages and their Markdown versions (`src/lib/markdown.ts`, ADR 0009).
- `src/components/sections/*` — one Server Component per page section. No
  client JS. Motion is declared with `data-*` attributes.
- `src/components/motion/*` — the only client islands besides the drawer:
  `MotionRuntime` (reveals, scroll effects, Lenis, anchors), `Loader`,
  `Cursor`. `src/lib/motion.ts` is their shared, non-React coordination layer.
- `src/components/contact/*` — native `<dialog>` drawer + `useActionState`
  form → `src/app/actions/contact.ts`.
- `src/components/intro-script.tsx` — inline pre-paint script that sets
  `data-js` / `data-reduced` / `data-intro` on `<html>`.

## Rules of the road

- Motion values (durations, delays, easings, distances) come from the design
  source. Don't "tidy" them without checking the design.
- Animate `transform` / `opacity` / `clip-path` only. Hover motion must use
  Tailwind's `hover:` (already gated to hover-capable pointers) and have a
  matching `group-focus-visible:` state.
- Every animated element must render in its final state without JS. Pre-states
  live in `globals.css` under `:root[data-js]`.
- `prefers-reduced-motion`: keep fades, drop movement, no loader.
- Keep `/` static. If `next build` stops printing `○ /`, find out why.
- Run `pnpm check && pnpm build && pnpm test:e2e` before pushing.

## Installed agent skills (`.claude/skills`)

vercel-react-best-practices · web-design-guidelines · tailwind-design-system ·
frontend-design · web-perf · review-animations (invoke manually).
