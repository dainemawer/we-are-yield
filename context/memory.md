# Project memory

Working notes for whoever (human or agent) picks this up next. Newest first.
Keep it short; move anything settled into `decisions/`.

## Status — 2026-10-22

**v1 implemented.** Every section, interaction and motion sequence from the
Claude Design file ("Yield Website.dc.html", project
`74cf6b60-a70c-4a26-9988-c3871c9c864b`) is built. 26/26 Playwright tests
pass (desktop + mobile), axe reports zero WCAG 2.2 AA violations.

**Live:** https://www.weareyield.digital (apex redirects to www; domain
registered at Vercel, mail on Neo). Also https://we-are-yield.vercel.app (Vercel project `we-are-yield`,
scope `daine-mawer`, Git-connected to `dainemawer/we-are-yield` — pushes to
`main` deploy to production).

**Lighthouse (live, mobile, first visit, median of 3):** Performance 94 ·
Accessibility 96 · Best Practices 100 · SEO 100. LCP 2.4s (observed ~1.3s),
CLS 0, TBT ≤60ms. The only sub-green metric is Speed Index (~5.1s), caused by
the ~4.8s cinematic loader animating on first visit (Lighthouse always
measures a first visit). Accessibility 96 is the mix-blend header false
positive (see Gotchas).

## Open items (need input from Daine)

- [ ] **Loader vs. Lighthouse 95** — decide whether to keep the full
      cinematic loader on first visit (Perf ~94) or use the Quick pace for
      everyone (expected ≥95). One-line change in `src/lib/intro.ts` /
      IntroScript.

- [ ] **Hero image: replace.** The design's team photo is out (Daine, 2026-10-22).
      Direction being chosen; current file is a truncated placeholder.
- [ ] **Outbound URLs** — fill in `src/config/site.ts`:
      `links.calendly`, `links.pitchDeck`, `links.caseStudy`,
      `community[*].href` (Discord, Substack, Bluesky),
      `social[*].href` (Instagram, X, Bluesky, Substack).
      Until set they render as inert text, and "Book a call" opens the drawer.
- [ ] **Resend** — create an API key, verify `weareyield.digital` in Resend (sender defaults to
      `website@weareyield.digital`), then
      set `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`,
      `CONTACT_FROM_EMAIL`) in Vercel → Project → Environment Variables.

## Next up / ideas

- Contact form rate limiting (Vercel BotID or firewall rule) once live.
- Consider Speed Insights alongside Web Analytics.
- Replace generated OG image with a designed one if desired
  (`src/app/opengraph-image.tsx`).
- CSP header: skipped for now (nonces force dynamic rendering). Revisit with
  hashes if needed.

## Gotchas

- The design's `hello@weareyield.com` was wrong: `weareyield.com` belongs to
  someone else and has a null MX (rejects all mail). Site uses
  `hello@weareyield.digital`.

- `next dev` rewrites the block in `AGENTS.md`; commit it as-is.
- Lighthouse flags the header CONTACT pill for contrast — false positive: the
  header uses `mix-blend-mode: difference`, which contrast checkers can't
  evaluate. It's always inverted against what's behind it.
- Vercel Analytics 404s locally (`/_vercel/insights/script.js`) — expected.
- Local Lighthouse uses simulated throttling; observed LCP locally is ~0.4s
  (= FCP). Judge performance on the deployed URL.
