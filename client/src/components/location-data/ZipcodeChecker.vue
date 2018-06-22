<template>
  <full-page-container class="container">
    <jumbotron>
      <transition name="vertical-fade" appear>
        <h1>Let's get started!</h1>
      </transition>
      <transition name="vertical-fade-delay" appear>
        <h2>Enter a 5-digit zipcode below:</h2>
      </transition>
        <form @submit="submitZipcode">
          <transition name="vertical-fade-delay" appear>
            <input v-model="zipCode" ref="zipcodeInput" type="text" placeholder="xxxxx" aria-label="zipcode" maxlength="5" @input="validateZipCode()" :disabled="thinking">
          </transition>
          <transition name="vertical-fade-delay" appear>
            <button type="submit" :disabled="thinking">{{thinking ? "Checking..." : "Go!!"}}</button>
          </transition>
          <div class="errors">
            <p class="error" v-show="submitted && errors.invalidZipCode">* Not a valid zip code!</p>
            <p class="error" v-show="!submitted && errors.unrecognizedZipCode">* No data exists for that zipcode.</p>
            <p class="error" v-show="!submitted && errors.serverError">* Uh-oh, the server broke...</p>
          </div>
        </form>
    </jumbotron>
  </full-page-container>
</template>

<script>
import FullPageContainer from '@/components/shared/FullPageContainer';
import Jumbotron from '@/components/shared/Jumbotron';
import locationService from '@/services/location.service';
import { setTimeout } from 'timers';

export default {
  name: "zipcode-checker",
  components: {
    FullPageContainer,
    Jumbotron,
  },
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
  mounted: function() {
    this.$refs.zipcodeInput.focus();
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

  .container {
    background: url('/static/img/bg.jpg');
    background-size: cover;
    color: $light-text-color;
  }

  input {
    letter-spacing: 0.1em;
  }

  .errors {
    margin: 40px 0px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    .error {
      color: $error-color;
      padding: 13px;
      margin: 0px;
    }
  }
</style>
