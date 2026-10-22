import { expect, test } from "@playwright/test";
import { INTRO_KEY, skipIntro } from "./helpers";

test.describe("intro loader", () => {
  test("plays in full on a first visit, then not again this session", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "full");
    const loader = page.locator("[data-loader]");
    await expect(loader).toBeVisible();
    // Headline is painted beneath the curtain from the first frame (LCP).
    await expect(page.locator("h1")).toBeAttached();
    await expect(loader).toHaveCount(0, { timeout: 10_000 });
    await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-intro", "none");
    await expect(page.locator("[data-loader]")).toHaveCount(0);
  });

  test("returning visitors get the quick version", async ({ page }) => {
    await page.addInitScript(
      (key) => localStorage.setItem(key, "1"),
      INTRO_KEY,
    );
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "quick");
    await expect(page.locator("[data-loader]")).toHaveCount(0, {
      timeout: 6_000,
    });
  });

  test("is skipped entirely for reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "none");
    await expect(page.locator("html")).toHaveAttribute("data-reduced", "");
    await expect(page.locator("[data-loader]")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await context.close();
  });

  test("is skipped when deep-linking to a section", async ({ page }) => {
    await page.goto("/#services");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "none");
  });
});

test.describe("contact drawer", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");
  });

  test("opens from a service row with that service preselected", async ({
    page,
  }) => {
    await page.locator("#services").scrollIntoViewIfNeeded();
    await page.getByRole("link", { name: /Rapid MVP Development/ }).click();

    const dialog = page.getByRole("dialog", { name: "Contact Yield" });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("checkbox", { name: "Rapid MVP Development" }),
    ).toBeChecked();
    await expect(
      dialog.getByRole("checkbox", { name: "AI Automation" }),
    ).not.toBeChecked();
  });

  test("closes on Escape and returns focus to the trigger", async ({
    page,
  }) => {
    const trigger = page
      .getByRole("link", { name: "Contact", exact: true })
      .first();
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: "Contact Yield" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  });

  test("validates required fields natively", async ({ page }) => {
    await page
      .getByRole("link", { name: "Contact", exact: true })
      .first()
      .click();
    const dialog = page.getByRole("dialog", { name: "Contact Yield" });
    await dialog.getByRole("button", { name: /Send message/ }).click();
    const valid = await dialog
      .getByLabel("Name")
      .evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(valid).toBe(false);
  });

  test("submits to the server action and reports the outcome", async ({
    page,
  }) => {
    await page
      .getByRole("link", { name: "Contact", exact: true })
      .first()
      .click();
    const dialog = page.getByRole("dialog", { name: "Contact Yield" });
    await dialog.getByLabel("Name").fill("Ada Lovelace");
    await dialog.getByLabel("Email").fill("ada@example.com");
    await dialog.getByRole("button", { name: /Send message/ }).click();

    // With RESEND_API_KEY set this is the thank-you state; without it a
    // production build tells the visitor to email instead. Either way the
    // visitor is never left without feedback.
    await expect(
      dialog
        .getByRole("heading", { name: "Thanks, Ada." })
        .or(dialog.getByRole("alert")),
    ).toBeVisible();
  });
});

test.describe("progressive enhancement", () => {
  test("all content is visible without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("[data-loader]")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const el of await page.locator("[data-reveal]").all()) {
      await expect(el).toHaveCSS("opacity", "1");
    }
    // Contact triggers fall back to the in-page contact section.
    await expect(
      page.getByRole("link", { name: "Contact", exact: true }).first(),
    ).toHaveAttribute("href", "#contact");
    await context.close();
  });

  test("has no horizontal overflow", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
