import { createApp } from "vue";
import Alert from "./src/Alert";

const createComponent = function (type, options) {
  // 防止用户传入其他参数
  const { title, content, confirmText, cancelText, resolve, reject } = options;
  const realOptions = {
    title,
    content,
    confirmText,
    cancelText,
  };
  if (realOptions.title.trim() === "" && realOptions.content.trim() === "") {
    reject(new Error("title 和 content 中的一个必须有值"));
  }

  const Component = createApp(Alert);
  const eleInstance = new Component();
  const el = eleInstance.$mount().$el;

  eleInstance.resolve = () => {
    resolve();
    eleInstance.$destroy();
    document.body.removeChild(el);
  };

  eleInstance.reject = (err) => {
    reject(err);
    eleInstance.$destroy();
    document.body.removeChild(el);
  };

  eleInstance.init(type, realOptions);

  document.body.appendChild(el);
  eleInstance.show();
};

function instance(options) {
  return new Promise((resolve, reject) => {
    createComponent("", { ...options, resolve, reject });
  });
}

instance.success = function (options) {
  return new Promise((resolve, reject) => {
    createComponent("success", { ...options, resolve, reject });
  });
};
instance.error = function (options) {
  return new Promise((resolve, reject) => {
    createComponent("error", { ...options, resolve, reject });
  });
};
instance.warning = function (options) {
  return new Promise((resolve, reject) => {
    createComponent("warning", { ...options, resolve, reject });
  });
};
instance.tips = function (options) {
  return new Promise((resolve, reject) => {
    createComponent("tips", { ...options, resolve, reject });
  });
};

instance.install = function (app) {
  app.config.globalProperties.$alert = instance;
};
export default instance;
