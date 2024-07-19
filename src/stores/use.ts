import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { login as loginApi } from '@/api/user'
export const useUserStore = defineStore('user', () => {
  const user = reactive({
    username: '',
    token: ''
  })
  async function login(form: any) {
    const token = await loginApi(form)
    console.log(token)
  }
  function logOut() {
    localStorage.removeItem('user')
  }
  return { user, login, logOut }
})
