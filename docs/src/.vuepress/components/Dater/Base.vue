<template>
  <div>
    <var-date-picker v-model="date3" range></var-date-picker>
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
      date1: ["2022", "2023"],
      date2: ["2022-02", "2022-03"],
      date3: ["ffe", "2022-02-03"],
      date4: "2022",
      date5: "2022-02",
      date6: "2022-02-03",
    };
  },
};
</script>