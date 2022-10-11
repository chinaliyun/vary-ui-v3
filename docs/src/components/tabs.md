---
pageClass: custom-page-class
---


# Tabs 标签组

## 基础用法

| name         | default | desc                   |
| ------------ | ------- | ---------------------- |
| `data`    | []      | 定义标签组内容         |
| `data.label`      |       | 单个标签的显示文字   |
| `data.name`    |       | 单个标签的key, 用于标识当前选中的标签     |
| `defaultName`    | ''      | 默认选中的标签name值 |
| `left,center,right`     | true, false, false      | 定义标签组的水平对齐位置 |
| `border` | []      | false |

<Tab-Base/>

@[code](../.vuepress/components/Tab/Base.vue)
