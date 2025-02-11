import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.deepseek.com/chat/completions', // 目标 API 地址
        changeOrigin: true, // 允许跨域
        // secure: false, // 如果是 HTTPS，通常设为 true
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉 `/api`
      },
    },
  },
})
