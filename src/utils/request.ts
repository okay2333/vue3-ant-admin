import axios from 'axios'
import { useUserStore } from '@/stores/use'
import { message as $message } from 'ant-design-vue'
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const useStore = useUserStore()
    const token = useStore.user.token
    if (token && config.headers) {
      config.headers['Authorization'] = `Bear ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data, message, success } = response.data // 默认json格式
    if (success) {
      return data
    } else {
      $message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  async (error) => {
    // error.message
    $message.error(error.message)
    return Promise.reject(error)
  }
)
export default service
