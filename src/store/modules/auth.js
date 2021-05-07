import API from '../../api/auth'

const state = {
  token: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : false,
  userInfo: window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : {}
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
      window.localStorage.setItem('token', value)
		} else {
			state.token = value
      window.localStorage.removeItem('token')
		}
  },
  // 유저 정보 저장
  setUserInfo(state, value) {
		if (value) {
      state.userInfo = value
      window.localStorage.setItem('userInfo', JSON.stringify(value))
    } else {
			state.userInfo = value
      window.localStorage.removeItem('userInfo')
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
        commit('setToken', res.data.token)
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
      if (res.status === 200) {
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