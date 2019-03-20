<template>
  <div>
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
.result {
  background-color: #fff;
  position: relative;
  z-index: 3;
}
</style>
