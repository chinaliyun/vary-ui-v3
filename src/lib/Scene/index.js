import Scene from "./src/Scene.vue";

/* istanbul ignore next */
Scene.install = function (app) {
  app.component(Scene.name, Scene);
};

export default Scene;
