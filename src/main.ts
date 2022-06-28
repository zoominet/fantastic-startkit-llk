import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import globalProperties from '@/utils/global.properties'
// 加载 svg 图标
import 'virtual:svg-icons-register'
// 全局样式
import '@/assets/styles/globals.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

globalProperties(app)

app.mount('#app')
