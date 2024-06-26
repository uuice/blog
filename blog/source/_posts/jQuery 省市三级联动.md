---
title: jQuery 省市三级联动
id: 39
date: 2023-11-24 21:10:41
auther: nginx
categories:
  - javascript
tags:
---

页面打开默认获取省信息,选择省以后，再获取市信息，点击市以后，再获取地区信息

```js
var regions = {
  state: $('#state'),
  city: $('#city'),
  district: $('#district'),
  init: function () {
    var _this = this
    _this.getState(_this.state, 1)
    _this.state.change(function () {
      var id = $(this).val()
      _this.city.find('option:gt(0)').remove()
      _this.district.find('option:gt(0)').remove()
      _this.getCity(_this.city, id)
    })

    _this.city.change(function () {
      var id = $(this).val()
      _this.district.find('option:gt(0)').remove()
      _this.getDistrict(_this.district, id)
    })
  },
  getState: function (elem, id, callback) {
    this.getJson(elem, id, callback)
  },
  getCity: function (elem, id, callback) {
    this.getJson(elem, id, callback)
  },
  getDistrict: function (elem, id, callback) {
    this.getJson(elem, id, callback)
  },
  render: function (elem, data, callback) {
    if (data.regions && !$.isEmptyObject(data.regions)) {
      elem.find('option:gt(0)').remove()
      $.each(data.regions, function (name, value) {
        elem.append(
          '<option value ="' + value.id + '">' + value.name + '</option>'
        )
      })
      if (callback && typeof callback == 'function') {
        callback()
      }
    }
  },
  getJson: function (elem, id, callback) {
    var _this = this
    $.ajax({
      type: 'post',
      url: system.url('address/get-regions'),
      data: {
        parent_id: id,
      },
      dataType: 'json',
      cache: false,
      success: function (resp) {
        if (resp.status) {
          _this.render(elem, resp.data, callback)
        }
      },
      error: function () {},
    })
  },
}
```

#### callback 的作用

当获取信息时，需要渲染对应的省市信息
通过添加回调，可以依次获取省、市、地区信息

```js
regions.getState(regions.state, 1, function () {
  $('#state').val(_this.attr('data-state'))
  regions.getCity(regions.city, _this.attr('data-state'), function () {
    $('#city').val(_this.attr('data-city'))
    regions.getDistrict(regions.district, _this.attr('data-city'), function () {
      $('#district').val(_this.attr('data-district'))
    })
  })
})
```
