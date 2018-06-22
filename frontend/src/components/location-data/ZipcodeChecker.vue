<template>
  <div class="full-page">
    <div class="jumbotron">
      <h1>Let's get started!</h1>
      <h2>Enter a 5-digit zipcode below:</h2>
      <form @submit="submitZipcode">
        <input v-model="zipCode" type="text" placeholder="xxxxx" aria-label="zipcode" maxlength="5" @input="validateZipCode()" :disabled="thinking">
        <button type="submit" :disabled="thinking">{{thinking ? "Checking..." : "Go!!"}}</button>
        <div class="errors">
          <p class="error" v-show="submitted && errors.invalidZipCode">* Not a valid zip code!</p>
          <p class="error" v-show="!submitted && errors.unrecognizedZipCode">* No data exists for that zipcode.</p>
          <p class="error" v-show="!submitted && errors.serverError">* Uh-oh, the server broke...</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import locationService from '@/services/location.service';
import { setTimeout } from 'timers';

export default {
  name: "zipcode-checker",
  data: function() {
    return {
      zipCode: "",
      submitted: false,
      thinking: false,
      errors: {
        invalidZipCode: false,
        unrecognizedZipCode: false,
        serverError: false
      }
    }
  },
  methods: {
    validateZipCode() {
      const isValid = locationService.validateZipCode(this.zipCode);
      this.errors.invalidZipCode = !isValid;
      return isValid;
    },
    submitZipcode(event) {
      event.preventDefault();
      this.resetErrors();
      this.thinking = true;
      this.submitted = true;
      if(this.validateZipCode()) {
        locationService.getLocationData(this.zipCode)
        .then(data => {
          this.thinking = false;
          this.submitted = false;
          this.$router.push({
            name: "zipcode-results",
            params: {
              zipCode: data.zipCode,
              cityName: data.cityName,
              currentTempF: data.currentTempF,
              timeZone: data.timeZone,
              elevationFt: data.elevationFt
            }
          });
        })
        .catch(err => {
          this.thinking = false;
          this.submitted = false;
          if(err.status === 400) {
            this.errors.unrecognizedZipCode = true;
          }
          else {
            this.errors.serverError = true;
          }
        });
      }
      else {
        setTimeout(() => {
          this.thinking = false;
        }, 500);
      }
    },
    resetErrors() {
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = false;
      });
    }
  }
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
    min-height: fit-content;
    padding-bottom: 50px;
    padding-top: 30px;
  }

  .jumbotron {
    color: $light-text-color;
    display: flex;
    flex-direction: column;
    align-items: center;
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

    .errors {
      margin: 20px 0px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      .error {
        color: $error-color;
        padding: 5px 10px;
        margin: 0px;
      }
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
      background-color: $accent-color;
      color: $light-text-color;
      font-size: 24px;
      text-transform: uppercase;
      display: block;
      width: 250px;
      margin: 0px auto;
      padding: 10px 0px;
      border-radius: 4px;
      border: none;
      transition: background-color 0.2s;
      transition-timing-function: ease-out;
      &[disabled] {
        background-color: lighten(desaturate($accent-color, 25%), 15%);
      }
    }
  }

</style>
