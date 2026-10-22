import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "./icons";

type Props = {
  /** `null` renders the same treatment as inert text — the link isn't live yet. */
  href: string | null;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">;

const base =
  "label-lg inline-flex items-center gap-2.5 border-b border-current pb-2.5";

/** Underlined uppercase link whose arrow eases away on hover. */
export function TextLink({ href, children, className = "", ...props }: Props) {
  if (href === null) {
    return (
      <span className={`${base} cursor-default opacity-60 ${className}`}>
        {children}
        <ArrowUpRight />
      </span>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={`${base} transition-[gap] duration-400 ease-expo hover:gap-[18px] ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      <ArrowUpRight />
    </a>
  );
}
