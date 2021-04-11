/**
 * Global components
*/

import Loader from '@/components/Loader'
import Pagination from '@/components/Pagination'
import ModalConfirm from '@/components/ModalConfirm'
import ModalDelete from '@/components/ModalDelete'

export default {
	install (Vue) {
		Vue.component('Loader', Loader)
		Vue.component('Pagination', Pagination)
		Vue.component('ModalConfirm', ModalConfirm)
		Vue.component('ModalDelete', ModalDelete)
	}
}