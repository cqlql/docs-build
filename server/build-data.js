const path = require('path')
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const fsPromises = fs.promises

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
        await this.addIndexData(name, dir, data)
      }
    }
  }
  addIndexData (name, path, content) {
    this.dbRun(`
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

    await this.buildData()
    await fsPromises.writeFile(this.dataRootPath + '\\' + 'menu.json', JSON.stringify(this.data))
  }
  async dbOpen () {
    if (!this.db) {
      return new Promise((resolve, reject) => {
        let dbPath = this.dataRootPath + '\\article.db'
        this.db = new sqlite3.Database(dbPath, err => {
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
      })
    })
  }
}

module.exports = BuildMenuData
