import type { BrowserContext, Page } from "@playwright/test";

/** Third-party endpoints that make pages nondeterministic. Blocking them
 * lets the built-in fallbacks render (static stat values, empty news). */
const BLOCKED_HOSTS = [
  "plausible.yan.gg", // analytics
  "workers.dev", // live metrics + news feeds
  "r2.mysver.se" // hero/feature videos
];

/**
 * Route interception for deterministic pages. Also proxies the production
 * image loader's /cdn-cgi/image/... URLs (a Cloudflare-only endpoint that
 * doesn't exist on a local `next start`) back to the underlying asset.
 */
export async function stubNetwork(context: BrowserContext, baseURL: string) {
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (BLOCKED_HOSTS.some((host) => url.hostname.endsWith(host))) {
      return route.abort();
    }
    return route.continue();
  });

  await context.route("**/cdn-cgi/image/**", async (route) => {
    const match = route
      .request()
      .url()
      .match(/\/cdn-cgi\/image\/[^/]+\/(.+)$/);
    if (!match) return route.abort();
    const target = /^https?:\/\//.test(match[1])
      ? match[1]
      : `${baseURL}/${match[1]}`;
    try {
      const response = await route.fetch({ url: target });
      return route.fulfill({ response });
    } catch {
      return route.abort();
    }
  });
}

/**
 * Scroll through the whole page so whileInView / IntersectionObserver
 * reveals fire, then return to the top and let animations settle before
 * a screenshot.
 */
export async function revealAndSettle(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const step = window.innerHeight / 2;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await delay(60);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
}
