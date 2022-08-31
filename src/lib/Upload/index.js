import Upload from "./src/Upload.vue";
Upload.install = function (app, options = {}) {
  app.component(Upload.name, Upload);
};

export default Upload;
