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

  h1, h2, h3, h4 {
    @include header-font;
    letter-spacing: 0.04em;
  }

  p, button, input, li, td {
    @include text-font;
  }

  table {
    border-collapse: collapse;
    td {
      border: 1px solid #ffffff;
    }
    tr {
      background-color: rgba(0, 0, 0, .4);
      &:nth-child(even) {
        background-color: rgba(255, 255, 255, .4)
      }
    }
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

  // Global animations
  .vertical-fade-enter-active {
    transition: all 0.3s ease;
  }

  .vertical-fade-enter {
    transform: translateY(10px);
    opacity: 0;
  }

  .vertical-fade-delay-enter-active {
    transition: all 0.3s ease;
    transition-delay: 0.5s;
  }

  .vertical-fade-delay-enter {
    transform: translateY(10px);
    opacity: 0;
  }

</style>
