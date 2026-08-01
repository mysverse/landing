import type { MetadataRoute } from "next";
import { BRAND_COLOR } from "data/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MYSverse",
    short_name: "MYSverse",
    description:
      "The original Malaysian metaverse project and roleplay community.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: BRAND_COLOR,
    icons: [
      {
        src: "/img/favicons/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/img/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
