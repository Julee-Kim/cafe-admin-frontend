<template>
  <div class="user_list">
    <div class="card search_wrap">
      <b-form>
        <div class="row">
          <div class="col-12 col-md-4">
            <b-form-group
              id="username"
              label="이름"
              label-for="username"
            >
              <b-form-input
                id="username"
                v-model="searchForm.name"
                @keyup.enter="searchList"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-12 col-md-4">
            <b-form-group
              id="email"
              label="이메일"
              label-for="email"
            >
              <b-form-input
                type="email"
                id="email"
                v-model="searchForm.email"
                @keyup.enter="searchList"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-12 col-md-4 btn_search_wrap">
            <b-button @click="searchList">검색</b-button>
          </div>
        </div>
      </b-form>
    </div>

    <div class="card">
      <div class="table_wrap">
        <b-table
          id="userList"
          :fields="fields"
          :items="lists.lists"
          show-empty
        >
          <template #cell(name)="data">
            <strong>{{ data.item.name }}</strong>
          </template>
          <template #cell(gender)="data">
            {{ data.item.gender }}
          </template>

          <template #cell(empty)="data" v-if="!lists.lists || !lists.lists.length">데이터가 없습니다.</template>
        </b-table>
      </div>

      <pagination
        :arialControls="'userList'"
        :total="lists.total ? lists.total : 0"
        :perPage="searchForm.perPage"
				:page="searchForm.page"
        :callback="searchList"
      ></pagination>
    </div>
  </div>
</template>

<script>
import userAPI from '@/api/user'

export default {
  name: 'UserList',
  created() {
    this.searchList({type: 'init'})
    this.$eventBus.$emit('pageTitle', '회원 관리')
  },
  data() {
    return {
      searchForm: {
        name: '',
        email: '',
        perPage: 10,
        page: 1
      },
      fields: [
        { key: 'name', label: '이름' },
        { key: 'birth', label: '생년월일' },
        { key: 'gender', label: '성별' },
        { key: 'email', label: '이메일' },
        { key: 'join_date', label: '가입일' }
      ],
      lists: {}
    }
  },
  methods: {
    searchList(options) {
      let option = Object.assign({
        route: this.$route,
        router: this.$router,
				searchForm: this.searchForm,
				callback: this.getUserList
      }, options)

      this.$searchPagination(option)
    },
    async getUserList() {
      this.$store.commit('showLoader')  
      try {
        const result = await userAPI.getUserList(this.searchForm)
        this.lists = result.data
        this.$store.commit('hideLoader')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
