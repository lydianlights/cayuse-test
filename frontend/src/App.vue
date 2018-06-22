<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
};
</script>

// Global styles
<style lang="scss">
  @import 'styles/_theme';
  @import 'styles/_mixins';
  @import 'styles/_resets';

  h1, h2 {
    @include header-font;
    letter-spacing: 0.04em;
  }

  p, button, input {
    @include text-font;
  }

  button {
    background-color: $accent-color;
    color: $light-text-color;
    text-transform: uppercase;
    display: block;
    border-radius: 4px;
    border: none;
    transition: filter 0.1s;
    transition-timing-function: ease-out;
    &:hover {
      cursor: pointer;
      filter: brightness(1.3);
    }
    &[disabled] {
      filter: grayscale(70%) brightness(1.5);
    }
  }

  input {
    color: $dark-text-color;
    display: block;
    border-radius: 4px;
    border: none;
  }

</style>
