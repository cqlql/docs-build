<template>
  <div class="marquee-down">
    <div class="move">
      <div class="cont" ref="vCont" :style="{'padding-bottom': paddingBottom + 'px'}">
        <template v-if="text">{{text}}</template>
        <slot v-else/>
      </div>
      <div v-if="autoRoll" class="cont" :style="{'padding-bottom': paddingBottom + 'px'}" v-html="$refs.vCont.innerHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    paddingBottom: {
      type: [String, Number],
      default: 30
    },
    moveLenght: {
      type: [String, Number],
      default: 1
    },
    delayTime: {
      type: [String, Number],
      default: 100
    }
  },
  data () {
    return {
      contHeight: 0,
      // 是否开启自动滚动
      autoRoll: false
    }
  },
  mounted () {
    this.updateHeight()
  },
  destroyed () {
    this.stop()
  },
  methods: {
    updateHeight () {
      const { $el } = this
      const eMove = $el.children[0]
      const contHeight = this.contHeight = eMove.clientHeight
      this.autoRoll = $el.clientHeight < contHeight
    },
    stop () {
      this.isRun = false
      clearInterval(this.stopId)
    },
    start () {
      if (this.isRun) return
      this.isRun = true
      const { $el, moveLenght } = this
      let y = this.y || 0
      this.stopId = setInterval(() => {
        y += moveLenght
        $el.scrollTop = y
        let { contHeight } = this
        if (y > contHeight) {
          y = y - contHeight
        }
        this.y = y
      }, this.delayTime)
    },
    change () {
      this.autoRoll = false
      this.$nextTick(() => this.updateHeight())
    },
    speedChange () {
      if (this.autoRoll) {
        this.stop()
        this.start()
      }
    }
  },
  watch: {
    text: 'change',
    paddingBottom: 'change',
    moveLenght: 'speedChange',
    delayTime: 'speedChange',
    autoRoll (autoRoll) {
      if (autoRoll) {
        this.start()
      } else {
        this.stop()
      }
    }
  }
}
</script>

<style scoped>
.marquee-down {
  /* width: 300px; */
  overflow: hidden;
}
/* .move {
}
.cont {
} */
</style>
