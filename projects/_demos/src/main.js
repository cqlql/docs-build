/* eslint-disable */
import '@/comm.css'
import '@/modules/corejs/common.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Loading from '@/components/loading/plugin'
import Toast from '@/components/toast/plugin'
import Confirm from '@/components/confirm/plugin'

Vue.use(Loading)
Vue.use(Toast)
Vue.use(Confirm)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
