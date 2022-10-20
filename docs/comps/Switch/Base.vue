<template>
  <div>
    <var-switch v-model="value" />
  </div>
</template>

<script>
export default {
  name: "SwitchBase",
  data() {
    return {
      value: false,
    };
  },
  watch: {
    value(v) {
      console.log(v);
    },
  },
};
</script>
