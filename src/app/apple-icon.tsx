import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS ignores SVG touch icons; this renders the same mark as icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0e0d0c",
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 999,
          background: "#aa4747",
        }}
      />
    </div>,
    size,
  );
}
