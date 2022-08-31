import DatetimePicker from "./src/DatetimePicker.vue";
import DatePicker from "./src/DatePicker.vue";
import TimePicker from "./src/TimePicker.vue";

export default {
  install: function (app) {
    app.component(DatetimePicker.name, DatetimePicker);
    app.component(DatePicker.name, DatePicker);
    app.component(TimePicker.name, TimePicker);
  },
};
