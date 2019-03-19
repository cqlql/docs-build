/* eslint-disable comma-dangle */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 此处加入测试 demo
let routes = [
  // {
  //   path: '/load-refresh',
  //   meta: { title: '下拉刷新+到底加载' },
  //   component: require('@/components/load-refresh/demo.vue').default
  // },
  // {
  //   path: '/base',
  //   meta: { title: '基础组件' },
  //   component: require('@/components/base/demo.vue').default
  // },
  {
    path: '/menu',
    component: require('@/views/VMenu.demo.vue').default
  },
]

routes.push({
  path: '*',
  name: 'navDev',
  meta: { title: '快捷导航-dev' },
  component: {
    render () {
      const h2Style = { padding: '20px 6px 0', 'font-size': '16px' }
      const pStyle = { padding: '4px 10px' }
      const aStyle = { color: 'blue', 'text-decoration': 'underline' }

      const links = []
      routes.forEach(route => {
        if (route.path !== '*') links.push(<p style={pStyle}><router-link to={route.path} style={aStyle}>{(route.meta && route.meta.title) || route.path}</router-link></p>)
      })

      return (
        <div>
          <h2 style={h2Style}>demos</h2>
          {links}
        </div>
      )
    }
  }
})

export default new Router({
  routes
})
