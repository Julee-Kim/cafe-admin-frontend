<template>
  <div class="product_update card">
    <ValidationObserver ref="product">
      <b-form>
        <div class="">
          <div class="card_header">
            <h4 class="card_title">기본 정보</h4>
          </div>
      
          <b-row>
            <div class="col-12 col-md-3 col-xl-3 thumbnail_wrap">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input
                  type="hidden"
                  name="thumbnail"
                  v-model="productForm.img"
                  v-validate="'required'">
                <div class="img_dropzone_wrap" :class="{'error': errors[0]}">
                  <image-dropzone @setImageUrl="setImageUrl"></image-dropzone>
                </div>  
                <span class="error_txt">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </b-row>
          <b-row>
            <div class="col-12 col-md-12 col-xl-4">
              <div class="col-12 col-md-6 col-xl-12 category_wrap">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-group
                    label="카테고리"
                    label-for="category"
                  >
                    <b-form-select
                      name="category"
                      id="category"
                      class="form-control"
                      :class="{'error': errors[0]}"
                      v-model="productForm.category"
                      v-validate="'required'"
                    >
                      <b-form-select-option value="">카테고리 선택</b-form-select-option>
                      <b-form-select-option value="coffee">Coffee</b-form-select-option>
                      <b-form-select-option value="tea">Tea</b-form-select-option>
                      <b-form-select-option value="cake">Cake</b-form-select-option>
                    </b-form-select>
                    <span class="error_txt">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-group
                  label="상품명"
                  label-for="productName"
                >
                  <b-form-input
                    name="product_name"
                    id="productName"
                    :class="{'error': errors[0]}"
                    v-model="productForm.product_name"
                    v-validate="'required'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-group
                  label="상품명 (en)"
                  label-for="productNameEn"
                >
                  <b-form-input
                    name="product_name_en"
                    id="productNameEn"
                    :class="{'error': errors[0]}"
                    v-model="productForm.product_name_en"
                    v-validate="'required'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
          </b-row>
          <b-row>
            <div class="col-12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-group
                  label="상품 설명"
                  label-for="content"
                >
                  <b-form-textarea
                    name="content"
                    id="content"
                    :class="{'error': errors[0]}"
                    v-model="productForm.content"
                    v-validate="'required'"
                    rows="1"
                  ></b-form-textarea>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-group
                  label="추천 설명"
                  label-for="recommend"
                >
                  <b-form-textarea
                    name="recommend"
                    id="recommend"
                    :class="{'error': errors[0]}"
                    v-model="productForm.recommend"
                    v-validate="'required'"
                    rows="1"
                  ></b-form-textarea>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
          </b-row>
        </div>

        <hr>

        <div class="">
          <div class="card_header">
            <h4 class="card_title">영양 정보</h4>
          </div>
          <b-row>
            <div class="col-6 col-md-6 col-xl-4">
              <ValidationProvider rules="required|integer" v-slot="{ errors }">
                <b-form-group
                  label="칼로리 (kcal)"
                  label-for="kcal"
                >
                  <b-form-input
                    name="kcal"
                    id="kcal"
                    :class="{'error': errors[0]}"
                    v-model="productForm.kcal"
                    v-validate="'required|integer'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-6 col-md-6 col-xl-4">
              <ValidationProvider rules="required|integer" v-slot="{ errors }">
                <b-form-group
                  label="포화지방 (g)"
                  label-for="satFAT"
                >
                  <b-form-input
                    name="sat_FAT"
                    id="satFAT"
                    :class="{'error': errors[0]}"
                    v-model="productForm.sat_FAT"
                    v-validate="'required|integer'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-6 col-md-6 col-xl-4">
              <ValidationProvider rules="required|integer" v-slot="{ errors }">
                <b-form-group
                  label="단백질 (g)"
                  label-for="protein"
                >
                  <b-form-input
                    name="protein"
                    id="protein"
                    :class="{'error': errors[0]}"
                    v-model="productForm.protein"
                    v-validate="'required|integer'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-6 col-md-6 col-xl-4">
              <ValidationProvider rules="required|integer" v-slot="{ errors }">
                <b-form-group
                  label="나트륨 (mg)"
                  label-for="sodium"
                >
                  <b-form-input
                    name="sodium"
                    id="sodium"
                    :class="{'error': errors[0]}"
                    v-model="productForm.sodium"
                    v-validate="'required|integer'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-6 col-md-6 col-xl-4">
              <ValidationProvider rules="required|integer" v-slot="{ errors }">
                <b-form-group
                  label="당류 (g)"
                  label-for="sugars"
                >
                  <b-form-input
                    name="sugars"
                    id="sugars"
                    :class="{'error': errors[0]}"
                    v-model="productForm.sugars"
                    v-validate="'required|integer'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-6 col-md-6 col-xl-4">
              <ValidationProvider rules="required|integer" v-slot="{ errors }">
                <b-form-group
                  label="카페인 (mg)"
                  label-for="caffeine"
                >
                  <b-form-input
                    name="caffeine"
                    id="caffeine"
                    :class="{'error': errors[0]}"
                    v-model="productForm.caffeine"
                    v-validate="'required|integer'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
            <div class="col-6 col-md-6 col-xl-4">
              <ValidationProvider rules="required|integer" v-slot="{ errors }">
                <b-form-group
                  label="1회 제공량 (ml)"
                  label-for="standard"
                >
                  <b-form-input
                    name="standard"
                    id="standard"
                    :class="{'error': errors[0]}"
                    v-model="productForm.standard"
                    v-validate="'required|integer'"
                  ></b-form-input>
                  <span class="error_txt">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </div>
          </b-row>
        </div>
        <div class="btn_wrap">
          <b-button type="button" @click="validAll">상품 수정</b-button>
          <b-button type="button" v-b-modal.modalDeleteProduct>상품 삭제</b-button>
        </div>
      </b-form>
    </ValidationObserver>

    <!-- Modal -->
		<modal-confirm :id="'modalConfirmUpdateProduct'" @answer="updateConfirm">
			<div slot="content">상품 정보를 정말로 수정하시겠습니까?</div>
		</modal-confirm>
    <modal-delete :id="'modalDeleteProduct'" @answer="deleteConfirm">
			<div slot="content">해당 상품을 정말로 삭제하시겠습니까?</div>
		</modal-delete>
  </div>
</template>

<script>
import productAPI from '@/api/product'
import { commonScript } from '../_mixins/commonScript'

export default {
  name: 'ProductUpdate',
  mixins: [ commonScript ],
  created() {
    this.$eventBus.$emit('pageTitle', '상품 상세')
    this.productId = this.$route.params.id
    this.getProduct()
  },
  data() {
    return {
      productId: ''
    }
  },
  methods: {
    // 상품 상세
    async getProduct() {
      this.$store.commit('showLoader')  
      try {
        const result = await productAPI.getProduct(this.productId)
        const data = result.data.item

        this.productForm.category = data.category
        this.productForm.product_name = data.product_name
        this.productForm.product_name_en = data.product_name_en
        this.productForm.content = data.content
        this.productForm.recommend = data.recommend
        this.productForm.standard = data.standard
        this.productForm.kcal = data.kcal
        this.productForm.sat_FAT = data.sat_FAT
        this.productForm.protein = data.protein
        this.productForm.sodium = data.sodium
        this.productForm.sugars = data.sugars
        this.productForm.caffeine = data.caffeine
        this.productForm.img = data.img
        this.$store.commit('hideLoader')
      } catch (err) {
        console.log(err)
      }
    },
    // 수정 확인
		updateConfirm (value) {
			this.$bvModal.hide('modalConfirmUpdateProduct')

			if (value) {
				this.putProduct()
			}
    },
    // 상품 수정
    async putProduct() {
      this.$store.commit('showLoader')  
      try {
        const res = await productAPI.putProduct(this.productId, this.productForm)

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
    // 상품 삭제 확인
		deleteConfirm (value) {
			this.$bvModal.hide('modalDeleteProduct')

			if (value) {
				this.deleteProduct()
			}
    },
    // 상품 삭제
    async deleteProduct() {
      this.$store.commit('showLoader')  
      try {
        const res = await productAPI.deleteProduct(this.productId)

        this.$store.commit('hideLoader')
        
        if (res.data.success) {
          // 목록 이동
          this.$router.replace('/products')

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