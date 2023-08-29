/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    browser: {
      provider: "playwright",
      enabled: true,
      name: "chromium", // browser name is required
    },
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
