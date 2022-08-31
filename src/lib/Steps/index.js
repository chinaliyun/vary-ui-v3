import Steps from "./src/Steps.vue";

/* istanbul ignore next */
Steps.install = function (app) {
  app.component(Steps.name, Steps);
};

export default Steps;
