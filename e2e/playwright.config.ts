import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000", // if testing via UI
    extraHTTPHeaders: {
      // optional headers
    },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
});
