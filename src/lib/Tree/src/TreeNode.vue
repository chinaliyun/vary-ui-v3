<template>
  <div class="comp_root_treeNode">
    <div class="treeNode_content" :class="{ isOpen }" @click.stop="openChild()">
      <span
        :style="{
          marginLeft: node.level * 15 + 'px',
        }"
      ></span>
      <div v-if="node.children && !isHideChild" class="arrow"></div>
      {{ node.name }}
    </div>
    <div
      v-if="node.children && showChild"
      ref="childNode"
      class="treeNode_children"
      :style="domStyle"
    >
      <adm-tree-node
        v-for="(cnode, idx) in node.children"
        :key="idx"
        :node="cnode"
        :render-index="renderIndex"
        @nodeClick="handleNodeClick"
        @changeHeight="changeHeight"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AdmTreeNode",
  componentName: "AdmTreeNode",
  props: {
    node: {
      type: Object,
      default: () => ({}),
    },
    renderIndex: {
      type: Number,
      default: 999,
    },
  },
  data() {
    return {
      domStyle: {}, // 节点样式
      isOpen: false, // 是否展开状态
      timer: null, // 动画进行中标识
      showChild: false, // 是否展示子节点
      nodeHeight: null, // 节点高度记录
    };
  },
  computed: {
    isHideChild() {
      return this.node.level >= this.renderIndex;
    },
  },
  methods: {
    openChild() {
      if (this.isHideChild) {
        this.$emit("nodeClick", this.node);
        return;
      }
      this.showChild = true;
      // step1. 如果没有子级节点并且折叠动画未结束，则停止执行
      this.$nextTick(() => {
        const cDom = this.$refs.childNode;
        if (!cDom || this.timer) {
          return;
        }

        // step2. 获取子级节点高度
        if (!this.nodeHeight) {
          this.nodeHeight = cDom.clientHeight;
        }

        if (this.isOpen) {
          this.$emit("changeHeight", this.nodeHeight);
          this.domStyle.height = `${this.nodeHeight}px`;
          this.timer = setTimeout(() => {
            this.domStyle = {
              overflow: "hidden",
              height: "0px",
            };
          }, 10);
          setTimeout(() => {
            this.domStyle = {
              display: "none",
            };
            this.timer = null;
          }, 200);
        } else {
          if (this.timer) {
            return;
          }
          this.$emit("changeHeight", this.nodeHeight, true);
          this.domStyle = {
            display: "block",
            opacity: 0,
            height: `0px`,
          };

          this.timer = setTimeout(() => {
            this.domStyle = {
              overflow: "hidden",
              opacity: 1,
              height: `${this.nodeHeight}px`,
            };
          }, 10);
          setTimeout(() => {
            this.domStyle = {};
            this.timer = null;
          }, 200);
        }
        this.isOpen = !this.isOpen;
      });
    },
    // 子节点展开时触发，进行累加/减父元素的高度，以便折叠动画正确执行
    changeHeight(val, isAdd) {
      this.nodeHeight = isAdd ? this.nodeHeight + val : this.nodeHeight - val;
    },
    handleNodeClick(data) {
      this.$emit("nodeClick", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.comp_root_treeNode {
  .treeNode_content {
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
    color: #606266;
    display: flex;
    align-items: center;
    height: 26px;
    line-height: 26px;
    transition: all 0.2s;
    user-select: none;

    &:hover {
      background-color: #f5f7fa;
    }

    &.isOpen {
      .arrow {
        &::before {
          transform: rotate(90deg);
        }
      }
    }

    .arrow {
      position: relative;

      &.hide {
        display: none;
      }

      &::before {
        content: "";
        position: relative;
        top: -5px;
        left: -10px;
        display: block;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-left: 6px solid #c0c4cc;
        border-bottom: 5px solid transparent;
        transition: all 0.2s;
      }
    }
  }

  .treeNode_children {
    transition: height 0.2s;
  }
}
</style>
