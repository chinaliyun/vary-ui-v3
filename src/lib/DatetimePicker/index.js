import DatetimePicker from "./src/DatetimePicker";

/* istanbul ignore next */
DatetimePicker.install = function (app) {
  app.component(DatetimePicker.name, DatetimePicker);
};

export default DatetimePicker;
