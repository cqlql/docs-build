## nodejs 测试问题

### 会根据 `.babelrc` 文件进行 babel 转化

[使用 babel - 官方解释](https://facebook.github.io/jest/docs/zh-Hans/getting-started.html#%E4%BD%BF%E7%94%A8-babel)

**解决**

1. 更改 pageage.json

```js
// package.json
{
  "jest": {
    "transform": {}
  }
}
```

2. 使用配置文件

```js
// jest.config
module.exports = {
  name: "my-project",
  transform: {},
  testEnvironment: "node"
}
```
