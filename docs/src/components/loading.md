---
pageClass: custom-page-class
---

# Loading

## 基础用法

`loading`在组件中通过`app.config.globalProperties.$loading`添加到了 App 实例中, 并且返回一个`loading`实例, 可以通过实例的`close()`方法,手动关闭弹窗, 通过这种方式打开的 loading 层是固定在全屏幕上的. 也可以通过传参的方式定义 loading 文字

options|类型|默认值|作用
---|---|---|---
text|string|'loading'|loading状态下的展示文字
mask|boolean|false|是否展示遮罩层

<br/>

<Loading-Base/>

@[code](../.vuepress/components/Loading/Base.vue)

## 自定义指令

组件提供了自定义指令`v-loading`,用来展示局部的 loading 状态,此时可以通过`data-loading-text`定义 loading 文字, 通过`data-loading-mask`来定义关闭遮罩层

<br/>

<Loading-Directive/>

@[code](../.vuepress/components/Loading/Directive.vue)
