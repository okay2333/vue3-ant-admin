<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
const route = useRoute()
const routeList = ref([] as any)
const selectedKeys = ref<string[]>(['/'])
const openKeys = ref<string[]>(['1'])
const selectMenuItem = (item: any) => {
  // console.log(item.key)
}

// 使用计算属性过滤路由
const visibleRouteList = computed(() => {
  return routeList.value.filter((item: any) => !item.hidden)
})
onMounted(() => {
  const userStore = useUserStore()
  routeList.value = userStore.getRoutes()
  selectedKeys.value = [route.path]
})
</script>

<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    theme="dark"
    mode="inline"
    @click="selectMenuItem"
  >
    <div class="logo" />
    <a-menu-item v-for="(item, index) in visibleRouteList" :key="item.path">
      <template v-if="item.children?.[0]?.meta?.icon">
        <component :is="item.children[0].meta.icon" />
      </template>
      <span>{{ item.children[0].meta.title }}</span>
      <router-link :to="item.path"></router-link>
    </a-menu-item>
  </a-menu>
</template>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
