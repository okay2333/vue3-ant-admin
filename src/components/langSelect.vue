<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

const appStore = useAppStore()
// 国际化
const handleSetLanguage = (e: any) => {
  i18n.locale.value = e.key
  appStore.setLanguage(e.key)
}
</script>
<template>
  <div>
    <a-dropdown>
      <template #overlay>
        <a-menu @click="handleSetLanguage">
          <a-menu-item key="cn"> 中文 </a-menu-item>
          <a-menu-item key="en"> English </a-menu-item>
        </a-menu>
      </template>

      <svg class="icon" aria-hidden="true" style="font-size: 25px">
        <use xlink:href="#icon-guojihua"></use>
      </svg>
    </a-dropdown>
  </div>
</template>

<style scoped></style>
