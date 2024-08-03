<script setup lang="ts">
defineProps({
  open: Boolean
})
import {
  getExportTemplate as getExportTemplateApi,
  uploadExcel as uploadExcelApi
} from '@/api/employee'
import FileSaver from 'file-saver'
const getTemplate = async () => {
  const data = await getExportTemplateApi()
  FileSaver.saveAs(data, '员工导入模版.xlsx')
}

import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam } from 'ant-design-vue'
const fileList = ref([])
const handleUpload = async () => {
  console.log('自定义上传', fileList.value)
  if (fileList.value.length > 0) {
    // 大于0 说明有文件要上传
    const data = new FormData()
    // file: file类型
    data.append('file', fileList.value[0]) // 将文件参数加入到formData中
    await uploadExcelApi(data)
  }
}

const headers = {
  authorization: 'authorization-text'
}
</script>

<template>
  <a-modal :open="open" title="员工导入" :footer="false" :closable="false">
    <a-flex justify="center">
      <div class="upload-excel">
        <CloudUploadOutlined style="font-size: 60px; margin: 15px" />
        <a-button type="link" @click="getTemplate">下载导入模板</a-button>
        <div class="upload">
          将文件拖到此处或<a-upload
            v-model:file-list="fileList"
            name="file"
            :custom-request="handleUpload"
            :showUploadList="false"
          >
            <a-button type="link" class="ant-button">点击上传</a-button></a-upload
          >
        </div>
      </div>
    </a-flex>
    <a-flex justify="flex-end">
      <a-button type="primary" @click="$emit('cancel-modal')">取消</a-button>
    </a-flex>
  </a-modal>
</template>

<style scoped lang="scss">
.upload-excel {
  width: 360px;
  height: 180px;
  border: 1px dashed #dcdfe6;
  margin: 20px;
  display: flex;
  flex-direction: column;
  .upload {
    text-align: center;
    display: flex;
    align-content: center;
    justify-content: center;
    line-height: 32px;
    margin: 15px;
    color: #bbb;
    padding: 0;
    .ant-button {
      padding-left: 5px;
    }
  }
}
</style>
