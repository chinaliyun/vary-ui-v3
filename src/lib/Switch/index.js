import Switch from "./src/Switch";

/* istanbul ignore next */
Switch.install = function (app) {
  app.component(Switch.name, Switch);
};

export default Switch;
