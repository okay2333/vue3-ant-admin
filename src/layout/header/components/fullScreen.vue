<script setup lang="ts">
import icon from '@/components/icon.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
<template>
  <icon :icon-name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" :size="25" @click="onToggle" />
</template>
<style scoped></style>
