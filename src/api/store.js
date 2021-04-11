/**
* store API
**/

import axios from 'axios'

// 매장 목록
function getStoreList(params) {
	return axios.get('/api/stores', {params: params})
}

// 매장 등록
function postStore(data) {
	return axios.post('/api/stores', data)
}

// 매장 상세
function getStore(id) {
	return axios.get(`/api/stores/${id}`)
}

// 매장 수정
function putStore(id, data) {
	return axios.put(`/api/stores/${id}`, data)
}

// 매장 삭제
function deleteStore(id) {
	return axios.delete(`/api/stores/${id}`)
}

export default {
  getStoreList,
  postStore,
  getStore,
  putStore,
  deleteStore
}