<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { TableColumnType } from 'ant-design-vue'
import { getApprovalList as getApprovalListApi } from '@/api/approval'
import pageTools from '@/views/approval/components/page-tools.vue'
interface Approval {
  processName: string
  username: string
  procCurrNodeUserName: string
  processState: number
  processId: string
}

const list = ref<any>([])
const loading = ref(false)
const router = useRouter()
const page = ref({
  page: 1,
  total: 0,
  pageSize: 10
})

const columns: TableColumnType[] = [
  { title: '序号', dataIndex: 'processId', key: 'processId' },
  {
    title: '审批类型',
    dataIndex: 'processName',
    key: 'processName',
    sorter: (a: Approval, b: Approval) => a.processName.length - b.processName.length
  },
  {
    title: '申请人',
    dataIndex: 'username',
    key: 'username',
    sorter: (a: Approval, b: Approval) => a.username.length - b.username.length
  },
  {
    title: '当前审批人',
    dataIndex: 'procCurrNodeUserName',
    key: 'procCurrNodeUserName',
    sorter: (a: Approval, b: Approval) =>
      a.procCurrNodeUserName.length - b.procCurrNodeUserName.length
  },
  {
    title: '审批发起时间',
    key: 'date',
    sorter: true,
    customRender: () => new Date().toLocaleString()
  },
  {
    title: '审批状态',
    key: 'processState',
    sorter: (a: Approval, b: Approval) => a.processState - b.processState,
    customRender: (record) => {
      switch (record.value.processState) {
        case 0:
          return '已提交'
        case 1:
          return '审批中'
        case 2:
          return '审批通过'
        case 3:
          return '审批不通过'
        case 4:
          return '撤销'
        default:
          return ''
      }
    }
  }
]

const getApprovalList = async () => {
  loading.value = true
  const { rows, total } = await getApprovalListApi({ year: 2018, ...page.value })
  console.log('rows值：', rows)
  console.log('total值：', total)

  page.value.total = total
  list.value = rows
  //   loading.value = false
}

const toDetail = (record: Approval) => {
  switch (record.processName) {
    case '工资':
      router.push(`/approvals/salaryApproval/${record.processId}`)
      break
    case '入职':
      router.push(`/approvals/enterApproval/${record.processId}`)
      break
    case '请假':
      router.push(`/approvals/leaveApproval/${record.processId}`)
      break
    case '离职':
      router.push(`/approvals/quitApproval/${record.processId}`)
      break
    case '加班':
      router.push(`/approvals/overtimeApproval/${record.processId}`)
      break
  }
}

const changePage = (newPage: number) => {
  page.value.page = newPage
  getApprovalList()
}

onMounted(() => {
  getApprovalList()
})
</script>
<template>
  <div class="container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <template #before>当前审批中 0 本月审批通过 1 本月审批驳回 0</template>
        <template>
          <a-button type="primary" @click="() => $router.push('/approvals/securitySetting')"
            >流程设置</a-button
          >
        </template>
      </page-tools>
      <!-- <ApprovalPageTool /> -->
      <a-card class="hr-block">
        <a-table :columns="columns" :data-source="list" :pagination="false" />
        <!-- 分页组件 -->
        <a-pagination
          style="float: right; margin: 10px"
          :total="page.total"
          :page-size="page.pageSize"
          :current="page.page"
          @change="changePage"
        />
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
  min-height: calc(100vh - 65px);
  padding: 20px;
}
.hr-block {
  margin-top: 20px;
}
</style>
