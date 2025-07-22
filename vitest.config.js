import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react"; // <-- missing import

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // provides vitest API globally so methods like test or expect can be used without being imported 
    environment: "jsdom",
    setupFiles: './setupTests.js', // path to setup file
  }
})