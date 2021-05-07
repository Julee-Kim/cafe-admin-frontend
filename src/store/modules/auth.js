import API from '../../api/auth'

const state = {
  token: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : false,
  // token: localStorage.token ? localStorage.token : false,
  // userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {}
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
    console.log('유저 정보 저장')
    console.log('value =>', value)
		if (value) {
      state.userInfo = value
			// localStorage.userInfo = JSON.stringify(value)
      window.localStorage.setItem('userInfo', JSON.stringify(value))
    } else {
			state.userInfo = value
			// delete localStorage.userInfo
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
        // const token = window.$cookies.get('authToken')
        // const value = document.cookie.match('(^|;) ?' + 'authToken' + '=([^;]*)(;|$)')
        // const token = value ? value[2] : null
        console.log('authToken => ', res.data.token)
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
      console.log('사용자 정보 success')
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
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