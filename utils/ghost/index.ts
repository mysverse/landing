import type { MakeRequestOptions } from "@tryghost/content-api";
import { cache } from "react";
import GhostContentAPI from "@tryghost/content-api";

/** Thrown for non-2xx Ghost responses so callers can tell a missing
 * post (404 -> notFound()) from an infrastructure failure, which must
 * propagate and fail the build loudly instead of baking 404 pages. */
export class GhostRequestError extends Error {
  constructor(
    public status: number,
    url: string
  ) {
    super(`Ghost request failed with ${status}: ${url}`);
    this.name = "GhostRequestError";
  }
}

export function isGhostNotFound(error: unknown) {
  // 404: no such resource. 422: slug failed validation (e.g. stray
  // file-like paths hitting the [slug] route) — same outcome for us.
  return (
    error instanceof GhostRequestError && [404, 422].includes(error.status)
  );
}

const makeRequest = async ({
  url,
  method,
  params,
  headers
}: MakeRequestOptions) => {
  const apiUrl = new URL(url);

  Object.keys(params).map((key) => apiUrl.searchParams.set(key, params[key]));

  const response = await fetch(apiUrl.toString(), { method, headers });
  if (!response.ok) {
    throw new GhostRequestError(response.status, url);
  }
  const data = await response.json();
  return { data };
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
    filter: ["visibility:public"],
    fields: [
      "id",
      "title",
      "slug",
      "published_at",
      "excerpt",
      "feature_image",
      "feature_image_alt",
      "url"
    ],
    include: ["tags", "authors"]
  });
}

export async function getPages(limit = 10) {
  return getApi("mys").pages.browse({
    limit,
    fields: ["id", "title", "slug", "published_at", "excerpt", "feature_image"]
  });
}

export const getPage = cache(async (slug: string) => {
  return getApi("mys").pages.read({ slug });
});

export const getPost = cache(async (blogType: BlogType, slug: string) => {
  const post = await getApi(blogType).posts.read(
    {
      slug
    },
    { include: ["tags", "authors"] }
  );
  return post;
});
