<template>
  <div class="product_create card">
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
          <b-button type="button" @click="validAll">상품 등록</b-button>
        </div>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import productAPI from '@/api/product'
import { commonScript } from '../_mixins/commonScript'

export default {
  name: 'ProductCreate',
  mixins: [ commonScript ],
  created() {
    this.$eventBus.$emit('pageTitle', '상품 등록')
  },
  methods: {
    async postProduct() {
      this.$store.commit('showLoader')  
      try {
        const res = await productAPI.postProduct(this.productForm)

        this.$store.commit('hideLoader')
        
        if (res.data.success) {
          this.$router.push('/products')
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