<script lang="ts" setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { getPermissionList as getPermissionListApi } from '@/api/permission'
import { transListToTreeData } from '@/utils'
import { onMounted, ref } from 'vue'
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
</script>

<template>
  <div class="container">
    <a-table :columns="columns" :data-source="permissionList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>

        <template v-else-if="column.key === 'action'">
          <span>
            <template v-if="record.type === 1"><a>添加</a> <a-divider type="vertical" /></template>

            <a>编辑</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              删除
              <down-outlined />
            </a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 10px;
  min-height: calc(100vh - 65px);
}
</style>
