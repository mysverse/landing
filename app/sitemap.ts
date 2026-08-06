import type { MetadataRoute } from "next";
import { routing } from "i18n/routing";
import { blogData, getPages, getPosts } from "utils/ghost";
import { legalPages } from "data/legal";

const BASE_URL = "https://mysver.se";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/assistant",
    "/contribute",
    "/lebuhraya",
    ...legalPages.map((page) => page.href),
    ...blogData.map((blog) => `/blog/${blog.slug}`)
  ];

  const ghostPages = await getPages();
  const pagePaths = ghostPages.map((page) => `/${page.slug}`);

  const postPaths: string[] = [];
  for (const blog of blogData) {
    const posts = await getPosts(blog.slug, 100);
    postPaths.push(...posts.map((post) => `/blog/${blog.slug}/${post.slug}`));
  }

  const allPaths = [...staticPaths, ...pagePaths, ...postPaths];

  return allPaths.flatMap((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
    );
    return routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      alternates: { languages }
    }));
  });
}
