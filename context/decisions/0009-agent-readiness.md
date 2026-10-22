# 0009 — Agent-readable site

**Status:** accepted (2026-10-22)

**Context.** The site was scanned with [is-agentic.com](https://is-agentic.com)
(70/100 before this change). Gaps: no Markdown content negotiation, no
Markdown 404, no `llms.txt`, JSON-LD not typed as `Organization`, no privacy
page.

**Decision.**

- **Markdown via rewrites, not Proxy.** `next.config.ts` rewrites `/` and
  `/privacy` to static route handlers (`/index.md`, `/privacy.md`) when the
  request's `Accept` header contains `text/markdown`. A `fallback` rewrite
  sends unmatched paths to `/not-found.md` (404, Markdown body). Rewrites run
  at the routing layer, so every page stays prerendered (`○`) with no
  function invocation per request. `Vary: Accept` and a `Link` alternate
  header are set for those pages.
- **One source for copy.** Homepage prose lives in `src/content/home.ts` and
  the privacy policy in `src/content/privacy.ts`; both the React pages and
  `src/lib/markdown.ts` read from them. Inline links in content use
  `[label](href)`, rendered by `RichText`.
- **`/llms.txt`** with a "When to use Yield" section, generated from config.
- **JSON-LD** is an `Organization` with `PostalAddress`, `ContactPoint`, and
  `sameAs` once social URLs exist.
- **Privacy page** (`/privacy`), written against POPIA, shares the header,
  footer, drawer and motion runtime. The intro loader never runs off the
  homepage (IntroScript sets `data-intro="none"`).

**Consequences.** New pages that should be agent-readable need an entry in
`markdownPages` (next.config.ts) and a `.md` route. Next sets its own `Vary`
on HTML responses, so locally the HTML variant lacks `Accept` in `Vary`; this
is harmless because routing, not the cache, picks the variant.
