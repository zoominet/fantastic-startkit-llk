import type { App } from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Cookies from 'js-cookie'
import mitt from 'mitt'
import api from '@/api'

export default function globalProperties(app: App) {
  // 请求
  app.config.globalProperties.$api = api
  dayjs.locale('zh-cn')
  app.config.globalProperties.$dayjs = dayjs
  app.config.globalProperties.$cookies = Cookies
  app.config.globalProperties.$eventBus = mitt()
}
