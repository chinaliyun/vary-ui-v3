<template>
  <div>
    <var-button primary @click="openLoading">点击打开loading</var-button>
    <br />
    <br />
    <div w="300" h="100" flex middle center v-loading="loading" data-loading-text="loading..." data-loading-mask="true"
      class="comp_root">
      任意文字
    </div>
  </div>
</template>
<script>
export default {
  name: "LoadingDirective",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    openLoading() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>
<style lang="scss" scoped>
.comp_root {
  width: 300px;
  height: 100px;
  background-color: antiquewhite;
}
</style>