import Upload from "./src/Upload";
Upload.install = function (app, options = {}) {
  app.component(Upload.name, Upload);
};

export default Upload;
