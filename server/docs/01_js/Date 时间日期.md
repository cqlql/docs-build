

## ios "-" 号连接问题


月日必须是2位，"/" 没有此问题。Android也没有问题

ios版本：iPhone OS 11_0_3 AppleWebKit/604.1.38 Version/11.0 Mobile/15A432 Safari/604.1

```js
new Date('2017-1-1') // 不支持
new Date('2017-01-01') // 支持
```

## 取天总数

指定年月, 天的总数

```js
// month 从1 开始
function getDayCount (year, month) {
  var d = new Date(year, month)
  d.setDate(0)
  return d.getDate()
}

```
