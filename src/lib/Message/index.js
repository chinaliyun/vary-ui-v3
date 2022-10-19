import { createApp } from "vue";
import Message from "./src/Message.vue";

let instanceIndex = 0;
let instanceMap = [];
const createComponent = function (type, msg) {
  const varyAlerts = document.createElement('div');
  varyAlerts.classList.add(`vary_alert_${instanceIndex}`);
  document.body.appendChild(varyAlerts)

  const Component = createApp(Message);
  const componentInstance = Component.mount(varyAlerts);
  componentInstance.createIndex = instanceIndex++;
  componentInstance.end = function () {
    document.body.removeChild(varyAlerts);
    instanceMap = instanceMap.filter((item) => item.createIndex !== componentInstance.createIndex);
    renderList();

  }
  instanceMap.push(instance);
  componentInstance.init(type, msg, instanceMap.length);
  return componentInstance;
};

function instance(msg) {
  createComponent("success", msg);
}

const renderList = function () {
  if (instanceMap.length > 0) {
    instanceMap.forEach((item, index) => {
      item.setTop(index + 1);
    });
  }
};

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
  app.config.globalProperties.$message = instance;
};
export default instance;
