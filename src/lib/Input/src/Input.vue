<template>
  <div class="v_input" :style="realStyle">
    <div class="v_input_body" :class="{
      focus,
      err,
      disabled,
      readonly,
    }" @click.stop="">
      <div class="prefix">
        <slot name="prefix"> </slot>
      </div>
      <div class="input_wrapper">
        <input ref="input" class="input" :class="{
          left: left,
          center: center,
          right: right,
          mini,
        }" :value="modelValue" v-bind="$attrs" :autofocus="autofocus" :readonly="readonly" :disabled="disabled"
          :maxlength="maxlength" @input="inputChange" @focus="onFocus" @blur="onBlur" @keyup.enter="enter" />
      </div>
      <div v-if="!disabled && !readonly && modelValue !== '' && clearable" class="clearable" @click.stop="clearValue">
        <IconClear />
      </div>
      <div ref="unit" class="suffix_column">
        <slot name="suffix"></slot>
      </div>
    </div>
    <div v-if="optionVisible && data.length > 0" class="options">
      <div class="arrow"></div>
      <div class="option_list">
        <div v-for="item in data" :key="item" class="option_item" @click="selectOption(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "../../../utils";
import IconClear from "./icons/clear.vue";
export default {
  name: "VarInput",
  components: {
    IconClear,
  },
  props: {
    modelValue: {
      type: [Number, String],
      default: "",
    },
    format: {
      type: String,
      default: "",
    },
    left: {
      type: Boolean,
      default: true,
    },
    maxlength: {
      type: String,
      default: "200",
    },
    center: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    err: {
      type: [Boolean, String],
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    width: [String, Number], // width:
    w: [String, Number], // width
  },
  data() {
    return {
      focus: false,
      realValue: "",
      optionVisible: false,
      reg: null,
      reg2: null,
      formatType: 1,
    };
  },
  computed: {
    realStyle() {
      const style = {};
      const width = this.width || this.w;
      if (width) {
        style.width = /(%|px)$/.test(width) ? width : width + "px";
      }
      return style;
    },
  },
  watch: {
    // value(v, o) {
    //   // console.log(v, o);
    //   if (v !== this.realValue) {
    //     this.init();
    //   }
    // },
    // data(v, o) {
    //   console.log('data', v, o);
    //   this.onFocus();
    // },
  },
  mounted() {
    // this.init();
  },
  methods: {
    enter: debounce(function (e) {
      this.$emit("enter", this.modelValue);
    }, 800),
    init() {
      if (/^\d{1,2}$/.test(this.format)) {
        this.formatType = 2;
      }
      if (/^(\d)\.(\d)$/.test(this.format)) {
        this.formatType = 3;
      }
      if (/^\.(\d)$/.test(this.format)) {
        this.formatType = 4;
      }

      if (this.formatType === 1) {
        if (
          this.maxlength &&
          !/[a-z]{1,}('[a-z]{1,})*$/.test(this.modelValue) &&
          this.modelValue.length > this.maxlength
        ) {
          this.$emit("update:modelValue", this.realValue);
        } else {
          this.realValue = this.modelValue;
          this.$emit("update:modelValue", this.modelValue);
        }
      }
      if (this.formatType === 2) {
        this.reg = new RegExp(`^\\d{1,${this.format}}$`);
        this.reg2 = new RegExp(`\\d{1,${this.format}}`);
        // console.log(this.reg, this.modelValue, this.reg.test(this.modelValue));
        // 如果value包含非数字字符, 直接清空, 如果没有直接赋值
        // 否则 如果长度大于format, 截取字符串,
        //      如果长度小于format, 直接使用
        // console.log('%c' + this.modelValue, 'color:red');
        if (/\D/.test(this.modelValue)) {
          this.$emit("update:modelValue", this.realValue);
        } else if (this.modelValue.length > this.format) {
          this.$emit("update:modelValue", this.modelValue.slice(0, this.format));
        } else {
          this.realValue = this.modelValue;
          this.$emit("update:modelValue", this.modelValue);
        }
      }
      if (this.formatType === 3) {
        const integer = this.format.match(/^(\d)\.(\d)$/)[1];
        const decimal = this.format.match(/^(\d)\.(\d)$/)[2];
        this.reg = new RegExp(
          `^\\d{1,${integer}}((\\.\\d{1,${decimal}})|(\\.))?$`
        );
        this.reg2 = new RegExp(
          `\\d{1,${integer}}((\\.\\d{1,${decimal}})|(\\.))?`
        );
        // 包含非数字,点的字符, 直接清空
        // if (/[^\d.]/.test(this.modelValue)) {
        //   this.realValue = ''
        //   this.$emit('change', this.realValue)
        //   return
        // }
        // if (/[a-z]{1,}('[a-z]{1,})*/.test(this.modelValue)) {
        //   return
        // }
        if (!this.reg2.test(this.modelValue)) {
          this.realValue = "";
          this.$emit("update:modelValue", this.realValue);
        } else {
          this.realValue = this.modelValue.match(this.reg2)[0];
          this.$emit("update:modelValue", this.realValue);
        }
        return;
      }
      if (this.formatType === 4) {
        const decimal = this.format.match(/^\.(\d)$/)[1];
        this.reg = new RegExp(`^\\d+((\\.)|(\\.\\d{1,${decimal}}))?$`);
        if (!this.reg.test(this.modelValue)) {
          this.realValue = "";
          this.$emit("update:modelValue", this.realValue);
        } else {
          this.realValue = this.modelValue;
        }
      }
    },

    onFocus() {
      if (this.readonly || this.disabled) {
        return;
      }
      this.focus = true;
      this.$emit("focus");
      this.optionVisible = true;
      if (this.data && this.data.length > 0) {
        window.addEventListener(
          "click",
          () => {
            this.optionVisible = false;
          },
          {
            once: true,
          }
        );
      }
    },
    selectOption(item) {
      this.optionVisible = false;
      this.$emit("update:modelValue", item, true);
    },
    onBlur() {
      this.$emit("blur");
      // 如果是小数类型, 且输入内容最后只有一个点的时候, 应该去除点
      if ([3, 4].includes(this.formatType) && /\.$/.test(this.modelValue)) {
        this.$emit("update:modelValue", this.modelValue.replace(/\.$/, ""));
      }
      this.focus = false;
    },
    clearValue() {
      this.$emit("update:modelValue", "");
    },
    inputChange(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.v_input {
  height: 36px;
  position: relative;

  .v_input_body {
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid $input-border-color;
    border-radius: 4px;
    transition: border-color 0.2s linear;
    background-color: $input-background-color;
    overflow: hidden;

    &.disabled {
      background-color: $input-disabled-color;
    }

    &.focus {
      border-color: $input-border-focus-color;
    }

    &.err {
      border-color: $input-border-error-color;
    }

    .prefix {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .input_wrapper {
      flex-shrink: 0;
      width: 100px;
      height: 100%;
      flex-grow: 1;
    }

    .input {
      height: 100%;
      width: 100%;
      display: block;
      padding: 0 10px;
      min-width: 30px;
      font-size: 14px;
      border: none;
      color: $input-color;
      transition: border-color 0.2s linear;
      border-color: transparent;
      flex-shrink: 1;

      &.mini {
        height: 22px;
      }

      &:focus {
        // border: none;
        border-color: transparent;
        outline: none;
      }

      &:read-only {
        cursor: default;
      }

      &:disabled {
        background-color: transparent;
        cursor: default;
      }

      &::-webkit-input-placeholder {
        color: $input-placeholder-color;
        font-weight: 400;
        font-size: 14px;
      }

      &.center {
        text-align: center;
      }

      &.right {
        text-align: right;
      }
    }

    .clearable {
      padding-right: 10px;
      cursor: pointer;
      transition: color 0.2s linear;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 20px;
        height: 20px;
        fill: rgb(212, 212, 212);
      }

      &:hover {
        svg {
          fill: #999;
        }
      }
    }

    .suffix_column {
      display: flex;
      flex-shrink: 0;
      align-items: center;
    }
  }

  .options {
    position: absolute;
    left: 0;
    // right: 0;
    top: 36px;
    width: 100%;
    padding-top: 14px;
    animation: show 0.2s linear;
    z-index: 20;

    @keyframes show {
      from {
        top: 30px;
      }

      to {
        top: 36px;
      }
    }

    .arrow {
      width: 10px;
      height: 10px;
      background-color: white;
      border: 1px solid $input-option-arrow-color;
      border-bottom-color: transparent;
      border-right-color: transparent;
      transform: rotate(45deg);
      position: absolute;
      top: 9px;
      left: 10px;
      z-index: 2;
    }

    .option_list {
      border-radius: 4px;
      background-color: white;
      border: 1px solid $input-option-border-color;
      box-shadow: 0 0 3px rgba(94, 94, 94, 0.144);
      position: relative;
      padding-top: 6px;
      max-height: 300px;
      overflow-y: auto;

      .option_item {
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        white-space: nowrap;

        &:hover {
          background-color: rgba(214, 214, 252, 0.144);
        }

        &+.option_item {
          border-top: 1px solid $border-color2;
        }
      }
    }
  }
}
</style>
