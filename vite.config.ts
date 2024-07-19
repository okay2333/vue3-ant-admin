import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://heimahr.itheima.net',
        changeOrigin: true, // 表示开启代理, 允许跨域请求数据
        secure: false // 如果是https接口，需要配置这个参数
      }
    }
  }
})
