import Card from "./src/Card.vue";

/* istanbul ignore next */
Card.install = function (app) {
  app.component(Card.name, Card);
};

export default Card;
