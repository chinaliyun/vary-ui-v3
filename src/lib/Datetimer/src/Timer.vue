<template>
  <div class="v_timer">
    <div class="line line1"></div>
    <div class="line line2"></div>
    <div class="v_hours" ref="hours">
      <div class="item_space"></div>
      <div
        class="hours_item"
        v-for="(item, index) in hoursDict"
        :key="index"
        :class="{
          active: tmpHours === item,
          disabled:
            (rangBeginHours && item < rangBeginHours) || item > rangEndHours,
        }"
        @click="selectItem(1, item)"
      >
        {{ item }}
      </div>
      <div class="item_space"></div>
    </div>
    <div class="v_minutes" ref="minutes">
      <div class="item_space"></div>
      <div
        class="hours_item"
        v-for="(item, index) in minutesDict"
        :key="index"
        :class="{
          active: tmpMinutes === item,
          disabled: false,
        }"
        @click="selectItem(2, item)"
      >
        {{ item }}
      </div>
      <div class="item_space"></div>
      <div class="line line1"></div>
      <div class="line line2"></div>
    </div>
    <div class="v_seconds" ref="seconds">
      <div class="item_space"></div>
      <div
        class="hours_item"
        v-for="(item, index) in minutesDict"
        :key="index"
        :class="{
          active: tmpSeconds === item,
          disabled: false,
        }"
        @click="selectItem(3, item)"
      >
        {{ item }}
      </div>
      <div class="item_space"></div>
      <div class="line line1"></div>
      <div class="line line2"></div>
    </div>
  </div>
</template>
<script>
const minutesDict = new Array(60)
  .fill(0)
  .map((item, index) => (index < 10 ? "0" + index : index + ""));
const zeroDict = ["00"];
import { throttle } from "../../../utils/index";
import moment from "moment";
export default {
  name: "VarTimer",
  props: {
    value: {
      type: String,
      default: "",
    },
    mode: {
      type: Number,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      s1: null,
      s2: null,
      s3: null,
      hoursDict: new Array(24)
        .fill(0)
        .map((item, index) => (index < 10 ? "0" + index : index + "")),
      minutesDict: ["00"],
      secondsDict: ["00"],
      tmpHours: "",
      tmpMinutes: "",
      tmpSeconds: "",
      jumpHoursTop: 0,
      jumpMinutesTop: 0,
      jumpSecondsTop: 0,
      rangeBeginTime: "000000",
      rangeEndTime: "235959",
    };
  },
  watch: {
    mode: {
      handler(v) {
        this.init();
      },
    },
    visible(v) {
      if (v) {
        this.init();
      }
    },
  },
  /*
    如果tmpHour<rangeBeginTime的小时 或者tmpHour>rangeEndTime的小时, 
      rangBeginHours = rangeBeginTime的小时
      rangEndHours = rangeEndTime的小时
      所有的分钟都禁用 rangeBeginMinutes = '60' 
      所有的秒数都禁用 rangeBeginSecond = '60'
    如果tmpHour >= rangeBeginTime的小时
      rangeBeginMinutes = rangeBeginTime 的分钟
      否则: 

  */
  computed: {
    rangBeginHours() {
      if (!this.rangeBeginTime) {
        return "";
      }
      // return this.rangeBeginTime.slice(0, 2);
    },
    rangBeginMinutes() {
      // if (this.tmpHours < this.rangeBeginTime.slice(0, 2)) {
      //   return "";
      // }
    },
    rangBeginSeconds() {},
    rangEndHours() {
      // return this.rangeEndTime.slice(0, 2);
    },
    rangEndMinutes() {},
    rangEndSeconds() {},
  },
  mounted() {
    this.s1 = this.$refs.hours;
    this.s2 = this.$refs.minutes;
    this.s3 = this.$refs.seconds;
    this.s1.addEventListener("scroll", (e) => {
      if (!this.jumpHoursTop) {
        this.scroll(1, e);
      }
      if (e.target.scrollTop === this.jumpHoursTop) {
        this.jumpHoursTop = 0;
      }
    });

    this.s2.addEventListener("scroll", (e) => {
      if (!this.jumpMinutesTop) {
        this.scroll(2, e);
      }
      if (e.target.scrollTop === this.jumpMinutesTop) {
        this.jumpMinutesTop = 0;
      }
    });
    this.s3.addEventListener("scroll", (e) => {
      // console.log("scroll", this.jumpSecondsTop, e.target.scrollTop);
      if (!this.jumpSecondsTop) {
        console.log("realScroll");
        this.scroll(3, e);
      }
      if (e.target.scrollTop === this.jumpSecondsTop) {
        this.jumpSecondsTop = 0;
      }
    });
  },

  methods: {
    init() {
      const m = moment(this.value, "HH:mm:ss");
      this.tmpHours = m.format("HH");
      this.tmpMinutes = m.format("mm");
      this.tmpSeconds = m.format("ss");
      this.minutesDict = this.mode > 1 ? minutesDict : zeroDict;
      this.secondsDict = this.mode > 1 ? minutesDict : zeroDict;
      this.$nextTick(() => {
        this.tmpHours > 0 &&
          (this.jumpHoursTop = this.tmpHours * 40) &&
          this.s1.scrollTo({
            top: this.tmpHours * 40,
            left: 0,
            behavior: "smooth",
          });
        this.tmpMinutes > 0 &&
          (this.jumpMinutesTop = this.tmpMinutes * 40) &&
          this.s2.scrollTo({
            top: this.tmpMinutes * 40,
            left: 0,
            behavior: "smooth",
          });
        this.tmpSeconds > 0 &&
          (this.jumpSecondsTop = this.tmpSeconds * 40) &&
          this.s3.scrollTo({
            top: this.tmpSeconds * 40,
            left: 0,
            behavior: "smooth",
          });
      });
    },

    selectItem(n, row) {
      const div = n === 1 ? this.s1 : n === 2 ? this.s2 : this.s3;

      if (div.scrollTop === row * 40) {
        return;
      }
      if (n === 1) {
        this.tmpHours = row < 10 ? `0${row}` : row;
        this.jumpHoursTop = row * 40;
      }
      if (n === 2) {
        this.tmpMinutes = row < 10 ? `0${row}` : row;
        this.jumpMinutesTop = row * 40;
      }
      if (n === 3) {
        this.tmpSeconds = row < 10 ? `0${row}` : row;
        this.jumpSecondsTop = row * 40;
      }
      this.$emit(
        "change",
        `${this.tmpHours}-${this.tmpMinutes}-${this.tmpSeconds}`
      );

      div.scrollTo({
        top: row * 40,
        left: 0,
        behavior: "smooth",
      });
    },
    scroll: throttle(function (n, e) {
      let row =
        Math.floor(e.target.scrollTop / 40) +
        (e.target.scrollTop % 40 < 20 ? 0 : 1) +
        "";
      console.log("jumpTo", row * 40, e.target.scrollTop);
      if (n === 1) {
        this.tmpHours = row < 10 ? `0${row}` : row;
        this.jumpHoursTop = row * 40;
      }
      if (n === 2) {
        this.tmpMinutes = row < 10 ? `0${row}` : row;
        this.jumpMinutesTop = row * 40;
      }
      if (n === 3) {
        this.tmpSeconds = row < 10 ? `0${row}` : row;
        this.jumpSecondsTop = row * 40;
      }
      this.$emit(
        "change",
        `${this.tmpHours}-${this.tmpMinutes}-${this.tmpSeconds}`
      );

      if (e.target.scrollTop % 40 === 0) {
        this.jumpHoursTop = 0;
        this.jumpMinutesTop = 0;
        this.jumpSecondsTop = 0;

        return;
      }
      e.target.scrollTo({
        top: row * 40,
        left: 0,
        behavior: "smooth",
      });
    }, 200),
  },
};
</script>
<style lang="scss" scoped>
.v_timer {
  width: 300px;
  height: 220px;
  display: flex;
  font-size: 12px;
  border: 1px solid $border-color2;
  margin: 10px 10px 0 10px;
  position: relative;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #efefef;
    border-radius: 100px;
  }

  .v_hours,
  .v_minutes,
  .v_seconds {
    height: 100%;
    width: 100px;
    overflow-y: auto;
  }
  .item_space {
    height: 90px;
  }
  .line {
    position: absolute;
    width: 100%;
    left: 0;
    border-top: 1px solid red;
  }
  .line1 {
    top: 90px;
  }
  .line2 {
    top: 130px;
  }
  .hours_item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s linear;
    &:hover {
      background-color: rgb(241, 241, 241);
    }
    &.active {
      color: $main-color;
    }
    &.disabled {
      color: red;
    }
  }
}
</style>