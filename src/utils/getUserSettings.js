import { isType } from './type'

import userSettings from '@/config/project-config.mjs'

export default isType(userSettings, 'Function') ? userSettings({ env: import.meta.env }) : userSettings
