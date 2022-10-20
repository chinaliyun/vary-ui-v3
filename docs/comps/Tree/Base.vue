<template>
  <div>
    <var-tree :list="treeData" />
  </div>
</template>

<script>
export default {
  name: "SwitchBase",
  data() {
    return {
      treeData: [
        {
          id: 2000,
          parentId: 0,
          name: "商务印刷",
          children: [
            {
              id: 2001,
              parentId: 2000,
              name: "纸品区域",
              children: [
                { id: 2002, parentId: 2001, name: "名片" },
                { id: 2003, parentId: 2001, name: "单页/彩页/折页" },
                { id: 2004, parentId: 2001, name: "画册" },
              ],
            },
            {
              id: 2015,
              parentId: 2000,
              name: "PVC区域",
              children: [
                { id: 2016, parentId: 2015, name: "pvc名片" },
                { id: 2017, parentId: 2015, name: "标准卡" },
                { id: 2018, parentId: 2015, name: "广告扇" },
              ],
            },
            {
              id: 2023,
              parentId: 2000,
              name: "特种印刷",
              children: [
                { id: 2024, parentId: 2023, name: "鼠标垫" },
                { id: 2025, parentId: 2023, name: "无纺布类" },
                { id: 2026, parentId: 2023, name: "金属卡" },
              ],
            },
          ],
        },
        {
          id: 2029,
          parentId: 0,
          name: "灯箱照明",
          children: [
            {
              id: 2030,
              parentId: 2029,
              name: "灯箱",
              children: [
                { id: 2031, parentId: 2030, name: "磁吸灯箱" },
                { id: 2032, parentId: 2030, name: "奶茶灯箱" },
                { id: 2033, parentId: 2030, name: "苹果灯箱" },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>
