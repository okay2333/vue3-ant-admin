<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const routeList = ref([])

const selectedKeys = ref<string[]>(['3'])
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined
} from '@ant-design/icons-vue'

const selectMenuItem = (item, key) => {
  console.log(item)
}
onMounted(() => {
  console.log(router.getRoutes())
  console.log(router.options.routes[1].children)
  routeList.value = router.options.routes[1].children
})
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" @select="selectMenuItem">
    <template v-for="(item, index) in routeList">
      <a-menu-item>
        <span>{{ item.name }}</span>
        <router-link :to="item.path"></router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<style scoped></style>
