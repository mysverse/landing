import { mkdir, writeFile } from "node:fs/promises";
import { test, expect } from "@playwright/test";
import { revealAndSettle, stubNetwork } from "./helpers";

/**
 * Full-page visual checks per route, per project (light/dark/mobile).
 *
 * Every run dumps a browsable gallery into screenshots/<project>/ for
 * eyeballing. toHaveScreenshot additionally diffs against the local
 * baselines in tests/__screenshots__/ — refresh them with
 * `pnpm screenshots` after an intentional visual change.
 */
const ROUTES = [
  { path: "/en", name: "home" },
  { path: "/en/contribute", name: "contribute" },
  { path: "/en/lebuhraya", name: "lebuhraya" },
  { path: "/en/blog/mys", name: "blog-index" },
  { path: "/en/legal/terms", name: "legal-terms" },
  { path: "/en/this-page-does-not-exist", name: "not-found" }
] as const;

test.describe("visual", () => {
  test.beforeEach(async ({ context, baseURL }) => {
    await stubNetwork(context, baseURL!);
  });

  for (const route of ROUTES) {
    test(route.name, async ({ page }, testInfo) => {
      await page.goto(route.path);
      await revealAndSettle(page);

      // Nondeterministic regions: count-up stat values and (blocked) videos.
      const mask = [page.locator("dd.order-first"), page.locator("video")];

      const gallery = await page.screenshot({ fullPage: true, mask });
      await testInfo.attach(`${testInfo.project.name}/${route.name}`, {
        body: gallery,
        contentType: "image/png"
      });
      await mkdir(`screenshots/${testInfo.project.name}`, { recursive: true });
      await writeFile(
        `screenshots/${testInfo.project.name}/${route.name}.png`,
        gallery
      );

      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        mask
      });
    });
  }
});
