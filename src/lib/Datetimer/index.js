import Datetimer from "./src/Datetimer";
import Dater from "./src/Dater";
import Timer from "./src/Timer";

/* istanbul ignore next */
Datetimer.install = function (app) {
  app.component(Datetimer.name, Datetimer);
  app.component(Dater.name, Dater);
  app.component(Timer.name, Timer);
};

export default Datetimer;
