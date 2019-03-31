const crypto = require('crypto')
const config = require('../config.js')
const fs = require('fs-extra')
const fsPromises = fs.promises
class DocsIds {
  constructor () {
    this.ids = {}
    this.noExistIds = {}
    this.filePath = config.dataDir + '/ids.json'
    this.init()
  }
  async init () {
    try {
      let idsJson = await fsPromises.readFile(this.filePath)
      this.ids = JSON.parse(idsJson)
      this.noExistIds = JSON.parse(idsJson)
    } catch (err) { // 文件不存在则创建
      await fsPromises.writeFile(this.filePath, '{}', 'utf8')
    }
  }
  check (filePath, content) {
    let { ids, noExistIds } = this
    let hash = ids[filePath]
    if (hash) { // 存在
      delete noExistIds[filePath]
      let newHash = this.checksum(content)
      if (hash !== newHash) { // 修改情况
        ids[filePath] = newHash
        return 1
      }
      return 2
    }
    // 不存在
    ids[filePath] = this.checksum(content)
    return 0
  }
  async finish (cb) {
    // 将不存在的从数据中删除
    let { ids, noExistIds } = this
    for (let filePath in noExistIds) {
      if (noExistIds.hasOwnProperty(filePath)) {
        await cb(filePath)
        delete ids[filePath]
      }
    }

    // 重新写入 ids
    await fsPromises.writeFile(this.filePath, JSON.stringify(ids), 'utf8')
  }
  checksum (str, algorithm, encoding) {
    return crypto
      .createHash(algorithm || 'sha1')
      .update(str, 'utf8')
      .digest(encoding || 'hex')
  }
}

module.exports = DocsIds
