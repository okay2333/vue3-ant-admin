import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// svg图标
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定要导入的图标所在的文件夹。
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbol id的格式
      symbolId: 'icon-[dir]-[name]',
      customDomId: '__svg__icons__dom__'
    })
  ],
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
