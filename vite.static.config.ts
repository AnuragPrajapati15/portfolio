import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Static build config for GitHub Pages deployment.
// NOTE: Update `base` below to match your GitHub repo name.
// e.g., if your repo URL is https://github.com/AnuragPrajapati15/portfolio_new
// then base should be "/portfolio_new/"
export default defineConfig({
    plugins: [
        tailwindcss(), // Required for Tailwind v4 CSS processing
        react(),
    ],
    base: "/portfolio_new/", // ← Change this to your actual repo name if different
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    css: {
        transformer: "postcss", // Use postcss instead of lightningcss (avoids v4 compat issues)
    },
    build: {
        outDir: "dist",
        emptyOutDir: true,
        cssMinify: "esbuild", // Use esbuild for CSS minification instead of lightningcss
        rollupOptions: {
            input: path.resolve(__dirname, "index.html"),
        },
    },
});
