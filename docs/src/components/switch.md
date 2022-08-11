---
pageClass: custom-page-class
---

# Switch 开关

## 基础用法

基础用法很简单, 直接通过`v-model`绑定一个布尔值类型的属性即可.

<Switch-Base/>

@[code](../.vuepress/components/Switch/Base.vue)

## 修改样式

支持修改激活背景颜色&控件宽度

<Switch-Type/>

@[code](../.vuepress/components/Switch/Type.vue)

## 禁用状态

禁用组件

<Switch-Disabled/>

@[code](../.vuepress/components/Switch/Disabled.vue)

## props

| name        | default | desc     |
| ----------- | ------- | -------- |
| disabled    | false   | 禁用控件 |
| activeColor | #13ce66 | 激活颜色 |
| width       | 40px    | 元素宽度 |
