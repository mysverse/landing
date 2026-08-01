import { defineConfig, devices } from "@playwright/test";

/**
 * Visual verification + smoke/a11y harness. Serves the production build
 * (`next build` first, then these tests run `next start` on :4300).
 *
 * - `pnpm screenshots`  – refresh baselines + dump a gallery to screenshots/
 * - `pnpm test:visual`  – diff pages against the local baselines
 * - `pnpm test:e2e`     – full suite (visual + smoke + a11y)
 */
const PORT = 4300;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Full-page captures against a single next start are heavy; too many
  // parallel workers cause timeout flakes.
  workers: process.env.CI ? 2 : 4,
  timeout: 90_000,
  snapshotPathTemplate: "{testDir}/__screenshots__/{projectName}/{arg}{ext}",
  expect: {
    // Images/antialiasing vary slightly between runs; tolerate 2%.
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 }
  },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    // Stabilises screenshots AND exercises the site's reduced-motion paths
    // (root MotionConfig, js:motion-safe gating, video preload fallback).
    contextOptions: { reducedMotion: "reduce" },
    trace: "retain-on-failure"
  },
  projects: [
    {
      name: "desktop-light",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        colorScheme: "light"
      }
    },
    {
      // colorScheme: "dark" drives the theme-init matchMedia check, so the
      // .dark class lands before first paint exactly like a real visitor.
      name: "desktop-dark",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        colorScheme: "dark"
      }
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], colorScheme: "light" }
    }
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
