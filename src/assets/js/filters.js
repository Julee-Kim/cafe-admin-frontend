/**
 * Global filters
*/

import moment from 'moment'

export default {
  install(Vue) {
    Vue.filter('dateFormat', function (value, format = 'YYYY-MM-DD') {
      if (!value) return '-'
      return moment(value).format(format)
    })

    Vue.filter('numberWithComma', function(value) {
      if (!value) return '-'
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    })
  }
}