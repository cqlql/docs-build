var express = require('express')
var router = express.Router()

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
router.post('/Organization/GetDepartments', function (req, res) {
  res.send(require('./data/GetDepartments.json'))
})
// get
router.get('/Power/GetClassesInGrades', function (req, res) {
  // console.log(req.query)
  // console.log(req.body)
  res.send(require('./data/GetClassesInGrades.json')[req.query.PeriodId])
})

module.exports = router
