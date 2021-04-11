import { sidoList } from '../js/sidoList'

export const commonScript = {
  data() {
    return {
      updateId: '',
      sidoOptions: [],
      selectedSido: '',
      selectedGugun: '',
      storeForm: {
        store: '',
        tel: '',
        sido: '',
        gugun: '',
        address: '',
        jibunAddress: '',
        addressDetail: '',
        zonecode: '',
        lat: '', // 위도
        lot: '' // 경도
      },
      isValidAddress: true,
      isValidTel: true
    }
  },
  created() {
    this.sidoOptions = sidoList
  },
  watch: {
    'storeForm.zonecode'(value) {
      if(!value) {
        this.isValidAddress = false
      } else {
        this.isValidAddress = true
      }
    }
  },
  methods: {
    changeSido() {
      if (this.selectedGugun) { this.selectedGugun = ''}
    },
    validTel(num) {
      const result = this.$telNumber(num)
      this.storeForm.tel = result.numberWithHyphen
      this.isValidTel = result.isValid
    },
    handleAddress(e) {
      const _this = this;
      new daum.Postcode({
        // 팝업에서 검색결과 항목을 클릭했을때 실행
        oncomplete(data) {
          // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var roadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ''; // 참고 항목 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if(data.buildingName !== '' && data.apartment === 'Y'){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if(extraRoadAddr !== ''){
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          _this.storeForm.address = roadAddr
          _this.storeForm.jibunAddress = data.jibunAddress
          _this.storeForm.addressDetail = extraRoadAddr.replace(/^\s*/, '')
          _this.storeForm.zonecode = data.zonecode

          // '선택 안함' 클릭시 주소관련 데이터 초기화
          if (data.noSelected === 'Y') {
            _this.storeForm.address = ''
            _this.storeForm.jibunAddress = ''
            _this.storeForm.addressDetail = ''
            _this.storeForm.zonecode = ''
            _this.storeForm.lat = ''
            _this.storeForm.lot = ''
          } else {
            // 좌표 검색
            _this.searchLocation(_this.storeForm.address)
          }
        }
      }).open();
    },
    // 좌표 검색
    searchLocation(address) {
      const _this = this;
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();
      
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(address, function(result, status) {
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          // 위도, 경도 저장
          _this.storeForm.lat = result[0].y
          _this.storeForm.lot = result[0].x
        } 
      }); 
    },
    async validAll() {
      const isValid = await this.$refs.store.validate();

      if (!isValid) {
        // 우편번호가 입력되어 있지 않다면 주소 error
        if(!this.storeForm.zonecode) {
          this.isValidAddress = false
        }

      	this.$bvToast.toast('입력값을 확인해주세요.', {
      		title: 'warning',
      		variant: 'danger'
        })
        return false
      }

      if (!this.updateId) {
        this.makeData()
      } else {
        // 수정 확인
        this.$bvModal.show('modalConfirmUpdateStore')
      }
    },
    makeData() {
      let data = Object.assign({}, this.storeForm)
      data.sido = this.selectedSido.sido
      data.gugun = this.selectedGugun.value

      if (!this.updateId) {
        // 매장 등록
        this.postStore(data)
      } else {
        // 매장 수정
        this.putStore(data)
      }
    }
  }
}