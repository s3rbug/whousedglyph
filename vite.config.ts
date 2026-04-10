import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import oxlint from "vite-plugin-oxlint";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), react(), oxlint()],
  base: "/whousedglyph",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
  },
});
