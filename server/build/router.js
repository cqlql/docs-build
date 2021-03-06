const express = require('express')
const router = express.Router()
const Sqlite = require('./sqlite')
const path = require('path')
const fs = require('fs')
// const fsPromises = fs.promises

// http://192.168.1.222:3003/api/search?wd=cmd%20%E5%91%BD%E4%BB%A4%E8%A1%8C
router.get('/api/search', async function (req, res) {
  let wd = req.query.wd || ''
  let page = req.query.page || 0
  let d
  if (wd) {
    wd = wd.replace(/%|_/g, '\\$&').replace(/\s+/g, '%')
    d = await (new Sqlite()).dbAll(`SELECT name, path, content FROM articles WHERE path LIKE '%${wd}%' OR content LIKE '%${wd}%' ESCAPE '\\' LIMIT 20 OFFSET ${page * 20};`)
  } else {
    d = []
  }
  // kw = kw.replace(/%|_/g, ' ')
  res.send({
    status: 200,
    result: d,
    message: ''
  })
})

router.get('/api/menu', function (req, res) {
  fs.readFile(path.resolve(__dirname, '../data/menu.json'), 'utf8', function (err, data) {
    if (err) {
      res.send({
        status: 0,
        result: err
      })
    } else {
      res.send({
        status: 200,
        result: JSON.parse(data)
      })
    }
  })
})
// router.get('/api/build', async function (req, res) {
//   let t = Date.now()
//   await buildData.build()
//   res.send({
//     status: 200,
//     result: '',
//     message: `数据生成成功。耗时：${(Date.now() - t) / 1000}s`
//   })
// })

// 临时功能，因为没有正式部署
// 用来同步 http://192.168.1.252:1003 文档
// router.get('/api/sync', function (req, res) {
//   require('./download.js')(
//     'http://192.168.1.252:1003/',
//     // 'http://192.168.1.222:8080/', // 测试用
//     function (d, err) {
//       if (err) {
//         res.send({
//           status: 0,
//           result: '',
//           message: err
//         })
//       } else {
//         res.send({
//           status: 200,
//           result: '',
//           message: '文档下载成功'
//         })
//       }
//     }
//   )
// })

module.exports = router
