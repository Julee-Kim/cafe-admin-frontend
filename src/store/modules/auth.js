import API from '../../api/auth'
import Vue from 'vue'

const state = {
  token: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : false,
  // token: localStorage.token ? localStorage.token : false,
  userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {}
}

const getters = {
  getToken (state) {
		return state.token
  },
  getUserInfo (state) {
		return state.userInfo
	} 
}

const mutations = {
  // 토큰 저장
  setToken(state, value) {
		if (value) {
			state.token = value
			// localStorage.token = value
      window.localStorage.setItem('token', value)
		} else {
			state.token = value
			// delete localStorage.token
      window.localStorage.removeItem('token')
		}
  },
  // 유저 정보 저장
  setUserInfo(state, value) {
		if (value) {
      state.userInfo = value
			localStorage.userInfo = JSON.stringify(value)
    } else {
			state.userInfo = value
			delete localStorage.userInfo
		}
	}
}

const actions = {
  /**
	 * 로그인
	*/
  async login({ commit }, info) {
    try {
      const res = await API.postLogin(info);
      if (res.data.success) {
        const token = window.$cookies.get('authToken')
        console.log('authToken => ', token)
        commit('setToken', token)
      }

      return res;
    } catch (err) {
      console.log(err)
    }
  },
	/**
	 * 로그아웃
  */
  async logout({ commit }) {
    try {
      const res = await API.getLogout()
      if (res.data.success) {
        commit('setToken', false)
        commit('setUserInfo', false)
      }

      return res;
    } catch (err) {
      console.log(err)
    }
  },
	/**
	 * 사용자 정보
  */
  async getUserInfo({ commit }) {
    try {
      const res = await API.getUserInfo()
      if (res.data.success) {
        commit('setUserInfo', res.data)
      }

      return res;
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}