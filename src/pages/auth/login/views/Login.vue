<template>
  <div class="auth">
    <auth-header></auth-header>
    <div class="auth_form_wrap">
      <b-row>
        <b-col class="col_right">
          <h2 class="welcome">Welcome to vue admin!</h2>
          <div class="form_wrap">
            <ValidationObserver ref="login">
              <b-form @submit.prevent>
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <b-form-group class="field" label="Email" label-for="email">
                    <b-form-input
                      name="email"
                      id="email"
                      :class="errors[0] ? 'error' : ''"
                      v-model="loginForm.email"
                      v-validate="'required|email'"
                    ></b-form-input>
                    <span class="error_txt">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider> 

                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-group label="Password" label-for="pw">
                    <b-form-input
                      name="password"
                      id="pw"
                      :class="errors[0] ? 'error' : ''"
                      type="password"
                      v-model="loginForm.password"
                      v-validate="'required'"
                      @keyup.enter="validAll"
                    ></b-form-input>
                    <span class="error_txt">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>   

                <p class="create_account">
                  <span>계정이 없으신가요?</span>
                  <router-link class="link_text" to="/register">회원 가입</router-link>
                </p>

                <div class="btn_wrap text-center">
                  <b-button type="button" class="btn_primary btn--full" @click="validAll">로그인</b-button>
                </div>
              </b-form>
            </ValidationObserver>  
          </div>
        </b-col>
      </b-row>
    </div>  
  </div>
</template>

<script>
import authAPI from '@/api/auth'
import AuthHeader from '../../components/AuthHeader'

export default {
  name: 'Login',
  components: { AuthHeader },
  created () {
		// 로그인한 상태면 메인으로 이동
		const token = localStorage.token

		if (token) {
			this.$router.push('/')
		}
	},
  data () {
		return {
			loginForm: {
				email: '',
				password: ''
			}
		}
	},
  methods: {
    async validAll() {
      const isValid = await this.$refs.login.validate();

      if (!isValid) {
      	this.$bvToast.toast('입력값을 확인해주세요.', {
      		title: 'warning',
      		variant: 'danger'
        })
        return false
      }

      this.postLogin()
    },
    postLogin() {
      this.$store.commit('showLoader')

      this.$store.dispatch('Auth/login', this.loginForm).then((res) => {
        if(res.data.success) {
          // 시스템 사용자 정보 요청
				  this.getUserInfo()
        } else {
          alert(res.data.message)
          this.$store.commit('hideLoader')
        }
			}).catch(err => {
				console.log(err)
      })
    },
    // 사용자 정보
		getUserInfo () {
			this.$store.dispatch('Auth/getUserInfo').then(res => {
				// 이전페이지가 있다면 이전페이지로 이동하고 아니면 메인으로 이동
        const returnUrl = this.$route.query.return
        if (returnUrl) {
          this.$router.push(returnUrl)
        } else {
          this.$router.push('/')
        }

        this.$store.commit('hideLoader')
			}).catch(err => {
        console.log(err)
			})
		}
  }
}
</script>

<style lang="scss"></style>