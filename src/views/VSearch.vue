<template>
  <div :class="$style.search">
    <input v-model="wd" type="text">
    <div :class="$style.result" >
      <dl v-for="item of searchResult" :key="item.id" @click="$emit('select', item.path)">
        <dt>{{ item.name }}</dt>
        <dd>
          <pre v-html="item.content" />
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import dataApi from '@/views/data-api.js'
export default {
  data () {
    return {
      wd: '',
      searchResult: []
    }
  },
  watch: {
    async wd (wd) {
      if (this.isLoading) return
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
      let reg = new RegExp(`(.{0,20})(${this.wd})(.{0,20})`, 'i')
      let res = path.match(reg)
      // console.log('path', res)
      if (!res) {
        res = content.match(reg)
      }
      // console.log('content', res, content)
      return `${res[1]}<b>${res[2]}</b>${res[3]}`
    }
  }
}
</script>

<style module>
.search {
  padding: 20px;

}
.result {
  background-color: #fff;
  position: relative;
  z-index: 3;
  dl {
    border-bottom: 2px solid blue;
    padding: 6px 0;
  }
  dt {
    padding: 0 6px;
  }
}
</style>
