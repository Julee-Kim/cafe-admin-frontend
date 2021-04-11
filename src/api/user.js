/**
* user API
**/

import axios from 'axios'

// 회원 목록
function getUserList(params) {
	return axios.get('/api/users', {params: params})
}

export default {
  getUserList
}