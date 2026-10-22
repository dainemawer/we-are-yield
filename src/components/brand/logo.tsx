import type { ComponentProps } from "react";
import { LOGO } from "./logo-data";

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/** The "yield." wordmark as a single inline SVG. Inherits `currentColor`. */
export function Wordmark(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox={`0 0 ${LOGO.width} ${LOGO.height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {LOGO.parts.map((p) => (
        <path key={p.x} transform={`translate(${p.x} ${p.y})`} d={p.d} />
      ))}
    </svg>
  );
}

/**
 * The wordmark split into individually masked glyphs, ready for the
 * rise-in animation used by the loader and the footer. The full stop is a
 * brand-red disc that pops in last. Purely decorative.
 */
export function AnimatedMark({ className, ...props }: ComponentProps<"div">) {
  const last = LOGO.parts.length - 1;
  return (
    <div
      aria-hidden="true"
      className={`relative w-full ${className ?? ""}`}
      style={{ aspectRatio: `${LOGO.width} / ${LOGO.height}` }}
      {...props}
    >
      {LOGO.parts.map((p, i) => {
        const box = {
          left: pct(p.x, LOGO.width),
          top: pct(p.y, LOGO.height),
          width: pct(p.w, LOGO.width),
          height: pct(p.h, LOGO.height),
        };
        if (i === last) {
          return (
            <div
              key={p.x}
              data-mark-dot=""
              className="absolute rounded-full bg-brand"
              style={box}
            />
          );
        }
        return (
          <div key={p.x} className="absolute overflow-hidden" style={box}>
            <svg
              data-mark-part=""
              viewBox={`0 0 ${p.w} ${p.h}`}
              className="block size-full fill-current"
              focusable="false"
            >
              <path d={p.d} />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
