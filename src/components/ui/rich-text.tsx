import type { ReactNode } from "react";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders a content string, turning Markdown-style `[label](href)` into links. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    parts.push(text.slice(last, match.index));
    const external = /^https?:/.test(href);
    parts.push(
      <a
        key={match.index}
        href={href}
        className="text-ink underline decoration-1 underline-offset-[0.2em] transition-colors duration-300 hover:text-brand"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>,
    );
    last = match.index + whole.length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}
