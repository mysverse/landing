import type { MakeRequestOptions } from "@tryghost/content-api";
import GhostContentAPI from "@tryghost/content-api";

const makeRequest = async ({
  url,
  method,
  params,
  headers
}: MakeRequestOptions) => {
  const apiUrl = new URL(url);

  Object.keys(params).map((key) => apiUrl.searchParams.set(key, params[key]));

  try {
    const response = await fetch(apiUrl.toString(), { method, headers });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
};

// Create API instance with your Ghost credentials
const api = new GhostContentAPI({
  url: "https://blog.mysver.se",
  key: "d30f4be1554458a2d55c221ead",
  version: "v5.0",
  makeRequest
});

const api_nws = new GhostContentAPI({
  url: "https://nws.mys.gg",
  key: "fe4b996f030c066dad2980c7ec",
  version: "v5.0",
  makeRequest
});

export async function getPosts(blogType: "MYSverse" | "NWS") {
  const ghostApi = blogType === "MYSverse" ? api : api_nws;
  return ghostApi.posts.browse({ limit: 4, include: ["tags", "authors"] });
}
