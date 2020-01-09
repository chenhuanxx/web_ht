import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
Vue.use(iView)

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// Vue.use(iView);
/**
 * 如果你不想使用mock-server
 * you want to use MockJs for mock api
 * 你可以执行：mockXHR（）
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// mock引入
// mock引入

// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

import Print from 'vue-print-nb'
Vue.use(Print)

// import JsonExcel from 'vue-json-excel'
// Vue.component('downloadExcel', JsonExcel)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
