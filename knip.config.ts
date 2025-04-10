import type { KnipConfig } from "knip";

const config = {
  compilers: {
    css: (text: string) =>
      [...text.matchAll(/(?<=@)(import|plugin)[^;]+/g)]
        .join("\n")
        .replaceAll("plugin", "import")
  },
  ignoreDependencies: [
    "@svgr/webpack",
    "eslint-config-prettier",
    "eslint",
    "eslint-config-next",
    "eslint-plugin-react-hooks"
  ]
} satisfies KnipConfig;

export default config;
