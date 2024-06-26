---
title: 在Directive中获取组件DOM以及实例
id: 71
date: 2023-11-24 21:10:42
auther: nginx
excerpt: 在Directive中获取组件DOM以及实例
categories:
 - angular
tags: 
 - angular
 - directive
---

### 获取DOM

从 `@angular/core` 导入 `ElementRef`。`ElementRef` 的 `nativeElement `属性会提供对宿主 DOM 元素的直接访问权限。

```javascript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective {
  constructor(
    private el: ElementRef,
  ) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

### 获取组件实例

> 组件已知的情况下，在自定义指令中获取组件实例

直接在`constructor`中注入对应组件就可以

如下面代码，通过 `this.com` 就可以调用组件的属性和事件

```javascript
import { Directive } from '@angular/core';
import { comTest } from 'comTest';
@Directive({
  selector: '[appTest]'
})
export class TestDirective {
  constructor(
    private com: comTest
  ) {
    console.log(this.com)
  }
}

```