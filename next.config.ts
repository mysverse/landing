/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";

const useVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  output: useVercel ? "standalone" : "export",
  reactStrictMode: true,
  images: {
    loader: !useVercel ? "custom" : undefined,
    loaderFile: !useVercel ? "./imageLoader.ts" : undefined,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nws.mys.gg",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "blog.mysver.se",
        port: "",
        pathname: "/**"
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

export default nextConfig;
