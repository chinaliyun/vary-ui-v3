<template>
  <div>
    <var-switch v-model="value" :activeColor="activeColor" width="50px" />
  </div>
</template>

<script>
export default {
  name: "SwitchBase",
  data() {
    return {
      value: false,
      activeColor: "red",
    };
  },
  watch: {
    value(v) {
      console.log(v);
    },
  },
};
</script>
