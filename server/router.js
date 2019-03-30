const express = require('express')
const router = express.Router()
const BuildData = require('./build-data.js')
const path = require('path')
const fs = require('fs')
// const fsPromises = fs.promises
const buildData = new BuildData()

// 文件上传
// var multer = require('multer')
// var upload = multer({ dest: 'e:/uploads/' })
// router.post('/file', upload.single('file'), function (req, res) {
//   res.send({
//     'status': 200,
//     'message': 'ok',
//     'result': {}
//   })
// })

// post
// router.post('/Organization/GetDepartments', function (req, res) {
//   res.send(require('./data/GetDepartments.json'))
// })

// http://192.168.1.222:3003/api/search?wd=cmd%20%E5%91%BD%E4%BB%A4%E8%A1%8C
router.get('/api/search', async function (req, res) {
  let wd = req.query.wd || ''
  let page = req.query.page || 0
  let d
  if (wd) {
    wd = wd.replace(/%|_/g, '\\$&').replace(/\s/, '%')
    d = await buildData.dbAll(`SELECT id, name, path, content FROM articles WHERE path LIKE '%${wd}%' OR content LIKE '%${wd}%' ESCAPE '\\' LIMIT 20 OFFSET ${page * 20};`)
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
  fs.readFile(path.resolve(__dirname, './data/menu.json'), 'utf8', function (err, data) {
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

// router.get('/api/docs', async function (req, res) {
//   let cont = await fsPromises.readFile(path.resolve(__dirname, 'docs' + req.query.path), 'utf8')

//   res.send({
//     status: 200,
//     result: cont
//   })
// })

module.exports = router
