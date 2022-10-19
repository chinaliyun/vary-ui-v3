import { createApp } from "vue";
import Alert from "./src/Alert.vue";

let instanceIndex = 0;

const createComponent = function (type, options) { // 防止用户传入其他参数
  const {
    title,
    content,
    confirmText,
    cancelText,
    resolve,
    reject
  } = options;
  const realOptions = {
    title,
    content,
    confirmText,
    cancelText
  };
  if (realOptions.title.trim() === "" && realOptions.content.trim() === "") {
    reject(new Error("title 和 content 中的一个必须有值"));
  }
  const eleWrapper = document.createElement('div');
  eleWrapper.classList.add(`vary_alert_${instanceIndex++}`);
  document.body.appendChild(eleWrapper)

  const Component = createApp(Alert);
  const eleInstance = Component.mount(eleWrapper)
  eleInstance.init(type, realOptions);

  eleInstance.resolve = () => {
    resolve();
    Component.unmount();
    document.body.removeChild(eleWrapper);
  };

  eleInstance.reject = (err) => {
    reject(err);
    Component.unmount();
    document.body.removeChild(eleWrapper);
  };

  eleInstance.show();
};

function instance(options = {}) {
  return new Promise((resolve, reject) => {
    createComponent("", {
      ...options,
      resolve,
      reject
    });
  });
}

instance.success = function (options = {}) {
  return new Promise((resolve, reject) => {
    createComponent("success", {
      ...options,
      resolve,
      reject
    });
  });
};
instance.error = function (options={}) {
  return new Promise((resolve, reject) => {
    createComponent("error", {
      ...options,
      resolve,
      reject
    });
  });
};
instance.warning = function (options={}) {
  return new Promise((resolve, reject) => {
    createComponent("warning", {
      ...options,
      resolve,
      reject
    });
  });
};
instance.tips = function (options={}) {
  return new Promise((resolve, reject) => {
    createComponent("tips", {
      ...options,
      resolve,
      reject
    });
  });
};

instance.install = function (app) {
  app.config.globalProperties.$alert = instance;
};
export default instance;
