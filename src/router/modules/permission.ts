import layout from '@/layout/index.vue'
export default {
  path: '/permission',
  component: layout,
  name: 'permission',
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/premission/index.vue'),
      meta: {
        title: '权限',
        icon: 'TabletOutlined'
      }
    }
  ]
}
