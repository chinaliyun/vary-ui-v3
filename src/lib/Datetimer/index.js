import DatetimePicker from "./src/DatetimePicker";
import DatePicker from "./src/DatePicker";
import TimePicker from "./src/TimePicker";

export default {
  install: function (app) {
    app.component(DatetimePicker.name, DatetimePicker);
    app.component(DatePicker.name, DatePicker);
    app.component(TimePicker.name, TimePicker);
  },
};
