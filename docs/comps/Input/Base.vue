<template>
  <var-scene flex middle>
    <var-input v-model="name" w="300" clearable placeholder="请输入姓名">
    </var-input>
    <var-scene pl="10">输入的内容为:{{ name }}</var-scene>
  </var-scene>
</template>

<script>
export default {
  name: "InputBase",
  data() {
    return {
      name: "ns",
    };
  },
};
</script>