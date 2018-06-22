import Vue from 'vue'
import Router from 'vue-router'
import ZipcodeChecker from '@/components/location-data/ZipcodeChecker';
import ZipcodeResults from '@/components/location-data/ZipcodeResults';
import NotFound from '@/components/error/NotFound';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: "zipcode-checker",
      component: ZipcodeChecker
    },
    { 
      path: '/results',
      name: "zipcode-results",
      component: ZipcodeResults,
      props: true,
      beforeEnter: (to, from, next) => {
        if (!to.params.zipCode) {
          next({ name: "zipcode-checker" });
        }
        else {
          next();
        }
      }
    },
    {
      path: '**',
      name: '404',
      component: NotFound
    }
  ]
});
