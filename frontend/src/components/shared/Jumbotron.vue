<template>
  <div class="container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'jumbotron'
};
</script>

<style lang='scss' scoped>
  @import 'styles/_theme';
  @import 'styles/_mixins';

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;

    h1, h2 {
      margin: 50px;
    }
    h1 {
      font-size: 120px;
    }
    h2 {
      font-size: 50px;
    }

    input {
      text-align: center;
      font-size: 30px;
      padding: 8px 0px;
      margin-bottom: 20px;
    }

    button {
      font-size: 24px;
      width: 250px;
      margin: 0px auto;
      padding: 13px 0px;
    }
  }
</style>
