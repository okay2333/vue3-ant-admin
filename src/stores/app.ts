import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant/index'
import { ref } from 'vue'
export const useAppStore = defineStore('app', () => {
  let language = ref(getItem(LANG) || 'cn')
  function setLanguage(lang: string) {
    setItem(LANG, lang)
    language.value = lang
  }
  return {
    language,
    setLanguage
  }
})
