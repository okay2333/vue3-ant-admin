import path from 'path-browserify'
const getChildrenRoutes = (routes: any): any[] => {
  // 这是什么意思
  const result: any[] = []
  routes.forEach((route: { children?: any[] }) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

export const filterRouters = (routes: any) => {
  console.log('传入的路由：', routes)
  const childrenRoutes = getChildrenRoutes(routes)
  console.log('返回的子路由', childrenRoutes)

  return routes.filter((route: { path: any }) => {
    return !childrenRoutes.find((childrenRoute: { path: any }) => {
      return childrenRoute.path === route.path
    })
  })
}

function isNull(data: any) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

export const generateMenus = (routes: any[], basePath: string = '') => {
  console.log('path：', path)

  const result: any[] = []
  routes.forEach((item: { meta?: {}; children?: any[]; path?: any }) => {
    // 情况一：children和meta都没有，如 /login
    if (isNull(item.children) && isNull(item.meta)) return
    // 情况二：存在children 不存在meta 进行迭代 如 /
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children as any))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // const routePath = basePath + item.path
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }
    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
