import { ArrowUpRight } from "./icons";

type Target =
  { kind: "contact"; service?: string } | { kind: "href"; href: string | null };

type Props = {
  target: Target;
  /** Colour that floods the row on hover/focus. */
  fill: "ink" | "brand";
  title: string;
  index?: string;
  description?: string;
  size: "lg" | "md";
};

const titleSize = {
  lg: "text-row",
  md: "text-[clamp(32px,3.4vw,60px)] leading-none",
};

/**
 * Full-bleed list row. On hover or keyboard focus a colour wipe rises from the
 * bottom, the title slides right into italic, and the arrow turns to point
 * straight ahead. Pure CSS — hover motion is gated to fine pointers by
 * Tailwind's `hover:` variant.
 */
export function RowLink({
  target,
  fill,
  title,
  index,
  description,
  size,
}: Props) {
  const live = target.kind === "contact" || target.href !== null;
  const ink = live
    ? "transition-colors duration-400 group-hover:text-paper group-focus-visible:text-paper"
    : "";

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-expo group-hover:scale-y-100 group-focus-visible:scale-y-100 ${fill === "ink" ? "bg-ink" : "bg-brand"}`}
      />
      {index ? (
        <span className={`relative label-lg text-muted ${ink}`}>{index}</span>
      ) : null}
      <span className="relative flex min-w-0 flex-col gap-3">
        <span
          className={`font-serif ${titleSize[size]} ${live ? "[transition:color_.4s,transform_.7s_var(--ease-expo)] group-hover:translate-x-[clamp(8px,1.6vw,28px)] group-hover:text-paper group-hover:italic group-focus-visible:translate-x-[clamp(8px,1.6vw,28px)] group-focus-visible:text-paper group-focus-visible:italic" : ""}`}
        >
          {title}
        </span>
        {description ? (
          <span
            className={`max-w-[56ch] text-[clamp(15px,1.1vw,18px)] leading-normal text-muted ${ink}`}
          >
            {description}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className={`relative flex items-center justify-center rounded-full border border-ink/25 ${
          size === "lg" ? "size-[clamp(48px,4.6vw,72px)]" : "size-14"
        } ${
          live
            ? `[transition:transform_.7s_var(--ease-expo),background-color_.4s,border-color_.4s,color_.4s] group-hover:rotate-45 group-hover:border-transparent group-hover:text-paper group-focus-visible:rotate-45 group-focus-visible:border-transparent group-focus-visible:text-paper ${fill === "ink" ? "group-hover:bg-brand group-focus-visible:bg-brand" : "group-hover:bg-ink group-focus-visible:bg-ink"}`
            : "opacity-40"
        }`}
      >
        <ArrowUpRight size={size === "lg" ? 22 : 20} strokeWidth={1.5} />
      </span>
    </>
  );

  const layout = `relative grid items-center gap-6 overflow-hidden border-b border-ink/18 px-gutter ${
    index
      ? "grid-cols-[minmax(40px,80px)_minmax(0,1fr)_auto]"
      : "grid-cols-[minmax(0,1fr)_auto]"
  } ${size === "lg" ? "py-[clamp(28px,3.4vw,48px)]" : "py-[clamp(24px,2.6vw,36px)]"}`;

  if (!live) {
    return (
      <div className={layout}>
        {content}
        <span className="sr-only">(coming soon)</span>
      </div>
    );
  }

  const focus = "group outline-none focus-visible:outline-none";
  if (target.kind === "contact") {
    return (
      <a
        href="#contact"
        data-open-contact=""
        data-service={target.service}
        data-row=""
        className={`${layout} ${focus}`}
      >
        {content}
      </a>
    );
  }
  return (
    <a
      href={target.href!}
      target="_blank"
      rel="noopener noreferrer"
      data-row=""
      className={`${layout} ${focus}`}
    >
      {content}
    </a>
  );
}
