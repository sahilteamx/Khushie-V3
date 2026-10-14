/**
 * Vite Configuration for Khushie V3
 * Supports configurable base path for GitHub Pages deployment (root or repository subdirectory).
 */
export default {
  base: process.env.VITE_BASE_PATH || './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser'
  },
  server: {
    port: 5173,
    strictPort: false
  }
};
