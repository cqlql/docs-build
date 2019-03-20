
## 可视化管理工具
[SQLite可视化管理工具汇总(更新中)](https://blog.csdn.net/qq_27248989/article/details/80279585)

## nodejs 使用

一般使用 [sqlite3](https://github.com/mapbox/node-sqlite3)


## sql 语法


```sql
CREATE TABLE articles(
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, # 主键，自动增长，非空
  path VARCHAR(200),
  content TEXT
);
```

### 函数

#### instr - 查找字符串位置

实现截断匹配字符串字符串

substr 为截取字符串

```sql
SELECT id,
       path,
       substr(content,instr(content,'数组'),20)
  FROM articles WHERE path,content LIKE '%数组%' LIMIT 20;

```