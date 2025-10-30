import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Importante para GitHub Pages: ruta base del repo
  base: '/studify-vscode/',
  plugins: [react()],
})
