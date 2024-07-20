import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { login as loginApi } from '@/api/user'
export const useUserStore = defineStore('user', () => {
  const user = reactive({
    username: '',
    token: ''
  })
  async function login(form: any) {
    const token = await loginApi(form)
    localStorage.setItem('user', JSON.stringify(token))
  }
  function logOut() {
    localStorage.removeItem('user')
  }

  const userInfo = reactive({}) // 这里有一个空对象，为了放置后面取数据报错

  return { user, login, logOut, userInfo }
})
