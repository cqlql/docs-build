

## 代码拆分
Since version 4 the `CommonsChunkPlugin` was removed in favor of `optimization.splitChunks` and `optimization.runtimeChunk` options. Here is how the new flow works.

https://webpack.js.org/plugins/split-chunks-plugin

## css 分离 使用 mini-css-extract-plugin

[mini-css-extract-plugin 文档](https://webpack.js.org/plugins/mini-css-extract-plugin)

## entry 也能指定文件夹

```js
entry: {
  // 将为 index.js 新建v3文件夹，
  'v3/index': ['./src/v3/index.pcss',"./src/v3/index.js"],
}
```

但自动生成的引用路径可能会多一层，所以直接使用output指定会更好

```js
output: {
  path: path.resolve(__dirname, "dist/v3"), // string
  filename: "[name].js",
},
```
