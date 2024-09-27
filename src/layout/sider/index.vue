<script setup lang="ts">
import { ref, computed } from 'vue'
const openKeys = ref<string[]>(['1'])
const handleOpenKeysChange = (keys: string[]) => {
  openKeys.value = keys
}
import { useRouter } from 'vue-router'

import { filterRouters, generateMenus } from '@/utils/route'
const router = useRouter()
const routes = computed(() => {
  return generateMenus(filterRouters(router.getRoutes()))
})
</script>

<template>
  <a-menu :open-keys="openKeys" @update:openKeys="handleOpenKeysChange" mode="inline" theme="dark">
    <template v-for="route in routes">
      <a-sub-menu v-if="route.children.length" :key="route.path" :title="route.meta.title">
        <a-menu-item v-for="child in route.children" :key="child.path" :title="child.meta.title">
          <router-link :to="child.path">{{ child.meta.title }}</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="route.path as string">
        <router-link :to="route.path">{{ route.meta.title }}</router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
