/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const useVercel = process.env.VERCEL === "1";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/pdrm-collab-slides",
        destination:
          "https://docs.google.com/presentation/d/1uL_oWyDvnWfy1WvjCWmwFopHgSyMUmjR8BD0RvfIUmI/edit?usp=sharing",
        permanent: false
      },
      {
        source: "/pdrm-collab-doc",
        destination:
          "https://drive.google.com/file/d/1mWD1M851eMMiETXkrPtFKLD_tSRwRfPI/view?usp=drive_link",
        permanent: false
      }
    ];
  },
  images: {
    loader: !useVercel ? "custom" : undefined,
    loaderFile: !useVercel ? "./imageLoader.ts" : undefined,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mys.gg"
      },
      {
        protocol: "https",
        hostname: "**.mysver.se"
      },
      {
        protocol: "https",
        hostname: "**.gravatar.com",
        pathname: "/avatar/**"
      }
    ]
  },
  webpack(config: any) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"]
      }
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js"
      }
    }
  }
};

export default withNextIntl(nextConfig);

