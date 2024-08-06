<script setup lang="ts">
import { onMounted, ref, defineEmits } from 'vue'
// 定义发射事件的 emit
const emit = defineEmits(['sendData'])
const cascaderList = ref<string[]>([])

import { transListToTreeData } from '@/utils/index'
import { getDepartment as getDepartmentApi } from '@/api/department'

const treeData = ref()

const getDepartment = async () => {
  treeData.value = transListToTreeData(await getDepartmentApi(), 0)
  console.log(treeData)
}

onMounted(() => {
  getDepartment()
})

const changeValue = () => {
  // 取到数组的最后一次
  if (cascaderList.value.length > 0) {
    emit('sendData', cascaderList.value[cascaderList.value.length - 1])
  } else {
    emit('sendData', null) // 如果长度为0 说明值为空
  }
}
</script>

<template>
  <a-cascader
    v-model:value="cascaderList"
    :options="treeData"
    placeholder="Please select"
    :field-names="{ label: 'name', value: 'id', children: 'children' }"
    @change="changeValue"
  />
</template>

<style scoped lang="scss"></style>
