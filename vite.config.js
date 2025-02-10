import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  server: {
    port: 3000,
  },
  plugins: [
    react({
      include: /\.(jsx|tsx)$/,
      babel: {
        plugins: ["styled-components"],
        babelrc: false,
        configFile: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./public"),
    },
  },
});
