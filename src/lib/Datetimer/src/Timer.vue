<template>
  <div class="v_timer">
    <div class="v_timer_input">timer</div>
  </div>
</template>
<script>
export default {
  name: "VarTimer",
};
</script>
<style lang="scss" scoped>
.v_timer {
  border: 1px solid $border-color;
  .v_timer_input {
    height: $input-height;
  }
}
</style>