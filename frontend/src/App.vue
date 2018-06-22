<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

// Global styles
<style lang="scss">
  @import 'styles/_theme';
  @import 'styles/_mixins';
  @import 'styles/_resets';

  h1, h2 {
    @include header-font;
  }

  p, button, input {
    @include text-font;
  }
</style>
