<template>
  <br>
  <var-tabs :data="data" left name="1"></var-tabs>
  <br>
  <var-tabs :data="data" center w="300" name="2"></var-tabs>
  <br>
  <var-tabs :data="data" right w="300" name="3"></var-tabs>
  <br>
  <var-tabs :data="data" border w="300" name="1" left></var-tabs>
  <br>
  <var-tabs :data="data" border w="300" name="2" center></var-tabs>
  <br>
  <var-tabs :data="data" border w="300" name="3" right></var-tabs>

  <var-tabs :data="data" border w="300" name="3" center shadow></var-tabs>
</template>
<script>
export default {
  data() {
    return {
      data: [{
        name: '1',
        label: 'tab1'
      },
      {
        name: '2',
        label: 'tab2'
      }, {
        name: '3',
        label: 'tab3'
      }]
    }
  }
}
</script>