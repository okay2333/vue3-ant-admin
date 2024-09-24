<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { updatePassword } from '@/api/user'

interface UserType {
  name: string
  avatar: string
}
const user = ref<UserType>({
  name: '管理员',
  avatar: 'https://www.antdv.com/assets/logo.1ef800a8.svg'
})

const userStore = useUserStore()

const logout = () => {
  console.log('退出登录。。。')
  router.push('/login')
  userStore.logOut()
}

const open = ref<boolean>(false)

const showModal = () => {
  open.value = true
}
const passFormRef = ref<any>(null)
const cancelModal = () => {
  passFormRef.value.resetFields()
  open.value = false
}

// 修改密码
interface passForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const passForm = reactive<passForm>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const onFinish = async (values: any) => {
  await updatePassword(passForm)
  console.log('Success:', values)
  cancelModal()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<template>
  <div>
    <a-dropdown>
      <a class="ant-dropdown-link">
        <a-avatar shape="square" :src="user.avatar" v-if="user.avatar"> </a-avatar>
        <a-avatar shape="square" v-else>
          <span>{{ user.name.charAt(0) }}</span>
        </a-avatar>
        {{ user.name }}
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <a target="_blank" rel="noopener noreferrer"> 首页 </a>
          </a-menu-item>
          <a-menu-item key="1">项目地址</a-menu-item>
          <a-menu-item key="2" @click="showModal">修改密码</a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>

  <!-- 修改密码弹窗 -->
  <a-modal v-model:open="open" title="修改密码" :footer="null" keyboard>
    <a-form
      :model="passForm"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      ref="passFormRef"
    >
      <a-form-item
        label="原密码"
        name="oldPassword"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="passForm.oldPassword" />
      </a-form-item>

      <a-form-item
        label="新密码"
        name="newPassword"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="passForm.newPassword" />
      </a-form-item>

      <a-form-item
        label="重复密码"
        name="confirmPassword"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="passForm.confirmPassword" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">确认</a-button>
        &nbsp;&nbsp;
        <a-button @click="cancelModal">取消</a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }"> </a-form-item>
    </a-form>
  </a-modal>
</template>
<style scoped></style>
