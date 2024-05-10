import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import 'vant/lib/index.css' // 全局引入样式
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import provideUtils from '#/utils/provideUtils.js'
import projectConfig from '#/utils/getProjectConfig.js'

const app = createApp(App)
app.use(Vant)
if (typeof projectConfig?.lifecycle?.beforeMount === 'function') {
  projectConfig?.lifecycle?.beforeMount(app)
}

provideUtils(app)
app.use(router)
app.use(createPinia())
app.mount('#app')

if (typeof projectConfig?.lifecycle?.mounted === 'function') {
  projectConfig?.lifecycle?.mounted(app)
}

export default app
