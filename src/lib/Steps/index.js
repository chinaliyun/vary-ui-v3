import Steps from "./src/Steps";

/* istanbul ignore next */
Steps.install = function (app) {
  app.component(Steps.name, Steps);
};

export default Steps;
