<template>
  <div class="container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'full-page-container'
};
</script>

<style lang='scss' scoped>
  .container {
    position: absolute;
    top: 0px;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    min-height: fit-content;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
    padding-top: 30px;
  }
</style>
