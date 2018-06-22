<template>
  <div class="full-page">
    <div class="jumbotron">
      <h1>Let's get started!</h1>
      <h2>Enter a 5-digit zipcode below:</h2>
      <form>
        <input type="text" placeholder="xxxxx" aria-label="zipcode">
        <button type="submit">Go!!</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "zipcode-checker"
}
</script>

<style lang="scss" scoped>
  @import 'styles/_theme';
  @import 'styles/_mixins';

  .full-page {
    @include fill-screen;
    background-image: url('/static/img/bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .jumbotron {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $light-text-color;
    height: fit-content;

    h1, h2 {
      letter-spacing: 0.04em;
      margin: 50px;

    }

    h1 {
      font-size: 120px;
    }
    h2 {
      font-size: 50px;
    }

    input {
      color: $dark-text-color;
      display: block;
      text-align: center;
      font-size: 30px;
      letter-spacing: 0.1em;
      border-radius: 4px;
      border: none;
      padding: 8px 0px;
      margin-bottom: 20px;
    }

    button {
      display: block;
      background-color: $accent-color;
      color: $light-text-color;
      width: 250px;
      margin: 0px auto;
      padding: 10px 0px;
      border-radius: 4px;
      border: none;
      text-transform: uppercase;
      font-size: 24px;
    }
  }

</style>
