<template>
  <div class="box">
    <VMenu :menu-data="d" />
  </div>
</template>

<script>
import dataApi from './data-api.js'
import VMenu from '@/views/VMenu.vue'
export default {
  components: {
    VMenu
  },
  data () {
    return {
      d: {}
    }
  },
  async created () {
    let d = await dataApi.getMenu()

    console.log( JSON.parse( JSON.stringify(d) ) )
    this.d = d
  }
}
</script>
<style scoped>
.box {
  height: 1000px;
}
</style>
