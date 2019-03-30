<template>
  <div>
<!-- <DragView :class="$style.left" v-model="menuWidth" :max-width="400" @resize="onResize" :style="{top:top+'px'}"> -->
    <DragView v-model="menuWidth" :class="$style.left" :max-width="500" @resize="onResize">
      <div :class="$style.header">
        <!-- <div :class="$style.searchBox">
          <VSearch @select="searchSelect" />
        </div> -->
        <h1>深度教育-文档中心</h1>
        <!-- <div :class="$style.des">
          技术笔记，速查手册，效果汇总
          <span :class="$style.sp">|</span>
          <a href="http://cqlql.github.io">关于</a>
        </div> -->
      </div>
      <div :class="$style.searchBox">
        <VSearch @select="searchSelect" />
      </div>
      <VMenu ref="vMenu" :menu-data="menuData" @select="menuSelect" />
    </DragView>
    <div :class="$style.right" :style="{'margin-left':rightX+'px'}">
      <vArticle ref="vArticle" :content="articleContent" @select="onArticleSelect" />
    </div>
  </div>
</template>

<script>
import DragView from '@/components/drag-view'
import dataApi from '@/views/data-api.js'
import VMenu from '@/views/VMenu.vue'
import VArticle from '@/views/Article.vue'
import VSearch from '@/views/VSearch.vue'

export default {
  components: {
    VMenu,
    VArticle,
    VSearch,
    DragView
  },
  data () {
    return {
      // top: 60,
      menuList: [],
      articleContent: '',
      articleOutline: {},

      // 窗口大小
      menuWidth: (localStorage.getItem('leftMenuWidth') || 260) * 1,
      // menuInitWidth: (localStorage.getItem('leftMenuWidth') || 260) * 1,
      rightX: (localStorage.getItem('rightContX') || 270) * 1,

      menuData: {}
    }
  },
  // async created () {
  //   this.menuData = await dataApi.getMenu()
  // },
  async mounted () {
    // this.windowScroll = {
    //   bind (cb) {
    //     this.scroll = function () {
    //       let y = 60 - window.pageYOffset
    //       y = y < 0 ? 0 : y
    //       cb(y)
    //     }
    //     window.addEventListener('scroll', this.scroll)
    //   },
    //   unbind () {
    //     window.removeEventListener('scroll', this.scroll)
    //   }
    // }
    // this.windowScroll.bind(top => {
    //   this.top = top
    // })
    dataApi.ctrlKeyBind()
    
    this.menuData = await dataApi.getMenu()
    let path = location.hash.substr(1)
    await this.$nextTick()
    if (path) this.searchSelect(decodeURI(path) + '.md')
  },
  destroyed () {
    dataApi.ctrlKeyUnbind()
  },
  // destroyed () {
  //   this.windowScroll.unbind()
  // },
  methods: {
    onArticleSelect () {},
    onResize (x) {
      let rightX = this.rightX = x + 10
      localStorage.setItem('leftMenuWidth', x)
      localStorage.setItem('rightContX', rightX)
    },
    async menuSelect (path) {
      // path = dataApi.urlPathParamsHandle(path)
      // path = path.replace(/\.md$/, '')
      location.hash = path.replace(/\.md$/, '')
      this.articleContent = await dataApi.getArticle(path)
    },
    searchSelect (path) {
      let vMenu = this.$refs.vMenu
      let index = document.getElementById(path).dataset.index * 1
      vMenu.select(index)
      // vMenu.unfold(index)
      vMenu.scrollTo(index)
      this.menuSelect(path)
    }
  }
}
</script>
<style module>
.left {
  position: fixed;
  width: 200px;
  left: 0;
  /* top: 60px; */
  top: 0;
  bottom: 0;
  z-index: 2;
}
.middle {
  position: fixed;
  width: 200px;
  left: 200px;
  top: 60px;
  bottom: 0;
}
.right {
  margin-top: 20px;
  margin-left: 410px;
  margin-right: 10px;
}

.header {
  /* position: absolute;
  top: 0; */
  height: 60px;
  background-color: #24292e;
  h1 {
    color: #fff;
    margin: 0;
    /* margin-left: -100px; */
    padding: 12px 0;
    font-size: 24px;
    font-weight: bold;

    text-align: center;
    /* float: left; */
    /* text-indent: -50px; */
    /* position: relative;
    left: -20px; */
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
  /* float: left; */
      border-right: 1px solid #efefef;
}
</style>
