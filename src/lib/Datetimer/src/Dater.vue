<template>
  <div ref="v_dater" class="v_dater" @click="openPicker">
    <div class="_v_dater_container">
      <!-- 控制按钮使用所有场景, 按钮功能根据场景设置 -->
      <div flex middle class="control_row" @click.stop="">
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
          <div @click="changePicker(1)">{{ tmpYear }}年</div>
          <div @click="changePicker(2)">{{ tmpMonth }}月</div>
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
            :class="{ gray: item.gray, selected: item.value === tmpYear }"
            @click="selectYear(item, $event)"
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
            class="month_item"
            :class="{
              gray: item.gray,
              selected: item.value === tmpMonth && tmpYear === todayYear,
            }"
            @click="selectMonth(item, $event)"
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
            class="week_item"
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
              gray: item.gray,
              selected: item.value === showValue,
              today: todayDate == item.value,
              disabled: item.disabled,
            }"
            @click="selectDate(item, $event)"
          >
            <div flex center middle class="text">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 是否显示时间选择器, 要看format是否包含指定hh字符 -->
    <var-timer v-if="format.includes('hh')"></var-timer>
  </div>
</template>

<script>
import moment from "moment";
import IconYear from "./icons/year";
import IconMonth from "./icons/month.app";
import IconClear from "./icons/clear.app";
import IconArrow from "./icons/arrow.app";
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

    pickerOptions: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String,
      default: "",
    },
  },
  inject: ["format", "beginDate", "endDate"],
  data() {
    return {
      mode: 3,
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
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      const today = moment();
      this.todayYear = today.format("YYYY");
      this.todayMonth = today.format("MM");
      this.todayDate = today.format("YYYY-MM-DD");
      const now = moment(this.value);
      this.tmpYear = now.format("YYYY") + ""; // 年份
      this.tmpMonth = now.format("MM"); // 月份
      this.tmpDate = now.format("DD"); // 日期

      // 判断应该显示哪个列表
      if (this.format.includes("dd")) {
        this.pickerType = 3;
        this.initDates();
      } else if (this.format.includes("mm")) {
        this.pickerType = 2;
        this.initMonth();
      } else {
        this.pickerType = 1;
        this.initYear();
      }

      this.mapShowValue();
    },
    changePicker(v) {
      this.pickerType = v;
      switch (v) {
        case 1:
          this.initYear();
          break;
        case 2:
          this.initMonth();
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
    selectYear(item, e) {
      // 选择年份
      // 如果只是选择到年, 直接关闭, 如果选择到其他, 要组织冒泡
      this.tmpYear = item.value;
      if (this.mode > 1) {
        this.changePicker(2);
        e.stopPropagation();
      }
    },

    initMonth() {
      // 计算要显示的月份
      this.monthDict = [
        { text: "一月", value: "01" },
        { text: "二月", value: "02" },
        { text: "三月", value: "03" },
        { text: "四月", value: "04" },
        { text: "五月", value: "05" },
        { text: "六月", value: "06" },
        { text: "七月", value: "07" },
        { text: "八月", value: "08" },
        { text: "九月", value: "09" },
        { text: "十月", value: "10" },
        { text: "十一月", value: "11" },
        { text: "十二月", value: "12" },
      ];
    },
    selectMonth(item, e) {
      // 选择月份
      // 如果只是选择到月, 直接关闭选择器, 如果选择到日, 只需要切换pickerType
      this.tmpMonth = item.value;
      if (this.mode > 2) {
        this.changePicker(3);
        e.stopPropagation();
      }
    },

    initDates() {
      // 计算要显示的日期
      console.log("initDates");
      const date = moment();

      // 获取本月1号是周几
      const firstDate = date
        .set("year", parseInt(this.tmpYear, 10))
        .set("month", parseInt(this.tmpMonth, 10) - 1)
        .set("date", 1);

      // 获取1号对应的是周几
      const firstWeek = firstDate.weekday();

      // 当前显示的日历中第一天时间戳
      let firstDateTimeStamp =
        firstDate.toDate().getTime() - firstWeek * 24 * 60 * 60 * 1000;

      const dateList = [];
      for (let i = 0; i < 42; i++) {
        const d = new Date();
        d.setTime(firstDateTimeStamp);
        const value = moment(d).format("YYYY-MM-DD"); // 对比已选中日期, 添加样式
        const text = moment(d).format("D") + ""; // 不带0
        dateList.push({
          gray: parseInt(d.getMonth(), 10) + 1 !== parseInt(this.tmpMonth),
          value,
          text,
          disabled: this.pickerOptions.disabledDate
            ? this.pickerOptions.disabledDate(new Date(value))
            : false,
        });
        firstDateTimeStamp += 24 * 60 * 60 * 1000;
      }
      console.log("initDates", dateList);
      this.dateDict = dateList;
    },

    selectDate(item, e) {
      if (item.disabled) {
        e.stopPropagation();
        return;
      }

      // 选择日期
      this.tmpDate = item.value.slice(-2);
      this.tmpMonth = item.value.slice(5, 7);
      this.tmpYear = item.value.slice(0, 4);
      this.$emit("change", item.value);

      this.showValue = item.value;
      this.$emit("update:value", item.value);
      e.stopPropagation();
    },
    mapShowValue() {
      const { mode, tmpYear, tmpMonth, tmpDate } = this;
      let str = "";
      str = `${tmpYear}`;
      if (mode >= 2) {
        str += `-${tmpMonth}`;
      }
      if (mode >= 3) {
        str += `-${tmpDate}`;
      }
      this.showValue = str;
    },
    nextMonth() {
      console.log("nextMonth");
      if (parseInt(this.tmpMonth, 10) === 12) {
        this.tmpMonth = zero(1);
        this.tmpYear++;
      } else {
        this.tmpMonth = zero(++this.tmpMonth);
      }
      this.initDates();
    },
    prevMonth() {
      if (parseInt(this.tmpMonth) === 1) {
        this.tmpMonth = 12;
        this.tmpYear--;
      } else {
        this.tmpMonth = zero(--this.tmpMonth);
      }
      this.initDates();
    },
    nextYear() {
      if (this.tmpYear < 3000) {
        this.tmpYear++;
        this.initDates();
      }
    },
    prevYear() {
      if (this.pickerType === 1) {
        // 年份选择, 一次切换20个
        this.tmpYear -= 20;
      } else {
        // 非年份选择,年份减一
        this.tmpYear--;
      }
      this.initDates();
    },
    clearValue() {
      this.showValue = "";
      this.$emit("change", "");
    },
    submitValue() {
      this.$emit("change", this.showValue);
    },
    closePicker() {
      this.listVisible = false;
    },
    openPicker() {
      // mode: year month date time datetime
      // year 1 直接显示年份选择器
      // month 2 显示月份选择器
      // date 3 显示日期选择器
      // time 4 显示时间选择器
      // datetime 5 日期时间选择器

      // if (this.date || this.datetime) {
      this.mode = "3";
      this.changePicker(3);
      // return;
      // }
      if (this.month) {
        this.mode = "2";
        this.changePicker(2);
        return;
      }
      if (this.year) {
        this.mode = "1";
        this.changePicker(1);
        return;
      }
      // 打开下拉窗口
      if (!this.listVisible) {
        setTimeout(() => {
          window.addEventListener("click", this.closePicker, {
            once: true,
          });
        }, 200);

        this.listVisible = true;
        // const ele = this.$refs.v_datetime_picker.getBoundingClientRect();
        // if (window.innerHeight - (ele.top + ele.height) > 200) {
        //   // 如果距离可视区域底部大于200px, 显示在输入框上方
        //   this.alignBottom = false;
        // } else {
        //   // 如果距离可视区域底部大于200px, 显示在输入框下方
        //   this.alignBottom = true;
        // }
        // if (window.innerWidth - (ele.left + ele.width) > 200) {
        //   // 如果距离可视区域右侧大于200px, 左对齐
        //   this.alignRight = false;
        // } else {
        //   // 如果距离可视区域右侧大于200px, 右对齐
        //   this.alignRight = true;
        // }
      } else {
        this.listVisible = false;
      }
    },
  },
};
</script>
<style lang="scss" >
.v_dater {
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
  .year_item,
  .month_item,
  .week_item,
  .date_item {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: lighter;
    .text {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.today {
      color: $main-color;
      font-weight: bold;
    }
  }
  .week_item,
  .date_item {
    width: 14.22222%;
    height: 34px;
    .text {
      width: 26px;
      height: 26px;
      border-radius: 20px;
      transition: all 0.2s linear;
      &:hover {
        background-color: $picker-background-color;
      }
    }
    &.gray {
      color: rgb(219, 219, 219);
    }
    &.selected {
      .text {
        background-color: $main-color;
        color: white;
      }
    }
  }
  .week_item {
    font-weight: bold;
  }
  .date_item {
    cursor: pointer;
    &:hover {
      color: $main-color;
    }
  }
  .date_item.disabled,
  .date_item.disabled div {
    background-color: #f5f7fa;
    cursor: not-allowed;
    color: #c0c4cc;
  }
  .year_item {
    width: 20%;
    height: 60px;
    cursor: pointer;
    color: rgb(83, 83, 83);
    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 100px;
    }
    &.selected {
      .text {
        background-color: $main-color;
        color: white;
      }
    }
  }
  .month_item {
    width: 25%;
    height: 80px;
    cursor: pointer;
    font-weight: normal;
    .text {
      padding: 6px;
      border-radius: 100px;
    }
    &.selected {
      .text {
        background-color: $main-color;
        color: white;
      }
    }
  }
  .current {
    font-size: 16px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
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
    // .svg_hover {
    //   display: none;
    // }
    // &:hover {
    //   .svg {
    //     display: none;
    //   }
    //   .svg_hover {
    //     display: block;
    //   }
    // }
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
