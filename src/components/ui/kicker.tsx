import type { ReactNode } from "react";

/** Section label followed by a hairline that draws in: "OUR MISSION ———". */
export function Kicker({
  children,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div
      data-reveal=""
      className={`flex items-center gap-4 eyebrow ${className}`}
    >
      <span>{children}</span>
      <span
        data-line=""
        aria-hidden="true"
        className={`block h-px flex-[0_0_120px] ${tone === "ink" ? "bg-ink" : "bg-paper"}`}
      />
    </div>
  );
}
