import '@/comm.css'
// import '@/comm.css?module' // 支持直接 module 导入

/*
  虽然已经按需 polyfill，但如果 src 中没使用 promise，node_modules 中有使用, 不支持 promise 的浏览器还是会报错，
  比如动态 import() 就有对 promise 的使用，所以这里手动引入
  当然，正式项目肯定会用 promise，这里只是模板项目
*/
// import 'core-js/modules/es6.promise.js'

// import '@/modules/corejs/em-auto'
import Vue from 'vue'
import App from './App.vue'

// import click from '@/modules/corejs/dom/click.vue'
// import axios from '@/modules/ajax-mid'
import Loading from '@/components/loading/plugin'
import Toast from '@/components/toast/plugin'
import Confirm from '@/components/confirm/plugin'
// import '@/modules/zoom-touch/picture-zoom-popup-init' // 放大看图初始

if (process.env.NODE_ENV !== 'production') { // 开发环境
  // 调试的简易方案。用来调试一些没有控制台调试的手机
  // require('@/components/debug-msg/w.js')
}

Vue.use(Loading)
Vue.use(Toast)
Vue.use(Confirm)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
