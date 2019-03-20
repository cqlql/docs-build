<template>
  <div :class="$style.search">
    <input type="text" v-model="wd">
    <div :class="$style.result">
      <dl v-for="item of searchResult">
        <dt>{{item.name}}</dt>
        <dd></dd>
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
        this.searchResult = await dataApi.search(wd)
      } catch (err) {
        console.error(err)
      }
      this.isLoading = false
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
