import Tabs from "./src/Tabs.vue";

/* istanbul ignore next */
Tabs.install = function (app) {
  app.component(Tabs.name, Tabs);
};

export default Tabs;
