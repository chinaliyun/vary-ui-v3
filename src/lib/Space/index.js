import Space from "./src/Space.vue";

/* istanbul ignore next */
Space.install = function (app) {
  app.component(Space.name, Space);
};

export default Space;
