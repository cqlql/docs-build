const path = require('path')
var getIPAdress = require('../build/get-ip-adress')
var express = require('express')
var router = require('./router')

var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/docs', express.static(path.resolve(__dirname, 'docs'))) // 文档文件

app.use('/', router)
var server = app.listen(3003, getIPAdress(), function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
