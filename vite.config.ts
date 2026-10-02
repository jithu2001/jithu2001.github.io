import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// jithu2001.github.io is a GitHub Pages *user* site, so it is served from "/".
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    // three.js only loads with the lazy hero scene, so its large chunk is expected.
    chunkSizeWarningLimit: 1000,
  },
})
