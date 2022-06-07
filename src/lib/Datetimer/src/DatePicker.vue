<!--

dater作为日期选择器, 没有自己的边框, 必须放在datepicker中使用
  beginDate
  endDate
  beginValue
  endValue
  range

timer作为时间选择器, 没有自己的边框, 必须放在timepicker中使用

输入框要放在datepicker和timepicker以及datetimepicker中

datepicker要支持选择两个日期,所以可能内嵌两个dater, 且
  组件内只考虑日期, 不考虑时间因素, 所以要对传入值做一些修改

  range  定义是否显示两个dater
  begin 
  end
  beginValue  要绑定到dater上
  endValue    绑定到dater上
  @change 被触发时, 还要同步到父组件中

timepicker要支持选择两个时间, 所以可能内嵌两个timer
  range  定义是否显示两个timer
  beginDate 
  endDate
  beginValue  要绑定到timer上
  endValue    绑定到timer上
  @change 被触发时, 还要同步到父组件中

datetimepicker 要支持选择两个日期时间, 所以可能内嵌两组dater/timer
  format 仅用来格式化用户选择的日期, 直接通过format来处理
  value  如果value的值通过moment与用户format属性的格式处理后与原始value不一致, 直接警告
  range  是否显示两组选择器
  beginDate
  endDate


<datepicker>
  <dater> 
    <input />
    <dialog/>
  </dater>
</datepicker>

<timepicker>
  <timer>
    <input />
    <dialog/>
  </timer>
</timepicker>

<datetimepicker>
  <div>
    <dater/>
    <timer/>
  </div>
  <div>
    <dater/>
    <timer/>
  </div>
</datetimepicker>

验证列表:
single:

range:
  在第一个窗口:
    点击下一个月按钮时,如果第二个窗口月份即将相同, 月份+1
    点击上一个月按钮时, 只更新第一个窗口的月份
    点击上一年按钮时, 两个窗口同时年份-1
    点击下一年按钮时, 两个窗口同时年份+1

  在第二个窗口:
    点击上一个月按钮时, 如果第一个窗口月份即将相同, 月份-1
    点击下一个月按钮时, 只更新第二个窗口的月份
    点击上一年按钮时, 两个窗口同时年份-1
    点击下一年按钮时, 两个窗口同时年份+1
  
  首次选择日期:
    第一个窗口月份更新为所选值的月份
    第二个窗口:
      如果小于等于第一个窗口月份, 设为第一个窗口的下一个月份

      
  二次选择日期:
    选最早值作为开始日期, 另一个作为结束日期
    更新第一个窗口到开始日期所在月份
    更新第二个窗口到结束日期所在月份
      如果结束日期与开始日期同月:更新第二个窗口到开始日期下一个月份
      如果结束日期与开始日期不同月:更新第二个窗口到结束日期所在月份
  

  
  


-->
<template>
  <div class="v_datetimer">
    <var-scene
      flex
      middle
      class="v_datetimer_input"
      @click="openDialog($event)"
    >
      <div class="range_begin">{{ showBeginValue }}</div>
      <div v-if="ready && range">至</div>
      <div v-if="ready && range" class="range_end">{{ showEndValue }}</div>
    </var-scene>
    <div class="v_datetimer_dialog" :class="{ show: visible }" @click.stop="">
      <div class="arrow_top"></div>
      <var-scene class="v_datetimer_dialog_outer">
        <var-scene flex>
          <Dater
            ref="d1"
            :visible="visible"
            :mode="mode"
            :value="beginValue"
            :range-value="[beginValue, endValue]"
            @prev-month="prevMonth(1)"
            @next-month="nextMonth(1)"
            @prev-year="(v) => prevYear(1, v)"
            @next-year="(v) => nextYear(1, v)"
            @select-year="(v, commit) => selectYear(1, v, commit)"
            @select-month="(v, commit) => selectMonth(1, v, commit)"
            @select-date="(v, commit) => selectDate(1, v, commit)"
          />
          <var-space w="10" class="line"></var-space>
          <Dater
            ref="d2"
            :visible="visible"
            v-if="range"
            :mode="mode"
            :value="endValue"
            :range-value="[beginValue, endValue]"
            @prev-month="prevMonth(2)"
            @next-month="nextMonth(2)"
            @prev-year="(v) => prevYear(2, v)"
            @next-year="(v) => nextYear(2, v)"
            @select-year="(v, commit) => selectYear(2, v, commit)"
            @select-month="(v, commit) => selectMonth(2, v, commit)"
            @select-date="(v, commit) => selectDate(2, v, commit)"
          />
        </var-scene>

        <!-- <var-scene flex center p="20" class="control_row">
          <var-button primary @click="submit">确定</var-button>
          <var-space w="20"></var-space>
          <var-button @click="reset">重置</var-button>
        </var-scene> -->
      </var-scene>
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
    console.log(d1, d2);
    this.init();
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
    // visible(v) {
    //   if (!v) {
    //     point = 0;
    //   }
    // },
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
        // 先检查value与format的一致性
        // if (this.begin && !moment.isDate(new Date(this.begin))) {
        //   throw new Error("format 与 begin 格式不一致");
        // }
        // if (this.end && !moment.isDate(new Date(this.end))) {
        //   throw new Error("format 与 end 格式不一致");
        // }
        if (this.range) {
          if (!Array.isArray(this.modelValue)) {
            throw new Error("range为true时, value必须为数组格式");
          }
          if (
            this.modelValue[0] &&
            !moment.isDate(new Date(this.modelValue[0]))
          ) {
            throw new Error(`value[0] [${value[0]}]不是有效的时间格式`);
          }
          if (
            this.modelValue[0] &&
            !moment.isDate(new Date(this.modelValue[0]))
          ) {
            throw new Error(`value[1] [${value[1]}]不是有效的时间格式`);
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
        }

        if (this.modelValue && !moment.isDate(new Date(this.modelValue))) {
          throw new Error("format 与 value格式不一致");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    init() {
      this.valide();
      const { year, month } = this;
      this.mode = year ? 1 : month ? 2 : 3;

      const validFormat = year ? _YEAR : month ? _MONTH : _DATE;

      this.originBeginValue =
        this.beginValue =
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
.v_datetimer {
  position: relative;
  .v_datetimer_input {
    border: 1px solid $border-color2;
    border-radius: 4px;
    height: $input-height;
    cursor: pointer;
    .range_begin,
    .range_end {
      flex-shrink: 0;
      width: 50%;
      flex-grow: 1;
      text-align: center;
    }
  }
  .v_datetimer_dialog {
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
    .v_datetimer_dialog_outer {
      border: 1px solid $border-color2;
      border-radius: 4px;
      background-color: white;
      box-shadow: 0 1px 10px rgb(231, 231, 231);
    }
  }
}
</style>