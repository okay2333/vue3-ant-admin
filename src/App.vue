<script setup lang="ts">
import { computed } from 'vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const currentLocale = computed(() => {
  return appStore.language === 'cn' ? zhCN : enUS
})
</script>

<template>
  <a-config-provider :locale="currentLocale">
    <RouterView />
  </a-config-provider>
</template>

<style scoped></style>
