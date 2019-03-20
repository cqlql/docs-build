

http://blog.csdn.net/qq_34049853/article/details/76039550

## ubuntu 安装

```
apt install python-gevent python-pip python-m2crypto

pip install shadowsocks

```

## 直接运行

```
ssserver -p 3389 -k NmVhMTMyNT -m aes-256-cfb start 
```


## config.json 方式

/etc/shadowsocks/config.json

```
{
  "server": "0.0.0.0", // 不在本机部署才需设置？
  "server_port":3389,
  "password":"xx",
  "timeout":300,
  "method":"aes-256-cfb",
  "fast_open":false,
  "workers":1
}
```

运行

```
ssserver -c /etc/shadowsocks/config.json start
```

加 -d 后台运行

```
ssserver -c /etc/shadowsocks/config.json -d start
```

## 开机启动

[涉及开机启动的文章](http://morning.work/page/2015-12/install-shadowsocks-on-centos-7.html)



[systemctl 命令](http://man.linuxde.net/systemctl)

**创建后台服务文件**

/etc/systemd/system/shadowsocks.service

```
[Unit]
Description=Shadowsocks

[Service]
TimeoutStartSec=0
ExecStart=/usr/local/bin/ssserver -c /etc/shadowsocks/config.json

[Install]
WantedBy=multi-user.target
```
**开机服务启动命令**

[systemctl 命令](http://man.linuxde.net/systemctl)

启动

``` bash
# 激活
systemctl enable shadowsocks
# 启动
systemctl start shadowsocks
```

查看状态

```bash
# 能看到部分日志
systemctl status shadowsocks -l
```

查看所有日志  
通过 journalctl + 进程id 查询 方式查询  
贴上一篇文章：[如何使用Journalctl查看并操作Systemd日志](https://blog.csdn.net/zstack_org/article/details/56274966)

```bash
# 搜索 ssserver 进程id
ps -aux | grep ssserver

# 查看 id 为 21779，今天的日志
journalctl _PID=21779 --since today
# 昨天
journalctl _PID=21779 --since yesterday
# 最近50条
journalctl _PID=21779 -n 50
```
