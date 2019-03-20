import scriptLoad from '@/modules/corejs/dom/script-load'
import Vue from 'vue'
import axios from '@/modules/ajax-api/ajax.js'

const windowCtrlKey = {
  bind () {
    this.fn = (e) => {
      if (e.keyCode === 17) {
        this.ctrlKeyDown = e.type === 'keydown'
      }
    }
    // ctrl 键按下状态，然后切换到别的页面情况
    this.onBlur = () => {
      this.ctrlKeyDown = false
    }

    window.addEventListener('keydown', this.fn)
    window.addEventListener('keyup', this.fn)
    window.addEventListener('blur', this.onBlur)
  },
  unbind () {
    window.removeEventListener('keydown', this.fn)
    window.removeEventListener('keyup', this.fn)
    window.removeEventListener('blur', this.onBlur)
  }
}

const dataApi = {
  getMenu () {
    // return new Promise((resolve, reject) => {
    //   Vue.loading.show()
    //   window.cb_menu_data = function (data) {
    //     Vue.loading.hide()
    //     resolve(data)
    //   }
    //   scriptLoad('./data/menu_data.js')
    // })
    return axios.get('/api/menu')
  },
  getArticle (name) {
    return new Promise((resolve, reject) => {
      Vue.loading.show()
      window[`cb_${name}`] = function (data) {
        Vue.loading.hide()
        resolve(data)
      }
      scriptLoad(`./data/${encodeURIComponent(name)}.js`)
    })
  },
  ctrlKeyBind: windowCtrlKey.bind,
  ctrlKeyUnbind: windowCtrlKey.unbind
}

export default dataApi
