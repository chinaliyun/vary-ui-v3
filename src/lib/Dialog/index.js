import Dialog from "./src/Dialog";

/* istanbul ignore next */
Dialog.install = function (app) {
  app.component(Dialog.name, Dialog);
};

export default Dialog;
