import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Importante para GitHub Pages: ruta base del repo
  base: '/Studify/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          lottie: ['lottie-react'],
          ui: ['lucide-react'],
        },
      },
      // keep chunk size warnings relaxed for dev
      // chunkSizeWarningLimit: 1000,
    },
  },
})
