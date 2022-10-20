import { defineUserConfig ,defaultTheme} from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import  registerComponentsPlugin  from '@vuepress/plugin-register-components'

import path from 'path';

// console.log('__dirname',__dirname);
// console.log(path.resolve(__dirname, '../comps'));
// console.log(path.resolve(__dirname,'var.scss'));
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Vary-UI-V3',
  description: 'vary-ui-v3说明文档',
  alias: {
    '@':__dirname
  },
  plugins: [
    registerComponentsPlugin({
      // 配置项
      componentsDir: path.resolve(__dirname,'../comps')
    }),
  ], 
  // resolve: {
  //   extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  // },
  bundler: viteBundler({
    viteOptions: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use '${path.resolve(__dirname,'var.scss')}' as *;`,
          },
        },
      },
    },
    vuePluginOptions: {},
  }),
  theme: defaultTheme({
    navbar: [
      {
        text: "组件",
        link: "../sections/avatar",
      },
    ],
    sidebar: {
      "/sections/": [
        {
          text: "安装及环境",
          children: ["install", "variable"],
        },
        {
          text: "布局",
          children: ["scene", "space"],
        },
        {
          text: "表格",
          children: ["table"],
        },
        {
          text: "表单",
          children: [
            "field",
            "input",
            "checkbox",
            "radio",
            "textarea",
            "datetimer",
            "switch",
            "upload",
          ],
        },
        {
          text: "组件库",
          children: ["avatar", "button", "link", "card", "preview","tabs", "tree"],
        },
        {
          text: "弹出窗",
          children: ["alert", "message", "notify", "dialog", "loading"],
        },
      ],
      "/options/": [
        {
          text: "选项",
          children: [""],
        },
      ],
    },
  })
})