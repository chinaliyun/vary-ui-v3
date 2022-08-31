<template>
  <div>
    <var-time-picker
      v-model="date3"
      range
      minutes
      format="HH:mm"
    ></var-time-picker>
    <br />
    <br />
    <!-- <var-date-picker v-model="date6" format="YYYY"></var-date-picker> -->
  </div>
</template>

<script>
export default {
  name: "DaterBase",
  data() {
    return {
      date3: ["09:10:11", "10:11:12"],
      date6: "10:11:12",
    };
  },
  watch: {
    visible(v) {},
  },
  methods: {
    init() {},
  },
};
</script>