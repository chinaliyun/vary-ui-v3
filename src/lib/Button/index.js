import Button from "./src/Button.vue";

/* istanbul ignore next */
Button.install = function (app) {
  app.component(Button.name, Button);
};

export default Button;
