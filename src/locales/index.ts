import { createI18n } from 'vue-i18n'

import type { App } from 'vue'
import { getLang } from '@/utils/lacaleLang'
import messages from './locale'
const i18n = createI18n({
  locale: getLang() || 'zh-CN',
  messages,
  // 默认true，vue3建议改false，勾子函数才能兼容vue3
  legacy: false,
  // 没有开启全局注入，就需使用 useI18n 钩子
  globalInjection: true
})

export default i18n

/**
 * Setup plugin i18n
 * @param app
 */
export function setI18n(app: App) {
  app.use(i18n)
}

export function setLocate(localeVal: any) {
  i18n.global.locale.value = localeVal
}
