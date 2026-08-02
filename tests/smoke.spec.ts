import type { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import {
  stubNetwork,
  trackViewTransitions,
  viewTransitionCount
} from "./helpers";

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

  // The whole suite (bar the "motion" project) runs with reduced motion, so
  // this is the regression test for the gate in Motion/viewTransition.ts.
  test("reduced motion skips view transitions entirely", async ({
    page
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop-light",
      "desktop light baseline only"
    );
    await trackViewTransitions(page);
    await page.goto("/en");

    await page.getByRole("button", { name: "Toggle dark mode" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Contribute" })
      .click();
    await expect(page).toHaveURL(/\/en\/contribute$/);

    expect(await viewTransitionCount(page)).toBe(0);
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

  // The deck is driven by NEWS_FIXTURE (4 items) via NEWS_ENDPOINT; see
  // playwright.config.ts. Assertions target the counter and caption, never the
  // card itself — the exit animation still cross-fades under reduced motion, so
  // two cards briefly coexist.
  test.describe("news deck", () => {
    const openNews = async (page: Page) => {
      await page.goto("/en");
      await page.getByRole("button", { name: /Open news/ }).click();
      return page.getByRole("dialog");
    };

    test("moves in both directions and wraps", async ({ page }) => {
      const dialog = await openNews(page);
      await expect(dialog).toBeAttached();

      const counter = dialog.getByText(/^\d+ \/ \d+$/);
      await expect(counter).toHaveText("1 / 4");

      await page.keyboard.press("ArrowRight");
      await expect(counter).toHaveText("2 / 4");
      await expect(
        dialog.getByText("A second fixture item that carries body copy.")
      ).toBeVisible();

      await page.keyboard.press("ArrowLeft");
      await expect(counter).toHaveText("1 / 4");

      // Backwards off the start wraps to the end.
      await page.keyboard.press("ArrowLeft");
      await expect(counter).toHaveText("4 / 4");

      // Forwards off the end wraps back to the start.
      await page.getByRole("button", { name: "Next item" }).click();
      await expect(counter).toHaveText("1 / 4");

      await page.getByRole("button", { name: "Previous item" }).click();
      await expect(counter).toHaveText("4 / 4");
    });

    // The original deck ignored the sign of deltaY, so scrolling up advanced
    // forward just like scrolling down. This is that regression's guard.
    test("the wheel scrolls the deck both ways", async ({
      page
    }, testInfo) => {
      test.skip(
        testInfo.project.name === "mobile",
        "wheel isn't the input path on touch"
      );
      const dialog = await openNews(page);
      const counter = dialog.getByText(/^\d+ \/ \d+$/);
      await dialog.getByRole("heading").first().hover();

      await page.mouse.wheel(0, 120);
      await expect(counter).toHaveText("2 / 4");

      await page.mouse.wheel(0, -120);
      await expect(counter).toHaveText("1 / 4");
    });

    // Same handler the touch swipe runs through — the original deck used
    // √(x²+y²), so dragging any direction advanced forward.
    test("dragging the card moves the deck both ways", async ({
      page
    }, testInfo) => {
      test.skip(
        testInfo.project.name !== "desktop-light",
        "one project is enough for a pointer-drag interaction"
      );
      const dialog = await openNews(page);
      const counter = dialog.getByText(/^\d+ \/ \d+$/);

      const drag = async (distance: number) => {
        const card = dialog.getByRole("img").first();
        const box = (await card.boundingBox())!;
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        // Several steps so Motion registers a drag and builds up velocity.
        for (let step = 1; step <= 6; step++) {
          await page.mouse.move(x, y + (distance / 6) * step);
        }
        await page.mouse.up();
      };

      await drag(-150); // up → next
      await expect(counter).toHaveText("2 / 4");

      await drag(150); // down → previous
      await expect(counter).toHaveText("1 / 4");
    });

    test("dots jump straight to an item", async ({ page }) => {
      const dialog = await openNews(page);
      await page.getByRole("button", { name: "Go to item 3" }).click();
      await expect(dialog.getByText(/^\d+ \/ \d+$/)).toHaveText("3 / 4");
      await expect(
        dialog.getByRole("heading", { name: "Fixture Three Square" })
      ).toBeVisible();
    });

    test("closes on Escape", async ({ page }) => {
      const dialog = await openNews(page);
      await expect(dialog).toBeAttached();
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
    });

    test("unread badge clears once the news has been opened", async ({
      page
    }) => {
      await page.goto("/en");
      const button = page.getByRole("button", { name: /Open news/ });
      await expect(button).toHaveAccessibleName("Open news, 3 new");

      await button.click();
      await page.keyboard.press("Escape");
      await page.reload();

      await expect(
        page.getByRole("button", { name: /Open news/ })
      ).toHaveAccessibleName("Open news");
    });
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
