# 全局过滤器

## Console

配合`dump`、`safe` 两个过滤器，打印模板内容到浏览器控制台，主要用于调试

注意: 仅在开发环境中生效

### 参数

- key: 属性名
- type: <span>(可选)</span>浏览器 console 的所有方法都可以用，常用的 type 如下:
  - log 打印内容的通用方法 **（默认）**
  - info 打印资讯类说明信息
  - table 将列表型的数据打印成表格
  - warn 打印一个警告信息
  - error 打印一条错误信息

### 推荐使用方式

`Console` 默认加载到了系统中， 可以直接使用

列表数据建议用`table`打印， 输出更直观

其他可以用 log、info 打印

### 调用

```
{{ message | dump | console('message') | safe}}
{{ result | dump | console('result', 'table') | safe}}
```
