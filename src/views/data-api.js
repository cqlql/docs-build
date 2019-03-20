// import scriptLoad from '@/modules/corejs/dom/script-load'
// import Vue from 'vue'
import axios from '@/modules/ajax-api/ajax.js'

// const axiosDocs = new AjaxGeneral(function (data) {
//   return data
// })
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
    return axios.get('/api/menu')
  },
  // getArticle (path) {
  //   return axiosDocs.get('/docs' + path)
  // },
  getArticle (path) {
    return axios.get('/api/docs?path=' + encodeURIComponent(path))
  },
  search (wd) {
    return axios.get('/api/search?wd=' + encodeURIComponent(wd))
  },
  ctrlKeyBind: windowCtrlKey.bind,
  ctrlKeyUnbind: windowCtrlKey.unbind
}

export default dataApi
