import { Components } from 'ant-design-vue/es/date-picker/generatePicker'
import path from 'path'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      component: () => import('@/components/layout/index.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          name: '控制台'
        },
        {
          path: 'permission',
          component: () => import('@/views/premission/index.vue'),
          name: '权限管理'
        },
        {
          path: 'role',
          component: () => import('@/views/role/index.vue'),
          name: '角色管理'
        }
      ]
    }
  ]
})

export default router
