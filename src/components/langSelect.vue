<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import icon from '@/components/icon.vue'
const i18n = useI18n()
import { message as $message } from 'ant-design-vue'
import { ref, watch } from 'vue'
const appStore = useAppStore()
let lang = ref(appStore.language)
// 国际化
const handleSetLanguage = (e: any) => {
  i18n.locale.value = e.key
  appStore.setLanguage(e.key)
  $message.success('切换成功', 5)
}

watch(
  () => appStore.language,
  (newLang) => {
    lang.value = newLang
  }
)
</script>
<template>
  <a-dropdown>
    <template #overlay>
      <a-menu @click="handleSetLanguage">
        <a-menu-item key="cn" :disabled="lang == 'cn'"> 中文 </a-menu-item>
        <a-menu-item key="en" :disabled="lang === 'en'"> English </a-menu-item>
      </a-menu>
    </template>
    <icon iconName="language" :size="25" />
  </a-dropdown>
</template>

<style scoped></style>
