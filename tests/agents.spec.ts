import { expect, test } from "@playwright/test";

// Markdown content negotiation for AI agents (see next.config.ts rewrites).
// Plain HTTP checks, so they run once rather than per device project.
test.describe("agent-readable site", () => {
  test.skip(({ isMobile }) => isMobile, "HTTP-only, device-independent");

  const markdown = { Accept: "text/markdown" };

  for (const [path, heading] of [
    ["/", "# Yield — Outcomes, by design."],
    ["/privacy", "# Privacy"],
  ] as const) {
    test(`${path} serves Markdown to agents and HTML to browsers`, async ({
      request,
    }) => {
      const md = await request.get(path, { headers: markdown });
      expect(md.status()).toBe(200);
      expect(md.headers()["content-type"]).toContain("text/markdown");
      expect(md.headers()["vary"]).toContain("Accept");
      expect(await md.text()).toContain(heading);

      const html = await request.get(path, {
        headers: { Accept: "text/html" },
      });
      expect(html.headers()["content-type"]).toContain("text/html");
    });
  }

  test("unknown paths return a Markdown 404 to agents", async ({ request }) => {
    const res = await request.get("/does-not-exist", { headers: markdown });
    expect(res.status()).toBe(404);
    expect(res.headers()["content-type"]).toContain("text/markdown");
    expect(await res.text()).toContain("/llms.txt");
  });

  test("llms.txt says when to use Yield", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain("## When to use Yield");
  });
});
