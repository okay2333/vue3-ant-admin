<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const routeList = ref([] as any)
const selectedKeys = ref<string[]>(['1'])
import { useUserStore } from '@/stores/user'
const selectMenuItem = (item: any) => {
  console.log(item.key)
}
onMounted(() => {
  const userStore = useUserStore()
  console.log(userStore.getRoutes())
  routeList.value = userStore.getRoutes()
})

// 使用计算属性过滤路由
const visibleRouteList = computed(() => {
  return routeList.value.filter((item: any) => !item.hidden)
})
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="selectMenuItem">
    <div class="logo" />
    <a-menu-item v-for="(item, index) in visibleRouteList" :key="index">
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
