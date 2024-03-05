import setupUserLoginInfoGuard from './userLoginInfo'
import setupPermissionGuard from './permission'

export default function createRouteGuard(router) {
  setupUserLoginInfoGuard(router)
  setupPermissionGuard(router)
}
