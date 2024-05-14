import extraRoutes from './extraRoutes'
import userSettings from '#/utils/getUserSettings.js'
import login from '#/views/login/index.vue'

// 登录页
export const LOGIN = {
  path: '/login',
  name: 'login',
  component: login,
  meta: {
    requiresAuth: false,
    permissions: [],
  },
}

// 403页面
export const FORBIDDEN_ROUTE = {
  path: '/403',
  name: 'Result403',
  component: () => import('#/views/presetPages/403.vue'),
  meta: {
    requiresAuth: false,
    permissions: [],
  },
}

// 404页面
export const NOT_FOUND_ROUTE = {
  path: '/404',
  name: 'Result404',
  component: () => import('#/views/presetPages/404.vue'),
  meta: {
    requiresAuth: false,
    permissions: [],
  },
}
// console.log(userSettings, userSettings.homePath, 'userSettings.homePath')

// 首页
export const INDEX = {
  path: '/',
  name: 'index',
  // redirect: userSettings.homePath || undefined,

  redirect: (userSettings.homePath || '/'),
  meta: {
    title: '首页',
    requiresAuth: false,
  },
  component: () => import('#/views/layout/index.vue'),
  children: extraRoutes,
}

export default {
  LOGIN,
  FORBIDDEN_ROUTE,
  NOT_FOUND_ROUTE,
}
