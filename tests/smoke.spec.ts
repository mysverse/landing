import { test, expect } from "@playwright/test";
import { stubNetwork } from "./helpers";

/** Functional checks for behaviour the redesign introduced. */
test.describe("smoke", () => {
  test.beforeEach(async ({ context, baseURL }) => {
    await stubNetwork(context, baseURL!);
  });

  test("skip link is the first focusable element", async ({ page }) => {
    await page.goto("/en");
    await page.keyboard.press("Tab");
    await expect(page.locator('a[href="#main-content"]')).toBeFocused();
  });

  test("tab titles use the site template", async ({ page }) => {
    await page.goto("/en/contribute");
    await expect(page).toHaveTitle(/ - MYSverse$/);
  });

  test("hreflang alternates are emitted for all locales", async ({ page }) => {
    await page.goto("/en/contribute");
    for (const locale of ["en", "ms", "zh", "ta", "x-default"]) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${locale}"]`)
      ).toHaveCount(1);
    }
  });

  test("unknown content renders the localized 404", async ({ page }) => {
    await page.goto("/en/this-page-does-not-exist");
    await expect(
      page.getByRole("heading", { level: 1, name: "Page not found" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Back to home" })
    ).toBeVisible();
  });

  test("dark mode toggle flips the theme class", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop-light",
      "desktop light baseline only"
    );
    await page.goto("/en");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);
    await page.getByRole("button", { name: "Toggle dark mode" }).click();
    await expect(html).toHaveClass(/dark/);
    // Persisted for the next visit
    await page.reload();
    await expect(html).toHaveClass(/dark/);
  });

  test("system dark preference applies before interaction", async ({
    page
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-dark", "dark project only");
    await page.goto("/en");
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("mobile menu is a dialog that closes on Escape", async ({
    page
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await page.goto("/en");
    await page.getByRole("button", { name: "Open main menu" }).click();
    // The dialog root is a zero-size wrapper; the panel inside is what
    // renders, so assert on the navigation landmark it contains.
    const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
    const menuNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(dialog).toBeAttached();
    await expect(menuNav).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("DevHub tabs support arrow-key navigation", async ({
    page
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop-light",
      "desktop light baseline only"
    );
    await page.goto("/en/contribute");
    const firstTab = page.locator("#devhub-tab-ppt");
    const secondTab = page.locator("#devhub-tab-incentives");

    // The rail renders inert until hydration and the tree is swapped on
    // hydration, so retry the whole interaction (including the scroll,
    // which can hit a detached node mid-swap) until the handler is live.
    await expect(async () => {
      await firstTab.scrollIntoViewIfNeeded();
      await firstTab.click();
      await page.keyboard.press("ArrowDown");
      await expect(secondTab).toBeFocused({ timeout: 1000 });
    }).toPass({ timeout: 20_000 });

    await expect(secondTab).toHaveAttribute("aria-selected", "true");
  });
});
