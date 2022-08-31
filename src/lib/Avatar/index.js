import Avatar from "./src/Avatar.vue";

Avatar.install = function (app) {
  app.component(Avatar.name, Avatar);
};

export default Avatar;
