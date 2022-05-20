<template>
  <div class="v_datetimer">
    <var-scene flex middle class="v_datetimer_input">
      <div class="range_begin">{{ rangeBeginValue }}</div>
      <div v-if="ready && range">至</div>
      <div v-if="ready && range" class="range_end">{{ rangeEndValue }}</div>
    </var-scene>
    <div v-if="ready" class="v_datetimer_dialog show">
      <div class="arrow_top"></div>
      <div class="v_daetimer_dialog_outer">
        <VarDater
          v-if="format.includes('yyyy')"
          :value.sync="rangeBeginValue"
        />
      </div>
    </div>
  </div>
</template>
<script>
const formatDict = [
  "yyyy",
  "yyyy-mm",
  "yyyy-mm-dd",
  "yyyy-mm-dd hh",
  "yyyy-mm-dd hh:mm",
  "yyyy-mm-dd hh:mm:ss",
  "hh",
  "hh:mm",
  "hh:mm:ss",
];

import moment from "moment";
export default {
  name: "VarDatetimer",
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      ready: false,
      rangeBeginValue: "",
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    /**
     * format仅支持以下几种格式, 其他均为非法格式
     * yyyy
     * yyyy-mm
     * yyyy-mm-dd
     * yyyy-mm-dd hh
     * yyyy-mm-dd hh:mm
     * yyyy-mm-dd hh:mm:ss
     * hh
     * hh:mm
     * hh:mm:ss
     */
    format: {
      type: String,
      default: "yyyy-mm-dd",
    },
    placeholder: {
      type: String,
      default: "",
    },
    range: {
      type: Boolean,
      defalt: false,
    },
    beginDate: {
      type: String,
      default: "",
    },
    endDate: {
      type: String,
      default: "",
    },
    beginTime: {
      type: String,
      default: "",
    },
    endTime: {
      type: String,
      default: "",
    },
  },
  provide() {
    return {
      ...this.$props,
    };
  },
  created() {
    // 检查range与value的关系
    if (this.range && Array.isArray(this.value)) {
      throw new Error("when prop range was true, v-model must be an Array");
    }
    // 检查format格式
    if (!formatDict.includes(this.format.toLowerCase())) {
      throw new Error("prop foramt invalid");
    }
    // 检查value格式
    if (this.range) {
      this.rangeBeginValue = this.verifyValue(this.value[0]);
      this.rangeEndValue = this.verifyValue(this.value[1]);
    } else {
      this.rangeBeginValue = this.verifyValue(this.value);
    }
    this.ready = true;
  },
  methods: {
    verifyValue(v) {
      const reg = new RegExp("^" + this.format.replace(/[ymdhis]/, "d") + "$");
      if (v && reg.test(v)) {
        throw new Error("value与format格式不一致");
      }
      if (!v) {
        return moment().format("YYYY-MM-DD HH:mm:ss");
      } else {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
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
    .range_begin,
    .range_end {
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
    width: 100%;
    max-width: 300px;
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
    .v_daetimer_dialog_outer {
      border: 1px solid $border-color2;
      border-radius: 4px;
      background-color: white;
      box-shadow: 0 1px 3px rgb(226, 226, 226);
    }
  }
}
</style>