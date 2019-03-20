

## 文件列表(包括文件夹)

### 原生 readdir：只能当前目录，不寻找下级

```js
let dirList = fs.readdirSync('./dir')
// 返回值示例：
// [".DS_Store","Update.exe","version","views_resources_200_percent.pak","xinput1_3.dll"]
```

### 读取指定目录下的所有文件，支持过滤

使用 [recursive-readdir](https://github.com/jergason/recursive-readdir)，但不会列出文件夹

需列出文件夹使用：[readdir-enhanced](https://github.com/bigstickcarpet/readdir-enhanced)

## 是不是目录
fs.statSync(path).isDirectory()

## 读取文件 fs.readFile
读取不存在文件会报错

```js
fs.readFile(file[, options], callback)
fs.readFileSync(file[, options])

// 默认获取二进制数据。参数设置为utf8将获取文本数据
fs.readFile('note_data/index.html', 'utf8', function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    console.log(arguments);
});

```

## 判断[文件/目录]是否存在

 `fs.exists(path)` **nodejs 9.0弃用**

对应的同步方法 `fs.existsSync(path)` ，这个还可以用


## 改名(文件名，目录名)

```js
fs.rename(oldPath, newPath, callback)
fs.renameSync(oldPath, newPath)
```

oldPath, newPath必须相同级数，可以完全一样，只能修改末级


## 删除

### 标准删

只能删除文件

```js
fs.unlink(path, callback)
fs.unlinkSync(path)
```

```js
fs.unlink('/tmp/hello.txt', function (err) {
    if (err) throw err;
    console.log('successfully deleted /tmp/hello');
});

```

只能删除空目录

```
fs.rmdir(path, callback)
```

### 递归删：第三方扩展
删除指定目录下的所有文件和目录

使用 [fs-extra](https://github.com/jprichardson/node-fs-extra) ，或者使用 [rimraf](https://github.com/isaacs/rimraf)

fs-extra 的 [remove-sync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/remove-sync.md) 示例

```js
const fs = require('fs-extra')

// remove file
fs.removeSync('/tmp/myfile')

fs.removeSync('/home/jprichardson') // I just deleted my entire HOME directory.
```

## 创建目录

fs.mkdir(path[, mode], callback)  
fs.mkdirSync(path[, mode])

只能在已存在的目录下创建，越级创建将报错

## 写文件

- 将内容写入文件。
- 有文件将直接替换现有内容，没有将创建新的并写入。
- 路径不存在将无法写入

语法

```js
fs.writeFile(file, data[, options], callback)
fs.writeFileSync(file, data[, options])
```

例子

```js
fs.writeFile('note_data/hello.txt', 'hello','utf8', function(err) {
  if(err) throw err;
  console.log('File write completed');
});
```

或直接使用 fs-extra 的 [outputFileSync](hhttps://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile-sync.md)、[outputJsonSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputJson-sync.md)，路径不存在也能进行写入

```js
fs.outputJsonSync(path.resolve(outputPath, 'data-demo-list.json'), worksList)
```

## copy

使用 [fs-extra](https://github.com/jprichardson/node-fs-extra)

[copy 文档](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md)

[copySync 文档](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md)


copySync 示例

```js
const fs = require('fs-extra')

// copy file
fs.copySync('/tmp/myfile', '/tmp/mynewfile')

// copy directory, even if it has subdirectories or files
fs.copySync('/tmp/mydir', '/tmp/mynewdir')

// 支持过滤
const filterFunc = (src, dest) => {
  // your logic here
  // it will be copied if return true
}
fs.copySync('/tmp/mydir', '/tmp/mynewdir', { filter: filterFunc })
```
