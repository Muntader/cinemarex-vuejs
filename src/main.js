// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.axios = require('axios');
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Helper from './config/Helper';
import VueProgressBar from 'vue-progressbar';
import store from './store/store.js';
import router from './config/Routes';
import i18n from './config/Language';
import Cloudfront from './config/Cloudfront';
import VueProgressiveImage from 'vue-progressive-image'
import VeeValidate from 'vee-validate';
import VueCarousel from 'vue-carousel';
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import './assets/default/sass/main.scss';
import Transitions from 'vue2-transitions'


Vue.use(VueCarousel);
Vue.use(VueRouter);
Vue.use(Cloudfront);
Vue.use(VueProgressiveImage);
Vue.use(VeeValidate);
Vue.use(Helper);
Vue.config.productionTip = false;
Vue.use(Transitions)

if(store.getters.GET_TOKEN !==  undefined) {
    axios.interceptors.request.use(
        config => {
            if (store.getters.IS_AUTHENTICATED) config.headers['Authorization'] = 'Bearer ' + store.getters.GET_TOKEN;
            return config;
        }
    );
}

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
    baseUrl: 'http://localhost:8080', // Your API domain
    providers: {
        facebook: {
            clientId: '494825387685716',
            redirectUri: 'http://localhost:8080/auth/callback',
            authorizationEndpoint: 'https://www.facebook.com/v3.0/dialog/oauth',
            responseType: 'token'
        },
        google: {
            clientId: '613534909702-qa5rb1b14d9nfr3443g1lg2al1121fd5.apps.googleusercontent.com',
            redirectUri: 'http://localhost:8080',
            responseType: 'token'
        }

    }
});


const options = {
  color: '#03A9F4',
  failedColor: '#F44336',
  thickness: '3px',
  transition: {
    speed: '6s',
    opacity: '1',
    termination: 500
  },
  autoRevert: true,
  location: 'top',
  inverse: false
};

Vue.use(VueProgressBar, options);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/404');
  } else {
    next();
  }
});



// Title
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});





/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: {
    app: App
  },
  render: h => h('app')
});
