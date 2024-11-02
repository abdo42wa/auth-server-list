import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

dotenv.config();
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
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
