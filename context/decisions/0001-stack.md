# 0001 — Stack

**Status:** accepted (2026-10-22)

**Context.** A crafted marketing site, frontend-only for now, hosted on Vercel.

**Decision.** Next.js 16.4 (App Router, Turbopack, `cacheComponents` +
`partialPrefetching` as scaffolded), React 19, TypeScript strict, Tailwind CSS
v4 (CSS-first `@theme` tokens), pnpm, `@vercel/analytics`. Fonts via
`next/font/google` (DM Sans with opsz axis, DM Serif Text normal + italic),
self-hosted at build. `typedRoutes` on. Playwright + `@axe-core/playwright`
for e2e/a11y, GitHub Actions CI. Prettier with the Tailwind plugin.

**Consequences.** Next 16 APIs differ from older docs: always check
`node_modules/next/dist/docs/` (e.g. `next/image` uses `preload`, not
`priority`). Cache Components requires the Node runtime — no `runtime`
exports.
