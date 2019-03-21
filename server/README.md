
```sh

# 生成数据
curl http://localhost:3003/api/build
# 或者
node docs-build/build-data-excu.js


# 开启 node 服务，使用 pm2 守护进程
pm2 start docs-build/server.run.js
```

## config.js

```js
const path = require('path')
module.exports = {
  routerRoot: '/apidocs', // 路由访问根路径
  port: 3003, // node 服务端口
  // 数据文件目录
  dataPath: path.resolve(__dirname, 'data'),
  // md 文档目录
  docsPath: path.resolve(__dirname, 'docs'),
  // 排除文件或者目录
  ignore: false, // this.ignore = /\.editorconfig/
}
```


