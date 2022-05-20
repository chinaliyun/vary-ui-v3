import Select from "./src/Select";

/* istanbul ignore next */
Select.install = function (app) {
  app.component(Select.name, Select);
};

export default Select;
