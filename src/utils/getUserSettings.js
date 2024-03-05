import { isType } from './type'

import userSettings from '@/config/project-config.js'

export default isType(userSettings, 'function') ? userSettings({ env: import.meta.env }) : userSettings
