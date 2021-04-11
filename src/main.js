import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { checkAuth } from '@/router/middleware/checkAuth'
import GlobalComponents from './components'
// Vue Global Methods
import { GlobalMethod } from './assets/js/methods'
// Vue Global Filters
import GlobalFilters from './assets/js/filters'

import './assets/js/validate' // custom validate

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VeeValidate, { ValidationProvider, ValidationObserver } from 'vee-validate';
import VueCookies from 'vue-cookies'

Vue.use(GlobalComponents)
Vue.use(GlobalMethod)
Vue.use(GlobalFilters)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VeeValidate, { fieldsBagName: 'veeFields' }, { mode: 'eager' })
Vue.use(VueCookies)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

router.beforeEach(checkAuth)

Vue.prototype.$eventBus = new Vue()

// Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
