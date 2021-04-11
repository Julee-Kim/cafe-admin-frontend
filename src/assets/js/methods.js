/**
 * Global methods
*/

export const GlobalMethod = {
  install(Vue) {
    /**
     * Tel number formatter
     *
     * @param { number } num 전화번호
     * @return { object } resultObj
    */
    
    Vue.prototype.$telNumber = (num) => {
      // console.log('num: ', num)
      // 1. 010-XXXX-XXXX : 11자리 휴대폰번호
      // 2. 010-XXX-XXXX : 10자리 휴대폰번호
      // 3. 02-XXXX-XXXX : 10자리 서울 전화번호
      // 4. 031-XXX-XXXX : 10자리 서울 외 전화번호
      // 5. 1688-XXXX : 8자리 업체 번호

      let resultObj = {
        numberWithHyphen: '', // 하이픈을 포함한 전화번호
        isValid: false // 전화번호 유효여부
      }

      // 1. 입력한 번호 하이픈(-) 포함
      let number = num.replace('/[^0-9]/', '')
      number = number.replace(/\-/g,'')

      if (number.length === 11) {
        resultObj.numberWithHyphen = number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      }else if(number.length === 8){
        resultObj.numberWithHyphen = number.replace(/(\d{4})(\d{4})/, '$1-$2')
      }else{
        if (number.indexOf('02') === 0) {
          resultObj.numberWithHyphen = number.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
        } else {
          resultObj.numberWithHyphen = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        }
      }

      // 2. 형식 체크
      let rule = /^[0-9-]+$/
      if (!rule.test(resultObj.numberWithHyphen)) {
        resultObj.isValid = false
      } else {
        resultObj.isValid = true
      }

      // 3. 전화번호 자릿수가 하이픈 포함하여 최소 9자리인지 확인
      if (resultObj.numberWithHyphen.length < 8) {
        resultObj.isValid = false
      }

      return resultObj
    },

    /**
		 * pagination
		 *
		 * @param { options } Object
		 */
    Vue.prototype.$searchPagination = (options) => {
			let option = Object.assign({
        type: 'search',
        page: 1,
        route: null,
        router: null,
				searchForm: null,
				callback: null
      }, options)

      // 1. init
      if (option.type === 'init') {
        // 검색조건이 없다면 url setting
        if (!location.search) {
          option.route.query.page = options.searchForm.page
          option.router.replace({ query: option.searchForm }).catch(() => {})
        } else {
          // 검색조건이 있다면 searchForm 값 setting
          let query = option.route.query
          for (let i in query) {
						if (i === 'page' || i === 'perPage') {
							option.searchForm[i] = parseInt(query[i])
						} else {
							option.searchForm[i] = query[i]
						}
          }
        }
      }

      // 2. search
      if (option.type === 'search') {
        option.searchForm.page = 1
        option.router.replace({ query: option.searchForm }).catch(() => { })
      }

      // 3. paging
      if (option.type === 'pagination') {
        option.searchForm.page = option.page
				option.router.push({ query: option.searchForm }).catch(() => {})
      }

      option.callback()
    }
  }
} 