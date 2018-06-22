import Vue from 'vue'
import Router from 'vue-router'
import ZipcodeChecker from '@/components/location-data/ZipcodeChecker';

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: ZipcodeChecker }
  ]
});
