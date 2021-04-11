import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

import Auth from './modules/auth'

Vue.use(Vuex);

axios.defaults.withCredentials = true

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
	state: {
		loader: false
	},
  mutations: {
    showLoader (state) {
			state.loader = true
		},
		hideLoader (state) {
			state.loader = false
		}
  },
  actions: {},
  modules: {
		Auth
	}
});
