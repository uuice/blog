# 准备工作

## 注意事项

`nunjucks`并不是在沙盒中运行的，所以使用用户定义的模板可能存在风险。这可能导致的风险有：在服务器上运行时敏感数据被窃取，或是在客户端运行时遭遇跨站脚本攻击。

如下代码可以获取到 `nodejs`的全局变量

```
{{ (0).toString.constructor("return global.process.versions")() | dump | safe }}
```

因此在系统开发中，应该对用户输入的内容进行过滤、转义， 避免直接渲染用户输入的模板代码， 系统底层也已经开启了全局转义

`后台页面模板编辑的功能不要开放给第三方， 否则会有安全隐患`

## 模板引擎

模板引擎使用了 `Nunjucks`

### Nunjucks 文档地址

<a href="https://mozilla.github.io/nunjucks/cn/getting-started.html" title="Nunjucks" target="_blank">Nunjucks 文档地址</a>

### 文件后缀名

文件后缀名默认使用 `.njk`, 在 vscode 中搜索 `Nunjucks` 安装对应插件，可以实现代码高亮

### 模板调试

模板调试主要有两种方式:

- 调用自定义的宏模板，系统已经有内置， 具体使用方式查看 `全局宏模板 - console` 部分 [传送门](/doc/template-guide/global-macro/1.0#console)
- 调用自定义的过滤器， 系统已经有内置， 具体使用方式查看 `全局过滤器 - console` 部分 [传送门](/doc/template-guide/global-filter/1.0#console)

### 自定义过滤器 （Custom Filters）

在 `src/initView/filter` 中添加自定义过滤器， 然后在 `src/initView/index.ts` 中注册

注册后就可以在模板中使用

#### Custom Filters 相关文档

<a href="https://mozilla.github.io/nunjucks/cn/api#custom-filters" title="Custom Filters" target="_blank">Custom Filters 文档地址</a>

### 自定义标签 （Custom Tags）

在 `src/initView/tag` 中添加自定义标签， 然后在 `src/initView/index.ts` 中注册

#### 注意事项

自定义标签可以添加参数多个参数中间用 `,` 隔开

```
{% CategoryTag method="default",alias="" %}
  {{ utils.console(list, '/list/', 'table') }}
{% endCategoryTag %}
```

#### 有闭合标签

可以参考 `tagTest.ts`

#### 使用方式

```
{% TagTest list="key1=1,key2=2,key3=3,key4=4" %}
  <ul>
    {% for val in list %}
      <li>
        {{ val.id }}:{{ val.city}}
      </li>
    {% endfor %}
  </ul>
{% endTagTest %}
```

#### 无闭合标签

可以参考 `tagTest2.ts`

#### 使用方式

```
{% TagTest2 name="ddd" %}
```

#### Custom Tags 相关文档

<a href="https://mozilla.github.io/nunjucks/cn/api.html#custom-tags" title="Custom Tags" target="_blank">Custom Tags 文档地址</a>

### 渲染用户自定义模版

#### 获取模版引擎实例

模版引擎实例挂载在 res.app 上面

```js
const viewInstance = res.app.get('viewInstance')res.app.get('viewInstance')
```

#### 调用 renderString 方法渲染

```js
viewInstance.renderString(
  `{% TagTest2 name="ddd" %} <br/> {% TagTest2 name="aaa" %}Hello {{ username }}
    {% TagTest list="key1=1,key2=2,key3=3,key4=4" %}
    <ul>
      {% for val in list %}
    <li>
      {{ val.id }}:{{ val.city}}
    </li>
    {% endfor %}
    </ul>
    {% endTagTest %}`,
  { username: 'James' }
)
```
