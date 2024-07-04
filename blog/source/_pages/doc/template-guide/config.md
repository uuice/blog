# 配置文件

## 配置文件路径

模板各自的配置文件位于模板各自的文件夹中， 如 `src/template/default/config.json`

## 模板中获取模板配置

通过调用 `ConfigTag` 标签，可以获取配置中对应字段的值

具体查看 [获取模板配置](/doc/template-guide/tag/1.0#toc-70fb93)

## 配置项

- id: 主题 id，唯一，不能与其他主题一样。我们建议设置为 `作者名_主题名称`
- name: 主题名称
- author
  - name: 作者名称
  - site: 作者网址
- desc: 主题描述
- logo: 主题 Logo 地址
- site: 主题演示地址
- repo: 主题 git 仓库地址，如有填写，后台可在线更新
- version: 版本号
- require: 最低支持的 系统 版本

## 其他自定义项

其他模板中需要的自定义字段，也可以在这里定义

当然在系统后台配置中定义也是可以的， 通过 `ConfigTag` 标签都能获取到
