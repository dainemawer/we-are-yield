import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Page not found — Yield",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      id="content"
      tabIndex={-1}
      className="flex min-h-svh flex-col justify-end gap-[clamp(40px,6vh,64px)] px-gutter pt-[180px] pb-[clamp(40px,6vh,72px)] outline-none"
    >
      <p className="m-0 flex items-center gap-4 eyebrow text-muted">
        <span aria-hidden="true" className="block h-px w-12 bg-ink" />
        Error 404
      </p>
      <h1 className="m-0 max-w-[16ch] font-serif text-display font-normal text-balance">
        This page doesn’t <em className="text-brand">exist.</em>
      </h1>
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 self-start border-b border-current pb-2.5 label-lg transition-[gap] duration-400 ease-expo hover:gap-[18px]"
      >
        Back to home <ArrowUpRight />
      </Link>
    </main>
  );
}
