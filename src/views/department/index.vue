<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import {
  getDepartment as getDepartmentApi,
  getManagerList as getManagerListApi,
  addDepartment,
  getDepartmentDetail,
  updateDepartment,
  delDepartment
} from '@/api/department'

interface TreeNode {
  id: number
  pid: number
  children?: TreeNode[]
  // 其他属性可以根据需要添加
  [key: string]: any
}

const treeData = ref<TreeNode['treeData']>([])

import { transListToTreeData } from '@/utils/index'
const getDepartment = async () => {
  const formResult = transListToTreeData(await getDepartmentApi(), 0)
  treeData.value = formResult
}

onMounted(() => {
  getDepartment()
  getManagerList()
})

// 弹窗
interface DeptState {
  id?: string
  name: string
  code: string
  managerId: string
  introduce: string
}

let formState = reactive<DeptState>({
  name: '',
  code: '',
  managerId: '',
  introduce: ''
})

const open = ref<boolean>(false)
const currentNodeId = ref<string>()

// 关闭弹窗并重置表单
const depFormRef = ref()
const cancelModal = () => {
  depFormRef.value.resetFields()
  open.value = false
}

// 添加部门的弹窗
const addShowModal = (pid: string) => {
  currentNodeId.value = pid
  open.value = true
}
// Modal完全关闭后的回调
const closeModal = () => {
  cancelModal()
}

// 编辑部门的弹窗
const editShowModal = async (pid: string) => {
  // $nextTick的异步
  currentNodeId.value = pid
  const data = await getDepartmentDetail(currentNodeId.value)
  formState = data
  open.value = true
}

// 添加和编辑模块查询负责人
const managerList = ref()
const getManagerList = async () => {
  managerList.value = await getManagerListApi()
}

import { message as $message } from 'ant-design-vue'
const onFinish = async (values: any) => {
  if (formState.id) {
    await updateDepartment(formState)
  } else {
    await addDepartment({ ...formState, pid: currentNodeId.value })
  }
  getDepartment()
  $message.info('操作成功', 3)
  cancelModal()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

// 删除部门
const confirmDel = async (id: string) => {
  await delDepartment(id)
  getDepartment()
  $message.success('删除成功')
}
</script>

<template>
  <div class="container">
    <a-tree :tree-data="treeData" default-expand-all block-node v-if="treeData.length > 0">
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
                  <a-menu-item @click="addShowModal(id)"> 添加子部门 </a-menu-item>
                  <a-menu-item @click="editShowModal(id)"> 编辑部门 </a-menu-item>
                  <a-menu-item>
                    <a-popconfirm
                      title="您确认要删除该部门吗?"
                      cancelText="取消"
                      okText="确认"
                      @confirm="confirmDel(id)"
                    >
                      删除部门
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-col>
        </a-row>
      </template>
    </a-tree>
  </div>

  <a-modal v-model:open="open" title="新增部门" :footer="null" :afterClose="closeModal">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      ref="depFormRef"
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
