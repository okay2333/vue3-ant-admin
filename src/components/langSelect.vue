<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import icon from '@/components/icon.vue'
const i18n = useI18n()

const appStore = useAppStore()
// 国际化
const handleSetLanguage = (e: any) => {
  i18n.locale.value = e.key
  appStore.setLanguage(e.key)
}
</script>
<template>
  <a-dropdown>
    <template #overlay>
      <a-menu @click="handleSetLanguage">
        <a-menu-item key="cn"> 中文 </a-menu-item>
        <a-menu-item key="en"> English </a-menu-item>
      </a-menu>
    </template>
    <icon iconName="language" :size="25" />
  </a-dropdown>
</template>

<style scoped></style>
