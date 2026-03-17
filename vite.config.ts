import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],
          "vendor-chakra": ["@chakra-ui/react"],
          "vendor-i18n": ["i18next", "react-i18next"],
        },
      },
    },
  },
});
