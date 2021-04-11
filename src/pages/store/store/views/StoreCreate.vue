<template>
  <div class="store_new">
    <div class="card">
      <ValidationObserver ref="store">
        <b-form @submit.prevent>
          <b-row>
            <div class="col-12 col-md-6 col-xl-3">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-group
                  id="store"
                  label="지점명"
                  label-for="store"
                >
                  <b-form-input
                    name="store"
                    id="store"
                    :class="{'error': errors[0]}"
                    v-model="storeForm.store"
                    v-validate="'required'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-12 col-md-6 col-xl-3">
              <b-form-group
                id="tel"
                label="전화번호"
                label-for="tel"
              >
                <b-form-input
                  name="tel"
                  id="tel"
                  :class="{'error': storeForm.tel.length && !isValidTel}"
                  :value="storeForm.tel"
                  @input="validTel($event)"
                ></b-form-input>
                <span class="error_txt" v-show="storeForm.tel.length && !isValidTel">전화번호 형식이 아닙니다.</span>
              </b-form-group>
            </div>
            <div class="col-6 col-md-6 col-xl-3">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-group
                  id="sido"
                  label="시/도"
                  label-for="sido"
                >
                  <b-form-select
                    name="sido"
                    id="sido"
                    class="form-control"
                    :class="{'error': errors[0]}"
                    v-model="selectedSido"
                    v-validate="'required'"
                    @change="changeSido"
                  >
                    <b-form-select-option value="">시/도 선택</b-form-select-option>
                    <template v-for="(item, index) in sidoOptions">
                      <b-form-select-option :key="index" :value="item">{{ item.sido }}</b-form-select-option>
                    </template>
                  </b-form-select>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-6 col-md-6 col-xl-3">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-group
                  id="gugun"
                  label="구/군"
                  label-for="gugun"
                >
                  <b-form-select
                    name="gugun"
                    id="gugun"
                    class="form-control"
                    :class="{'error': errors[0]}"
                    v-model="selectedGugun"
                    :disabled="!selectedSido"
                    v-validate="'required'"
                  >
                    <b-form-select-option value="">구/군 선택</b-form-select-option>
                    <template v-for="(item, index) in selectedSido.gugun">
                      <b-form-select-option :key="index" :value="item">{{ item.text }}</b-form-select-option>
                    </template>
                  </b-form-select>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
          </b-row>
          <b-row>
            <div class="col-12 col-md-12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input type="hidden" name="zonecode" v-model="storeForm.zonecode" v-validate="'required'">
              </ValidationProvider>
              <b-form-group
                id="zonecode"
                class="form-group_address"
                :class="{'error': !isValidAddress}"
                label="우편번호"
                label-for="zonecode"
              >
                <b-form-input
                  id="zonecode"
                  class="zonecode"
                  placeholder="우편번호"
                  readonly
                  v-model="storeForm.zonecode"
                ></b-form-input>
                <b-button class="no_shadow" @click="handleAddress">우편번호 찾기</b-button>
                <p class="address" :class="{'no_data': !storeForm.address}">{{ storeForm.address ? storeForm.address : '주소' }}</p>
                <b-form-input
                  id="addressDetail"
                  class="address_detail"
                  placeholder="상세주소 입력"
                  v-model="storeForm.addressDetail"
                ></b-form-input>
              </b-form-group>
            </div>
          </b-row>
          <div class="btn_wrap">
            <b-button type="button" @click="validAll">매장 등록</b-button>
          </div>
        </b-form>
      </ValidationObserver>  
    </div>
  </div>
</template>

<script>
import storeAPI from '@/api/store'
import { commonScript } from '../_mixins/commonScript'

export default {
  name: 'StoreCreate',
  mixins: [ commonScript ],
  created() {
    this.$eventBus.$emit('pageTitle', '매장 등록')
  },
  methods: {
    async postStore(data) {
      this.$store.commit('showLoader')  

      try {
        const res = await storeAPI.postStore(data)

        this.$store.commit('hideLoader')
        
        if (res.data.success) {
          this.$router.push('/stores')
          this.$nextTick(() => {
            this.$bvToast.toast('등록되었습니다.', {
              title: 'success',
              variant: 'success'
            })
          })
        } else {
          this.$checkError(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
