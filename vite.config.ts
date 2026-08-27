import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), svgr()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
