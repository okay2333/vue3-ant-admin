<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { onMounted, reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import { message as $message } from 'ant-design-vue'
import {
  getRoleList as getRoleListApi,
  addRole as addRoleApi,
  updateRole as updateRoleApi,
  delRole as delRoleApi,
  assignPerm as assignPermApi
} from '@/api/role'

const columns = [
  {
    title: '角色',
    dataIndex: 'name',
    width: '25%'
  },
  {
    title: '启用',
    dataIndex: 'state',
    width: '15%'
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: '30%'
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]

interface RoleItem {
  id?: number
  name: string
  description: string
  state: number
}

interface RoleTotal {
  rows: RoleItem[]
  total: number
}

// const dataSource = ref<RoleItem[]>([])
const dataSource = ref<RoleItem[]>([]) // 修正类型定义
const editableData: UnwrapRef<Record<number, any>> = reactive({})

// 行内编辑
const edit = (id: number) => {
  console.log(id)
  console.log(editableData)
  editableData[id] = cloneDeep(dataSource.value.filter((item: RoleItem) => id === item.id)[0])
  console.log(editableData)
}
const save = async (id: number) => {
  Object.assign(dataSource.value.filter((item) => id === item.id)[0], editableData[id])
  console.log('参数', dataSource.value.filter((item) => id === item.id)[0])
  await updateRoleApi(dataSource.value.filter((item) => id === item.id)[0])
  delete editableData[id]
  getRoleList()
}
const cancel = (id: number) => {
  delete editableData[id]
}

const getRoleList = async () => {
  const { rows, total: selectTotal } = await getRoleListApi(para.value)
  total.value = selectTotal
  dataSource.value = rows
  console.log('初始化数据', dataSource.value)
}

// 删除
const confirmDel = async (id: number) => {
  await delRoleApi(id) // 后端删除
  $message.success('删除成功！')
  getRoleList()
}
onMounted(() => {
  getRoleList()
})
// 分页
const current = ref(1)
const pageSize = ref(5)
const total = ref()

// 自定义分页查询参数
const para = ref({
  page: current.value,
  pagesize: pageSize.value
})

const handlePageChange = (page: number) => {
  para.value.page = page
  current.value = page
  getRoleList()
}

// 添加角色的弹窗
interface FormState {
  name: string
  description: string
  state: number
}
const formState = reactive<FormState>({
  name: '',
  description: '',
  state: 0
})
const roleRef = ref()
const openAddRoleModal = ref<boolean>(false)
const showAddRoleModal = () => {
  openAddRoleModal.value = true
}

const onFinish = async (values: any) => {
  if (formState.state) {
    formState.state = 1
  } else {
    formState.state = 0
  }
  await addRoleApi(formState)
  cancelModal()
  getRoleList()
}

const closeModal = () => {
  cancelModal()
}

const cancelModal = () => {
  roleRef.value.resetFields()
  openAddRoleModal.value = false
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

// 分配权限的弹窗
import { transListToTreeData } from '@/utils/index'
import { getPermissionList as getPermissionListApi } from '@/api/permission'
import { getRoleDetail as getRoleDetailApi } from '@/api/role'
interface TreeNode {
  id: number
  pid: number
  children?: TreeNode[]
  // 其他属性可以根据需要添加
  [key: string]: any
}

const treeData = ref<TreeNode['treeData']>([]) // 数型组件
const currentRoleId = ref() // 储存当前角色id
const openPermissionModal = ref<boolean>(false)
const permIds = ref([]) // 多选框双向绑定
const showPermissionModal = async (id: number) => {
  currentRoleId.value = id
  treeData.value = transListToTreeData(await getPermissionListApi(), 0)
  const { permIds: fetchedPermIds } = await getRoleDetailApi(id)
  permIds.value = fetchedPermIds
  openPermissionModal.value = true
}

const handlePermissionOk = async (e: MouseEvent) => {
  await assignPermApi({
    id: currentRoleId.value,
    permIds: permIds.value
  })
  openPermissionModal.value = false
  $message.success('角色分配权限成功')
}
</script>

<template>
  <div class="container">
    <a-button type="primary" @click="showAddRoleModal" style="margin-bottom: 10px"
      >添加角色</a-button
    >
    <a-table :columns="columns" :data-source="dataSource" :pagination="false">
      <template #bodyCell="{ column, text, record }">
        <template v-if="['name', 'state', 'description'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0; background-color: blanchedalmond"
            />
            <template v-else-if="column.dataIndex === 'state'">
              {{ text ? '已启动' : '未启用' }}
            </template>
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.id]">
              <a-typography-link @click="save(record.id)">
                <a-button type="primary">保存</a-button></a-typography-link
              >
              <a @click="cancel(record.id)">取消</a>
            </span>
            <span v-else>
              <a @click="showPermissionModal(record.id)">分配权限</a>
              <a @click="edit(record.id)">编辑</a>
              <a-popconfirm
                title="确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirmDel(record.id)"
              >
                <a href="#">删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </template>
    </a-table>
    <a-pagination
      :current="current"
      :pageSize="pageSize"
      :total="total"
      @change="handlePageChange"
      :show-total="(total: any) => `共 ${total} 条`"
      style="float: right"
    />
  </div>
  <!-- 添加角色的弹窗 -->
  <a-modal v-model:open="openAddRoleModal" title="添加角色" :footer="null" :afterClose="closeModal">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      ref="roleRef"
    >
      <a-form-item
        label="角色名称"
        name="name"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="启用">
        <a-switch v-model:checked="formState.state" />
      </a-form-item>

      <a-form-item
        label="角色描述"
        name="description"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-textarea v-model:value="formState.description" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">添加</a-button>
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- 分配权限的弹窗 -->
  <a-modal v-model:open="openPermissionModal" title="分配权限" @ok="handlePermissionOk">
    <a-tree
      v-model:checkedKeys="permIds"
      checkable
      :tree-data="treeData"
      :fieldNames="{ key: 'id' }"
      :defaultExpandAll="true"
      v-if="treeData.length > 0"
    >
      <template #title="{ title, id, name }">
        <p>{{ name }}</p>
      </template>
    </a-tree>
  </a-modal>
</template>

<style scoped lang="scss">
.container {
  padding: 10px;
  min-height: calc(100vh - 65px);
}

.editable-row-operations a {
  margin-right: 8px;
}
</style>
