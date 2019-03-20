const express = require('express')
const router = express.Router()
const BuildMenuData = require('./build-menu-data.js')
// const buildMenuData = new BuildMenuData()

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
// // get
// router.get('/Power/GetClassesInGrades', function (req, res) {
//   // console.log(req.query)
//   // console.log(req.body)
//   res.send(require('./data/GetClassesInGrades.json')[req.query.PeriodId])
// })
router.get('/api/build-menu', function (req, res) {
  (new BuildMenuData()).build()
  res.send({
    status: 200,
    result: '',
    message: '左侧菜单生成成功'
  })
})
router.get('/api/menu', function (req, res) {
  res.send({
    status: 200,
    result: require('./data/menu.json')
  })
})

module.exports = router
