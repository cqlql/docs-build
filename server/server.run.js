const path = require('path')
const fs = require('fs')
// const getIPAdress = require('../build/get-ip-adress')
const express = require('express')
const router = require('./build/router')
const config = require('./config')

const bodyParser = require('body-parser')

const app = express()
const { routerRoot, port, docsDir } = config

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(routerRoot + '/docs', express.static(docsDir)) // 文档文件

app.use(routerRoot + '/', router)

// 将配置写入 index.html
const indexPath = path.resolve(__dirname, 'public/index.html')
const indexCont = fs.readFileSync(indexPath, 'utf8')
fs.writeFileSync(indexPath, indexCont.replace(/(window\.routerRoot[\s]*=[\s]*).+/, '$1"' + routerRoot + '";'))

app.use(routerRoot + '/', express.static(path.resolve(__dirname, 'public')))

const server = app.listen(port, '0.0.0.0', function () {
  const host = server.address().address
  console.log('Example app listening at http://%s:%s', host, port)
})
