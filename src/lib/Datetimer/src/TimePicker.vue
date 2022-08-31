<template>
  <div class="v_timer_picker">
    <div class="v_timer_picker_input" @click="openDialog($event)">
      <div class="range_begin">{{ showBeginTime }}</div>
      <div v-if="ready && range">至</div>
      <div v-if="ready && range" class="range_end">{{ showEndTime }}</div>
    </div>
    <div
      class="v_timer_picker_dialog"
      :class="{ show: visible }"
      @click.stop=""
    >
      <div class="arrow_top"></div>
      <div class="v_timer_picker_dialog_outer">
        <div class="v_timer_body">
          <Timer
            ref="t1"
            :visible="visible"
            :mode="mode"
            :value="beginTime"
            :rangeEnd="endTime"
            :range-value="[beginTime, endTime]"
            @change="(v) => change(1, v)"
          />
          <!-- <var-space w="10" class="line"></var-space> -->
          <Timer
            ref="t2"
            :visible="visible"
            v-if="range"
            :mode="mode"
            :value="endTime"
            :rangeBegin="beginTime"
            :range-value="[beginTime, endTime]"
            @change="(v) => change(2, v)"
          />
        </div>
        <div class="v_timer_control">
          <div class="btn_confirm" @click="submit(1)">确定</div>
          <div class="btn_cancel" @click="submit(0)">取消</div>
        </div>
        <!-- <var-scene flex center p="20" class="control_row">
          <var-button primary @click="submit">确定</var-button>
          <var-space w="20"></var-space>
          <var-button @click="reset">重置</var-button>
        </var-scene> -->
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import Timer from "./Timer.vue";

function isTime(v) {
  return (
    new Date(moment().format("YYYY-MM-DD ") + v).toString() !== "Invalid Date"
  );
}
export default {
  name: "VarTimePicker",
  components: {
    Timer,
  },
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Array],
      default: undefined,
    },
    format: {
      type: String,
      default: "HH:mm:ss",
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
    minutes: {
      type: Boolean,
      default: false,
    },
    seconds: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      mode: 3,
      ready: false,
      visible: false,
      t1: null,
      t2: null,
      beginTime: "",
      endTime: "",
      originBeginTime: "",
      originEndTime: "",
      showBeginTime: "",
      showEndTime: "",
      validFormat: "HH:mm:ss",
    };
  },
  computed: {
    validRange() {
      return [this.beginTime, this.endTime];
    },
  },
  mounted() {
    this.t1 = this.$refs.t1;
    this.t2 = this.$refs.t2;
    this.init();
  },
  watch: {
    modelValue(v) {
      console.log("modelValue", v);
      if (this.range) {
        if (v[0] !== this.showBeginTime || v[1] !== this.showEndTime) {
          this.init();
        }
      } else {
        if (v !== this.showBeginTime) {
          this.init();
        }
      }
    },
    // t1的begin从用户传入的begin开始, end从用户传入的end结束
    // t2的begin从t1的值开始, end从end结束
    begin(v) {
      this.changeRange(1, v);
    },
    end(v) {
      this.changeRange(2, v);
    },
  },
  methods: {
    closeDialog() {
      this.visible = false;
      window.removeEventListener("click", this.closeDialog);
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
      } catch (e) {}
    },
    init() {
      this.mode = this.minutes ? 2 : 3;
      const { validFormat } = this;

      let beginTime = "",
        endTime = "";

      const m = moment();
      if (this.range) {
        if (Array.isArray(this.modelValue)) {
          beginTime = this.modelValue[0];
          endTime = this.modelValue[1];
        } else {
          beginTime = m.format(validFormat);
          endTime = m.add(1, "hours").format(validFormat);
        }
        if (!beginTime || !isTime(beginTime)) {
          beginTime = m.format(validFormat);
        }
        if (!endTime || !isTime(endTime)) {
          endTime = m.format(validFormat);
        }
        // 开始时间不能晚于结束时间
        if (beginTime.replace(/:/g, "") >= endTime.replace(/:/g, "")) {
          endTime = m.add(1, "hours").format(validFormat);
        }

        this.originBeginTime = this.beginTime = beginTime;
        this.originEndTime = this.endTime = endTime;
        this.showBeginTime = moment(beginTime, "HH:mm:ss").format(this.format);
        this.showEndTime = moment(endTime, "HH:mm:ss").format(this.format);
        this.changeRange(1, this.begin);
        this.changeRange(2, this.end);
      } else {
        beginTime = this.modelValue;
        if (!beginTime || !isTime(beginTime)) {
          beginTime = m.format(validFormat);
        }
        this.originBeginTime = this.beginTime = beginTime;
        this.showBeginTime = moment(beginTime, this.format);
        this.changeRange(1, this.begin);
      }
      this.ready = true;

      console.log(
        this.t1.rangeBeginTime,
        this.t1.rangeEndTime,
        this.t2.rangeBeginTime,
        this.t2.rangeEndTime
      );
      this.openDialog();
    },
    initHoursMode() {},
    initMinutesMode() {},
    initSecondsMode() {},
    change(n, v) {
      if (n === 1) {
        this.beginTime = v;
      } else {
        this.endTime = v;
      }
    },
    submit(n) {
      console.log("submit");
      if (n) {
        this.showBeginTime = moment(beginTime, this.format);
        this.showEndTime = moment(endTime, this.format);
        this.$emit(
          "update:modelValue",
          this.range
            ? [this.showBeginTime, this.showEndTime]
            : this.showBeginTime
        );
      }
      this.closeDialog();
    },
    changeRange(n, v) {
      let m1, m2;
      if (v) {
        m1 = moment(v, this.validFormat);
        if (n === 1) {
          this.t1.rangeBeginTime = m1.format("HHmmss");
        }
        if (n === 2) {
          this.t1.rangeEndTime = m1.format("HHmmss");
        }
      }
      if (!this.range) {
        return;
      }
      m2 = moment(this.beginTime, this.validFormat);
      if (n === 1) {
        // 修改了begin
        this.t2.rangeBeginTime = m2.format("HHmmss");
      }
      if (n === 2 && v) {
        // 修改了end
        this.t2.rangeEndTime = m1.format("HHmmss");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.v_timer_picker {
  position: relative;
  .v_timer_picker_input {
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
  .v_timer_picker_dialog {
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
    .v_timer_picker_dialog_outer {
      border: 1px solid $border-color2;
      border-radius: 4px;
      background-color: white;
      box-shadow: 0 1px 10px rgb(231, 231, 231);
      padding-top: 6px;
      .v_timer_body {
        display: flex;
      }
      .v_timer_control {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        font-size: 12px;
        .btn_confirm,
        .btn_cancel {
          padding: 0 8px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>