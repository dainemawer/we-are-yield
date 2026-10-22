import type { Page } from "@playwright/test";

export const INTRO_KEY = "yield:intro";

/** Pretend the intro has already been seen this session. */
export async function skipIntro(page: Page) {
  await page.addInitScript(
    (key) => sessionStorage.setItem(key, "1"),
    INTRO_KEY,
  );
}

/** Scroll the whole page so every scroll-triggered reveal has fired. */
export async function revealEverything(page: Page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  // Longest reveal is 1.4s (+ stagger).
  await page.waitForTimeout(1800);
}
