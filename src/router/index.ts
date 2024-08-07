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
      component: () => import('@/layout/index.vue'),
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
          path: 'department',
          component: () => import('@/views/department/index.vue'),
          name: '部门管理',
          meta: {
            icon: 'MenuFoldOutlined'
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
        },
        {
          path: 'employee',
          component: () => import('@/views/employee/index.vue'),
          name: '员工管理',
          meta: {
            icon: 'SettingOutlined'
          },
          children: [
            {
              path: 'detail/:id?', // 员工详情的地址
              component: () => import('@/views/employee/detail.vue'),
              name: '员工详情'
            }
          ]
        }
      ]
    }
  ]
})

export default router
