const path = require('path')
module.exports = {
  routerRoot: '', // 路由访问根路径
  port: 1003, // node 服务端口
  // 数据文件目录
  dataPath: path.resolve(__dirname, 'data'),
  // md 文档目录
  docsPath: path.resolve(__dirname, 'docs'),
  // 排除文件或者目录
  ignore: false, // this.ignore = /\.editorconfig/
}
