import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: "shell",
      filename: "remoteEntry.js",
      exposes: { "./global": "./src/global-api.ts" },
      remotes: {
        // app1: "http://localhost:5174/assets/remoteEntry.js",
        // app2: "http://localhost:5175/assets/remoteEntry.js",
        app1: "https://mitkoarsov.github.io/microfrontends-child-one/assets/remoteEntry.js",
        app2: "https://mitkoarsov.github.io/microfrontends-child-two/assets/remoteEntry.js",
      },
      shared: [
        "react",
        "react-dom",
        "react-redux",
        "@reduxjs/toolkit",
        "use-sync-external-store",
        "@mui/material",
        "@emotion/react",
        "@emotion/styled",
      ],
    }),
    react(),
  ],
  // server: {
  //   port: 5173,
  //   strictPort: true,
  //   headers: { "Access-Control-Allow-Origin": "*" },
  // },
  resolve: {
    dedupe: ["react", "react-dom", "react-redux", "use-sync-external-store"],
  },
  // build: {
  //   chunkSizeWarningLimit: 1500,
  // },
});
