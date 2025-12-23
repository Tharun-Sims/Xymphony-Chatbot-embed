import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3001,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  build: {
    outDir: "dist",
    emptyOutDir: false, // Don't clear dist, we want to keep the library build
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
  base: "/Xymphony-Chatbot-embed/", // GitHub Pages base path for project pages
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

