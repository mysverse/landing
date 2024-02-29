// ghost.js
import GhostContentAPI from "@tryghost/content-api";

// Create API instance with your Ghost credentials
const api = new GhostContentAPI({
  url: "https://blog.mysver.se",
  key: "d30f4be1554458a2d55c221ead",
  version: "v5.0"
});

export default api;
