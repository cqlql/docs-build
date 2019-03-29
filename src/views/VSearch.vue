<template>
  <div :class="$style.search">
    <input ref="eIpt" v-model="wd" type="text" placeholder="搜索" @blur="blur" @focus="focus">
    <div v-show="show" :class="$style.result" @mousedown="$event.preventDefault()">
      <table>
        <tr v-for="item of searchResult" :key="item.id" @click="select(item.path)">
          <th>{{ item.name }}</th>
          <td><pre v-html="item.content"/></td>
        </tr>
      </table>
      <ScrollBottomLoadPage
        :first-load="false"
        @load="load"
      />
    </div>
  </div>
</template>

<script>
import dataApi from '@/views/data-api.js'
import ScrollBottomLoadPage from './scroll-bottom-load/ScrollBottomLoadPage.vue'
export default {
  components: {
    ScrollBottomLoadPage
  },
  data () {
    return {
      show: false,
      wd: '',
      searchResult: []
    }
  },
  // computed: {
  //   show () {
  //     return this.searchResult.length > 0
  //   }
  // },
  watch: {
    async wd (wd) {
      if (this.isLoading) return
      if (!wd) {
        this.searchResult = []
      }
      this.isLoading = true
      try {
        let searchResult = await dataApi.search(wd)
        searchResult.forEach(d => {
          d.content = this.capture(d.path, d.content)
        })
        this.searchResult = searchResult
      } catch (err) {
        console.error(err)
      }
      this.isLoading = false
    }
  },
  methods: {
    capture (path, content) {
      let { wd } = this
      wd = wd.replace(/[\x5E\x24\x2A\x2B\x3F\x2E\x28\x29\x3A\x3D\x21\x7C\x7B\x7D\x2C\x5C\x5B\x5D]/g, '\\$&') // 转义正则符号
      wd = wd.replace(/\s+/g, '.*?')
      let reg = new RegExp(`(.{0,20})(${wd})(.{0,20})`, 'i')
      let res = path.match(reg)
      // console.log('path', res)
      if (!res) {
        res = content.match(reg)
      }
      if (!res) {
        return ''
      }
      // console.log('content', res, content)
      return `${res[1]}<b>${res[2]}</b>${res[3]}`
    },
    blur () {
      // this.wd = ''
      // this.show = false
    },
    focus () {
      this.show = true
    },
    select (path) {
      this.$emit('select', path)
      this.$refs.eIpt.blur()
    },
    load ({complete, page}) {
      console.log(page)
    }
  }
}
</script>

<style module>
.search {
  padding: 4px;
  height: 28px;
  input {
    height: 28px;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    outline: none;
  }
}
.result {
  background-color: #fff;
  position: fixed;
  margin-top: -1px;
  max-height: 80%;
  /* max-width: 100%; */
  overflow: auto;
  /* top: -1px; */
  z-index: 3;
  border: 1px solid #d1d5da;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12);
  table {border-collapse: collapse;}
  tr {
    /* border-bottom: 2px solid blue; */
    border-bottom: 1px solid #e1e4e8;
    /* padding: 6px 0; */
    /* position: relative; */
    /* display: flex; */
    line-height: 1.4;
  }
  
  th {
    padding: 6px;
    background-color: #f1f1f1;
    border-bottom: 1px solid #e1e4e8;

    width: 100px;
    box-sizing: border-box;    
    word-wrap: break-word;
    word-break: break-all;
  }
  td {
    padding: 6px;
    word-wrap: break-word;
    word-break: break-all;
  }
  tr:hover th,
  tr:hover td {
    background-color: #f9ffde;
  }
  pre {
    margin: 0;
    color:#333;font:14px/1.2 "Microsoft Yahei",Consolas;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    b {
      background: #ffe564;
    }
  }
}
</style>
