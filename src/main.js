import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import projectConfig from '@/config/project-config.js'

const app = createApp(App)

if (typeof projectConfig?.lifecycle?.beforeMount === 'function') {
  projectConfig?.lifecycle?.beforeMount(app)
}
app.use(router)
app.mount('#app')

if (typeof projectConfig?.lifecycle?.mounted === 'function') {
  projectConfig?.lifecycle?.mounted(app)
}

export default app
