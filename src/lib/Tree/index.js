import Tree from "./src/Tree";

/* istanbul ignore next */
Tree.install = function (app) {
  app.component(Tree.name, Tree);
};

export default Tree;
