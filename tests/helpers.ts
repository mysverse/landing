import type { BrowserContext, Page } from "@playwright/test";

/** Third-party endpoints that make pages nondeterministic. Blocking them
 * lets the built-in fallbacks render (static stat values, empty news).
 *
 * Note the news feed itself is pinned server-side via NEWS_ENDPOINT (see
 * playwright.config.ts) — the layout fetches it inside the Next process, out of
 * reach of route interception. */
const BLOCKED_HOSTS = [
  "plausible.yan.gg", // analytics
  "workers.dev", // live metrics + news feeds
  "r2.mysver.se" // hero/feature videos + news images
];

/** 1×1 transparent PNG, stands in for the blocked news artwork. */
const PIXEL_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

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

  // Registered last so it wins over the blanket abort above: news artwork lives
  // on r2, and an aborted <Image> would leave the deck empty.
  await context.route("**/fixture-*.png*", (route) =>
    route.fulfill({ contentType: "image/png", body: PIXEL_PNG })
  );
}

/**
 * Counts calls to document.startViewTransition, which every transition on the
 * site funnels through — Motion's animateView calls straight into it. Must be
 * installed before the first navigation.
 */
export async function trackViewTransitions(page: Page) {
  await page.addInitScript(() => {
    const store = window as unknown as { __vtCount: number };
    store.__vtCount = 0;
    const original = document.startViewTransition?.bind(document);
    if (!original) return;
    document.startViewTransition = ((...args: Parameters<typeof original>) => {
      store.__vtCount += 1;
      return original(...args);
    }) as typeof document.startViewTransition;
  });
}

/** How many view transitions have started since the page loaded. */
export function viewTransitionCount(page: Page) {
  return page.evaluate(
    () => (window as unknown as { __vtCount?: number }).__vtCount ?? 0
  );
}

/**
 * Records whether the last click was preventDefault-ed. This is how we tell
 * "TransitionLink took over the navigation" apart from "it stood aside",
 * without depending on headless popup behaviour.
 *
 * The flag is read one tick after dispatch, not inside the listener: Next
 * hydrates into `document`, so React's delegated listener sits on the same
 * node as ours and — being registered later — runs after it. Reading the
 * event object once dispatch has finished sees React's preventDefault.
 */
export async function trackClickPrevention(page: Page) {
  await page.addInitScript(() => {
    const store = window as unknown as { __clickPrevented: boolean | null };
    store.__clickPrevented = null;
    document.addEventListener("click", (event) => {
      setTimeout(() => {
        store.__clickPrevented = event.defaultPrevented;
      }, 0);
    });
  });
}

export function lastClickPrevented(page: Page) {
  return page.evaluate(
    () =>
      (window as unknown as { __clickPrevented?: boolean | null })
        .__clickPrevented ?? null
  );
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
