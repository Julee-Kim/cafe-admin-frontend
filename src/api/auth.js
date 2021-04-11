/**
* auth API
**/

import axios from 'axios'

// 회원 가입
function postRegister(data) {
	return axios.post('/api/staffs/register', data)
}

// 로그인
function postLogin(data) {
  return axios.post('/api/staffs/login', data)
}

// 사용자 정보
function getUserInfo() {
  return axios.get('/api/staffs/auth')
}
// 로그 아웃
function getLogout() {
  return axios.get('/api/staffs/logout')
}

export default {
  postRegister,
  postLogin,
  getUserInfo,
  getLogout
}