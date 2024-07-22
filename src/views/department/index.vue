<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDepartment, getManagerList as getManagerListApi, addDepartment } from '@/api/department'
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
  getManagerList()
})

// 弹窗
const open = ref<boolean>(false)
const currentNodeId = ref<string>()
const showModal = (pid: string) => {
  currentNodeId.value = pid
  open.value = true
}
const addFormRef = ref()
const cancelModal = () => {
  addFormRef.value.resetFields()
  open.value = false
}
// 表格
import { reactive } from 'vue'

interface DeptState {
  name: string
  code: string
  managerId: string
  introduce: string
}

const formState = reactive<DeptState>({
  name: '',
  code: '',
  managerId: '',
  introduce: ''
})
import { message as $message } from 'ant-design-vue'
const onFinish = async (values: any) => {
  await addDepartment({ ...formState, pid: currentNodeId.value })
  initDepartment()
  $message.info('添加成功')
  console.log('Success:', values)
  cancelModal()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const managerList = ref()
const getManagerList = async () => {
  managerList.value = await getManagerListApi()
  console.log(managerList)
}
</script>

<template>
  <div class="container">
    <a-tree :tree-data="treeData" default-expand-all block-node>
      <template #title="{ id, name, managerName }">
        <a-row
          style="height: 40px; display: flex; justify-content: space-between; align-content: center"
        >
          <a-col :span="6">{{ name }}</a-col>
          <a-col :span="6" style="display: flex; justify-content: space-evenly">
            <span>{{ managerName }}</span>
            <a-dropdown>
              <a @click.prevent>
                操作
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="showModal(id)"> 添加子部门 </a-menu-item>
                  <a-menu-item> 编辑部门 </a-menu-item>
                  <a-menu-item> 删除部门 </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-col>
        </a-row>
      </template>
    </a-tree>
  </div>

  <a-modal v-model:open="open" title="新增部门" :footer="null">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      ref="addFormRef"
    >
      <a-form-item
        label="部门名称"
        name="name"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item
        label="部门编码"
        name="code"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input v-model:value="formState.code" />
      </a-form-item>

      <a-form-item label="部门负责人" name="managerId">
        <a-select v-model:value="formState.managerId" placeholder="please select your zone">
          <a-select-option v-for="item in managerList" :value="item.id">{{
            item.username
          }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="部门介绍"
        name="introduce"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input v-model:value="formState.introduce" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">添加</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped lang="scss">
.container {
  padding: 10px;
  min-height: calc(100vh - 65px);
}
</style>
