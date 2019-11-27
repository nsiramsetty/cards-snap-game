// Core Vue JS
import Vue from 'vue'
import router from './_router'
import store from './_store'
import {sync} from 'vuex-router-sync'
// Import AXIO For http If need to make API Calls to Backend or 3rd Party
import Axios from 'axios'
// Vue Form Library for Custom Validations and Slot based messages.
import VueForm from 'vue-form'
// Toastr for Pop Up Notifications
import Toastr from 'vue-toastr'
import {TOASTR_CONFIG} from './_config/ToastrConfig'
// ES6 Promise for IE Support
import 'es6-promise/auto'
// Progress for API Calls
import {loadProgressBar} from 'axios-progress-bar'
import {LOADER_CONFIG} from './_config/LoaderConfig'

sync(store, router)

Vue.prototype.$http = Axios
Vue.use(VueForm);

Vue.use(Toastr, TOASTR_CONFIG);

loadProgressBar(LOADER_CONFIG);

Vue.config.productionTip = false

import App from './_view/App';

import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";

Vue.use(VueMapbox, { mapboxgl: Mapbox });

// Mount Vue JS APP into #app <div>

new Vue({
  el: '#app',
  router,
  store,
  created: function () {
    window.Vue = this
  },
  template: '<App/>',
  components: {App}
});
