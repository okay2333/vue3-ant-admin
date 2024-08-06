<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  addEmployee as addEmployeeApi,
  getEmployeeDetail as getEmployeeDetailApi
} from '@/api/employee'
let userInfo = ref({
  username: '',
  workNumber: '',
  mobile: '',
  departmentId: '',
  formOfEmployment: '',
  timeOfEntry: null,
  correctionTime: null,
  avatar: ''
})

const handleSubmit = async () => {
  await addEmployeeApi(userInfo)
  // 此处可以添加提交逻辑
  message.success('信息已保存')
}
import selectTree from '@/views/employee/select-tree.vue'
const handleData = (value: any) => {
  console.log(value)
  userInfo.value.departmentId = value
}
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(() => {
  route.params.id && getEmployeeDetail()
})
import dayjs, { Dayjs } from 'dayjs'
const dateFormat = 'YYYY/MM/DD'
const getEmployeeDetail = async () => {
  const result = await getEmployeeDetailApi(route.params.id)
  // 转换日期字符串为 dayjs 对象
  result.timeOfEntry = ref<Dayjs>(dayjs(result.timeOfEntry, dateFormat))
  result.correctionTime = ref<Dayjs>(dayjs(result.correctionTime, dateFormat))
  userInfo.value = result
  console.log(userInfo.value)
}

// 头像上传
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const fileList = ref([])
const loading = ref<boolean>(false)
const imageUrl = ref<string>('')

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url
      loading.value = false
    })
  }
  if (info.file.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
</script>
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <a-form :model="userInfo" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
          <!-- 姓名 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="姓名" name="username">
                <a-input size="small" v-model:value="userInfo.username" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 工号 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="工号" name="workNumber">
                <a-input size="small" v-model:value="userInfo.workNumber" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 手机 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="手机" name="mobile">
                <a-input size="small" v-model:value="userInfo.mobile" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 部门 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="部门" name="departmentId">
                <!-- 放置及联部门组件 -->
                <selectTree @sendData="handleData" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 聘用形式 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="聘用形式" name="formOfEmployment">
                <a-select size="small" v-model:value="userInfo.formOfEmployment">
                  <!-- Select Options -->
                  <a-select-option value="1">正式</a-select-option>
                  <a-select-option value="0">非正式</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 入职时间 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="入职时间" name="timeOfEntry">
                <a-date-picker size="small" v-model:value="userInfo.timeOfEntry" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 转正时间 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="转正时间" name="correctionTime">
                <a-date-picker size="small" v-model:value="userInfo.correctionTime" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 员工照片 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="员工头像" name="avatar">
                <!-- 放置上传图片 -->
                <a-upload
                  v-model:file-list="fileList"
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                  <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 保存个人信息 -->
          <a-row type="flex">
            <a-col :span="12" style="margin-left: 220px">
              <a-button type="primary" size="small" @click="handleSubmit">保存更新</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-form {
  background: #fff;
  padding: 20px;
}

.edit-form .ant-input,
.edit-form .ant-select,
.edit-form .ant-picker {
  width: 380px;
}
</style>
