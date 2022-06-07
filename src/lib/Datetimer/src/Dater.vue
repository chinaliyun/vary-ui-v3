<template>
  <div ref="v_dater" class="v_dater">
    <div class="_v_dater_container">
      <!-- 控制按钮使用所有场景, 按钮功能根据场景设置 -->
      <div flex middle class="control_row">
        <div class="prev_year point_hover" @click="prevYear">
          <IconYear class="icon" />
        </div>
        <div
          v-show="pickerType === 3"
          class="prev_month point_hover"
          @click="prevMonth"
        >
          <IconMonth class="icon" />
        </div>
        <div grow flex center class="current">
          <div v-if="pickerType > 1" @click="changePicker(1)">
            <span>{{ tmpYear }}</span
            >年
          </div>
          <div v-if="pickerType > 2" @click="changePicker(2)">
            <span>{{ tmpMonth }}</span
            >月
          </div>
          <div v-if="pickerType === 1">
            {{ yearDict[0].value }}~{{ yearDict.slice(-1)[0].value }}
          </div>
        </div>
        <div
          v-show="pickerType === 3"
          class="next_month point_hover"
          @click="nextMonth"
        >
          <IconMonth class="icon" />
        </div>
        <div class="next_year point_hover" @click="nextYear">
          <IconYear class="icon" />
        </div>
      </div>

      <div v-if="pickerType === 1" class="year_list">
        <div flex class="year_row" fill wrap>
          <div
            v-for="item in yearDict"
            :key="item.value"
            flex
            center
            middle
            class="year_item"
            :class="{
              normal: true,
              gray: item.gray,
              selected: rangeValue.includes(item.value),
              range_begin: rangeValue[0] === item.value,
              range_end: rangeValue[1] === item.value,
              in_range:
                validRange &&
                item.value >= rangeValue[0] &&
                item.value <= rangeValue[1],
            }"
            @mouseenter="selectYear(item, $event)"
            @click="selectYear(item, $event, true)"
          >
            <div flex center middle class="text">
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="pickerType === 2" class="month_list">
        <div flex class="month_row" fill wrap>
          <div
            v-for="item in monthDict"
            :key="item.value"
            flex
            center
            middle
            class="month_item normal"
            :class="{
              normal: true,
              gray: item.gray,
              selected: rangeValue.includes(item.value),
              range_begin: rangeValue[0] === item.value,
              range_end: rangeValue[1] === item.value,
              in_range:
                validRange &&
                item.value >= rangeValue[0] &&
                item.value <= rangeValue[1],
            }"
            @mouseenter="selectMonth(item, $event)"
            @click="selectMonth(item, $event, true)"
          >
            <div flex center middle class="text">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="pickerType === 3" class="date_list">
        <div flex class="week_row" fill>
          <div
            v-for="item in weekDict"
            :key="item"
            w="50"
            flex
            center
            middle
            class="week_item normal"
          >
            {{ item }}
          </div>
        </div>
        <div flex class="date_row" fill wrap>
          <div
            v-for="item in dateDict"
            :key="item.value"
            flex
            center
            middle
            class="date_item"
            :v="item.value"
            :class="{
              normal: item.normal,
              selected: rangeValue.includes(item.value),
              range_begin: rangeValue[0] === item.value,
              range_end: rangeValue[1] === item.value,
              today: todayDate == item.value,
              disabled: item.disabled,
              in_range:
                validRange &&
                item.value >= rangeValue[0] &&
                item.value <= rangeValue[1],
            }"
            @mouseenter="selectDate(item, $event)"
            @click="selectDate(item, $event, true)"
          >
            <div flex center middle class="text">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import IconYear from "./icons/year";
import IconMonth from "./icons/month";
import IconClear from "./icons/clear";
import IconArrow from "./icons/arrow";
function zero(v) {
  return v < 10 ? "0" + v : v;
}
export default {
  name: "VarDater",
  components: {
    IconYear,
    IconMonth,
    IconClear,
    IconArrow,
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },

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
      default: "",
    },
    rangeValue: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tmpYear: "",
      tmpMonth: "",
      tmpDate: "",
      dateDict: [], // 要显示的日期
      monthDict: [],
      weekDict: ["日", "一", "二", "三", "四", "五", "六"],
      yearDict: [],
      pickerType: 3, // picker内容, 1=年,2=月,3=日
      todayYear: "",
      todayMonth: "",
      todayDate: "",
    };
  },
  inject: ["format", "range", "begin", "end"],
  created() {},
  computed: {
    validRange() {
      return this.rangeValue[0] && this.rangeValue[1];
    },
    tmpValue() {
      return moment(this.tmpYear + "-" + this.tmpMonth + "-" + this.tmpDate);
    },
  },
  watch: {
    visible(v) {
      if (v) {
        const today = moment();
        this.todayYear = today.format("YYYY");
        this.todayMonth = today.format("MM");
        this.todayDate = today.format("YYYY-MM-DD");
        this.init();
      }
    },
  },
  mounted() {},
  methods: {
    initTemp(v, mode) {
      console.log("initTemp", v);
      this.tmpYear = v.format("YYYY") + ""; // 年份
      this.tmpMonth = v.format("MM"); // 月份
      this.tmpDate = v.format("DD"); // 日期
      if (mode) {
        mode === 1 && this.initYear();
        mode === 2 && this.initMonth();
        mode === 3 && this.initDates();
      }
    },
    init() {
      // 判断应该显示哪个列表
      console.log("init mode", this.mode);
      if (this.mode === 1) {
        this.pickerType = 1;
        this.initYear();
      } else if (this.mode === 2) {
        this.pickerType = 2;
        this.initMonth();
      } else {
        this.pickerType = 3;
        this.initDates();
      }
    },
    prevYear() {
      if (this.pickerType === 1) {
        this.initTemp(this.tmpValue.subtract(20, "years"));
        this.initYear();
      } else {
        this.initTemp(this.tmpValue.subtract(1, "years"));
        this.initMonth();
      }
    },
    nextYear() {
      if (this.pickerType === 1) {
        this.initTemp(this.tmpValue.add(20, "years"));
        this.initYear();
      } else {
        this.initTemp(this.tmpValue.add(1, "years"));
        this.initMonth();
      }
    },
    prevMonth() {
      this.initTemp(moment(this.tmpValue).subtract(1, "month"));
      this.initDates();
    },
    nextMonth() {
      this.initTemp(moment(this.tmpValue).add(1, "month"));
      this.initDates();
    },
    changePicker(v) {
      this.pickerType = v;
      switch (v) {
        case 1:
          this.initYear();
          break;
        case 2:
          this.mode > 2 && this.initMonth();
          break;
        case 3:
          this.initDates();
          break;
      }
    },
    initYear() {
      let beginYear = this.tmpYear - (this.tmpYear % 20);
      const list = [];
      for (let i = 0; i < 20; i++) {
        list.push({
          text: beginYear, // 显示的文字
          value: beginYear++ + "", // 样式对比
        });
      }
      this.yearDict = list;
    },
    selectDate(item, e, commit = false) {
      console.log("selectDate", item.value, commit);
      if (!commit && !this.range) {
        return;
      }
      this.$emit("select-date", item.value, commit);
      this.commit && this.initDates();
    },
    selectYear(item, e, commit = false) {
      console.log("selectYear", item.value, commit);
      if (this.mode > 1 && commit) {
        this.tmpYear = item.value;
        this.pickerType = 2;
        this.initMonth();
      }
      this.$emit("select-year", item.value, commit);
    },

    selectMonth(item, e, commit = false) {
      console.log("selectMonth", item.value, commit);

      /*
      只要用户想选择到日, 都不需要触发emit
      */
      if (this.mode > 2 && commit) {
        this.pickerType = 3;
        this.tmpMonth = item.month;
        this.initDates();
      }
      // 不管是click还是hover都要向上触发, click
      this.$emit("select-month", item.value, commit);
    },

    initMonth() {
      console.log("initMOnth");
      // 计算要显示的月份
      this.monthDict = [
        {
          text: "一月",
          value: this.tmpYear + "-01",
          year: this.tmpYear,
          month: "01",
        },
        {
          text: "二月",
          value: this.tmpYear + "-02",
          year: this.tmpYear,
          month: "02",
        },
        {
          text: "三月",
          value: this.tmpYear + "-03",
          year: this.tmpYear,
          month: "03",
        },
        {
          text: "四月",
          value: this.tmpYear + "-04",
          year: this.tmpYear,
          month: "04",
        },
        {
          text: "五月",
          value: this.tmpYear + "-05",
          year: this.tmpYear,
          month: "05",
        },
        {
          text: "六月",
          value: this.tmpYear + "-06",
          year: this.tmpYear,
          month: "06",
        },
        {
          text: "七月",
          value: this.tmpYear + "-07",
          year: this.tmpYear,
          month: "07",
        },
        {
          text: "八月",
          value: this.tmpYear + "-08",
          year: this.tmpYear,
          month: "08",
        },
        {
          text: "九月",
          value: this.tmpYear + "-09",
          year: this.tmpYear,
          month: "09",
        },
        {
          text: "十月",
          value: this.tmpYear + "-10",
          year: this.tmpYear,
          month: "11",
        },
        {
          text: "十一月",
          value: this.tmpYear + "-11",
          year: this.tmpYear,
          month: "11",
        },
        {
          text: "十二月",
          value: this.tmpYear + "-12",
          year: this.tmpYear,
          month: "12",
        },
      ];
    },

    initDates() {
      // 计算要显示的日期
      console.log("initDates");

      // 获取本月1号是周几
      const firstDate = this.tmpValue.set("date", 1);

      // 获取1号对应的是周几
      const firstWeek = firstDate.weekday();

      // 当前显示的日历中第一天时间戳
      let firstDateTimeStamp =
        firstDate.toDate().getTime() - firstWeek * 24 * 60 * 60 * 1000;

      const dateList = [];
      const d = new Date();
      for (let i = 0; i < 42; i++) {
        d.setTime(firstDateTimeStamp);
        const value = moment(d).format("YYYY-MM-DD"); // 对比已选中日期, 添加样式
        const text = moment(d).format("D") + ""; // 不带0, 展示用
        dateList.push({
          normal: parseInt(d.getMonth(), 10) + 1 === parseInt(this.tmpMonth),
          text,
          value,
        });
        firstDateTimeStamp += 24 * 60 * 60 * 1000;
      }
      console.log("initDates");
      this.dateDict = dateList;
    },
  },
};
</script>
<style lang="scss" >
.v_dater {
  width: 300px;
  .control_row {
    height: 40px;
    padding: 0 14px;
    border-bottom: 1px solid $border-color2;
    display: flex;
    align-items: center;
  }
  .year_row,
  .week_row,
  .date_row,
  .month_row {
    display: flex;
    flex-wrap: wrap;
    color: rgb(53, 53, 53);
  }
  .year_item {
    width: 20%;
    height: 34px;
    margin: 13px 0;
    .text {
      width: 50px;
      height: 26px;
    }
  }

  .month_item {
    width: 25%;
    height: 34px;
    margin: 23px 0;
    .text {
      width: 60px;
      height: 26px;
    }
  }
  .week_item,
  .date_item {
    width: 14.22222%;
    height: 34px;
    margin: 2px 0;
    .text {
      width: 26px;
      height: 26px;
    }
  }
  .year_item,
  .month_item,
  .week_item,
  .date_item {
    color: rgb(219, 219, 219);
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      border-radius: 20px;
      transition: all 0.2s linear;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background-color: rgba(238, 238, 238, 0.62);
      }
    }
    &.normal {
      color: $font-color;
      &.selected {
        .text {
          background: lighten($main-color, 30%);
        }
      }
      &.range_begin {
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
      }

      &.range_end {
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
      }
      &.in_range {
        background-color: lighten($main-color, 40%);
        color: $font-color;
      }
    }
  }

  .current {
    font-size: 16px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    span {
      border-bottom: 1px dashed $border-color;
      cursor: pointer;
    }
  }
  .svg,
  .svg_hover {
    display: block;
    width: 17px;
    height: 17px;
  }
  .svg_year {
    display: block;
    width: 14px;
    height: 14px;
  }
  .prev_year,
  .prev_month {
    transform: rotate(180deg);
  }
  .point_hover {
    cursor: pointer;
    .icon {
      display: block;
      width: 16px;
      height: 16px;
      fill: #c0c4cc;
    }
    &:hover {
      .icon {
        fill: red;
      }
    }
  }

  .prev_year,
  .next_year {
    .icon {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
