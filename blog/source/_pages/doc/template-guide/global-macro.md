# 全局宏模板

## Console

通过添加 script 代码块，打印模板内容到浏览器控制台，主要用于调试

注意: 仅在开发环境中生效

### 参数

- data: 属性内容
- key: 属性名
- type: <span>(可选)</span>浏览器 console 的所有方法都可以用，常用的 type 如下:
  - log 打印内容的通用方法 **（默认）**
  - info 打印资讯类说明信息
  - table 将列表型的数据打印成表格
  - warn 打印一个警告信息
  - error 打印一条错误信息

### 推荐使用方式

在 layout.njk 中引入 `utils-macro.njk`, 然后在需要的地方调用
列表数据建议用`table`打印， 输出更直观
其他可以用 log、info 打印

### 引入

```
{% import "../helper/utils-macro.njk" as utils %}
```

### 调用

```
{{ utils.console(message, '/message/') }}
{{ utils.console(result, '/result/', 'table') }}
```
