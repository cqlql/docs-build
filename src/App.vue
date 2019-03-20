<template>
  <div>
    <div :class="$style.header">
      <div :class="$style.searchBox">
        <VSearch />
      </div>
      <h1>API 接口文档</h1>
      <!-- <div :class="$style.des">
        技术笔记，速查手册，效果汇总
        <span :class="$style.sp">|</span>
        <a href="http://cqlql.github.io">关于</a>
      </div> -->
    </div>
    <DragView :class="$style.left" :initial-width="200" :max-width="400" @resize="onResize" :style="{top:top+'px'}">
      <VMenu :menu-data="menuData" @select="menuSelect" />
    </DragView>
    <div :class="$style.right" :style="{'margin-left':rightX+'px'}">
      <vArticle :content="articleContent" ref="vArticle" @select="onArticleSelect" />
    </div>
  </div>
</template>

<script>
import DragView from '@/components/drag-view'
import dataApi from '@/views/data-api.js'
import VMenu from '@/views/VMenu.vue'
import VArticle from '@/views/Article.vue'
import VSearch from '@/views/VSearch.vue'

const windowScroll = {
  bind (cb) {
    this.scroll = function () {
      let y = 70 - window.pageYOffset
      y = y < 0 ? 0 : y
      cb(y)
    }
    window.addEventListener('scroll', this.scroll)
  },
  unbind () {
    window.removeEventListener('scroll', this.scroll)
  }
}

export default {
  components: {
    VMenu,
    VArticle,
    VSearch,
    DragView
  },
  data () {
    return {
      top: 70,
      menuList: [],
      articleContent: '',
      articleOutline: {},

      // 窗口大小
      // middleX: 200,
      // middleW: 200,
      rightX: 210,

      menuData: {}
    }
  },
  async created () {
    this.menuData = await dataApi.getMenu()
  },
  mounted () {
    this.windowScroll = {
      bind (cb) {
        this.scroll = function () {
          let y = 70 - window.pageYOffset
          y = y < 0 ? 0 : y
          cb(y)
        }
        window.addEventListener('scroll', this.scroll)
      },
      unbind () {
        window.removeEventListener('scroll', this.scroll)
      }
    }
    this.windowScroll.bind(top => {
      console.log(123)
      this.top = top
    })
  },
  destroyed () {
    this.windowScroll.unbind()
  },
  methods: {
    onArticleSelect () {},
    onResize (x) {
      this.rightX = x + 10
    },
    async menuSelect (path) {
      this.articleContent = await dataApi.getArticle(path)
      console.log(path)
    }
  }
}
</script>
<style module>
.left {
  position: fixed;
  width: 200px;
  left: 0;
  top: 70px;
  bottom: 0;
  z-index: 2;
}
.middle {
  position: fixed;
  width: 200px;
  left: 200px;
  top: 70px;
  bottom: 0;
}
.right {
  margin-left: 410px;
  margin-right: 10px;
}

.header {
  height: 70px;
  background-color: #24292e;
  h1 {
    color: #fff;
    margin: 0;
    padding: 10px 0 6px 20px;
    font-size: 24px;
    font-weight: bold;
    /* float: left; */
        text-align: center;
  }
  .des {
    padding: 0 0 0 20px;
    color: rgba(255, 255, 255, 0.75);
  }
  a {
    color: #fff;
  }
  a:hover {
    text-decoration: underline;
  }
}
.searchBox {
  float: left;
}
</style>
