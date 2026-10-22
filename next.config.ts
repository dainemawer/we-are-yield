import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const markdownPages = [
  { page: "/", markdown: "/index.md" },
  { page: "/privacy", markdown: "/privacy.md" },
];

const acceptsMarkdown = {
  type: "header" as const,
  key: "accept",
  value: "(.*)text/markdown(.*)",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Pages with a Markdown version: caches must key on Accept, and agents
      // can discover the alternate from the headers alone.
      ...markdownPages.map(({ page, markdown }) => ({
        source: page,
        headers: [
          { key: "Vary", value: "Accept" },
          {
            key: "Link",
            value: `<${markdown}>; rel="alternate"; type="text/markdown"`,
          },
        ],
      })),
    ];
  },
  // Content negotiation for agents: `Accept: text/markdown` gets Markdown, at
  // the routing layer, so the HTML pages stay fully static.
  async rewrites() {
    return {
      beforeFiles: markdownPages.map(({ page, markdown }) => ({
        source: page,
        has: [acceptsMarkdown],
        destination: markdown,
      })),
      afterFiles: [],
      // Only reached when nothing else matched: a 404 with a Markdown body.
      fallback: [
        {
          source: "/:path*",
          has: [acceptsMarkdown],
          destination: "/not-found.md",
        },
      ],
    };
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
