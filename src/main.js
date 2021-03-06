import Vue from 'vue'
import Electron from 'electron'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import '@/icons' // icon
import '@/permission' // permission control
import '@/utils/init'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to i18n
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
Vue.prototype.$electron = Electron

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
