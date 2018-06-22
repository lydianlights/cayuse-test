<template>
  <div class="jumbo">
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

  .jumbo {
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    padding-top: 70px;
    max-width: 100%;

    h1, h2 {
      margin: 0px 20px 50px;
      text-align: center;
    }
    h1 {
      font-size: 50px;
    }
    h2 {
      font-size: 25px;
    }

    p, li, td {
      font-size: 28px;
    }

    table {
      width: 800px;
      max-width: 100%;
      margin-bottom: 30px;
      td {
        padding: 20px;
      }
    }

    input {
      text-align: center;
      max-width: 100%;
      font-size: 24px;
      padding: 8px 0px;
      margin: 0px auto 20px;
    }

    button {
      max-width: 100%;
      font-size: 20px;
      width: 200px;
      margin: 0px auto;
      padding: 13px 0px;
    }
  }

  @media only screen and (min-width: 700px) and (orientation : landscape) {
    .jumbo {
      h1 {
        font-size: 80px;
      }
      h2 {
        font-size: 25px;
      }
      p, li, td {
        font-size: 28px;
      }
      input {
        font-size: 24px;
      }
      button {
        font-size: 20px;
        width: 200px;
      }
    }
  }

  @media only screen and (min-width: 1200px),
    only screen and (min-width: 600px) and (orientation : portrait) {
    .jumbo {
      h1 {
        font-size: 120px;
      }
      h2 {
        font-size: 50px;
      }
      p, li, td {
        font-size: 36px;
      }
      input {
        font-size: 30px;
      }
      button {
        font-size: 24px;
        width: 250px;
      }
    }
  }

  @media only screen and (min-width: 1500px),
    only screen and (min-width: 1000px) and (orientation : portrait) {
    .jumbo {
      h1 {
        font-size: 150px;
      }
      h2 {
        font-size: 70px;
      }
      p, li, td {
        font-size: 48px;
      }
      input {
        font-size: 40px;
      }
      button {
        font-size: 32px;
        width: 300px;
      }
    }
  }
</style>
