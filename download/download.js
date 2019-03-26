const http = require('http')
const https = require('https')
const fs = require('fs-extra')
const path = require('path')

// 文档输出路径
const docsDir = path.resolve(__dirname, '../server/docs')

function load (url, callback) {
  let htt = (/^https:/.test(url) ? https : http)
  htt.get(url, res => {
    var data = ''
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      callback(data)
    })
  }).on('error', err => {
    callback(0, err)
    console.error(err)
  })
}

module.exports = function downloads (origin, cb) {
  fs.removeSync(docsDir)
  load(origin + '_sidebar.md', function (paths, err) {
    if (err) return cb(0, err)
    paths = paths.match(/\x5D\x28.+?\.md/g)
    let total = paths.length
    let count = 0
    paths.forEach(path => {
      path = path.substr(2)
      let url = origin + encodeURI(path)
      load(url, (data, err) => {
        if (err) return cb(0, err)
        fs.outputFileSync(docsDir + '/' + path.replace(/\|/g, '_'), data)
        count++
        if (count >= total) {
          cb()
        }
      })
    })
  })
}

// downloads('http://192.168.1.252:1003/')
// downloads('http://192.168.1.222:8080/')
