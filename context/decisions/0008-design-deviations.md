# 0008 — Deliberate deviations from the design

**Status:** accepted (2026-10-22)

Everything visual and every motion value matches the design source. These are
the intentional differences, each for accessibility, correctness or a decision
Daine made:

| Design                                    | Implementation                                     | Why                                     |
| ----------------------------------------- | -------------------------------------------------- | --------------------------------------- |
| "Lets have a conversation"                | "Let’s …"                                          | Typo (approved)                         |
| "EMAIL US" opens the drawer               | Opens the mail client (`mailto:`)                  | Bug in design (approved)                |
| "BOOK A CALL" opens the drawer            | Calendly link (falls back to drawer until URL set) | Approved                                |
| `href="#"` on deck/case study/socials     | Inert text until a URL is configured               | No dead links                           |
| Wheel hijack loop                         | Lenis, same lerp                                   | ADR 0004                                |
| Loader on every load                      | full → quick → none                                | ADR 0003                                |
| Reduced motion: everything snaps to final | Fades kept, movement dropped                       | Gentler, still communicates state       |
| Hover-only row effects                    | Same effect on `:focus-visible`                    | Keyboard parity                         |
| About/Services nav links always visible   | Hidden below 640px (Contact stays)                 | Header overflowed on phones             |
| Hero lines wrap raggedly on phones        | `text-wrap: balance` per line                      | Avoids one-word orphans                 |
| Cursor rAF loop runs forever              | Runs only while catching up                        | Idle CPU                                |
| Count "20+" read mid-animation            | `sr-only` "20+", animated digits `aria-hidden`     | Screen readers                          |
| Name field always auto-focused            | Only for fine pointers                             | Don't pop the keyboard over the drawer  |
| Chip `<button>`s with JS state            | Checkbox chips                                     | Native semantics, works with `FormData` |

The row title switching to italic on hover (slight reflow) is kept by request;
revisit if it measurably hurts INP/CLS.
