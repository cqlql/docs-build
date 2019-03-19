<template>
  <div class="box">
    <VMenu :menu-data="d" />
  </div>
</template>

<script>
import VMenu from '@/views/VMenu.vue'
export default {
  components: {
    VMenu
  },
  data () {
    return {
      d: {
        'name': 'html',
        'children': [{
          'index': 0,
          'level': 1,
          'name': 'HTML 元素参考',
          'url': 'https://baidu.com',
          'children': []
        }, {
          'index': 1,
          'level': 1,
          'name': 'form 表单',
          'children': [{
            'index': 2,
            'level': 2,
            'name': '输入控件 disabled 后将不会提交到后台',
            'children': []
          }, {
            'index': 3,
            'level': 2,
            'name': '表单提交 name 属性',
            'children': []
          }]
        }, {
          'index': 4,
          'level': 1,
          'name': 'input file 动态选择实现',
          'children': []
        }, {
          'index': 5,
          'level': 1,
          'name': '其他',
          'children': [{
            'index': 6,
            'level': 2,
            'name': '页面中的 flash',
            'children': []
          }]
        }, {
          'index': 7,
          'level': 1,
          'name': 'body',
          'children': [{
            'index': 8,
            'level': 2,
            'name': 'js',
            'children': [{
              'index': 9,
              'level': 3,
              'name': '关于body清空',
              'children': []
            }]
          }, {
            'index': 10,
            'level': 2,
            'name': 'css',
            'children': [{
              'index': 11,
              'level': 3,
              'name': 'background 设置满屏背景',
              'children': []
            }, {
              'index': 12,
              'level': 3,
              'name': '默认css',
              'children': []
            }]
          }]
        }, {
          'index': 13,
          'level': 1,
          'name': 'canvas',
          'children': [{
            'index': 14,
            'level': 2,
            'name': '高宽指定、变形情况',
            'children': []
          }, {
            'index': 15,
            'level': 2,
            'name': '绘制图形轮廓 stroke',
            'children': []
          }, {
            'index': 16,
            'level': 2,
            'name': '经验 - 饼图统计，线末端转折',
            'children': []
          }, {
            'index': 17,
            'level': 2,
            'name': '经验 - 统计，画轴，画网格，实现',
            'children': []
          }, {
            'index': 18,
            'level': 2,
            'name': '经验 - 画笔效果，实现',
            'children': []
          }, {
            'index': 19,
            'level': 2,
            'name': '画线',
            'children': [{
              'index': 20,
              'level': 3,
              'name': '1px 看是去有2px',
              'children': []
            }]
          }, {
            'index': 21,
            'level': 2,
            'name': 'canvas.drawImage',
            'children': []
          }, {
            'index': 22,
            'level': 2,
            'name': '语法',
            'children': []
          }, {
            'index': 23,
            'level': 2,
            'name': '兼容问题：',
            'children': []
          }, {
            'index': 24,
            'level': 2,
            'name': '画圆 画弧',
            'children': [{
              'index': 25,
              'level': 3,
              'name': 'MDN 文档参考',
              'children': []
            }, {
              'index': 26,
              'level': 3,
              'name': '画圆弧线条。实现进度条',
              'children': []
            }]
          }]
        }, {
          'index': 27,
          'level': 1,
          'name': 'ie678 实现支持 html5 标签',
          'children': []
        }, {
          'index': 28,
          'level': 1,
          'name': 'input textear',
          'children': [{
            'index': 29,
            'level': 2,
            'name': 'input [type=text]、textarea',
            'children': [{
              'index': 30,
              'level': 3,
              'name': 'css',
              'children': [{
                'index': 31,
                'level': 4,
                'name': '-webkit-text-fill-color',
                'children': []
              }, {
                'index': 32,
                'level': 4,
                'name': '控制 placeholder 颜色',
                'children': []
              }]
            }]
          }, {
            'index': 33,
            'level': 2,
            'name': '问题',
            'children': [{
              'index': 34,
              'level': 3,
              'name': 'ios disabled="disabled" 淡灰 不可控 问题',
              'children': []
            }]
          }, {
            'index': 35,
            'level': 2,
            'name': 'file',
            'children': []
          }, {
            'index': 36,
            'level': 2,
            'name': '去掉红色波浪线',
            'children': []
          }]
        }, {
          'index': 37,
          'level': 1,
          'name': 'lang 语言设置',
          'children': []
        }, {
          'index': 38,
          'level': 1,
          'name': 'script',
          'children': [{
            'index': 39,
            'level': 2,
            'name': 'script节点引入-带编码',
            'children': []
          }, {
            'index': 40,
            'level': 2,
            'name': '标签位置',
            'children': []
          }, {
            'index': 41,
            'level': 2,
            'name': 'script 引用的js报错不会影响下一个script 执行',
            'children': []
          }, {
            'index': 42,
            'level': 2,
            'name': '标签属性',
            'children': [{
              'index': 43,
              'level': 3,
              'name': 'src',
              'children': []
            }]
          }]
        }, {
          'index': 44,
          'level': 1,
          'name': 'table',
          'children': [{
            'index': 45,
            'level': 2,
            'name': 'table-layout 可控 w h',
            'children': []
          }, {
            'index': 46,
            'level': 2,
            'name': 'caption 表格标题',
            'children': []
          }, {
            'index': 47,
            'level': 2,
            'name': 'col、colgroup：控制列',
            'children': []
          }]
        }, {
          'index': 48,
          'level': 1,
          'name': 'title 页面标题设置',
          'children': []
        }, {
          'index': 49,
          'level': 1,
          'name': 'video',
          'children': []
        }, {
          'index': 50,
          'level': 1,
          'name': '可编辑 contenteditable',
          'children': [{
            'index': 51,
            'level': 2,
            'name': '回车换行 增加的元素区别',
            'children': []
          }, {
            'index': 52,
            'level': 2,
            'name': '兼容性',
            'children': [{
              'index': 53,
              'level': 3,
              'name': '元素文档位置改变操作',
              'children': []
            }]
          }]
        }, {
          'index': 54,
          'level': 1,
          'name': '命名实体',
          'children': [{
            'index': 55,
            'level': 2,
            'name': 'html空格',
            'children': []
          }]
        }, {
          'index': 56,
          'level': 1,
          'name': '移动端web缩放控制',
          'children': [{
            'index': 57,
            'level': 2,
            'name': '简单介绍',
            'children': []
          }, {
            'index': 58,
            'level': 2,
            'name': 'ios9以下系统同时展示两个webview有bug，高宽超出',
            'children': []
          }]
        }, {
          'index': 59,
          'level': 1,
          'name': '自定义标签',
          'children': []
        }]
      }
    }
  }
}
</script>
<style scoped>
.box {
  height: 1000px;
}
</style>
