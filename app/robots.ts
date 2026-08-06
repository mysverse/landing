import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/assistant/", "/assistant/embed/"]
    },
    sitemap: "https://mysver.se/sitemap.xml"
  };
}
