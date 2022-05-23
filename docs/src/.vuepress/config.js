const path = require("path");
const { defaultTheme } = require("vuepress");
const {
  registerComponentsPlugin,
} = require("@vuepress/plugin-register-components");

const { viteBundler } = require("@vuepress/bundler-vite");
module.exports = {
  title: "VaryUI-V3",
  description: "以Vue3.0为基础的UI组件库",
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],
  alias: {
    "@variable": path.resolve(__dirname, "./index.scss"),
  },
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "@variable" as *;`,
          },
        },
      },
    },
    vuePluginOptions: {},
  }),
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  dest: path.resolve(__dirname, "../../dist"),
  theme: defaultTheme({
    // default theme config
    navbar: [
      {
        text: "组件",
        link: "/components/avatar",
      },
    ],
    sidebar: {
      "/components/": [
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
            "upload",
          ],
        },
        {
          text: "组件库",
          children: ["avatar", "button", "link", "card", "preview"],
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
  }),
};

// module.exports = {
//   themeConfig: {
//     repo: "",
//     editLinks: false,
//     docsDir: "",
//     editLinkText: "",
//     lastUpdated: false,
//   },
//   markdown: {
//     lineNumbers: true,
//   },

//   /**
//    * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
//    */
//   plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
//   scss: {
//     prependData: `
//     @import "@styles/index.scss";
//     `,
//   },
//   configureWebpack: {
//     resolve: {
//       alias: {
//         "@styles": path.resolve(__dirname, "./styles"),
//       },
//     },
//   },
// };
