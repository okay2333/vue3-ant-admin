import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
export const useUserStore = defineStore('user', () => {
  const user = reactive({
    username: '',
    token: ''
  })
  function login(username: string, token: string) {
    user.username = username
    user.token = token
    console.log(user)
    localStorage.setItem('user', JSON.stringify(token))
  }
  function logOut() {
    localStorage.removeItem('user')
  }
  return { user, login, logOut }
})
