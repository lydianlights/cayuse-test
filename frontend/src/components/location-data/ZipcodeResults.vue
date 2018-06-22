<template>
  <full-page-container>
    <jumbotron>
      <h2>Some info you might like about...</h2>
      <h1>{{zipCode}}</h1>
      <table>
        <tr>
          <td>City</td>
          <td>{{cityName}}</td>
        </tr>
        <tr>
          <td>Temperature</td>
          <td>{{Math.floor(currentTempF)}} °F</td>
        </tr>
        <tr>
          <td>Timezone</td>
          <td>{{timeZone}}</td>
        </tr>
        <tr>
          <td>Elevation</td>
          <td>{{elevationFt}} ft</td>
        </tr>
      </table>
      <router-link tag="button" :to="{name: 'zipcode-checker'}">Back</router-link>
    </jumbotron>
  </full-page-container>
</template>

<script>
import FullPageContainer from '@/components/shared/FullPageContainer';
import Jumbotron from '@/components/shared/Jumbotron';

export default {
  name: 'zipcode-results',
  components: {
    FullPageContainer,
    Jumbotron,
  },
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
  @import 'styles/_theme';
  @import 'styles/_mixins';

  .container {
    background: url('/static/img/bg.jpg');
    background-size: cover;
    color: $light-text-color;
  }
</style>
