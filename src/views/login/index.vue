<template>
  <div class="login-container">
    <a-card class="login-card" title="Login" bordered="false">
      <a-form :model="loginForm" :rules="rules" @submit="onSubmit" layout="vertical">
        <!-- 用户名输入框 -->
        <a-form-item
          label="账号"
          name="mobile"
          :rules="[{ required: true, message: '账号不能为空' }]"
        >
          <a-input v-model:value="loginForm.mobile" placeholder="请输入账号" />
        </a-form-item>

        <!-- 密码输入框 -->
        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" />
        </a-form-item>

        <!-- 登录按钮 -->
        <a-form-item>
          <a-button type="primary" html-type="submit" block @click="onLogin" :loading="loading">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

interface UserState {
  mobile: string
  password: string
}
const userStore = useUserStore()
const router = useRouter()
// 登录表单的状态
const loginForm = reactive<UserState>({
  mobile: '13800000002',
  password: 'hm#qd@23!'
})

const rules = ref({
  mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const loading = ref(false)

// 登录按钮点击事件
const onLogin = async () => {
  if (!loginForm.mobile || !loginForm.password) {
    message.error('Please complete the form.')
    return
  }

  loading.value = true
  await userStore.login(loginForm)
  router.push('/')
  message.success('登录成功')
  loading.value = false
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.login-card {
  width: 350px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

a-button {
  background: #1890ff;
  color: #fff;
  border: none;
}

a-button:hover {
  background: #40a9ff;
  color: #fff;
}

a-input {
  border-radius: 4px;
}

a-input-password {
  border-radius: 4px;
}
</style>
