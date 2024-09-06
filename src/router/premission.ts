import router from './index'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'
import { asyncRoutes } from '@/router/index'
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
      const userStore = useUserStore()
      // 这句话只能执行一次不然会死循环
      if (!userStore.userInfo.userId) {
        const { roles } = await userStore.getUserInfo()
        const filterRoutes = asyncRoutes.filter((item) => {
          return roles.menus.includes(item.name)
        })
        userStore.setRoutes(filterRoutes)
        // 动态添加过滤后的路由到路由表中
        filterRoutes.forEach((route) => {
          router.addRoute(route)
        })

        // router.addRoute({
        //   path: '/department',
        //   component: () => import('@/views/department/index.vue')
        // })
        // console.log(router.getRoutes()) // 打印所有已注册的路由
        // next(to.path) // 目的是让路由拥有信息 router的已知缺陷
        next({ ...to, replace: true }) // 确保重新匹配路由
      } else {
        next()
      }
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
