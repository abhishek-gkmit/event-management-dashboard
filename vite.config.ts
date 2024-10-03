import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log(path.resolve(__dirname, "./src/styles/*"));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});
