const path = require('path')
module.exports = {
  routerRoot: '', // 路由访问根路径
  port: 1003, // node 服务端口
  // 数据文件目录
  dataDir: path.resolve(__dirname, 'data'),
  // md 文档目录
  docsDir: path.resolve(__dirname, 'docs3'),
  // 排除文件或者目录
  // exclude: /\.editorconfig/,
  exclude: false,
  // 包含文件
  // includeFile: /\.md$/ // 默认值 /\.md^/
}
