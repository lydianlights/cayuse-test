<template>
  <ul>
    <li>{{zipCode}}</li>
    <li>{{cityName}}</li>
    <li>{{currentTempF}}</li>
    <li>{{timeZone}}</li>
    <li>{{elevationFt}}</li>
  </ul>
</template>

<script>
export default {
  name: 'zipcode-results',
  props: [
    'zipCode',
    'cityName',
    'currentTempF',
    'timeZone',
    'elevationFt'
  ]
}
</script>

<style lang='scss' scoped>

</style>
