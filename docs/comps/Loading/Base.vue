<template>
  <var-button primary @click="loading">点击打开loading</var-button>
</template>
<script>
export default {
  name: "LoadingBase",
  methods: {
    loading() {
      const loading = this.$loading({ mask: true, text: 'loading...' });

      setTimeout(() => {
        loading.close();
      }, 3000);
    },
  },
};
</script>