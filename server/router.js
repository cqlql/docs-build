const express = require('express')
const router = express.Router()
const BuildData = require('./build-data.js')
// const path = require('path')
// const fs = require('fs')
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
  let d
  if (wd) {
    d = await buildData.dbAll(`SELECT id, name, path, content FROM articles WHERE path LIKE '%${wd}%' OR content LIKE '%${wd}%' LIMIT 20;`)
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
router.get('/api/build', async function (req, res) {
  await buildData.build()
  res.send({
    status: 200,
    result: '',
    message: '数据生成成功'
  })
})
router.get('/api/menu', function (req, res) {
  res.send({
    status: 200,
    result: require('./data/menu.json')
  })
})

// router.get('/api/docs', async function (req, res) {
//   let cont = await fsPromises.readFile(path.resolve(__dirname, 'docs' + req.query.path), 'utf8')

//   res.send({
//     status: 200,
//     result: cont
//   })
// })

module.exports = router
