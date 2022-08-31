import DatetimePicker from "./src/DatetimePicker.vue";

/* istanbul ignore next */
DatetimePicker.install = function (app) {
  app.component(DatetimePicker.name, DatetimePicker);
};

export default DatetimePicker;
