<template>
  <div class="pagination_wrap">
    <p class="total">Total: {{ total }}</p>
    <div class="pagination">
      <b-pagination-nav
        v-model="currentPage"
        :aria-controls="arialControls"
        :per-page="perPage"
        :total-rows="total"
        :link-gen="linkGen"
        :number-of-pages="pageLength"
        :limit="10"
        :first-class="'btn_page_arrow btn_first_page'"
        :prev-class="'btn_page_arrow btn_prev_page'"
        :next-class="'btn_page_arrow btn_next_page'"
        :last-class="'btn_page_arrow btn_last_page'"
        use-router
        @change="changePage"
      >
        <template #first-text><chevrons-left-icon size="18" class="ico_first_page"></chevrons-left-icon></template>
        <template #prev-text><chevron-left-icon size="18" class="ico_prev_page"></chevron-left-icon></template>
        <template #next-text><chevron-right-icon size="18" class="ico_next_page"></chevron-right-icon></template>
        <template #last-text><chevrons-right-icon size="18" class="ico_last_page"></chevrons-right-icon></template>
      </b-pagination-nav>
    </div>
  </div>
</template>

<script>
import {
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from 'vue-feather-icons'

export default {
  name: 'Pagination',
  components: {
    ChevronsLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsRightIcon
  },
  props: {
		arialControls: {
      type: String,
      required: true
    },
    total: { required: true },
		perPage: { required: true },
    page: { default: () => 1 },
    callback: {
			type: Function,
			required: true
		}
  },
  created () {
		const currentPage = this.$route.query.page

		if (currentPage !== 1) { this.currentPage = currentPage }
	},
  data () {
		return {
			currentPage: 1
		}
  },
  watch: {
		page (value) {
			if (value) {
        this.currentPage = value
      }
		}
  },
  computed: {
    pageLength () {
			if (this.total) {
				return Math.ceil(this.total / this.perPage)
			} else {
				return 1
			}
		}
  },
  methods: {
    linkGen() {
      return { query: this.$route.query }
    },
    // click pagination page number
		changePage (page) {
			this.callback({
        type: 'pagination',
        page: parseInt(page)
			})
    }
  }
}
</script>

<style lang="scss">
.pagination_wrap {
  padding: 1.5rem;

  .total { width: 100%; }

  .pagination {
    justify-content: center;

    .page-item {
      text-align: center;
      background-color: #242b3d;

      &.disabled .page-link { color: #676d7d; }
      &.active .page-link {
        color: #fff;
        font-weight: 600;
        background-color: $primary-purple;
        border-radius: 50%;
      }
      &:nth-child(3) {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
      &:nth-last-child(3) {
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }
    }

    .btn_page_arrow {
      border-radius: 50%;

      &.btn_prev_page,
      &.btn_next_page { margin: 0 .357rem; }  
    }

    .page-link {
      padding: .45rem .5rem .49rem;
      width: 32px;
      height: 32px;
      color: $gray;
      background-color: transparent;
      border: 0;
    }
  }

  @media (max-width: 991px) {
    padding: .5rem 1.5rem 1.5rem;

    .total { margin-bottom: 2rem; }
  }
}
</style>
