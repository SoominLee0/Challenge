import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, "client", "index.html"),
        }
      },
    },
    base: '/',
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: isProduction ? 'https://challenge-git-main-soominlees-projects.vercel.app' : 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
    env: {
      API_URL: isProduction ? 'https://challenge-git-main-soominlees-projects.vercel.app' : 'http://localhost:3001'
    }
  };
});
