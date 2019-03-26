const marked = require('marked')
// const path = require('path')
const fs = require('fs-extra')
const sqlite3 = require('sqlite3').verbose()
const fsPromises = fs.promises
const config = require('./config.js')

class BuildMenuData {
  constructor () {
    // this.dataRootPath = config.dataPath
    fs.ensureDirSync(this.dataRootPath = config.dataPath) // 必须确保 data 目录存在
    this.docsRootPath = config.docsPath

    // 排除文件或者目录
    // this.ignore = /\.editorconfig/
    this.ignore = config.ignore

    this.data = { children: [] }
  }

  async buildData (prevDir = '', children = this.data.children, level = 0) {
    level++
    let names = await fsPromises.readdir(this.docsRootPath + prevDir)
    for (let i = 0, len = names.length; i < len; i++) {
      let fullName = names[i]
      if (this.ignore && this.ignore.test(fullName)) continue
      let dir = prevDir + '\\' + fullName
      // let url = prevUrl + '\\' + encodeURIComponent(fullName)
      let name = fullName.replace(/\.md$/, '')
      let data = {
        index: this.index++,
        name,
        path: dir,
        level,
        isFile: true,
        children: []
      }
      children.push(data)
      let filePath = this.docsRootPath + dir
      if (fs.statSync(filePath).isDirectory()) {
        data.isFile = false
        await this.buildData(dir, data.children, level)
      } else {
        // 生成搜索索引数据
        let data = await fsPromises.readFile(filePath, 'utf8')
        data = this.clearMarkdown(data)
        await this.addIndexData(name, dir, data)
      }
    }
  }
  addIndexData (name, path, content) {
    return this.dbRun(`
    INSERT INTO articles (name, path, content)
    VALUES (?, ?, ?);
    `, [name, path, content])
  }
  async build () {
    await this.dbOpen()
    try {
      await this.dbRun(`DROP TABLE articles;`)
    } catch (err) {}
    await this.dbRun(`
    CREATE TABLE articles(
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name VARCHAR(100),
      path VARCHAR(200),
      content TEXT
    );
    `)
    // await this.dbRun(`CREATE INDEX article_index ON articles (path, content);`)

    // 清空
    this.index = 0
    this.data = { children: [] }

    await this.buildData()
    this.dbClose()
    await fsPromises.writeFile(this.dataRootPath + '\\' + 'menu.json', JSON.stringify(this.data))
  }
  async dbOpen () {
    return new Promise((resolve, reject) => {
      let dbPath = this.dataRootPath + '\\article.db'
      this.db = new sqlite3.Database(dbPath, err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
  async dbClose () {
    if (this.db) {
      return new Promise((resolve, reject) => {
        this.db.close(err => {
          if (err) reject(err)
          else resolve()
        })
      })
    }
  }
  dbRun (sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
  async dbAll (sql, params) {
    await this.dbOpen()
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, res) => {
        if (err) reject(err)
        else resolve(res)
        this.dbClose()
      })
    })
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
}

module.exports = BuildMenuData
