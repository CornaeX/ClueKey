import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.webm', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],

  server: {
    allowedHosts: ['localhost', '127.0.0.1', 'cluekey.netlify.app'],
  },
})