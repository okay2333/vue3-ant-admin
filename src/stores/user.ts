import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi, getUserInfo as getUserInfoApi } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
// import { constantRoutes } from '@/router/index'
export const useUserStore = defineStore('user', () => {
  let token = getToken()
  async function login(form: any) {
    setToken(await loginApi(form))
  }
  function logOut() {
    // resetRouter()
    removeToken()
  }
  // 用户资料
  let userInfo = ref({}) // 这里有一个空对象，为了放置后面取数据报错
  async function getUserInfo() {
    const res = await getUserInfoApi()
    userInfo.value = res
    return res
  }

  return { token, login, logOut, userInfo, getUserInfo }
})
