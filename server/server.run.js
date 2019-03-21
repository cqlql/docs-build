const path = require('path')
const getIPAdress = require('../build/get-ip-adress')
const express = require('express')
const router = require('./router')
const config = require('./config')

const bodyParser = require('body-parser')

const app = express()
const { routerRoot, port } = config

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(routerRoot + '/docs', express.static(path.resolve(__dirname, 'docs'))) // 文档文件

app.use(routerRoot + '/', router)
const server = app.listen(port, getIPAdress(), function () {
  const host = server.address().address
  // const port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
