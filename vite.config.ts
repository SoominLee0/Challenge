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
    root: path.resolve(import.meta.dirname, "."),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, "client", "index.html"),
        },
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', '@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-aspect-ratio']
          }
        }
      },
    },
    base: '/',
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, "client", "index.html"),
        },
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', '@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-aspect-ratio']
          }
        }
      },
      assetsDir: 'assets'
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://challenge-git-main-soominlees-projects.vercel.app',
          changeOrigin: true,
          secure: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
    env: {
      VITE_API_URL: 'https://challenge-git-main-soominlees-projects.vercel.app'
    },
  };
});
