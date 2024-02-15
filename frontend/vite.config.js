import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Enable CSS Modules globally
      scopeBehaviour: "local", // or 'global'
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
});
