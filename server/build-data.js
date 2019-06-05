const marked = require('marked')
// const path = require('path')
const fs = require('fs-extra')
const sqlite3 = require('./sqlite')
const fsPromises = fs.promises
const config = require('./config.js')
const DocsIds = require('./docs-ids.js')

class BuildMenuData extends sqlite3 {
  constructor () {
    super()
    this.dataRootDir = config.dataDir
    this.docsRootDir = config.docsDir

    // 排除文件或者目录
    // this.ignore = /\.editorconfig/
    this.ignore = config.ignore

    // 包含文件。目前只包含 md
    this.includeFile = /\.md$/i

    // 排除目录
    this.excludeDir = /images/i

    // this.data = { children: [] }
  }

  async buildData (add, prevDir = '', children = this.data.children, level = 0, parentChildren = []) {
    level++
    let names = await fsPromises.readdir(this.docsRootDir + prevDir)
    for (let i = 0, len = names.length; i < len; i++) {
      let fullName = names[i]
      if (this.ignore && this.ignore.test(fullName)) continue
      let dir = prevDir + '/' + fullName
      // let url = prevUrl + '/' + encodeURIComponent(fullName)
      let name = fullName.replace(/\.md$/, '')
      let data = {
        name,
        path: dir,
        level,
        isFile: true,
        children: []
      }
      let filePath = this.docsRootDir + dir
      if (fs.statSync(filePath).isDirectory()) { // 目录情况
        if (!this.excludeDir.test(filePath)) continue
        data.isFile = false
        await this.buildData(add, dir, data.children, level, children)
        children.push(data)
      } else { // 文件情况
        if (!this.includeFile.test(filePath)) continue
        children.push(data)
        let content = await fsPromises.readFile(filePath, 'utf8')
        content = this.clearMarkdown(content) // 清理格式

        switch (this.docsIds.check(dir, content)) { // 检查是不是新的，入数据库
          case 0: // 新的
            await add(name, dir, content, true) // 插入数据库
            break
          case 1: // 修改的
            await add(name, dir, content) // 插入数据库
            break
        }
      }
    }
  }
  // 逐次写入逻辑
  async build () {
    // 初始值
    this.data = { children: [] }

    this.docsIds = new DocsIds()

    await this.dbOpen()
    await this.dbRun(`
    CREATE TABLE IF NOT EXISTS articles(
      name VARCHAR(100),
      path VARCHAR(200),
      content TEXT
    );
    `)

    await this.buildData((name, path, content, isNew) => {
      // 新增情况
      if (isNew) {
        console.log('新增', path)
        return this.dbRun(`INSERT INTO articles (name, path, content) VALUES (?, ?, ?);`, [name, path, content])
      }
      // 修改
      console.log('修改', path)
      return this.dbRun(`UPDATE articles SET content=? WHERE path=?`, [content, path])
      // 创建索引
      // return this.dbRun(`CREATE INDEX article_index ON articles (path, content);`)
    })

    await fsPromises.writeFile(this.dataRootDir + '/' + 'menu.json', JSON.stringify(this.data))
    await this.docsIds.finish(path => {
      console.log('删除', path)
      return this.dbRun(`DELETE FROM articles WHERE path=?`, [path])
    })
    await this.dbClose()

    // 清空
    this.data = null
  }
  clearMarkdown (cont) {
    let tokens = marked.lexer(cont)
    let newCont = ''
    tokens.forEach(d => {
      let { text } = d
      if (text) newCont += text + '\r\n'
    })
    return newCont
  }
  // async test () {
  //   await this.dbOpen()
  //   let db = this.db
  //   db.serialize(async function () {
  //     db.run(`
  //     CREATE TABLE IF NOT EXISTS articles2(
  //       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  //       name VARCHAR(100),
  //       path VARCHAR(200),
  //       content TEXT
  //     );
  //     `)
  //     let stmt = db.prepare('INSERT INTO articles2 (name, path, content) VALUES (?,?,?)')
  //     db.parallelize(async function () {
  //       for (let i = 10; i--;) {
  //         stmt.run('name2' + i, 'path' + i, 'content')
  //       }
  //       db.run(`DELETE FROM articles2 WHERE path='path0';`)
  //       stmt.finalize()
  //     })
  //   })
  //   this.dbClose()
  // }
}

module.exports = BuildMenuData
