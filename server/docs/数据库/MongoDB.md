
[ubuntu 部署](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

[MongoDB 可视化管理工具 Robomongo](https://robomongo.org)



关于商用是否收费：企业版收费，社区版随便用，不收费


[mongod 命令](https://docs.mongodb.com/manual/reference/program/mongod/index.html)

mongod 用来启动服务

mongo 用来输入脚本操作数据库

1.运行“locate mongo”命令查看系统默认把mongo装到了哪里

https://www.cnblogs.com/caicaizi/p/6160884.html


[配置文件文档](https://docs.mongodb.com/manual/reference/configuration-options/)

[创建用户](https://docs.mongodb.com/manual/tutorial/create-users/)

[用户角色](https://docs.mongodb.com/manual/reference/built-in-roles)

[MongoDB用户角色配置](https://www.cnblogs.com/out-of-memory/p/6810411.html)


修改mongod.conf文件

```conf
security:
  authorization: enabled // 启用授权
```

创建用户

超级用户
db.createUser({ user: 'root', pwd: '12345678', roles: [{ role: 'root', db: 'admin' }] })

admin 用户
db.createUser(  
  {  
    user: "admin",  
    pwd: "12345678",  
    roles: [{role: "userAdminAnyDatabase", db: "admin"}]  
  }  
)

读写用户
db.createUser(
  {
    user: "test",
    pwd: "12345678",
    roles: [
       { role: "readWrite", db: "test" }
    ]
  }
)
只读用户
db.createUser(
  {
    user: "test2",
    pwd: "12345678",
    roles: [
       { role: "read", db: "test" }
    ]
  }
)

修改权限
db.grantRolesToUser(
  "admin",
  [{role:"readWrite", db:"test"}]
)

登录：db.auth("admin","12345678")
db.auth("root","12345678")


新建数据库
use test
新建usr表，并添加一条数据
db.usr.insert({'name':'tompig'});

删除用户
db.dropUser('nodercms')

显示所有用户
show users

## 用户角色配置

创建普通用户步骤

```js
use admin
db.createUser({ user: 'admin', pwd: '12345678', roles: [{ role: 'admin', db: 'admin' }] }) // 超级用户
// 注意，必须要先 user，再 createUser，才能使用此用户登录此数据库
use test
db.createUser({ user: 'test', pwd: '3nk6U7H9o3Ct', roles: [{ role: 'readWrite', db: 'test' }] })
```

## 问题解决

### 远程连接被拒绝

将 mongodb.conf 中 `bind_ip=127.0.0.1` 的那一行，修改为 `bind_ip=0.0.0.0`

如果不需要远程连接，建议改回去，更安全

mongod.conf 默认位置：`/etc/mongod.conf`

可通过进程看到

```sh
# 查看 mongo 进程
ps -aux | grep mongo
```



