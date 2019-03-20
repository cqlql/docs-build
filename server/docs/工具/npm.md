# npm


## npm 项目路径最好不要包含$符号
即文件夹最好不用$命名，因为$为命令关键字

## 通过 npm 执行package.json准备的命令
scripts 字段

```cmd
npm run dev
```

部分命令无需加 run，比如start，可直接

```cmd
npm start
```

## 查看创库源地址

```cmd
npm config get registry
```

## 关于加速

### 使用淘宝镜像

```cmd
npm config set registry https://registry.npm.taobao.org
```

源镜像地址：https://registry.npmjs.org/
```cmd
npm config set registry https://registry.npmjs.org/
```


### 或者安装 cnpm 命令
```cmd
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
## 发布包
首先关联账号
```
npm adduser
```

发布  
- 当前所在文件夹  
- 不加点也行

```
npm publish .
```

## 更新发布包
跟[发布包](#发布包)一样，也是通过`npm publish`命令，只是要修改版本

## package.json

### 命令创建 package.json 文件
将在命令运行目录创建

```
npm init
```


### main字段

nodejs 在 require 模块时，将以此字段指向的js文件作为入口

```json
{
    "main":"./lib/app.js"
}
```


### scripts字段：脚本执行
可直接运行非全局的模块命令。  
因为默认会在`./node_modules/.bin`中寻找命令。但也只限于与`package.json`同级的`node_modules`中寻找。

假如是某其他文件夹的`package.json`，需指定命令的绝对路径：

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1"
  },
  "devDependencies": {
    "react-scripts": "1.0.7"
  },
  "scripts": {
    "start": "E:/_work/node_modules/.bin/react-scripts start"
  }
}

```

## 参考网址
http://www.cnblogs.com/penghuwan/p/6973702.html#_label4

## 更新 npm 工具

npm install npm@latest -g

## 更新本地包

npm update

## 查看过时本地包

npm outdated

## 查看本地包列表

npm ls