import Pager from "./src/Pager";

/* istanbul ignore next */
Pager.install = function (app) {
  app.component(Pager.name, Pager);
};

export default Pager;
