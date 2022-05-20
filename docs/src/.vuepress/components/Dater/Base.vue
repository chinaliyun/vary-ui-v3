<template>
  <var-datetimer v-model="date"></var-datetimer>
</template>

<script>
export default {
  name: "DaterBase",
  data() {
    return {
      date: "2022-01-02 10:30:20",
    };
  },
};
</script>