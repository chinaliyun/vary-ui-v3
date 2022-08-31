import Switch from "./src/Switch.vue";

/* istanbul ignore next */
Switch.install = function (app) {
  app.component(Switch.name, Switch);
};

export default Switch;
