import { coverageConfigDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    coverage: {
      exclude: [
        "postcss.config.js",
        "tailwind.config.js",
        "./src/main.tsx",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
