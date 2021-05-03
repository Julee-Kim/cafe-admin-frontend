/**
* order API
**/

import axios from 'axios'

// 매출 통계
function getSaleList(params) {
	return axios.get('/api/orders/sales', {params: params})
}

export default {
  getSaleList,
}