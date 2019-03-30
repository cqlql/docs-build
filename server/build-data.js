const marked = require('marked')
// const path = require('path')
const fs = require('fs-extra')
const sqlite3 = require('sqlite3').verbose()
const fsPromises = fs.promises
const config = require('./config.js')
const DocsIds = require('./docs-ids.js')

class BuildMenuData {
  constructor () {
    // this.dataRootPath = config.dataPath
    fs.ensureDirSync(this.dataRootPath = config.dataPath) // 必须确保 data 目录存在
    this.docsRootPath = config.docsPath

    // 排除文件或者目录
    // this.ignore = /\.editorconfig/
    this.ignore = config.ignore

    // this.data = { children: [] }
  }

  async buildData (add, prevDir = '', children = this.data.children, level = 0) {
    level++
    let names = await fsPromises.readdir(this.docsRootPath + prevDir)
    for (let i = 0, len = names.length; i < len; i++) {
      let fullName = names[i]
      if (this.ignore && this.ignore.test(fullName)) continue
      let dir = prevDir + '/' + fullName
      // let url = prevUrl + '/' + encodeURIComponent(fullName)
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
      if (fs.statSync(filePath).isDirectory()) { // 目录情况
        data.isFile = false
        await this.buildData(add, dir, data.children, level)
      } else { // 文件情况
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
  // 并发写入逻辑，弃用
  async build2 () {
    // try {
    //   await this.dbRun(`DROP TABLE articles;`)
    // } catch (err) {}
    // await this.dbRun(`
    // CREATE TABLE articles(
    //   id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    //   name VARCHAR(100),
    //   path VARCHAR(200),
    //   content TEXT
    // );
    // `)
    this.docsIds = new DocsIds()

    // 清空
    this.index = 0
    this.data = { children: [] }

    let db = await this.dbOpen()
    return new Promise(resolve => {
      let that = this
      db.serialize(async function () {
        db.run(`
        CREATE TABLE IF NOT EXISTS articles(
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          name VARCHAR(100),
          path VARCHAR(200),
          content TEXT
        );
        `)
        db.parallelize(async function () {
          let stmt
          await that.buildData((name, path, content, isNew) => {
            if (isNew) { // 新增情况
              if (!stmt) {
                stmt = db.prepare('INSERT INTO articles (name, path, content) VALUES (?,?,?)')
              }
              console.log('新增', path)
              stmt.run(name, path, content)
            } else { // 修改
              console.log('修改', path)
              db.run(`UPDATE articles SET content='${content}' WHERE path='${path}'`)
            }
            // db.run(`CREATE INDEX article_index ON articles (path, content);`) // 创建索引
          })
          await fsPromises.writeFile(that.dataRootPath + '/' + 'menu.json', JSON.stringify(that.data))
          that.docsIds.finish(path => {
            console.log('删除', path)
            db.run(`DELETE FROM articles WHERE path='${path}'`)
          })
          if (stmt) stmt.finalize()
          resolve()
        })
      })
      // that.dbClose()
    })
  }
  // 逐次写入逻辑
  async build () {
    // 清空
    this.index = 0
    this.data = { children: [] }

    this.docsIds = new DocsIds()

    await this.dbOpen()
    await this.dbRun(`
    CREATE TABLE IF NOT EXISTS articles(
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
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

    await fsPromises.writeFile(this.dataRootPath + '/' + 'menu.json', JSON.stringify(this.data))
    await this.docsIds.finish(path => {
      console.log('删除', path)
      return this.dbRun(`DELETE FROM articles WHERE path=?`, [path])
    })
    await this.dbClose()
  }
  async dbOpen () {
    return new Promise((resolve, reject) => {
      let dbPath = this.dataRootPath + '/article.db'
      let db = this.db = new sqlite3.Database(dbPath, err => {
        if (err) reject(err)
        else resolve(db)
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
