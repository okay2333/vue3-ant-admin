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
import icon from '@/components/icon.vue'
console.log('过滤后的路由', routes.value)
import { generateTitle } from '@/utils/i18n'
</script>

<template>
  <a-menu :open-keys="openKeys" @update:openKeys="handleOpenKeysChange" mode="inline" theme="dark">
    <template v-for="route in routes">
      <a-sub-menu v-if="route.children.length" :key="route.path">
        <template #title>
          <icon
            :icon-name="route.meta.icon"
            :style="{ color: '#FFFFF', fontSize: '15px' }"
            class="item-icon"
          />
          {{ generateTitle(route.meta.title) }}
        </template>
        <a-menu-item v-for="child in route.children" :key="child.path">
          <icon :icon-name="child.meta.icon" :style="{ color: '#FFFFF' }" />
          <router-link :to="child.path"> {{ generateTitle(child.meta.title) }}</router-link>
        </a-menu-item>
      </a-sub-menu>
      <!-- 只有一个节点 -->
      <a-menu-item v-else :key="route.path as string">
        <icon :icon-name="route.meta.icon" :style="{ color: '#FFFFF' }" />
        <router-link :to="route.path">{{ generateTitle(route.meta.title) }}</router-link>
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
