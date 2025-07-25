import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/food",
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
  server: {
    proxy: {
      "/food/api": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/food\/api/, '')
      }
    }
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    APP_BUILD_DATE: JSON.stringify(new Date().toString()),
  }
})
