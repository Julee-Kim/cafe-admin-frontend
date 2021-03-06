import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

import Auth from './modules/auth'

Vue.use(Vuex);

if(process.env.NODE_ENV === 'production') {
	axios.defaults.baseURL = 'https://my-cafe-admin.herokuapp.com'
	axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
	axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
}

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
