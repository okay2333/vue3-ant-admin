<template>
  <a-layout>
    <a-layout-sider theme="dark" collapsible><Sider /></a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ backgroundColor: '#FFFFFF' }"><Header /></a-layout-header>
      <a-layout-content><router-view /></a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import Sider from '@/layout/sider/index.vue'
import Header from '@/layout/header/index.vue'
</script>
