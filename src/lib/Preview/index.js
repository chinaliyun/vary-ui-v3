import { createApp } from "vue";
import Preview from "./src/Preview";

const ExtendComponent = createApp(Preview);

/**
 *
 * @param {Object} options
 * urls: Array<String>
 * current:0
 */

let eleInstance = null;
function instance(options) {
  if (eleInstance) {
    return;
  }
  const { urls, current = 0 } = options;
  if (!urls.length) {
    return;
  }

  eleInstance = new ExtendComponent();
  eleInstance.init({ urls, current });
  eleInstance.destory = () => {
    eleInstance.$destroy();
    document.body.removeChild(ele);
    eleInstance = null;
  };
  const ele = eleInstance.$mount().$el;
  document.body.appendChild(ele);
}

instance.install = function (app) {
  app.config.globalProperties.$preview = instance;
};

export default instance;
