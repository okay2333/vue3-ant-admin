<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDepartment as getDepartmentApi } from '@/api/department'
import { getEmployeeList as getEmployeeApi } from '@/api/employee'
import { transListToTreeData } from '@/utils/index'

const timer = ref()
// 搜索框
const onSearch = (searchValue: string) => {
  // 单位时间内只执行最后一次
  // this的实例上赋值了一个timer的属性
  clearTimeout(timer.value) // 清理上一次的定时器
  timer.value = setTimeout(() => {
    queryParams.value.page = 1
    getEmployeeList()
  }, 300)
}

// 左树结构
interface TreeNode {
  id: number
  pid: number
  children?: TreeNode[]
  // 其他属性可以根据需要添加
  [key: string]: any
}

const treeData = ref<TreeNode['treeData']>([])

const deptTree = ref<any>([])

// 分页
const current = ref(1)
const pageSize = ref(5)
const total = ref()

// 查询对应部门
const queryParams = ref({
  departmentId: null,
  page: current.value,
  pagesize: pageSize.value,
  keyword: '' // 模糊搜索字段
})

// const expandedKeys = ref()
// 查询左树列表
const getDepartment = async () => {
  const depts = transListToTreeData(await getDepartmentApi(), 0)
  treeData.value = depts
  queryParams.value.departmentId = treeData.value[0].id
  treeData.value.forEach(addKeyToTree)
  // expandedKeys.value = 1
  getEmployeeList()
  treeData.value.forEach((Element: any) => {
    console.log(Element.id)
  })
}
const addKeyToTree = (node: any) => {
  node.key = node.id
  if (node.children && node.children.length > 0) {
    node.children.forEach(addKeyToTree)
  }
}

// 选中左数节点
const selectNode = (selectedKeys: any) => {
  console.log(selectedKeys[0])
  queryParams.value.departmentId = selectedKeys[0]
  getEmployeeList()
}

//查询右表
const getEmployeeList = async () => {
  console.log('参数queryParams：', queryParams.value.departmentId)
  const { rows, total: selectTotal } = await getEmployeeApi(queryParams.value)
  total.value = selectTotal
  console.log('@@@')
  console.log(data)
  EmpDataForm.value = rows
  console.log('表格', EmpDataForm)
}
onMounted(() => {
  getDepartment()
})

// 表格结构
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import type { anyType } from 'ant-design-vue/es/_util/type'
const columns = [
  {
    title: '头像',
    dataIndex: 'staffPhoto',
    key: 'staffPhoto'
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile'
  },
  {
    title: '工号',
    key: 'workNumber',
    dataIndex: 'workNumber'
  },
  {
    title: '聘用形式',
    key: 'formOfEmployment',
    dataIndex: 'formOfEmployment'
  },
  {
    title: '部门',
    key: 'departmentName',
    dataIndex: 'departmentName'
  },
  {
    title: '入职时间',
    key: 'timeOfEntry',
    dataIndex: 'timeOfEntry'
  },
  {
    title: '操作',
    key: 'action'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
interface EmpState {
  staffPhoto: string
  username: string
  mobile: string
  workNumber: string
  formOfEmployment: string
  departmentName: string
  timeOfEntry: string
}
// reactive定义的变量响应式丢失问题??
let EmpDataForm = ref<EmpState[]>([])

// 自定义分页查询参数
const para = ref({
  page: current.value,
  pagesize: pageSize.value
})

const handlePageChange = (page: number) => {
  queryParams.value.page = page
  current.value = page
  getEmployeeList()
}
</script>

<template>
  <div class="container">
    <div class="left">
      <div class="search">
        <a-input-search
          v-model:value="queryParams.keyword"
          placeholder="输入员工姓名全员搜索"
          enter-button
          @search="onSearch"
        />
      </div>
      <!-- 左树结构 -->
      <div class="tree">
        <a-tree
          :tree-data="treeData"
          ref="deptTree "
          @select="selectNode"
          :defaultExpandAll="true"
          v-if="treeData.length > 0"
        >
          <template #title="{ id, name }">
            <a-col style="width: 200px; height: 40px; border-radius: 0; line-height: 40px">{{
              name
            }}</a-col>
          </template>
        </a-tree>
      </div>
    </div>
    <div class="right">
      <div class="right_button">
        <a-flex gap="small" justify="flex-end">
          <a-button type="primary">添加员工</a-button>
          <a-button>Excel导出</a-button>
          <a-button type="dashed">Excel导入</a-button>
        </a-flex>
      </div>
      <!-- 右表结构 -->
      <div>
        <a-table :columns="columns" :data-source="EmpDataForm" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'staffPhoto'">
              <template v-if="record.staffPhoto"
                ><a-avatar :src="record.staffPhoto"> </a-avatar
              ></template>
              <template v-else-if="!record.staffPhoto"
                ><a-avatar>{{ record.username.charAt(0) }} </a-avatar></template
              >
            </template>

            <template v-if="column.key === 'formOfEmployment'">
              <template v-if="record.formOfEmployment === 1">正式员工</template>
              <template v-else>临时员工</template>
            </template>
            <template v-else-if="column.key === 'action'">
              <span>
                <a>查看</a>
                <a-divider type="vertical" />
                <a>角色 </a>
                <a-divider type="vertical" />
                <a>删除 </a>
              </span>
            </template>
          </template>
        </a-table>
        <a-pagination
          :current="current"
          :pageSize="pageSize"
          :total="total"
          @change="handlePageChange"
          :show-total="(total: any) => `共 ${total} 条`"
          style="float: right; margin: 5px 0"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 10px;
  min-height: calc(100vh - 65px);
  display: flex;
  .left {
    width: 280px;
    .search {
      margin: 5px 0;
    }
  }
  .right {
    flex: 1;
    .right_button {
      margin: 5px;
    }
  }
}
</style>
