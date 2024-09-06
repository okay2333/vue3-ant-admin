import { createRouter, createWebHistory } from 'vue-router'
import departmentRouter from './modules/department'
import employeeRouter from './modules/employee'
import permissionRouter from './modules/permission'
import roleRouter from './modules/role'
import approvalRouter from './modules/approval'
// 常规路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    name: 'dashboard',
    meta: {
      isAuth: true
    },
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          icon: 'HomeOutlined',
          title: '首页'
        }
      }
    ]
  }
]

// 路由重置
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { path } = route
    if (path && !constantRoutes.includes(path)) {
      router.hasRoute(path) && router.removeRoute(path)
    }
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export const asyncRoutes = [
  departmentRouter,
  roleRouter,
  employeeRouter,
  permissionRouter,
  approvalRouter
]

export default router
