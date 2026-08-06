/**
 * `next build` with the news feed pinned to NEWS_FIXTURE.
 *
 * The locale layout is statically generated, so news is fetched at *build*
 * time and baked into the prerendered HTML — setting NEWS_ENDPOINT on
 * `next start` is too late. Anything that depends on the payload (the unread
 * badge in the header, the deck's item count) is therefore only deterministic
 * if the build itself saw the fixture.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";

import { NEWS_FIXTURE, NEWS_FIXTURE_PORT, NEWS_FIXTURE_URL } from "./newsFixture";

const server = createServer((_request, response) => {
  response.writeHead(200, {
    "content-type": "application/json",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(NEWS_FIXTURE));
});

server.listen(NEWS_FIXTURE_PORT, () => {
  const build = spawn("next", ["build"], {
    stdio: "inherit",
    env: {
      ...process.env,
      NEWS_ENDPOINT: NEWS_FIXTURE_URL,
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA"
    }
  });

  build.on("exit", (code) => {
    server.close();
    process.exit(code ?? 1);
  });
});
