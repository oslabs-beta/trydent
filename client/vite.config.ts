import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// Define vite configurations
export default defineConfig({
  // Configure the development server
  server: {
    // Port that the development server should run on
    port: 3000,
    // Proxy for API requests to avoid CORS issues
    proxy: {
      '/api': 'Enter your backend host with port',
    },
  },
  // Configure the build process
  build: {
    // Set output directory for built files
    outDir: '../extension/bundles',
    // Empty the output directory before building
    emptyOutDir: true,
    // update output to have constant build file names, removing the hash
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    // set limit of chunk size to 1kb before warning
    chunkSizeWarningLimit: 2000,
  },
  // Configure plugins
  plugins: [
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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./scss/application.scss";',
      }
    }
  }
});
