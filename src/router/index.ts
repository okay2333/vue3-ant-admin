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
      meta: {
        isAuth: true
      },
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          name: '控制台',
          meta: {
            icon: 'HomeOutlined'
          }
        },
        {
          path: 'permission',
          component: () => import('@/views/premission/index.vue'),
          name: '权限管理',
          meta: {
            icon: 'MenuFoldOutlined'
          }
        },
        {
          path: 'role',
          component: () => import('@/views/role/index.vue'),
          name: '角色管理',
          meta: {
            icon: 'SettingOutlined'
          }
        }
      ]
    }
  ]
})

export default router
