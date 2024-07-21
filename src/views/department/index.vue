<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDepartment } from '@/api/department'
interface TreeNode {
  id: number
  pid: number
  children?: TreeNode[]
  // 其他属性可以根据需要添加
  [key: string]: any
}
// 定义 treeData 为一个 ref，初始值为空数组
const treeData = ref<TreeNode['treeData']>([
  {
    title: '传媒科技',
    key: '0-0',
    children: [
      {
        title: '人事部',
        key: '0-0-0',
        children: [
          { title: 'Alice', key: '0-0-0-0' },
          { title: 'Bob', key: '0-0-0-1' }
        ]
      },
      {
        title: '技术部',
        key: '0-0-1',
        children: [{ key: '0-0-1-0', title: 'sss' }]
      }
    ]
  }
])

import { transListToTreeData } from '@/utils/index'
const initDepartment = async () => {
  const result = await getDepartment()
  const formResult = transListToTreeData(result, 0)
  treeData.value = formResult
  console.log(formResult)
}
onMounted(() => {
  initDepartment()
})
</script>

<template>
  <div class="container">
    <a-tree :tree-data="treeData" default-expand-all>
      <template #title="{ name, managerName }">
        <span>{{ name }} -- {{ managerName }} </span>
      </template>
    </a-tree>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 10px;
  min-height: calc(100vh - 65px);
}
</style>
