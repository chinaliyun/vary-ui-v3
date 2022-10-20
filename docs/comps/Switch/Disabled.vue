<template>
  <div>
    <var-switch v-model="value" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  name: "SwitchBase",
  data() {
    return {
      value: false,
      disabled: true,
    };
  },
  watch: {
    value(v) {
      console.log(v);
    },
  },
};
</script>
