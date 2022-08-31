import Textarea from "./src/Textarea.vue";

/* istanbul ignore next */
Textarea.install = function (app) {
  app.component(Textarea.name, Textarea);
};

export default Textarea;
