<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const routeList = ref([] as any)
const selectedKeys = ref<string[]>(['控制台'])

const selectMenuItem = (item: any) => {
  console.log(item.key)
}
onMounted(() => {
  console.log(router.getRoutes())
  console.log(router.options.routes[1].children)
  routeList.value = router.options.routes[1].children
})
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="selectMenuItem">
    <div class="logo" />
    <template v-for="(item, index) in routeList" :key="item.name">
      <a-menu-item>
        <template v-if="item?.meta?.icon">
          <component :is="item.meta.icon" />
          <!-- <Icon :icon="item.meta.icon" /> -->
        </template>
        <span>{{ item.name }}</span>
        <router-link :to="item.path"></router-link>
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
