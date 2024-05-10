import projectConfig from '@/config/vite-config.js'

export default typeof projectConfig === 'function' ? projectConfig({ env: import.meta.env }) : projectConfig
