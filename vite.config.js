import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "VITE_");

export default defineConfig({
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: env.VITE_BACKEND_URL,
        changeOrigin: true,
      },
    },
    headers: {
      "Strict-Transport-Security": "max-age=86400; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  },
  plugins: [
    react(),
    compression({
      algorithm: "gzip",
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("commonjsHelpers")) return "commonjsHelpers";
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
