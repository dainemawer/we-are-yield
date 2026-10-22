# 0007 — Central site configuration

**Status:** accepted (2026-10-22)

**Decision.** `src/config/site.ts` holds identity (name, URL
`https://www.weareyield.digital`, email, tagline), outbound links, services, values,
community and social links. Metadata, JSON-LD, sitemap, robots, manifest and
the UI all read from it.

Links that aren't known yet are `null`. Components render them as inert,
visually consistent text (no hover affordance, "(coming soon)" for screen
readers) rather than `href="#"`. "Book a call" falls back to opening the
contact drawer until `links.calendly` is set.

**Consequences.** Filling a URL in config is the only step needed to make a
link live.
