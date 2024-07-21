import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { login as loginApi, getUserInfo as getUserInfoApi } from '@/api/user'
export const useUserStore = defineStore('user', () => {
  let token = ref()
  async function login(form: any) {
    token.value = await loginApi(form)
    console.log('登录', token.value)

    // user.token = JSON.stringify(token)
    localStorage.setItem('user', JSON.stringify(token.value))
  }
  function logOut() {
    localStorage.removeItem('user')
  }
  // 用户资料
  let userInfo = reactive({}) // 这里有一个空对象，为了放置后面取数据报错
  async function getUserInfo() {
    userInfo = await getUserInfoApi()
    console.log(userInfo)
  }
  return { token, login, logOut, userInfo, getUserInfo }
})
