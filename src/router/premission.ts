import router from './index'
router.beforeEach((to: any, from: any, next: any) => {
  const token = localStorage.getItem('user')
  if (to.meta.isAuth) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
