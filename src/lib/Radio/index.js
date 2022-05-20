import Radio from "./src/Radio";

/* istanbul ignore next */
Radio.install = function (app) {
  app.component(Radio.name, Radio);
};

export default Radio;
