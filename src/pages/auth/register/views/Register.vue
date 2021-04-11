<template>
  <div class="auth">
    <auth-header></auth-header>
    <div class="auth_form_wrap">
      <b-row>
        <b-col class="col_right">
          <h2 class="welcome">Create an account!</h2>
          <div class="form_wrap">
            <ValidationObserver ref="register">
              <b-form @submit.prevent>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-group label="Username" label-for="name">
                    <b-form-input
                      name="name"
                      id="name"
                      :class="errors[0] ? 'error' : ''"
                      v-model="registerForm.name"
                      v-validate="'required'"
                    ></b-form-input>
                    <span class="error_txt">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>  

                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <b-form-group label="Email" label-for="email">
                    <b-form-input
                      name="email"
                      id="email"
                      :class="errors[0] ? 'error' : ''"
                      v-model="registerForm.email"
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
                      type="password"
                      :class="errors[0] ? 'error' : ''"
                      v-model="registerForm.password"
                      v-validate="'required'"
                      @keyup.enter="validAll"
                    ></b-form-input>
                    <span class="error_txt">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>  

                <p class="create_account">
                  <span>이미 계정이 있으신가요?</span>
                  <router-link class="link_text" to="/login">로그인</router-link>
                </p>

                <div class="btn_wrap text-center">
                  <b-button type="button" class="btn_primary btn--full" @click="validAll">회원 가입</b-button>
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
  name: 'Register',
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
			registerForm: {
        name: '',
				email: '',
				password: ''
			}
		}
	},
  methods: {
    async validAll() {
      const isValid = await this.$refs.register.validate();

      if (!isValid) {
      	this.$bvToast.toast('입력값을 확인해주세요.', {
      		title: 'warning',
      		variant: 'danger'
        })
        return false
      }

      this.postRegister()
    },
    postRegister() {
      this.$store.commit('showLoader')

      authAPI.postRegister(this.registerForm)
        .then(res => {
          this.$router.push('/login')
          this.$store.commit('hideLoader')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss"></style>