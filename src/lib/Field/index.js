import Field from "./src/Field";

/* istanbul ignore next */
Field.install = function (app) {
  app.component(Field.name, Field);
};

export default Field;
