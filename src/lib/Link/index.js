import Link from "./src/Link.vue";

/* istanbul ignore next */
Link.install = function (app) {
  app.component(Link.name, Link);
};

export default Link;
