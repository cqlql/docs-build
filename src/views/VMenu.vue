
<script>
import scopeElements from '@/modules/corejs/dom/scope-elements.js'
import relativexy from '@/modules/corejs/dom/relative.js'
import dataApi from './data-api.js'
export default {
  props: {
    menuData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      key: '',
      foldLevel: 1,
      selectedIndex: -1
    }
  },
  watch: {
    menuData () {
      this.foldLevel = 1
      this.selectedIndex = -1
      this.eItems = null
    }
  },
  mounted () {
    this.eMenuList = this.$el.querySelector('.menu-list')
  },
  methods: {
    getItems () {
      let { eItems } = this
      if (!eItems) {
        eItems = this.eItems = this.eMenuList.querySelectorAll('.menu-item')
      }
      return eItems
    },
    onFold ({ target }) {
      const end = this.$el
      let eArrows
      scopeElements(target, elem => {
        if (elem === end) return false
        if (elem.tagName === 'I') {
          eArrows = elem
        }
        let { classList } = elem
        if (classList.contains('menu-item')) {
          if (dataApi.ctrlKeyDown) {
            window.open(`${location.origin + location.pathname}#/${this.$route.params.type}/${elem.dataset.index}`)
            return false
          }
          if (eArrows) {
            if (classList.contains('fold')) {
              classList.remove('fold')
            } else {
              classList.add('fold')
            }
          } else {
            classList.remove('fold')
          }
          let index = elem.dataset.index * 1
          if (index !== this.selectedIndex) {
            this.select(index)
            this.$emit('select', index)
          }
          return false
        }
      })
    },
    onDbFold ({ target }) {
      const end = this.$el
      scopeElements(target, elem => {
        if (elem === end) return false
        let { classList } = elem
        if (classList.contains('menu-item')) {
          classList.add('fold')
          return false
        }
      })
    },
    onFoldLevel ({ target }) {
      if (target.tagName === 'A') {
        let foldLevel = target.innerHTML * 1
        if (foldLevel === this.foldLevel) {
          // 不触发更新情况手动折叠
          const excu = child => {
            [].forEach.call(child, item => {
              const level = item.dataset.level
              if (level < foldLevel) {
                item.classList.remove('fold')
              } else {
                item.classList.add('fold')
              }
              excu(item.children[1])
            })
          }
          excu(this.$el.querySelector('.menu-list').children)
        } else {
          this.foldLevel = foldLevel
        }
      }
    },
    select (index) {
      this.selectedIndex = index
    },
    unfold (index) {
      const end = this.$el
      const items = this.getItems()
      let item = items[index]
      while ((item = item.parentElement)) {
        if (item === end) break
        let { classList } = item
        classList.remove('fold')
      }
    },
    scrollTo (index) {
      this.select(index)
      this.unfold(index)
      setTimeout(() => {
        const { eMenuList } = this
        const item = this.getItems()[index]
        eMenuList.scrollTop = relativexy(item, eMenuList).y - eMenuList.clientHeight / 2 + 13
      }, 1)
      // this.$nextTick(() => {
      //   const {eMenuList} = this
      //   const item = this.getItems()[index]
      //   console.log(relativexy(item, eMenuList).y, eMenuList, eMenuList.clientHeight)
      //   eMenuList.scrollTop = relativexy(item, eMenuList).y - eMenuList.clientHeight / 2 + 13
      // })
    }
  },
  render () {
    const { menuData, foldLevel, selectedIndex } = this
    let index = 0
    function build (children = []) {
      const list = []
      children.forEach(item => {
        let { level, children, name, path, isFile } = item
        const childList = build(children)
        list.push(
          <div class={['menu-item', level < foldLevel ? '' : 'fold']} key={path} data-index={index} data-level={level}>
            <div class={['item', index++ === selectedIndex && 'selected']}>
              <i class={children.length === 0 ? 'hidden' : ''}></i>
              <span class={['txt', isFile ? 'url' : '']} domPropsInnerHTML={name}></span>
            </div>
            <div class="list">{childList}</div>
          </div >
        )
      })
      return list
    }

    const menuList = build(menuData.children)

    return (
      <div class="menu">
        <div class="menu-tool">
          <div class="op" onClick={this.onFoldLevel}>
            <a href="javascript:;" class="level">1</a>
            <a href="javascript:;" class="level">2</a>
            <a href="javascript:;" class="level">3</a>
            <a href="javascript:;" class="level">4</a>
          </div>
        </div>
        <div class="menu-list" onClick={this.onFold} onDblclick={this.onDbFold}>{menuList}</div>
      </div>
    )
  }
}
</script>

<style scoped>
.menu {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border-right: 1px solid #efefef;
  font-size: 14px;
}

.menu .menu-tool {
  border-right: 0;
  color: #333;
  padding: 0 4px 0 18px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  height: 25px;
  line-height: 1.6;
  border-bottom: 1px solid #efefef;
  /*box-shadow: 0px 1px 2px 0px #d6d6d6;*/
}

.menu .menu-tool a {
  float: left;
  width: 20px;
  text-align: center;
  height: 20px;
  font-size: 16px;
  line-height: 1.2;
}

.menu .menu-tool a:hover {
  outline: 1px solid red;
}

.menu .menu-tool .op {
  position: absolute;
  right: 1px;
  top: 3px;
  font: 14px Microsoft Yahei, \5fae\8f6f\96c5\9ed1;
}

.menu .menu-tool .add {
  font-family: sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 0.8;
}

.menu .menu-list {
  position: absolute;
  top: 26px;
  width: 100%;
  bottom: 0;
  overflow: auto;
}

.menu .item {
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  height: 26px;
  line-height: 2;
}

.menu .item:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 26px;
  background-color: #efefef;
  opacity: 0;
}

.menu .item .txt {
  position: relative;
}
.menu .item .txt.url {
  /* text-decoration: underline; */
  color: #0085ff;
}

.menu .item .op {
  position: absolute;
  right: 1px;
  margin-top: 3px;
  font: 14px Consolas, Microsoft Yahei;
  display: none;
}

.menu .item:hover:before {
  opacity: 1;
}

.menu .item:hover .op {
  display: block;
}

.menu .item.selected:before {
  opacity: 1;
  background-color: #ffc;
}

.menu .item .op a {
  float: left;
  width: 20px;
  text-align: center;
  height: 20px;
  font-size: 16px;
  line-height: 1.2;
}

.menu .item .op a:hover {
  outline: 1px solid red;
}

.menu .item .op a.edit {
  line-height: 1.1;
  font-weight: 700;
}

.menu .item .op a.edit:after {
  font-family: iconfont;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\E601";
}

.menu .item .op a.update {
  line-height: 1.3;
  font-weight: 700;
}

.menu .item .op a.update:after {
  font-family: iconfont;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\E61A";
  font-size: 18px;
}

.menu .list {
  padding-left: 16px;
}

.menu .item i {
  float: left;
  width: 19px;
  height: 26px;
  background: transparent;
  position: relative;
  user-select:none
}

.menu .item i:after {
  content: "";
  position: absolute;
  border: 0 dashed transparent;
  width: 0;
  height: 0;
  border-width: 4px;
  border-top-width: 8px;
  border-top-style: solid;
  border-top-color: #000;
  left: 5px;
  top: 10px;
}

.menu .item i.hidden {
  visibility: hidden;
}

.menu .menu-item i:after {
  transform: rotate(0deg) translateY(0);
}

.menu .menu-item.fold > .item i:after {
  transform: rotate(-90deg) translate(3px, 3px);
  border-top-color: #0085ff;
}

.menu .menu-item.fold > .list {
  display: none;
}

.menu .menu-item .item i:hover:after {
  opacity: 0.5;
}
</style>
