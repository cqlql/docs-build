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
    console.error(err)
  })
}

function downloads (origin) {
  load(origin + '_sidebar.md', function (paths) {
    paths = paths.match(/[^\x28]+\.md/g)
    paths.forEach(path => {
      let url = origin + encodeURI(path)
      load(url, data => {
        fs.outputFileSync(docsDir + '/' + path.replace(/\|/g, '_'), data)
      })
    })
  })
}

// downloads('http://192.168.1.252:1003/')
downloads('http://192.168.1.222:8080/')
