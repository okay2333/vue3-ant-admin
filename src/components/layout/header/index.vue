<script setup lang="ts">
import { reactive, ref } from 'vue'

interface UserType {
  name: string
  avatar: string
}
const user = ref<UserType>({
  name: '管理员',
  avatar: 'https://www.antdv.com/assets/logo.1ef800a8.svg'
})
</script>

<template>
  <a-flex justify="space-between">
    <div>
      {{ $route.path }}
    </div>

    <div>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar shape="square" :src="user.avatar" v-if="user.avatar"> </a-avatar>
          <a-avatar shape="square" v-else>
            <span>{{ user.name.charAt(0) }}</span>
          </a-avatar>
          {{ user.name }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a target="_blank" rel="noopener noreferrer"> 首页 </a>
            </a-menu-item>
            <a-menu-item key="1">项目地址</a-menu-item>
            <a-menu-item key="2">修改密码</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">登出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-flex>
</template>

<style scoped></style>
