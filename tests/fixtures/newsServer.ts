/**
 * Serves NEWS_FIXTURE over HTTP for the test run.
 *
 * The layout's `getNews()` runs inside the Next process, so Playwright's route
 * interception can't reach it — pointing `NEWS_ENDPOINT` at this server is the
 * only way to pin the server-rendered payload. Started as a second `webServer`
 * in playwright.config.ts.
 */
import { createServer } from "node:http";

import { NEWS_FIXTURE, NEWS_FIXTURE_PORT } from "./newsFixture";

createServer((_request, response) => {
  response.writeHead(200, {
    "content-type": "application/json",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(NEWS_FIXTURE));
  // Dual-stack: Playwright probes this over [::1] because a closed IPv4
  // loopback port can hang instead of refusing. See playwright.config.ts.
}).listen(NEWS_FIXTURE_PORT, "::");
