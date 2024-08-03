<script setup lang="ts">
defineProps({
  open: Boolean
})
</script>

<template>
  <a-modal :open="open" title="员工导入" :footer="false" :closable="false">
    <a-flex justify="center">
      <div class="upload-excel">
        <CloudUploadOutlined style="font-size: 60px; margin: 15px" />
        <a-button type="link">下载导入模板</a-button>
        <div class="upload">
          将文件拖到此处或<a-button type="link" class="ant-button">点击上传</a-button>
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
