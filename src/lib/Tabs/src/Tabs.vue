<template>
  <div class="v_tabs" :class="{  left, center, right , border}">
    <div class="v_tabs_body" :class="{shadow}">
      <div v-for="row in data" :key="'tabbar_' + row.name" class="tab_item"
        :class="{ active: activeName == row.name , border,}" @click="selectTab(row)">
        <div class="tab_text">
          {{ row.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VarTabs",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultName: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: false,
    },
    left: Boolean,
    center: Boolean,
    right: Boolean,
    shadow: Boolean,
  },
  data() {
    return {
      activeName: '',
    };
  },
  computed: {
  },
  watch: {
    data() {
      this.init()
    },
    name() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.activeName = this.defaultName || this.data[0].name;
    },
    selectTab(item) {
      this.activeName = item.name;
      this.$emit("change", item);
    },
  },
};
</script>

<style lang="scss" >
.v_tabs {
  display: flex;
  height: 36px;
  border-bottom: 1px solid $border-color2;

  &.left {
    justify-content: flex-start;
  }

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  .v_tabs_body {
    display: flex;
  }

  &.border {
    border-bottom: 1px solid $border-color;
    border-bottom-color: transparent;

    .v_tabs_body {
      &.shadow {
        box-shadow: 0 2px 3px rgba(237, 237, 237, 0.839);
      }
    }
  }

  .tab_item {
    padding: 0 20px;
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    transition: all 0.2s linear;
    background-color: white;



    .tab_text {
      border-bottom: 2px solid transparent;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &+.tab_item {
      margin-left: -1px;
    }


    &.active {
      .tab_text {
        border-color: $main-color;
      }
    }

    &.border {
      .tab_text {
        border-color: transparent;
      }

      border: 1px solid $border-color2;

      &:first-child {
        border-top-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
      }

      &.active {
        background-color: $main-color;
        border-color: $main-color;
        color: white;
      }
    }


  }
}
</style>
