"use client";

import { useActionState, useEffect, useLayoutEffect, useRef } from "react";
import { sendContact } from "@/app/actions/contact";
import { ArrowUpRight } from "@/components/ui/icons";
import { services, site, mailto } from "@/config/site";
import { initialContactState, type ContactField } from "@/lib/contact-types";
import { EASE, prefersReducedMotion } from "@/lib/motion";

type Props = {
  initialService: string | null;
  onClose: () => void;
};

const fieldClass =
  "w-full rounded-none border-0 border-b border-ink/25 bg-transparent pt-3 pb-3.5 text-[20px] text-ink outline-none transition-[border-color] duration-300 focus:border-ink focus-visible:border-ink aria-invalid:border-brand";

function staggerIn(root: HTMLElement | null, selector: string, base: number) {
  if (!root) return;
  const reduced = prefersReducedMotion();
  root.querySelectorAll(selector).forEach((el, i) =>
    el.animate(
      reduced
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [
            { opacity: 0, transform: "translateY(28px)" },
            { opacity: 1, transform: "none" },
          ],
      {
        duration: reduced ? 300 : 1100,
        delay: reduced ? 0 : base + i * 70,
        easing: EASE,
        fill: "both",
      },
    ),
  );
}

export function ContactForm({ initialService, onClose }: Props) {
  const [state, formAction, pending] = useActionState(
    sendContact,
    initialContactState,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const sentHeadingRef = useRef<HTMLHeadingElement>(null);

  // Entrance stagger (before paint, so items never flash in place), then focus
  // the first field — fine pointers only: on touch devices auto-focus would
  // throw the keyboard up over the drawer.
  useLayoutEffect(() => {
    staggerIn(rootRef.current, "[data-drawer-item]", 220);
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const t = window.setTimeout(() => {
      rootRef.current
        ?.querySelector<HTMLInputElement>("input[name=name]")
        ?.focus({ preventScroll: true });
    }, 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      staggerIn(rootRef.current, "[data-sent-item]", 0);
      sentHeadingRef.current?.focus({ preventScroll: true });
    } else if (state.status === "error" && state.fieldErrors) {
      const first = Object.keys(state.fieldErrors)[0];
      rootRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }, [state]);

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  // React resets the form after each submission; restore what the user picked.
  const isChecked = (name: string) =>
    values.services ? values.services.includes(name) : name === initialService;

  const fieldProps = (name: ContactField) => ({
    name,
    id: `contact-${name}`,
    defaultValue: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <div ref={rootRef} className="contents">
      <div
        data-drawer-item=""
        className="flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4 eyebrow">
          <span>Contact</span>
          <span aria-hidden="true" className="block h-px w-16 bg-ink" />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-[52px] cursor-pointer items-center justify-center rounded-full border border-ink/25 text-ink transition-[transform,background-color,color] duration-600 ease-expo hover:rotate-90 hover:bg-ink hover:text-paper"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>

      {state.status === "success" ? (
        <div className="flex flex-1 flex-col justify-center gap-7">
          <span
            data-sent-item=""
            aria-hidden="true"
            className="block size-14 rounded-full bg-brand"
          />
          <h2
            ref={sentHeadingRef}
            tabIndex={-1}
            data-sent-item=""
            className="m-0 font-serif text-[clamp(40px,4.4vw,64px)] leading-none font-normal tracking-[-0.02em] outline-none"
          >
            Thanks{state.firstName ? `, ${state.firstName}` : ""}.
          </h2>
          <p
            data-sent-item=""
            className="m-0 max-w-[34ch] text-[20px] leading-normal text-muted"
          >
            Your message is with us. We’ll be in touch soon.
          </p>
          <button
            data-sent-item=""
            type="button"
            onClick={onClose}
            className="cursor-pointer self-start border-0 border-b border-ink bg-transparent px-0 pt-0 pb-2.5 label-lg text-ink"
          >
            Back to site
          </button>
        </div>
      ) : (
        <form action={formAction} className="flex flex-col gap-9">
          <h2
            data-drawer-item=""
            className="m-0 font-serif text-[clamp(40px,4.4vw,64px)] leading-none font-normal tracking-[-0.02em] text-balance"
          >
            Let’s have a <em className="text-brand">conversation</em>
          </h2>

          <fieldset
            data-drawer-item=""
            className="m-0 flex flex-col gap-3.5 border-0 p-0"
          >
            <legend className="mb-3.5 block p-0 text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">
              What can we help with?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {services.map((s) => (
                <label key={s.name} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name="services"
                    value={s.name}
                    defaultChecked={isChecked(s.name)}
                    className="peer sr-only"
                  />
                  <span className="block rounded-full border border-ink px-[18px] py-3 text-[14px] text-ink transition-[background-color,color] duration-300 peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ink">
                    {s.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div
            data-drawer-item=""
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-7"
          >
            <Field label="Name" error={errors.name} id="contact-name">
              <input
                {...fieldProps("name")}
                required
                autoComplete="name"
                className={fieldClass}
              />
            </Field>
            <Field label="Email" error={errors.email} id="contact-email">
              <input
                {...fieldProps("email")}
                type="email"
                required
                autoComplete="email"
                spellCheck={false}
                className={fieldClass}
              />
            </Field>
          </div>

          <div data-drawer-item="">
            <Field
              label="Company (optional)"
              error={errors.company}
              id="contact-company"
            >
              <input
                {...fieldProps("company")}
                autoComplete="organization"
                className={fieldClass}
              />
            </Field>
          </div>

          <div data-drawer-item="">
            <Field
              label="Tell us a little about it"
              error={errors.message}
              id="contact-message"
            >
              <textarea
                {...fieldProps("message")}
                rows={4}
                autoComplete="off"
                className={`${fieldClass} resize-y leading-normal`}
              />
            </Field>
          </div>

          {/* Honeypot — hidden from people and assistive tech, irresistible to bots. */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px overflow-hidden"
          >
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </label>
          </div>

          {state.status === "error" && state.message ? (
            <p role="alert" className="m-0 text-[15px] text-brand">
              {state.message}
            </p>
          ) : null}

          <div
            data-drawer-item=""
            className="flex flex-wrap items-center justify-between gap-5"
          >
            <button
              type="submit"
              disabled={pending}
              className="inline-flex cursor-pointer items-center gap-3 rounded-full border-0 bg-ink px-[30px] py-5 label-lg text-paper transition-[background-color] duration-400 hover:bg-brand disabled:cursor-progress disabled:opacity-70"
            >
              {pending ? "Sending…" : "Send message"}
              <ArrowUpRight size={14} strokeWidth={2} />
            </button>
            <a
              href={mailto}
              className="border-b border-ink/25 pb-1 text-[15px] text-muted transition-colors duration-300 hover:text-ink"
            >
              or email {site.email}
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-semibold tracking-[0.2em] text-muted uppercase"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="m-0 mt-2 text-[14px] text-brand">
          {error}
        </p>
      ) : null}
    </div>
  );
}
