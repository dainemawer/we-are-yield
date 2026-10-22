"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EASE,
  EASE_IN,
  lockScroll,
  prefersReducedMotion,
  TOP_LAYER_EVENT,
  unlockScroll,
} from "@/lib/motion";
import { ContactForm } from "./contact-form";

/**
 * Slide-in contact drawer. Opens from any element marked `data-open-contact`
 * (optionally `data-service="…"` to preselect a service). Those triggers are
 * real `href="#contact"` links, so without JS they still land on the contact
 * section.
 *
 * Native <dialog> + showModal() gives us the focus trap, Escape handling and
 * an inert page behind it for free.
 */
export function ContactDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  // Each open gets a fresh form (and a fresh useActionState).
  const [session, setSession] = useState<{
    id: number;
    service: string | null;
  }>({
    id: 0,
    service: null,
  });

  const open = useCallback((service: string | null, trigger: HTMLElement) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    triggerRef.current = trigger;
    setSession((s) => ({ id: s.id + 1, service }));
    dialog.showModal();
    document.dispatchEvent(new Event(TOP_LAYER_EVENT));
    lockScroll();

    const reduced = prefersReducedMotion();
    dialog
      .querySelector("[data-drawer-backdrop]")
      ?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: reduced ? 200 : 700,
        fill: "both",
      });
    dialog
      .querySelector("[data-drawer-panel]")
      ?.animate(
        reduced
          ? [{ opacity: 0 }, { opacity: 1 }]
          : [{ transform: "translateX(100%)" }, { transform: "none" }],
        { duration: reduced ? 200 : 1100, easing: EASE, fill: "both" },
      );
  }, []);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open || closingRef.current) return;
    closingRef.current = true;
    const reduced = prefersReducedMotion();
    dialog
      .querySelector("[data-drawer-backdrop]")
      ?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: reduced ? 150 : 600,
        fill: "forwards",
      });
    const panel = dialog.querySelector("[data-drawer-panel]");
    const done = () => {
      closingRef.current = false;
      dialog.close();
      unlockScroll();
      triggerRef.current?.focus({ preventScroll: true });
    };
    const anim = panel?.animate(
      reduced
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [{ transform: "none" }, { transform: "translateX(100%)" }],
      { duration: reduced ? 150 : 650, easing: EASE_IN, fill: "forwards" },
    );
    if (anim) anim.onfinish = done;
    else done();
  }, []);

  // Delegate from the whole document so server-rendered triggers need no JS of their own.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const trigger = (e.target as Element).closest?.<HTMLElement>(
        "[data-open-contact]",
      );
      if (!trigger) return;
      e.preventDefault();
      open(trigger.dataset.service ?? null, trigger);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      data-drawer=""
      aria-label="Contact Yield"
      onCancel={(e) => {
        // Escape: play the exit animation instead of vanishing instantly.
        e.preventDefault();
        close();
      }}
      className="fixed inset-0 z-110 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-ink"
    >
      <div
        data-drawer-backdrop=""
        onClick={close}
        className="absolute inset-0 bg-ink/60 backdrop-blur-[8px]"
      />
      <div
        data-drawer-panel=""
        data-lenis-prevent=""
        className="relative ml-auto flex h-full w-[min(640px,100%)] flex-col gap-12 overflow-y-auto overscroll-contain bg-paper p-[clamp(28px,4vw,56px)]"
      >
        {session.id > 0 ? (
          <ContactForm
            key={session.id}
            initialService={session.service}
            onClose={close}
          />
        ) : null}
      </div>
    </dialog>
  );
}
