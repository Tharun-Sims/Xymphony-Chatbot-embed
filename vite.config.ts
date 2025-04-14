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
    lib: {
      entry: path.resolve(__dirname, "src/lib/chatbot-embed.tsx"),
      name: "Chatbot",
      fileName: "chatbot-embed",
      formats: ["iife"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
