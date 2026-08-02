import { test, expect } from "@playwright/test";
import {
  lastClickPrevented,
  stubNetwork,
  trackClickPrevention,
  trackViewTransitions,
  viewTransitionCount
} from "./helpers";

/**
 * The only spec that runs with motion enabled — every other project forces
 * prefers-reduced-motion: reduce. See the "motion" project in
 * playwright.config.ts.
 */
test.describe("view transitions", () => {
  test.beforeEach(async ({ context, baseURL, page }) => {
    await stubNetwork(context, baseURL!);
    await trackViewTransitions(page);
  });

  test("the theme toggle reveals through a transition", async ({ page }) => {
    await page.goto("/en");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole("button", { name: "Toggle dark mode" }).click();

    await expect.poll(() => viewTransitionCount(page)).toBeGreaterThan(0);
    await expect(html).toHaveAttribute("data-vt-mode", "theme");
    await expect(html).toHaveClass(/dark/);
  });

  test("an internal nav link transitions", async ({ page }) => {
    await page.goto("/en");
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Contribute" })
      .click();

    await expect(page).toHaveURL(/\/en\/contribute$/);
    await expect.poll(() => viewTransitionCount(page)).toBeGreaterThan(0);
    await expect(page.locator("html")).toHaveAttribute("data-vt-mode", "route");
  });

  test("hash links scroll without a transition", async ({ page }) => {
    await page.goto("/en");
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Projects" })
      .click();

    await expect(page).toHaveURL(/#projects$/);
    expect(await viewTransitionCount(page)).toBe(0);
  });

  // Asserted via defaultPrevented rather than a popup: headless Chromium has
  // no tab strip, so whether ctrl+click actually opens one is not something to
  // hang a test on. What matters is that TransitionLink stands aside.
  test("modifier-clicks fall through to the browser", async ({ page }) => {
    await trackClickPrevention(page);
    await page.goto("/en");
    const link = page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Contribute" });

    await link.click({ modifiers: ["ControlOrMeta"] });
    await expect.poll(() => lastClickPrevented(page)).toBe(false);
    expect(await viewTransitionCount(page)).toBe(0);
  });

  test("a plain click on the same link is taken over", async ({ page }) => {
    await trackClickPrevention(page);
    await page.goto("/en");
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Contribute" })
      .click();

    await expect(page).toHaveURL(/\/en\/contribute$/);
    await expect.poll(() => lastClickPrevented(page)).toBe(true);
  });

  test("a blog card carries its feature image into the post", async ({
    page
  }) => {
    await page.goto("/en/blog/mys");

    const firstCard = page.locator("article").first();
    const image = firstCard.locator("img[data-vt]").first();
    const key = await image.getAttribute("data-vt");
    expect(key).toMatch(/^blog-image-/);

    await image.click();

    await expect(page).toHaveURL(/\/en\/blog\/mys\/.+/);
    await expect.poll(() => viewTransitionCount(page)).toBeGreaterThan(0);
    // The same key exists on the destination, which is what pairs the two
    // snapshots into a morph rather than a crossfade.
    await expect(page.locator(`img[data-vt="${key}"]`)).toHaveCount(1);
  });
});
