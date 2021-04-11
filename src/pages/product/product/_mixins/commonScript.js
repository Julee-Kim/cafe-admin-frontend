import ImageDropzone from '@/components/ImageDropzone'

export const commonScript = {
  components: { ImageDropzone },
  data() {
    return {
      productForm: {
        category: '',
        product_name: '',
        product_name_en: '',
        content: '',
        recommend: '',
        standard: 355,
        kcal: '',
        sat_FAT: '',
        protein: '',
        sodium: '',
        sugars: '',
        caffeine: '',
        img: ''
      }
    }
  },
  methods: {
    // ImageDropzone Component에서 보낸 url settting
    setImageUrl(url) {
      this.productForm.img = url
    },
    async validAll() {
      const isValid = await this.$refs.product.validate();

      if (!isValid) {
      	this.$bvToast.toast('입력값을 확인해주세요.', {
      		title: 'warning',
      		variant: 'danger'
        })
        return false
      }

      if (this.$route.name === 'ProductCreate') {
        // 상품 등록
        this.postProduct()
      } else {
        // 상품 수정
        this.$bvModal.show('modalConfirmUpdateProduct')
      }
    }
  }
}