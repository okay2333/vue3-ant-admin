import router from './index'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'
const whiteList = ['/login', '/404']
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  const token = localStorage.getItem('user')
  if (token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转主页
      next('/')
      nprogress.done()
    } else {
      next()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
  }
})
/** *
 * 后置守卫
 * **/
router.afterEach(() => {
  nprogress.done()
})
