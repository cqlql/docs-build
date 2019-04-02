const sqlite3 = require('sqlite3')
const config = require('./config.js')
const fs = require('fs-extra')
class Sqlite {
  constructor () {
    let dataDir = config.dataDir
    fs.ensureDirSync(dataDir) // 必须确保 data 目录存在。否则 sqlite open 报错
    this.dbPath = dataDir + '/article.db'
    this.sqlite = sqlite3.verbose()
  }
  dbOpen () {
    return new Promise((resolve, reject) => {
      let db = this.db = new this.sqlite.Database(this.dbPath, err => {
        if (err) reject(err)
        else resolve(db)
      })
    })
  }
  dbClose () {
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
}

module.exports = Sqlite
