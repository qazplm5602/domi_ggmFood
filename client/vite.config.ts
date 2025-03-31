import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@styles', replacement: path.resolve(__dirname, "src/styles") },
      { find: '@components', replacement: path.resolve(__dirname, "src/components") },
      { find: '@assets', replacement: path.resolve(__dirname, "src/assets") }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@styles/declare/_declare.scss" as *;
        `,
      },
    },
  },
})
