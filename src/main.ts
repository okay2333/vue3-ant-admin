import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'

import App from './App.vue'
import router from './router'

import './router/premission'

import * as antIcons from '@ant-design/icons-vue'

// vue-i18n 国际化
import i18n from '@/i18n/index'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(i18n)

app.mount('#app')
Object.keys(antIcons).forEach((key) => {
  app.component(key, antIcons[key as keyof typeof antIcons])
})

// 自定义组件
import { useUserStore } from '@/stores/user'
app.directive('permission', (el, binding) => {
  const userStore = useUserStore()
  const points = userStore.userInfo.roles.points || []
  if (!points.includes(binding.value)) {
    // 不存在就要删除或者禁用
    el.remove()
  }
})
