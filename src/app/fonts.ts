import { DM_Sans, DM_Serif_Text } from "next/font/google";

// Self-hosted at build time by next/font: no requests to Google at runtime,
// and size-adjusted fallbacks keep the swap free of layout shift.
export const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const dmSerif = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});
