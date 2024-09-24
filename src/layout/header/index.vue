<script setup lang="ts">
import headerSearch from '@/layout/header/components/headerSearch.vue'
import fullScreen from '@/layout/header/components/fullScreen.vue'
import changTheme from '@/layout/header/components/changTheme.vue'
import langSelect from '@/components/langSelect.vue'
import userInfo from '@/layout/header/components/userInfo.vue'
</script>

<template>
  <a-flex justify="space-between">
    <div>
      {{ $route.path }}
    </div>

    <div class="right-container">
      <headerSearch />
      <fullScreen class="hover-effect" />
      <changTheme />
      <langSelect class="hover-effect" />
      <userInfo />
    </div>
  </a-flex>
</template>

<style scoped lang="scss">
.right-container {
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ::v-deep .hover-effect {
    cursor: pointer;
  }
}
</style>
