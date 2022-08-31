import Pager from "./src/Pager.vue";

/* istanbul ignore next */
Pager.install = function (app) {
  app.component(Pager.name, Pager);
};

export default Pager;
