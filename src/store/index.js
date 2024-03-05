import { createPinia } from 'pinia'
import useUserStore from './modules/user.js'
import usePermissionStore from './modules/permission.js'

const pinia = createPinia()

export { useUserStore, usePermissionStore }

export default pinia
