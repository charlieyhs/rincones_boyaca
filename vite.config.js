import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// rolldown-vite solo acepta manualChunks como función.
const CHUNKS = {
  react: ["react", "react-dom", "scheduler"],
  mui: ["@mui", "@emotion"],
  leaflet: ["leaflet", "react-leaflet", "@react-leaflet"],
};

function manualChunks(id) {
  if (!id.includes("node_modules")) return undefined;
  for (const [chunk, paquetes] of Object.entries(CHUNKS)) {
    if (paquetes.some((p) => id.includes(`/node_modules/${p}/`))) return chunk;
  }
  return undefined;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/rincones_boyaca/",
  build: {
    // Se despliega con GitHub Actions (.github/workflows/deploy.yml); no se versiona.
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks
      }
    }
  }
});
