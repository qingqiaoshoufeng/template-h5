import {
  createRouter,
  // createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { routes } from './modules'
import userSettings from '#/utils/getUserSettings.js'

// console.log(routes, 'routes')
const router = createRouter({
  history: userSettings?.router?.history ? userSettings.router.history(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
export default router
