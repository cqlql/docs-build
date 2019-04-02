
## 开始。项目根目录执行

```sh
# 安装依赖
npm i

# 删除 data 全新生成
node build.restart.js
# 不破坏现有 data 进行更新操作
node build-data-excu.js

# 开启 node web 服务
node server.run.js
```

## config.js

```js
const path = require('path')
module.exports = {
  routerRoot: '', // 路由访问根路径
  port: 1003, // node 服务端口
  // 数据文件目录
  dataDir: path.resolve(__dirname, 'data'),
  // md 文档目录
  docsDir: path.resolve(__dirname, 'docs'),
  // 排除文件或者目录
  // exclude: /\.editorconfig/,
  exclude: false,
  // 包含文件
  // includeFile: /\.md$/ // 默认值 /\.md^/
}
```


