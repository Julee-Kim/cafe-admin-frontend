<template>
  <div class="product_list">
    <div class="card search_wrap">
      <b-form @submit.prevent>
        <div class="row">
          <div class="col-12 col-md-3">
            <b-form-group
              id="category"
              label="카테고리"
              label-for="category"
            >
              <b-form-select
                id="category"
                class="form-control"
                v-model="searchForm.category"
              >
                <b-form-select-option value="">전체</b-form-select-option>
                <b-form-select-option value="coffee">Coffee</b-form-select-option>
                <b-form-select-option value="tea">Tea</b-form-select-option>
                <b-form-select-option value="cake">Cake</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-12 col-md-4">
            <b-form-group
              id="product"
              label="상품명"
              label-for="product"
            >
              <b-form-input
                id="product"
                v-model="searchForm.product_name"
                @keyup.enter="searchList"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-12 col-md-2 btn_search_wrap">
            <b-button @click="searchList">검색</b-button>
          </div>
        </div>
      </b-form>
    </div>

    <div class="card">
      <div class="btn_wrap">
        <router-link :to="{name: 'ProductCreate'}" class="btn">상품 등록</router-link>
      </div>
      <div class="table_wrap">
        <b-table
          hover
          id="productList"
          class="table_middle"
          :fields="fields"
          :items="lists.lists"
          @row-clicked="goDetail"
          show-empty
        >
          <template #cell(img)="data">
            <img
              :src="data.item.img"
              :alt="data.item.product_name"
              class="thumbnail_product"  
            >
          </template>

          <template #empty="scope">데이터가 없습니다.</template>
        </b-table>
      </div>

      <pagination
        :arialControls="'productList'"
        :total="lists.total ? lists.total : 0"
				:perPage="searchForm.perPage"
				:page="searchForm.page"
        :callback="searchList"
      ></pagination>
    </div>
  </div>
</template>

<script>
import productAPI from '@/api/product'

export default {
  name: 'ProductList',
  created() {
    this.searchList({type: 'init'})
    this.$eventBus.$emit('pageTitle', '상품 관리')
  },
  data() {
    return {
      searchForm: {
        category: '',
        product_name: '',
        perPage: 4,
        page: 1,
      },
      fields: [
        { key: 'category', label: '카테고리' },
        { key: 'img', label:  '이미지' },
        { key: 'product_name', label: '상품명' }
      ],
      lists: {}
    }
  },
  methods: {
    goDetail(item) {
      this.$router.push({ name: 'ProductUpdate', params: { id: item._id } })
    },
    searchList(options) {
      let option = Object.assign({
        route: this.$route,
        router: this.$router,
				searchForm: this.searchForm,
				callback: this.getProductList
      }, options)

      this.$searchPagination(option)
    },
    async getProductList() {
      this.$store.commit('showLoader')  
      try {
        const result = await productAPI.getProductList(this.searchForm)
        this.lists = result.data
        this.$store.commit('hideLoader')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
.product_list {
  .table_wrap .table {
    min-width: 330px;

    .thumbnail_product {
      width: 50px;
      border-radius: 0.25rem;
    }
  }
}
</style>