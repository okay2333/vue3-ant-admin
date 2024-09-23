import { createPinia, getActivePinia, setActivePinia } from 'pinia'

// 检查是否已经有活跃的 Pinia 实例，如果没有则创建
if (!getActivePinia()) {
  const pinia = createPinia()
  setActivePinia(pinia)
}
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  cn: {
    msg: {
      ...mZhLocale
    }
  }
}
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const locale = appStore.language

import { createI18n } from 'vue-i18n'
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  messages
})
export default i18n
