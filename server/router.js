const express = require('express')
const router = express.Router()
const BuildData = require('./build-data.js')
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

// http://192.168.1.222:3003/api/search?kw=cmd%20%E5%91%BD%E4%BB%A4%E8%A1%8C
router.get('/api/search', async function (req, res) {
  let kw = req.query.kw || ''
  // kw = kw.replace(/%|_/g, ' ')
  let d = await buildData.dbAll(`SELECT id, path, content FROM articles WHERE path LIKE '%${kw}%' OR content LIKE '%${kw}%' LIMIT 20;`)
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

module.exports = router
