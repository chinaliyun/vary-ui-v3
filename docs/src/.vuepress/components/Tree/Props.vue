<template>
  <div class="code_wrapper">
    <var-tree
      :list="treeData"
      :props="{
        renderIndex: 2,
        label: 'title',
        children: 'child',
      }"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      treeData: [
        {
          id: 2000,
          parentId: 0,
          title: "商务印刷",
          child: [
            {
              id: 2001,
              parentId: 2000,
              title: "纸品区域",
              child: [
                { id: 2002, parentId: 2001, title: "名片" },
                { id: 2003, parentId: 2001, title: "单页/彩页/折页" },
                { id: 2004, parentId: 2001, title: "画册" },
              ],
            },
            {
              id: 2015,
              parentId: 2000,
              title: "PVC区域",
              child: [
                { id: 2016, parentId: 2015, title: "pvc名片" },
                { id: 2017, parentId: 2015, title: "标准卡" },
                { id: 2018, parentId: 2015, title: "广告扇" },
              ],
            },
            {
              id: 2023,
              parentId: 2000,
              title: "特种印刷",
              child: [
                { id: 2024, parentId: 2023, title: "鼠标垫" },
                { id: 2025, parentId: 2023, title: "无纺布类" },
                { id: 2026, parentId: 2023, title: "金属卡" },
              ],
            },
          ],
        },
        {
          id: 2029,
          parentId: 0,
          title: "灯箱照明",
          child: [
            {
              id: 2030,
              parentId: 2029,
              title: "灯箱",
              child: [
                { id: 2031, parentId: 2030, title: "磁吸灯箱" },
                { id: 2032, parentId: 2030, title: "奶茶灯箱" },
                { id: 2033, parentId: 2030, title: "苹果灯箱" },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>
