import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/portfolio/' : '/',
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Keep the 3D runtime in its own chunk so the rest of the page loads first.
        codeSplitting: {
          groups: [
            { name: 'three', test: /node_modules[\\/](three|@react-three)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils|gsap|lenis)[\\/]/ },
          ],
        },
      },
    },
  },
})
