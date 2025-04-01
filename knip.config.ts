import type { KnipConfig } from "knip";

const config = {
  compilers: {
    css: (text: string) =>
      [...text.matchAll(/(?<=@)(import|plugin)[^;]+/g)]
        .join("\n")
        .replace("plugin", "import")
  },
  ignoreDependencies: [
    "@svgr/webpack",
    "eslint-config-prettier",
    "eslint",
    "eslint-config-next"
  ]
} satisfies KnipConfig;

export default config;
