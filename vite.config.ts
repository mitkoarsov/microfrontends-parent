import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env: Record<string, string> = loadEnv(mode, process.cwd(), "");
  const isProd: boolean = env.VITE_IS_PROD === "true";
  const app1Url: string = isProd
    ? "https://mitkoarsov.github.io/microfrontends-child-one/assets/remoteEntry.js"
    : "http://localhost:5174/assets/remoteEntry.js";
  const app2Url: string = isProd
    ? "https://mitkoarsov.github.io/microfrontends-child-two/assets/remoteEntry.js"
    : "http://localhost:5175/assets/remoteEntry.js";

  console.log("isProd:", isProd);

  return {
    plugins: [
      federation({
        name: "shell",
        filename: "remoteEntry.js",
        exposes: { "./global": "./src/global-api.ts" },
        remotes: {
          app1: app1Url,
          app2: app2Url,
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
    server: {
      port: 5173,
      strictPort: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    },
    resolve: {
      dedupe: ["react", "react-dom", "react-redux", "use-sync-external-store"],
    },
  };
});
