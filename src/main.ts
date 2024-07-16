import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'

import App from './App.vue'
import router from './router'

import './router/premission'

import * as antIcons from '@ant-design/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
Object.keys(antIcons).forEach((key) => {
  app.component(key, antIcons[key as keyof typeof antIcons])
})
