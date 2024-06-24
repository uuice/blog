---
title: 通过视频url，获取缩略图
id: 35
date: 2023-11-24 21:10:41
auther: nginx
cover: https://uuice-1254189824.cos.ap-chengdu.myqcloud.com/halo-uuice/bing/0979.jpg?imageMogr2/thumbnail/640x/interlace/1
excerpt: getVideoImg (url) {      let _this = this      // 创建视频对象      let video = document.createElement(&#39;video&#39;)      video.src = url      video.
categories:
  - notes
tags:
---

```javascript
    getVideoImg (url) {
      let _this = this
      // 创建视频对象
      let video = document.createElement('video')
      video.src = url
      video.width = 503
      video.height = 295
      video.setAttribute('crossOrigin', 'Anonymous')
      video.autoplay = true
      // video.play() // 开始播放
      video.addEventListener('loadeddata', () => {
        setTimeout(() => {
          let canvas = document.createElement('canvas')
          canvas.width = 503
          canvas.height = 503
          let ctx = canvas.getContext('2d')
          let imgHeight = video.videoHeight
          let imgWidth = video.videoWidth
          // canvas.width = imgWidth
          // canvas.height = imgHeight
          ctx.drawImage(video, 0, 0, imgWidth, imgHeight, 0, 0, video.width, video.width)
          let img = canvas.toDataURL('image/png')
          // img 为图片信息
          _this.$set(_this.imgList, url, img)
        }, 10)
      }, false)
    },
```
