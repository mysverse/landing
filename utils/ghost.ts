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

export type BlogType = "mys" | "nws";

export async function getPosts(blogType: BlogType, limit = 4) {
  const ghostApi = blogType === "mys" ? api : api_nws;
  return ghostApi.posts.browse({
    limit,
    include: ["tags", "authors"],
    filter: ["visibility:public"]
  });
}

export async function getPost(blogType: BlogType, slug: string) {
  const ghostApi = blogType === "mys" ? api : api_nws;
  return ghostApi.posts.read({ slug }, { include: ["tags", "authors"] });
}
