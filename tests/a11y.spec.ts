import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { revealEverything, skipIntro } from "./helpers";

const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test.describe("accessibility", () => {
  test("page has no WCAG 2.2 AA violations", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");
    await revealEverything(page);

    const results = await new AxeBuilder({ page })
      .withTags(WCAG)
      .exclude("[data-cursor]")
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("open contact drawer has no WCAG 2.2 AA violations", async ({
    page,
  }) => {
    await skipIntro(page);
    await page.goto("/");
    await page.getByRole("link", { name: "Contact" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Contact Yield" });
    await expect(dialog).toBeVisible();
    await page.waitForTimeout(1600);

    const results = await new AxeBuilder({ page })
      .include("dialog")
      .withTags(WCAG)
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("has a single h1 and a skip link to main content", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
  });
});
