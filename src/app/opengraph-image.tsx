import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOGO } from "@/components/brand/logo-data";
import { site } from "@/config/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerendered at build time; fonts are read from the @fontsource packages.
const fonts = join(process.cwd(), "node_modules/@fontsource");
const [serif, serifItalic, sans] = await Promise.all([
  readFile(
    join(fonts, "dm-serif-text/files/dm-serif-text-latin-400-normal.woff"),
  ),
  readFile(
    join(fonts, "dm-serif-text/files/dm-serif-text-latin-400-italic.woff"),
  ),
  readFile(join(fonts, "dm-sans/files/dm-sans-latin-600-normal.woff")),
]);

export default function OpenGraphImage() {
  const dot = LOGO.parts[LOGO.parts.length - 1];
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 88px",
        background: "#f5f3ef",
        color: "#0e0d0c",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "DM Sans",
          fontSize: 18,
          letterSpacing: "0.2em",
          color: "#545454",
        }}
      >
        <div style={{ width: 48, height: 1, background: "#0e0d0c" }} />
        OUTCOMES, BY DESIGN.
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          fontFamily: "DM Serif Text",
          fontSize: 76,
          lineHeight: 1.02,
          letterSpacing: "-0.025em",
          maxWidth: 980,
        }}
      >
        <span style={{ color: "#aa4747", marginRight: 18 }}>Yield</span>
        <span>is a bold digital consultancy that helps businesses&nbsp;</span>
        <span style={{ fontStyle: "italic" }}>build leaner.</span>
      </div>
      <svg width={206} height={78} viewBox={`0 0 ${LOGO.width} ${LOGO.height}`}>
        {LOGO.parts.map((p) => (
          <path
            key={p.x}
            transform={`translate(${p.x} ${p.y})`}
            d={p.d}
            fill={p === dot ? "#aa4747" : "#0e0d0c"}
          />
        ))}
      </svg>
    </div>,
    {
      ...size,
      fonts: [
        { name: "DM Serif Text", data: serif, style: "normal", weight: 400 },
        {
          name: "DM Serif Text",
          data: serifItalic,
          style: "italic",
          weight: 400,
        },
        { name: "DM Sans", data: sans, style: "normal", weight: 600 },
      ],
    },
  );
}
