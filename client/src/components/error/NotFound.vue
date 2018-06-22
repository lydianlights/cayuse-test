<template>
  <full-page-container class="container">
    <jumbotron>
      <transition name="vertical-fade" appear>
        <h1>404</h1>
      </transition>
      <transition name="vertical-fade-delay" appear>
        <h2>Not Found...</h2>
      </transition>
      <transition name="vertical-fade-delay" appear>
        <router-link tag="button" :to="{name: 'zipcode-checker'}">Home</router-link>
      </transition>
    </jumbotron>
  </full-page-container>
</template>

<script>
import FullPageContainer from '@/components/shared/FullPageContainer';
import Jumbotron from '@/components/shared/Jumbotron';

export default {
  name: 'not-found',
  components: {
    FullPageContainer,
    Jumbotron,
  },
};
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
