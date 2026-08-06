import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      app: path.resolve(import.meta.dirname, "app"),
      lib: path.resolve(import.meta.dirname, "lib"),
      data: path.resolve(import.meta.dirname, "data"),
      utils: path.resolve(import.meta.dirname, "utils")
    }
  },
  test: {
    environment: "node",
    include: ["unit-tests/**/*.test.ts"],
    clearMocks: true
  }
});
