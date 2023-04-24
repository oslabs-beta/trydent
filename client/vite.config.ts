import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import sassDts from "vite-plugin-sass-dts";
import path from "path";

// Define vite configurations
export default defineConfig({
  // Configure the development server
  server: {
    // Port that the development server should run on
    port: 3000,
    // Proxy for API requests to avoid CORS issues
    proxy: {
      "/api": "Enter your backend host with port",
    },
  },
  // Configure the build process
  build: {
    // Set output directory for built files
    outDir: "../extension/bundles/client",
    // Empty the output directory before building
    emptyOutDir: true,
  },
  // // create dts file by saving scss file during development
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/styles" as common;`,
  //       importer(...args) {
  //         if (args[0] !== '@/styles') {
  //           return
  //         }

  //         return {
  //           file: `${path.resolve(__dirname, './src/assets/styles')}`,
  //         }
  //       },
  //     },
  //   },
  // },
  // Configure plugins
  plugins: [
    // Use SCSS Files during development
    sassDts(),
    // Use React plugin for handling React components
    react(),
    // Use SVGR plugin for handling SVG files as React components
    svgrPlugin({
      svgrOptions: {
        // Set the SVG components to be treated as icons (no width or height attributes)
        icon: true,
      },
    }),
  ],
});