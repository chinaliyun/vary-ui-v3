<template>
  <div class="comp_root_tree">
    <adm-scene v-if="tree" class="tree_list">
      <adm-tree-node
        v-for="(node, idx) in tree.list"
        :key="idx"
        :node="node"
        :render-index="tree.renderIndex"
        @nodeClick="handleNodeClick"
      />
    </adm-scene>
  </div>
</template>

<script>
import admTreeNode from "./TreeNode.vue";
import treeService from "./treeService";
export default {
  name: "VarTree",
  components: {
    admTreeNode,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    filterNodeMethod: Function,
  },
  data() {
    return {
      tree: null,
    };
  },
  watch: {
    list(val) {
      this.tree.setData("list", val);
    },
    props(val) {
      for (let i in val) {
        this.tree.setData(i, val[i]);
      }
    },
  },
  created() {
    this.initTree();
  },
  methods: {
    // 创建tree实例，传入动态参数
    initTree() {
      this.tree = new treeService({
        list: this.list,
        filterNodeMethod: this.filterNodeMethod,
        props: this.props,
      });

      // 初始化
      this.tree.init();
    },
    /**
     * 类型切换
     * @param {*}
     * @returns
     */
    async changeList(i, idx) {
      this.tree.nowIndex = i;
      this.tree.setListData(idx);
    },
    filter(key) {
      this.tree.filter(key);
    },
    handleNodeClick(data) {
      this.$emit("nodeClick", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree_list {
  width: 100%;
}
</style>
