// 路由拍平
export default function flattenRoutes(routes, parentPath = '') {
  const flattenedRoutes = []

  routes.forEach((route) => {
    const path = `${parentPath.length > 1 ? `${parentPath}/` : ''}${route.path}`

    const { children, ...rest } = route
    const flattenedRoute = { ...rest, path }

    if (route.children) {
      const childrenRoutes = flattenRoutes(children, path)
      flattenedRoutes.push(...childrenRoutes)
    }

    flattenedRoutes.push(flattenedRoute)
  })

  return flattenedRoutes
}
