<template>
  <div class="store_update">
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
            <b-button type="button" @click="validAll">매장 수정</b-button>
            <b-button type="button" class="btn_red ml_5" v-b-modal.modalDeleteStore>매장 삭제</b-button>
          </div>
        </b-form>
      </ValidationObserver>  
    </div>

    <!-- Modal -->
		<modal-confirm :id="'modalConfirmUpdateStore'" @answer="updateConfirm">
			<div slot="content">매장 정보를 정말로 수정하시겠습니까?</div>
		</modal-confirm>
    <modal-delete :id="'modalDeleteStore'" @answer="deleteConfirm">
			<div slot="content">해당 매장을 정말로 삭제하시겠습니까?</div>
		</modal-delete>
  </div>
</template>

<script>
import { sidoList } from '../js/sidoList'
import storeAPI from '@/api/store'
import { commonScript } from '../_mixins/commonScript'

export default {
  name: 'StoreUpdate',
  mixins: [ commonScript ],
  created() {
    this.$eventBus.$emit('pageTitle', '매장 상세')
    this.updateId = this.$route.params.id
    this.getStore()
  },
  methods: {
    // 매장 상세
    async getStore() {
      this.$store.commit('showLoader')  
      try {
        const result = await storeAPI.getStore(this.updateId)
        const data = result.data.item

        this.storeForm.store = data.store
        this.storeForm.tel = data.tel

        sidoList.forEach(item => {
          if (item.sido === data.sido) {
            this.selectedSido = item
            this.gugunOptions = item.gugun
          }
        })

        this.selectedGugun = this.selectedSido.gugun.filter(item => {
          return item.value === data.gugun
        })[0]

        this.storeForm.address = data.address
        this.storeForm.jibunAddress = data.jibunAddress
        this.storeForm.addressDetail = data.addressDetail
        this.storeForm.zonecode = data.zonecode
        this.storeForm.lat = data.lat
        this.storeForm.lot = data.lot

        this.$store.commit('hideLoader')
      } catch (err) {
        console.log(err)
      }
    },
    // 수정 확인
		updateConfirm (value) {
			this.$bvModal.hide('modalConfirmUpdateStore')

			if (value) {
				this.makeData()
			}
    },
    // 매장 수정
    async putStore(data) {
      this.$store.commit('showLoader')  

      try {
        const res = await storeAPI.putStore(this.updateId, data)

        this.$store.commit('hideLoader')
        
        if (res.data.success) {
          this.$bvToast.toast('수정되었습니다.', {
            title: 'success',
            variant: 'success'
          })
        } else {
          this.$checkError(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 삭제 확인
    deleteConfirm (value) {
      this.$bvModal.hide('modalDeleteStore')

      if (value) {
        // 매장 삭제
        this.deleteStore()
      }
    },
    // 매장 삭제
    async deleteStore() {
      this.$store.commit('showLoader')  
      try {
        const res = await storeAPI.deleteStore(this.updateId)

        this.$store.commit('hideLoader')
        
        if (res.data.success) {
          // 목록 이동
          this.$router.replace('/stores')

          this.$nextTick(() => {
            this.$bvToast.toast('삭제되었습니다.', {
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
