---
pageClass: custom-page-class
---

# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

展示基础结构

<Tree-Base/>

@[code](../.vuepress/components/Tree/Base.vue)

## 配置 props 展示效果

展示传入 props

<Tree-Props/>

@[code](../.vuepress/components/Tree/Props.vue)

## Attributes

| name             | default | desc                                            |
| ---------------- | ------- | ----------------------------------------------- |
| list             | []      | 展示数据                                        |
| props            | {}      | 配置选项，具体看下表                            |
| filterNodeMethod | funtion | 列表过滤方法，该函数会通过 filter()方法进行调用 |
| nodeClick        | -       | 点击节点的时候触发，返回该节点的 item           |

## props

| prop        | type     | desc                                            |
| ----------- | -------- | ----------------------------------------------- |
| renderIndex | 1        | 限制树形列表最大渲染的层级,默认数据子节点层级数 |
| nodeKey     | id       | 自定义节点唯一标识                              |
| label       | name     | 自定义节点名称                                  |
| children    | children | 自定义子节点名称                                |
