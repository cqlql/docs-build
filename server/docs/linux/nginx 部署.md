
此处使用的系统是 Ubuntu Server 16.04.6 LTS 64位

参考文档

[Ubuntu Server 16.04.1 LTS 64位安装 Nginx 以及简单应用](https://blog.csdn.net/niceliusir/article/details/81048373)

[二进制安装官方配置文档](https://nginx.org/en/docs/configure.html)

[Nginx与前端开发](https://www.qdskill.com/information/8426.html)

## 编译安装步骤

### 下载

[从官网拿最新的下载地址](https://nginx.org/en/download.html)

```sh
# 下载
wget https://nginx.org/download/nginx-1.14.2.tar.gz
# 解压缩
tar -xzvf nginx-1.14.2.tar.gz
# 重命名
mv nginx-1.14.2 nginx
```

### 编译安装

```sh
# 配置（这条命令在解压后的Nginx目录下执行，/usr/local/nginx 为安装路径）(可能需要安装 gcc)
sudo ./configure --user=www --group=www --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_realip_module
# 编译 (可能需要安装 make)
sudo make
# 安装
sudo make install
```

## 依赖库 zlib, pcre, openssl

[ubuntu下安装nginx时依赖库zlib，pcre，openssl安装方法](https://blog.csdn.net/z920954494/article/details/52132125)

http_rewrite_module 需要 PCRE library

```sh
sudo apt-get install libpcre3 libpcre3-dev
```

http_ssl_module 需要 OpenSSL library

```sh
sudo apt-get install openssl libssl-dev
```

## 可能需要

安装编译工具

```sh
# 安装 gcc，编译器
sudo apt install gcc
# 安装 make，编译执行
sudo apt install make
```

新建用户和用户组

```sh
/usr/sbin/groupadd -f www
/usr/sbin/useradd -g www www
```

## ngix.confg

位置：nginx/conf/nginx.conf

[nginx 常见正则匹配符号表示](https://www.cnblogs.com/netsa/p/6383094.html)

* ~ 为区分大小写匹配
* ~* 为不区分大小写匹配
* !~和!~*分别为区分大小写不匹配及不区分大小写不匹配

```nginxconf

user  www www;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    # 设置mime类型，类型由mime.type文件定义
    include       mime.types;
    default_type  application/octet-stream;

    # 设定日志格式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    # sendfile指令指定Nginx是否调用sendfile函数（zero copy方式）来输出文件，对于普通应用，必须设定为on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的uptime
    sendfile        on;
    #tcp_nopush     on;

    # 设置超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;

    gzip  on; # 开启gzip压缩

    server {
        listen       80;  # Nginx的监听端口
        server_name  localhost;  # 访问Nginx服务器的域名

        # 编码设置
        #charset koi8-r;

        # 设定虚拟主机的访问日志
        #access_log  logs/host.access.log  main;

        location / {
            root   html; # 前端项目入口文件的路径
            index  index.html index.htm; # 前端入口文件为index.html
        }

        location /api {  # 凡是以/api开头的http请求都会被下面的服务器处理
            proxy_pass  https://127.0.0.1:3000;  # 被代理的服务器的域名
            proxy_redirect     off;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }

        # 静态文件交给Nginx直接处理
        #location ~* ^.+\.(css|js|txt|swf|mp4)$ {
        #location ~ /public { # 这样应该更好 /public 下是所有的静态资源
        #    root E:\web\public;
        #    access_log off;
        #    expires 24h;
        #}

        error_page  404              /404.html;
        
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
    
    # 多个server，可实现同一个端口，多个域名
    #server {
    #    listen       80;
    #    #域名
    #    server_name  blog.huruji3.com;
    #    location / {
    #        #node.js应用的端口
    #        proxy_pass http://127.0.0.1:3001;
    #        root blog;
    #    }
    #}

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```