import { createApp } from "vue";
import Loading from "./src/Loading.vue";

let instanceIndex = 0;
let globalComponentInstance = null;

function createGlobalInstance(options, parentNode) {
  if (globalComponentInstance) {
    return
  }
  // 保存好原有body的样式
  const originStyle = window.getComputedStyle(parentNode)
  const parentNodeHeight = originStyle.height;
  const parentNodeOverflow = originStyle.overflowY;
  parentNode.style.height = '100vh'
  parentNode.style['overflow-y'] = 'hidden'


  const eleWrapper = document.createElement('div');
  eleWrapper.classList.add(`vary_loading_global`);
  parentNode.appendChild(eleWrapper)

  let component = createApp(Loading);
  globalComponentInstance = component.mount(eleWrapper)
  globalComponentInstance.init(options, true);

  return {
    close: function () {
      component.unmount();
      parentNode.removeChild(eleWrapper);
      component = null;
      // 恢复body原有样式
      parentNode.style.height = parentNodeHeight
      parentNode.style['overflow-y'] = parentNodeOverflow
      globalComponentInstance = null;
    }
  };
}

function createSingleInstance(options, parentNode) {
  const originStyle = window.getComputedStyle(parentNode)
  const parentNodePosition = originStyle.position;

  const eleWrapper = document.createElement('div');
  eleWrapper.classList.add(`vary_alert_${instanceIndex++}`);
  parentNode.appendChild(eleWrapper)

  let component = createApp(Loading);
  let singleComponentInstance = component.mount(eleWrapper);
  const ele = singleComponentInstance.$el;
  singleComponentInstance.init(options);

  if (parentNodePosition == "static") {
    parentNode.style.position = "relative";
    ele.style.position = "absolute";
  }

  return {
    close: function () {
      component.unmount();
      parentNode.removeChild(eleWrapper);
      component = null;
      // 恢复body原有样式
      parentNode.style.position = parentNodePosition;
    }
  };
}
function createInstance(options = {}, parentNode = null) {
  if (parentNode) {
    return createSingleInstance(options, parentNode);
  } else {
    return createGlobalInstance(options, document.body);
  }
}

const instance = {
  install(app) {
    app.config.globalProperties.$loading = createInstance;
    app.directive("loading", {
      updated: (el, binding, vnode) => {
        if (!binding.value && el.$loading) {
          el.$loading.close();
          el.$loading = null;
          return;
        }
        if (binding.value && !el.$loading) {
          el.$loading = createInstance(
            { text: vnode.el.dataset.loadingText, mask: vnode.el.dataset.loadingMask === 'false' ? false : true },
            el
          );
        }
      },
    });
  },
};

export default instance;
