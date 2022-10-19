import { createApp } from "vue";
import Notify from "./src/Notify.vue";

let nextInstance = [];
let instanceMap = [];
let top = 20;
let instanceIndex = 0;
const createComponent = function (type, options) {
  const { title, content, buttonText, buttonCallback, meta } = options;
  // 限制用户传参类型
  const realOptions = {
    title,
    content,
    buttonText,
    buttonCallback,
    meta, // 用于保存额外数据, 点击按钮时,会传给回调函数
  };
  if (title.trim() === "" || content.trim() === "") {
    throw new Error(
      "title and content option can not be empty in Notify component "
    );
  }
  if (
    buttonCallback &&
    Object.prototype.toString
      .call(buttonCallback)
      .slice(-9, -1)
      .toLowerCase() !== "function"
  ) {
    throw new Error(
      "buttonCallback  option must be a function in Notify component "
    );
  }

  // 统计所有组件的总高度
  top = !instanceMap.length ? 20 : instanceMap.reduce((pv, cv) => {
    return pv + cv.$el.getBoundingClientRect().height + 20
  }, 20);

  if (top + 140 > window.innerHeight) {
    // 如果新增的弹窗,可能超出可视区域, 暂时放进队列中
    nextInstance.push({
      type,
      realOptions,
    });

    return;
  }

  const eleWrapper = document.createElement('div');
  eleWrapper.classList.add(`vary_alert_${instanceIndex}`);
  document.body.appendChild(eleWrapper)


  const Component = createApp(Notify);

  const componentInstance = Component.mount(eleWrapper);
  componentInstance.createIndex = instanceIndex++;

  // 添加销毁回调函数
  componentInstance.remove = function () {
    resetStyle(componentInstance);
    instanceMap = instanceMap.filter((item) => item.createIndex !== componentInstance.createIndex);
    document.body.removeChild(eleWrapper);
    if (nextInstance.length > 0) {
      createComponent(nextInstance[0].type, nextInstance[0].realOptions);
      nextInstance = nextInstance.slice(1);
    }
  };

  realOptions.top = top;
  componentInstance.init(type, realOptions);

  instanceMap.push(componentInstance);
  componentInstance.show();

  return componentInstance;
};

function resetStyle(componentInstance) {
  const elHeight = componentInstance.$el.getBoundingClientRect().height + 20;
  const createIndex = componentInstance.createIndex;
  console.log("resetStyle", elHeight, createIndex);
  if (instanceMap.length > 0) {
    instanceMap.forEach((item) => {
      if (item.createIndex >= createIndex) { //只需要调整被关闭组件之后的组件
        item.renderStyle(elHeight);
      }
    });
  }
};

function instance(options) {
  createComponent("success", options);
}

instance.success = function (msg) {
  createComponent("success", msg);
};
instance.error = function (msg) {
  createComponent("error", msg);
};
instance.warning = function (msg) {
  createComponent("warning", msg);
};
instance.tips = function (msg) {
  createComponent("tips", msg);
};

instance.install = function (app) {
  app.config.globalProperties.$notify = instance;
};
export default instance;
