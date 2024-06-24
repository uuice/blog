---
title: 让浏览器兼容placeholder
id: 40
date: 2023-11-24 21:10:41
auther: nginx
excerpt: 什么是placeholderplaceholder 属性提供可描述输入字段预期值的提示信息（hint）。该提示会在输入字段为空时显示，并会在字段获得焦点时消失。placeholder兼容性解决$(function(){    if(!placeholderSupport()){   // 判断浏览器
categories:
 - notes
tags: 
---

#### 什么是placeholder

placeholder 属性提供可描述输入字段预期值的提示信息（hint）。
该提示会在输入字段为空时显示，并会在字段获得焦点时消失。

#### placeholder兼容性解决

```js
$(function(){
    if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    };
})
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}
```