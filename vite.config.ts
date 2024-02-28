import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { shadowStyle } from "vite-plugin-shadow-style";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // define: {
  //   "process.env": {
  //     NODE_ENV: "production",
  //   },
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: "./src/main.tsx",
      name: "poc",
      fileName: (format) => `poc.${format}.js`,
    },
    target: "es2015",
  },
});
