/**
* order API
**/

import axios from 'axios'

// 매출 통계
function getSaleList(params) {
	return axios.get('/api/orders/sales', {params: params})
}

// 소비 분석
function getAnalysisList(params) {
	return axios.get('/api/orders/analysis', {params: params})
}

export default {
  getSaleList,
  getAnalysisList,
}