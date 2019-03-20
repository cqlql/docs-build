const path = require('path')
const fs = require('fs')

class BuildMenuData {
  constructor () {
    this.dataRootPath = path.resolve(__dirname, 'data')
    this.docsRootPath = path.resolve(__dirname, 'docs')

    // 排除文件或者目录
    // this.ignore = /\.editorconfig/
    this.ignore = false

    this.data = {
      children: []
    }
  }

  buildData (prevDir = '', children = this.data.children, level = 0) {
    level++
    fs.readdirSync(this.docsRootPath + prevDir).forEach(name => {
      if (this.ignore && this.ignore.test(name)) return
      let dir = prevDir + '\\' + name
      let data = {
        name: name.replace(/\.md$/, ''),
        path: dir,
        level,
        isFile: true,
        children: []
      }
      children.push(data)
      if (fs.statSync(this.docsRootPath + dir).isDirectory()) {
        data.isFile = false
        this.buildData(dir, data.children, level)
      } else {
        // 生成搜索索引数据
      }
    })
  }
  build () {
    this.buildData()
    fs.writeFileSync(this.dataRootPath + '\\' + 'menu.json', JSON.stringify(this.data))
  }
}

module.exports = BuildMenuData
