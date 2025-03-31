// ghost.js
import GhostContentAPI from "@tryghost/content-api";

// Create API instance with your Ghost credentials
export const api = new GhostContentAPI({
  url: "https://blog.mysver.se",
  key: "d30f4be1554458a2d55c221ead",
  version: "v5.0"
});

export const api_nws = new GhostContentAPI({
  url: "https://nws.mys.gg",
  key: "fe4b996f030c066dad2980c7ec",
  version: "v5.0"
});
