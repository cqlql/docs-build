

window.webkitRequestFileSystem 这个方法目前只有chrome支持


## 文件读取

https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader

图片预览示例

```js

var fileReader = new FileReader();
// 文件读取 完后触发
fileReader.onload = function (e) {
    img.src = e.target.result;
}
// 文件读取为 DataURL，base64
fileReader.readAsDataURL(document.getElementById('file').files[0]);

```

## base64 转 blob

blob 可直接进行 ajax 文件上传，无需转 file

### atob + Uint8Array 方式

参考网址: [DataURL, Blob, File, Image之间的关系与转换 - CSDN博客](https://blog.csdn.net/Tinker12345/article/details/78570456)

```js
function dataURLToBlob(dataurl){
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}
```

### canvas.toBlob 方式

[HTMLCanvasElement - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)

```js
var canvas = document.createElement('canvas')
document.body.appendChild(canvas)
var ctx = canvas.getContext('2d');
var img = new Image();
img.onload = function(){
  ctx.drawImage(img,0,0);
  canvas.toBlob(blob => {
    console.log(blob)
  })
}
img.src = '/img/bd_logo1.png';
```

## blob 转 file

必须带中括号

```js
var file = new File([blob], 'test.png', {type: blob.type})
```

## 浏览器直接打开 blob

```js
window.open(URL.createObjectURL(blob))
```
