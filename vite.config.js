import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/rincones_boyaca/",
  build: {
    outDir: 'docs',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mui")) return "mui";
            if (id.includes("leaflet") || id.includes("react-leaflet")) return "leaflet";
            if (id.includes("react")) return "react";
          }
        }
      }
    }
  }
});
