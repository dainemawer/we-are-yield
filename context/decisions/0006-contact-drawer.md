# 0006 — Contact drawer and form

**Status:** accepted (2026-10-22)

**Decision.**

- Native `<dialog>` + `showModal()`: focus trap, Escape, inert background for
  free. Escape is intercepted (`cancel`) to play the exit animation; focus
  returns to the trigger.
- Opened by document-level delegation on `[data-open-contact]`
  (`data-service` preselects a chip). Triggers are real `href="#contact"`
  links, so without JS they land on the contact section.
- Service chips are visually-hidden checkboxes (`name="services"`) — native
  form semantics, keyboard support and `FormData` for free.
- Form uses `useActionState` → `src/app/actions/contact.ts` (Server Action):
  zod validation (server-only), honeypot field, Resend with `replyTo` set to
  the visitor. Field errors render inline with `aria-describedby` and focus
  the first invalid field; general errors use `role="alert"`.
- No `RESEND_API_KEY`: dev logs and succeeds; production shows an "email us
  instead" message. Never a silent failure.
- The custom cursor is a `popover="manual"` element re-raised when the dialog
  opens, so it stays above the top layer like in the design.

**Consequences.** Needs env vars in Vercel (see `.env.example`). No rate
limiting yet — add Vercel BotID / firewall when live.
