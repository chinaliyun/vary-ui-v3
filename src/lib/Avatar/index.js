import Avatar from "./src/Avatar";

Avatar.install = function (app) {
  app.component(Avatar.name, Avatar);
};

export default Avatar;
