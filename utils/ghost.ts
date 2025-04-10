import type { MakeRequestOptions } from "@tryghost/content-api";
import { cache } from "react";
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

export const blogData = [
  {
    name: "MYSverse Blog",
    shortName: "MYSverse",
    slug: "mys",
    url: "/blog/mys",
    externalUrl: "https://blog.mysver.se",
    key: "d30f4be1554458a2d55c221ead"
  },
  {
    name: "National Wire Service",
    shortName: "NWS",
    slug: "nws",
    url: "/blog/nws",
    externalUrl: "https://nws.mys.gg",
    key: "fe4b996f030c066dad2980c7ec"
  }
] as const;

export type BlogType = (typeof blogData)[number]["slug"];

function getApi(type: BlogType) {
  const blog = blogData.find((blog) => blog.slug === type);
  if (!blog) throw new Error("Blog not found");
  return new GhostContentAPI({
    url: blog.externalUrl,
    key: blog.key,
    version: "v5.0",
    makeRequest
  });
}

export async function getPosts(blogType: BlogType, limit = 4) {
  return getApi(blogType).posts.browse({
    limit,
    include: ["tags", "authors"],
    filter: ["visibility:public"]
  });
}

export async function getPages(limit = 10) {
  return getApi("mys").pages.browse({
    limit
  });
}

export async function getPage(slug: string) {
  return getApi("mys").pages.read({ slug });
}

export const getPost = cache(async (blogType: BlogType, slug: string) => {
  const post = await getApi(blogType).posts.read(
    {
      slug
    },
    { include: ["tags", "authors"] }
  );
  return post;
});
