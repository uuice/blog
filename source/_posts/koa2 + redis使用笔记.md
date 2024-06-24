---
title: koa2 + redis使用笔记
id: 48
date: 2023-11-24 21:10:42
auther: nginx
cover: https://uuice-1254189824.cos.ap-chengdu.myqcloud.com/halo-uuice/bing/0028.jpg?imageMogr2/thumbnail/640x/interlace/1
excerpt: 安装redisyum install redis启动服务systemctl start redis添加开机启动项systemctl enable redisredis配置修改配置文件 /etc/redis.conf注释掉 bind 127.0.0.1去掉#requirepass foobared的注
categories:
 - nodejs
tags: 
---

### 安装redis
```bash
yum install redis
```
### 启动服务
```bash
systemctl start redis
```
### 添加开机启动项
```bash
systemctl enable redis
```

### redis配置

修改配置文件 /etc/redis.conf

- 注释掉 bind 127.0.0.1
- 去掉#requirepass foobared的注释并设置密码


未完