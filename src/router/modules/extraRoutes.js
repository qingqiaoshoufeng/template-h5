import appRoutes from '~pages'
import flattenRoutes from '#/utils/flatten-routes'

const extraRoutes = flattenRoutes(appRoutes.filter(item => !(item.name === 'login')))
// console.log(extraRoutes, 'extraRoutes')
extraRoutes[0].path = `${extraRoutes[0].path}`
// console.log(extraRoutes, 'extraRoutes')
export default extraRoutes
