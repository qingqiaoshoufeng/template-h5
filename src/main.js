import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import provideUtils from '#/utils/provideUtils.js'
import projectConfig from '#/utils/getProjectConfig.js'

const app = createApp(App)

if (typeof projectConfig?.lifecycle?.beforeMount === 'function') {
  projectConfig?.lifecycle?.beforeMount(app)
}

provideUtils(app)

app.mount('#app')

if (typeof projectConfig?.lifecycle?.mounted === 'function') {
  projectConfig?.lifecycle?.mounted(app)
}

export default app
