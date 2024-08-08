<script lang="ts" setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import {
  getPermissionList as getPermissionListApi,
  updatePermission as updatePermissionApi,
  addPermission as addPermissionApi,
  getPermissionDetail as getPermissionDetailApi,
  delPermission as delPermissionApi
} from '@/api/permission'
import { transListToTreeData } from '@/utils'
import { onMounted, reactive, ref } from 'vue'
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '标识',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '操作',
    key: 'action'
  }
]

const permissionList = ref()
const getPermissionList = async () => {
  permissionList.value = transListToTreeData(await getPermissionListApi(), 0)
  console.log(permissionList.value)
}
onMounted(() => {
  getPermissionList()
})

// 弹窗
const formRef = ref()
const open = ref<boolean>(false)

const showModal = () => {
  open.value = true
}

const handleOk = async (e: MouseEvent) => {
  if (formData.value.id) {
    await updatePermissionApi(formData.value)
  } else {
    await addPermissionApi(formData.value)
  }
  getPermissionList()
  formRef.value.resetFields()
  open.value = false
}
const handleCancel = () => {
  formRef.value.resetFields()
}

const formData = ref<any>({
  name: '', // 名称
  code: '', // 标识
  description: '', // 描述
  type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
  pid: '', // 因为做的是树 需要知道添加到哪个节点下了
  enVisible: '0' // 默认关闭
})

// 新增权限
const addPermission = (pid: number, type: number) => {
  formData.value.pid = pid
  formData.value.type = type
  showModal()
}
// 编辑
const editPermission = async (id: number) => {
  // 根据获取id获取详情
  formData.value = await getPermissionDetailApi(id)
  showModal()
}
// 删除
const delPermission = async (id: number) => {
  await delPermissionApi(id)
  getPermissionList()
}
</script>

<template>
  <div class="container">
    <a-button type="primary" style="margin: 5px" @click="addPermission(0, 1)">新增权限</a-button>
    <a-table :columns="columns" :data-source="permissionList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>

        <template v-else-if="column.key === 'action'">
          <span>
            <template v-if="record.type === 1"
              ><a @click="addPermission(record.id, 2)">添加</a> <a-divider type="vertical"
            /></template>
            <a @click="editPermission(record.id)">编辑</a>
            <a-divider type="vertical" />
            <a @click="delPermission(record.id)" class="ant-dropdown-link"> 删除 </a>
          </span>
        </template>
      </template>
    </a-table>
  </div>

  <a-modal v-model:open="open" title="新增权限" @ok="handleOk" @cancel="handleCancel">
    <a-form ref="formRef" :model="formData" :wrapper-col="{ span: 25 }" style="margin: 40px">
      <a-form-item label="权限名称" name="name">
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item label="权限标识" name="code">
        <a-input v-model:value="formData.code" />
      </a-form-item>
      <a-form-item label="权限描述" name="description">
        <a-textarea v-model:value="formData.description" />
      </a-form-item>
      <a-form-item label="开启权限" name="enVisible">
        <a-switch v-model:checked="formData.enVisible" />
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
