import { expect, test } from "@playwright/test";

const SOURCE = {
  fileId: "file_test",
  title: "Getting started",
  url: "https://mys.wiki/sumaya/get-started",
  locale: "en"
};

test.beforeEach(async ({ context }) => {
  await context.route("**/api/assistant/session", async (route) => {
    if (route.request().method() === "GET")
      return route.fulfill({ json: { enabled: true } });
    return route.fulfill({
      json: { token: "test.session", expiresAt: "2099-01-01T00:00:00.000Z" }
    });
  });
  await context.route("**/api/assistant/chat", (route) =>
    route.fulfill({
      json: {
        answerMarkdown:
          "Start as a **Visitor**. <script>window.bad = true</script> Read the cited guide.",
        sources: [SOURCE],
        remainingQuota: { tenMinutes: 9, day: 49 },
        requestId: "request-test"
      }
    })
  );
  await context.route(
    "https://challenges.cloudflare.com/turnstile/v0/api.js*",
    (route) =>
      route.fulfill({
        contentType: "application/javascript",
        body: `window.turnstile={render:function(el,o){setTimeout(function(){o.callback('turnstile-test-token')},0);return 'test-widget'},remove:function(){},reset:function(){}};`
      })
  );
});

test("full-page assistant gates age, keeps session history, and renders safe citations", async ({
  page
}) => {
  await page.goto("/en/assistant");
  await expect(page.getByRole("heading", { name: "Before you start" })).toBeVisible();
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("button", { name: "Continue" })).toBeEnabled();
  await page.getByRole("button", { name: "Continue" }).click();

  const input = page.getByRole("textbox", { name: "Ask a MYSverse question…" });
  await input.fill("How do I start Sumaya?");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByText("Start as a Visitor.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Getting started" })).toHaveAttribute(
    "href",
    SOURCE.url
  );
  await expect(page.locator("script").filter({ hasText: "window.bad" })).toHaveCount(0);

  await page.reload();
  await expect(page.getByRole("heading", { name: "Before you start" })).toHaveCount(0);
  await expect(page.getByText("Start as a Visitor.")).toBeVisible();
});

test("floating widget and full page use the same embedded client", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-light", "One desktop host check is sufficient.");
  await page.goto("/en");
  const launcher = page.getByRole("button", { name: /Ask MYSverse/ });
  await expect(launcher).toBeVisible();
  await launcher.click();
  const frame = page.frameLocator('iframe[title="Ask MYSverse"]');
  await expect(frame.getByRole("heading", { name: "Before you start" })).toBeVisible();
  await frame.getByRole("button", { name: "Close assistant" }).focus();
  await page.keyboard.press("Escape");
  await expect(page.locator('iframe[title="Ask MYSverse"]')).toHaveCount(0);
  await expect(launcher).toBeFocused();
});
