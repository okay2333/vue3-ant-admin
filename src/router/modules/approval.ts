import layout from '@/layout/index.vue'
export default {
  path: '/approval',
  name: 'approval',
  component: layout,
  children: [
    {
      path: '',
      name: 'approval',
      component: () => import('@/views/approval/index.vue'),
      meta: {
        title: '审批',
        icon: 'ForkOutlined'
      }
    }
  ]
}
