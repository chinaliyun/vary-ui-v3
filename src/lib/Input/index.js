import Input from "./src/Input";

/* istanbul ignore next */
Input.install = function (app) {
  app.component(Input.name, Input);
};

export default Input;
