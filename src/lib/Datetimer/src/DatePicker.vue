<template>
  <div class="v_date_picker">
    <div class="v_date_picker_input" @click="openDialog($event)">
      <div class="range_begin">{{ showBeginValue }}</div>
      <div v-if="ready && range">至</div>
      <div v-if="ready && range" class="range_end">{{ showEndValue }}</div>
    </div>
    <div class="v_date_picker_dialog" :class="{ show: visible }" @click.stop="">
      <div class="arrow_top"></div>
      <div class="v_date_picker_dialog_outer">
        <Dater ref="d1" :visible="visible" :mode="mode" :value="beginValue" :range-value="[beginValue, endValue]"
          @prev-month="prevMonth(1)" @next-month="nextMonth(1)" @prev-year="(v) => prevYear(1, v)"
          @next-year="(v) => nextYear(1, v)" @select-year="(v, commit) => selectYear(1, v, commit)"
          @select-month="(v, commit) => selectMonth(1, v, commit)"
          @select-date="(v, commit) => selectDate(1, v, commit)" />
        <var-space w="10" class="line"></var-space>
        <Dater ref="d2" :visible="visible" v-if="range" :mode="mode" :value="endValue"
          :range-value="[beginValue, endValue]" @prev-month="prevMonth(2)" @next-month="nextMonth(2)"
          @prev-year="(v) => prevYear(2, v)" @next-year="(v) => nextYear(2, v)"
          @select-year="(v, commit) => selectYear(2, v, commit)"
          @select-month="(v, commit) => selectMonth(2, v, commit)"
          @select-date="(v, commit) => selectDate(2, v, commit)" />
        <!-- <div flex center p="20" class="control_row">
          <var-button primary @click="submit">确定</var-button>
          <var-space w="20"></var-space>
          <var-button @click="reset">重置</var-button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import Dater from "./Dater.vue";

const _DATE = "YYYY-MM-DD";
const _MONTH = "YYYY-MM";
const _YEAR = "YYYY";

let d1 = null,
  d2 = null;
let point = 0;

function isDate(v) {
  return new Date(v).toString() !== "Invalid Date";
}
export default {
  name: "VarDatePicker",
  components: {
    Dater,
  },
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Array],
      default: undefined,
    },
    format: {
      type: String,
      default: "YYYY-MM-DD",
    },
    placeholder: {
      type: String,
      default: "",
    },
    range: {
      type: Boolean,
      defalt: false,
    },
    begin: {
      type: String,
      default: "",
    },
    end: {
      type: String,
      default: "",
    },
    year: {
      type: Boolean,
      default: false,
    },
    month: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      mode: 3,
      ready: false,
      visible: false,
      beginValue: "",
      endValue: "",
      rangeBegin: "",
      rangeEnd: "",
      originBeginValue: "",
      orginEndValue: "",
      showBeginValue: "",
      showEndValue: "",
    };
  },
  mounted() {
    d1 = this.$refs.d1;
    d2 = this.$refs.d2;
    console.log(this.modelValue[0]);
    console.log(isDate(this.modelValue[0]));
    this.init();
    // console.log(moment.isDate(this.modelValue[1]));
  },
  provide() {
    return {
      format: this.format,
      range: this.range,
      begin: this.begin,
      end: this.end,
      rangeBegin: this.rangeBegin,
      rangeEnd: this.rangeEnd,
    };
  },
  watch: {
    modelValue(v) {
      if (this.range) {
        if (v[0] !== this.showBeginValue || v[1] !== this.showEndValue) {
          this.init();
        }
      } else {
        if (v !== this.showBeginValue) {
          this.init();
        }
      }
    },
  },
  methods: {
    closeDialog() {
      this.visible = false;
      window.removeEventListener("click", this.closeDialog);
      point = 0;
    },
    openDialog(e) {
      this.visible = true;

      setTimeout(() => {
        window.addEventListener("click", this.closeDialog, {
          once: true,
        });
      }, 500);
    },
    valide() {
      try {
        if (this.range) {
          if (!Array.isArray(this.modelValue)) {
            throw new Error("range为true时, value必须为数组格式");
          }
          if (this.modelValue[0] && !isDate(this.modelValue[0])) {
            throw new Error(
              `value[0] [${this.modelValue[0]}]不是有效的时间格式`
            );
          }
          if (this.modelValue[0] && !isDate(this.modelValue[0])) {
            throw new Error(
              `value[1] [${this.modelValue[1]}]不是有效的时间格式`
            );
          }
          // 开始时间不能晚于结束时间
          if (
            this.modelValue[0] &&
            this.modelValue[1] &&
            new Date(this.modelValue[0]) >= new Date(this.modelValue[1])
          ) {
            throw new Error(
              `结束时间[${this.modelValue[1]}]必须大于开始时间[${this.modelValue[0]}]`
            );
          }
        } else {
          if (this.modelValue && !isDate(this.modelValue)) {
            throw new Error(`value ${this.modelValue} 不是有效的日期`);
          }
        }
      } catch (e) {
        if (this.range) {
          console.log("reset");
          this.$emit("update:modelValue", [
            moment().format("YYYY-MM-DD"),
            moment()
              .add(1, this.year ? "years" : this.month ? "months" : "days")
              .format("YYYY-MM-DD"),
          ]);
        } else {
          this.$emit("update:modelValue", moment().format("YYYY-MM-DD"));
        }
        throw e;
      }
    },
    init() {
      try {
        this.valide();
      } catch (error) {
        console.log("init", "规则验证未通过, 等待下次初始化", error);
        return;
      }
      const { year, month } = this;
      this.mode = year ? 1 : month ? 2 : 3;

      const validFormat = year ? _YEAR : month ? _MONTH : _DATE;

      this.originBeginValue =
        this.showBeginValue =
        this.beginValue =
        moment(
          this.range
            ? this.modelValue[0] || undefined
            : this.modelValue || undefined
        ).format(validFormat);
      d1.initTemp(
        moment(
          this.range
            ? this.modelValue[0] || undefined
            : this.modelValue || undefined
        )
      );
      if (!this.range) {
        this.$emit("update:modelValue", this.beginValue);
        this.ready = true;
        return;
      }

      // 这里分为三个独立函数 主要是因为模式不同的情况下, 各模式处理后的
      if (year) {
        this.initYearMode(validFormat);
      } else if (month) {
        this.initMonthMode(validFormat);
      } else {
        this.initDateMode(validFormat);
      }

      this.originEndValue = this.showEndValue = this.endValue;
      this.$emit("update:modelValue", [this.beginValue, this.endValue]);

      this.ready = true;
    },
    initYearMode(validFormat) {
      // 如果结束年份大于开始年份, 才能被采用, 否则结束年份自动+1
      if (
        this.modelValue[1] &&
        moment(this.modelValue[1]).format("YYYY") > this.beginValue
      ) {
        this.endValue = moment(this.modelValue[1]).format(validFormat);
      } else {
        this.endValue = moment(this.beginValue)
          .add(1, "year")
          .format(validFormat);
      }
      // 如果结束年份与开始年份之差小于20年, 第二个选择的器的起始年份从20年后算起
      if (
        moment(this.endValue).format("YYYY") -
        moment(this.beginValue).format("YYYY") <=
        20
      ) {
        d2.initTemp(moment(this.beginValue).add("20", "years"));
      } else {
        d2.initTemp(moment(this.endValue));
      }
    },

    initMonthMode(validFormat) {
      // 如果结束月份大于开始月份, 才能被采用, 否则结束月份自动+1
      if (
        this.modelValue[1] &&
        moment(this.modelValue[1]).format("YYYY-MM") > this.beginValue
      ) {
        this.endValue = moment(this.modelValue[1]).format(validFormat);
      } else {
        // 如果没有传值, 采用开始日期的第二天
        this.endValue = moment(this.beginValue)
          .add(1, "month")
          .format(validFormat);
      }
      // 如果结束日期与开始日期的年份相同, 第二个窗口自动从下一年算起
      if (
        moment(this.beginValue).format("YYYY") ===
        moment(this.endValue).format("YYYY")
      ) {
        d2.initTemp(moment(this.beginValue).add("1", "year"));
      } else {
        d2.initTemp(moment(this.endValue));
      }
    },
    initDateMode(validFormat) {
      if (
        this.modelValue[1] &&
        moment(this.modelValue[1]).format("YYYY-MM-DD") !== this.beginValue
      ) {
        this.endValue = moment(this.modelValue[1]).format(validFormat);
      } else {
        // 如果没有传值, 采用开始日期的第二天
        this.endValue = moment(this.beginValue)
          .add(1, "day")
          .format(validFormat);
      }
      if (
        moment(this.beginValue).format("YYYYMM") ===
        moment(this.endValue).format("YYYYMM")
      ) {
        d2.initTemp(moment(this.beginValue).add(1, "months"));
      } else {
        d2.initTemp(moment(this.endValue));
      }
    },
    selectDate(n, v, commit = false) {
      //  用户选择日期
      if (!this.range) {
        if (!commit) {
          return;
        }
        this.showBeginValue = v;
        this.beginValue = v;
        this.$emit(
          "update:modelValue",
          moment(this.beginValue).format(this.format)
        );
        this.closeDialog();
        return;
      }

      // 选择范围
      if (!point) {
        if (commit) {
          // 首次选择日期
          this.beginValue = v;
          this.endValue = "";
          d1.initTemp(moment(v), 3);
          d2.initTemp(moment(v).add(1, "month"), 3);
          point = 1;
        }
      } else {
        // 二次选择日期
        if (new Date(v) < new Date(this.beginValue)) {
          this.endValue = this.beginValue;
          this.beginValue = v;
          d1.initTemp(moment(v), 3);
          d2.initTemp(moment(v).add(1, "month"), 3);
        } else {
          this.endValue = v;
        }
        if (commit) {
          d1.initTemp(moment(this.beginValue));
          if (
            moment(this.beginValue).format("YYYYMM") ===
            moment(this.endValue).format("YYYYMM")
          ) {
            d1.initTemp(moment(this.beginValue).add(1, "month"));
          } else {
            d1.initTemp(moment(this.beginValue));
          }
          point = 0;
          this.showBeginValue = this.beginValue;
          this.showEndValue = this.endValue;
          this.$emit("update:modelValue", [this.beginValue, this.endValue]);
          this.closeDialog();
        }
      }
    },
    selectYear(n, v, commit = false) {
      console.log("selectYear", n, v, commit);
      if (this.mode > 1) {
        return;
      }
      if (!this.range) {
        if (!commit) {
          return;
        }
        this.showBeginValue = this.beginValue = v;
        this.$emit(
          "update:modelValue",
          moment(this.beginValue).format(this.format)
        );
        this.closeDialog();
        return;
      }

      if (!point) {
        // 首次点击, 滑动和点击都会走这里
        // 首次点击中的滑动事件不需要处理
        if (commit) {
          this.beginValue = v;
          this.endValue = "";
          d1.initTemp(moment(v), 1);
          if (this.range) {
            point = 1;
            d2.initTemp(moment(v).add(20, "year"), 1);
          } else {
            this.showBeginValue = v;
            this.$emit("update:modelValue", this.beginValue);
          }
        }
      } else {
        // 二次点击
        // 二次点击的滑动事件也是需要处理的
        if (new Date(v) < new Date(this.beginValue)) {
          this.endValue = this.beginValue;
          this.beginValue = v;
        } else {
          this.endValue = v;
        }
        if (commit) {
          point = 1;
          this.showBeginValue = this.beginValue;
          this.showEndValue = v;
          this.$emit("update:modelValue", [this.beginValue, this.endValue]);
          this.closeDialog();
        }
      }
    },
    selectMonth(n, v, commit = false) {
      console.log("selectMonth", n, v, commit);
      if (this.mode > 2) {
        return;
      }
      if (!this.range) {
        if (!commit) {
          return;
        }
        this.showBeginValue = this.beginValue = v;
        this.$emit(
          "update:modelValue",
          moment(this.beginValue).format(this.format)
        );
        this.closeDialog();
        return;
      }
      if (!point) {
        // 首次点击, 滑动和点击都会走这里
        // 首次点击中的滑动事件不需要处理
        if (commit) {
          this.beginValue = v;
          this.endValue = "";
          d1.initTemp(moment(v), 2);
          if (this.range) {
            point = 1;
            d2.initTemp(moment(v).add(1, "year"), 2);
          } else {
            this.showBeginValue = v;
            this.$emit("update:modelValue", this.beginValue);
          }
        }
      } else {
        // 二次点击
        // 二次点击的滑动事件也是需要处理的
        if (new Date(v) < new Date(this.beginValue)) {
          this.endValue = this.beginValue;
          this.beginValue = v;
        } else {
          this.endValue = v;
        }
        if (commit) {
          point = 1;
          this.showBeginValue = this.beginValue;
          this.showEndValue = v;
          this.$emit("update:modelValue", [this.beginValue, this.endValue]);
          this.closeDialog();
        }
      }
    },
    submit() {
      this.originBeginValue = this.beginValue;
      this.originEndValue = this.endValue;
      this.$emit("update:modelValue", [this.beginValue, this.endValue]);
    },
    reset() {
      this.beginValue = this.originBeginValue;
      this.endValue = this.originEndValue;
      point = 0;
    },
    nextYear(n, v) {
      // 只处理来自第一个窗口的事件
      if (n === 2) {
        return;
      }
      const { mode } = this;
      console.log("nextYear", n);
      if (mode === 1) {
        d2.initTemp(v.add(20, "years"), 1);
      }
      if (mode === 2) {
        d2.initTemp(v.add(1, "years"), 2);
      }
      if (mode === 2) {
        d2.initTemp(v.add(1, "years"), 3);
      }
    },
    prevYear(n) {
      // 只处理来自第二个窗口的事件
      if (n === 1) {
        return;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.v_date_picker {
  position: relative;

  .v_date_picker_input {
    border: 1px solid $border-color2;
    border-radius: 4px;
    height: $input-height;
    cursor: pointer;
    display: flex;
    align-items: center;

    .range_begin,
    .range_end {
      flex-shrink: 0;
      width: 50%;
      flex-grow: 1;
      text-align: center;
    }
  }

  .v_date_picker_dialog {
    display: none;
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 10;
    padding: 10px 0;
    transform-origin: top;

    &.show {
      display: block;
      animation: show 0.08s linear;
    }

    &.align_bottom {
      top: auto;
      bottom: 40px;
      transform-origin: bottom;
    }

    @keyframes show {
      0% {
        opacity: 0;
        transform: scaleY(0.8);
      }

      100% {
        opacity: 1;
        transform: scaleY(1);
      }
    }

    .arrow_top {
      position: absolute;
      left: 20px;
      top: 6px;
      z-index: 1;
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      background-color: white;
      border-left: 1px solid $border-color2;
      border-top: 1px solid $border-color2;
      border-right: none;
      border-bottom: none;
    }

    .arrow_bottom {
      position: absolute;
      left: 20px;
      bottom: 6px;
      z-index: 1;
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      background-color: white;
      border-right: 1px solid $border-color2;
      border-bottom: 1px solid $border-color2;
      border-left: none;
      border-top: none;
    }

    .v_date_picker_dialog_outer {
      border: 1px solid $border-color2;
      border-radius: 4px;
      background-color: white;
      box-shadow: 0 1px 10px rgb(231, 231, 231);
      display: flex;
    }
  }
}
</style>