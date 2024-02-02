import projectConfig from '@/config/project-config.js'

export default typeof projectConfig === 'function' ? projectConfig({ env: import.meta.env }) : projectConfig
