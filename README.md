# We Are Yield

Marketing site for [Yield](https://www.weareyield.digital), a digital consultancy.
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · deployed on Vercel.

## Develop

```bash
pnpm install
pnpm dev                # http://localhost:3000
```

Copy `.env.example` to `.env.local` to wire up the contact form (optional
locally: without a key, submissions are logged to the terminal).

## Quality gates

```bash
pnpm check              # eslint + tsc + prettier
pnpm build              # must report "○ /" (fully static)
pnpm test:e2e           # Playwright + axe, desktop & mobile (after build)
```

CI runs all of the above on every push and PR.

## Editing content

Copy, links, services and values live in `src/config/site.ts`.

## Project context

See `CLAUDE.md`, `context/memory.md` and `context/decisions/`.
