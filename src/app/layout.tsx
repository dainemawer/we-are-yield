import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IntroScript } from "@/components/intro-script";
import { site } from "@/config/site";
import { dmSans, dmSerif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: "/",
    types: { "text/markdown": "/index.md" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.shortDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shortDescription,
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The IntroScript sets data-* attributes on <html> before hydration.
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <IntroScript />
      </head>
      <body>
        <a
          href="#content"
          className="sr-only z-200 rounded-full bg-ink px-5 py-3 eyebrow text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
