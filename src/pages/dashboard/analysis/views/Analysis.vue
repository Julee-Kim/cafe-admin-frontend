<template>
  <div class="analysis" v-if="isLoading">
    <div class="text-right">
      <b-form-group
        label=""
        label-for="year"
      >
        <b-form-select
          name="year"
          id="year"
          class="form-control search_year"
          v-model="year"
        >
          <b-form-select-option value="">연도 선택</b-form-select-option>
          <b-form-select-option value="2021">2021</b-form-select-option>
          <b-form-select-option value="2020">2020</b-form-select-option>
        </b-form-select>
        <span class="error_txt">{{ errors[0] }}</span>
      </b-form-group>
    </div>
    <div class="row">
      <div class="card_wrap col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="card">
          <div class="card_header">
            <span class="ico_wrap ico_wrap--user">
              <users-icon size="21"></users-icon>
            </span>
            <h3 class="card_title">소비 연령대</h3>
          </div>
          <div class="card_body">
            <div class="chart_wrap">
              <pie-chart :labels="agePieLabels" :chart-data="agePieData"></pie-chart>
            </div>
            <chart-labels :type="'pie'" :labels="agePieLabels"></chart-labels>
          </div>
        </div>
      </div>  
      <div class="card_wrap col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="card">
          <div class="card_header">
            <span class="ico_wrap ico_wrap--gender">
              <heart-icon size="19"></heart-icon>
            </span>
            <h3 class="card_title">성별</h3>
          </div>
          <div class="card_body">
            <div class="chart_wrap">
              <doughnut-chart :labels="genderDoughnutLabels" :chart-data="genderDoughnutData"></doughnut-chart>
            </div>
            <chart-labels :type="'doughnut'" :labels="genderDoughnutLabels"></chart-labels>
          </div>
        </div>
      </div>  
      <div class="card_wrap col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="card">
          <div class="card_header">
            <span class="ico_wrap ico_wrap--category">
              <box-icon size="21"></box-icon>
            </span>
            <h3 class="card_title">카테고리별 판매량</h3>
          </div>
          <div class="card_body">
            <div class="chart_wrap">
              <pie-chart :labels="categoryPieLabels" :chart-data="categoryPieData"></pie-chart>
            </div>
            <chart-labels :type="'pie'" :labels="categoryPieLabels"></chart-labels>
          </div>
        </div>
      </div>  
    </div>

    <div>
      <div class="card">
        <div class="card_header">
          <span class="ico_wrap ico_wrap--sales">
            <trending-up-icon size="21"></trending-up-icon>
          </span>
          <h3 class="card_title">요일별 평균 매출</h3>
        </div>
        <div class="card_body card_body_sales">
          <line-chart :labels="salesLabels" :chart-data="salesData"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderAPI from '@/api/order';
import moment from 'moment';
import {
  UsersIcon,
  HeartIcon,
  BoxIcon,
  TrendingUpIcon,
} from 'vue-feather-icons';
import LineChart from '../../components/LineChart'
import PieChart from '../../components/PieChart'
import DoughnutChart from '../../components/DoughnutChart'
import ChartLabels from '../../components/ChartLabels.vue';

export default {
  name: 'Analysis',
  components: {
    UsersIcon,
    HeartIcon,
    BoxIcon,
    TrendingUpIcon,
    LineChart,
    PieChart,
    DoughnutChart,
    ChartLabels,
    ChartLabels,
  },
  mounted() {},
  created() {
    this.$eventBus.$emit('pageTitle', '소비 분석')
    this.getAnalysisList()
  },
  data() {
    return {
      isLoading: false,
      year: 2021,
      agePieLabels: null,
      agePieData: null,
      genderDoughnutLabels: null,
      genderDoughnutData: null,
      categoryPieLabels: null,
      categoryPieData: null,
      salesLabels: null,
      salesData: null,
    }
  },
  watch: {
    year() {
      this.getAnalysisList()
    }
  },
  methods: {
    initData() {
      this.agePieLabels = null
      this.agePieData = null
      this.genderDoughnutLabels = null
      this.genderDoughnutData = null
      this.categoryPieLabels = null
      this.categoryPieData = null
      this.salesLabels = null
      this.salesData = null
      this.isLoading = false
    },
    makeData(data) {
       // 소비연령대
      let ageObj = {
        20: 0,
        30: 0,
        40: 0,
        50: 0,
        rest: 0,
      }

      // 성별
      let genderObj = { Male: 0, Female: 0 }

      // 카테고리
      let cateObj = {}

      // 요일별
      let daysObj = {}

      let i;
      for(i = 0; i < data.length; i++) {
        const item = data[i];
        const today = Number(moment().format('YYYY'));
        const userBirth = Number(moment(item.birth).format('YYYY'));

        // 연령대별로 분류
        let age = (today - userBirth) + 1
        if(age >= 20 && age < 30) {
          ageObj[20] += 1
        } else if(age >= 30 && age < 40) {
          ageObj[30] += 1
        } else if(age >= 40 && age < 50) {
          ageObj[40] += 1
        } else if(age >= 50 && age < 60) {
          ageObj[50] += 1
        } else {
          ageObj.rest += 1
        }

        // 성별로 분류
        switch (item.gender) {
          case 'F':
            genderObj.Female ++
            break;
          case 'M':
            genderObj.Male ++
            break;
          default:
            break;
        }

        // 카테고리별로 분류
        if(!cateObj[item.menuCategory]) {
          cateObj[item.menuCategory] = 1
        } else {
          cateObj[item.menuCategory] += 1
        }

        // 요일별로 분류
        const day = moment(item.order_date).format('dddd').toLowerCase();
        if(!daysObj[day]) {
          daysObj[day] = {
            price: item.price,
            count: 1
          }
        } else {
          daysObj[day].price= item.price
          daysObj[day].count += 1
        }
      }

      // 소비연령대 데이터
      let ageLabels = [];
      let ageData = [];
      for(let [key, value] of Object.entries(ageObj)) {
        if(value) {
          ageLabels.push(`${key}대`)
          ageData.push(value)
        }
      }
      this.agePieLabels = ageLabels
      this.agePieData = ageData

      // 성별 데이터
      let genderLabels = [];
      let genderData = [];
      for(let [key, value] of Object.entries(genderObj)) {
        if(value) {
          const label = key === 'Male' ? '남자' : '여자'
          genderLabels.push(label)
          genderData.push(value)
        }
      }
      this.genderDoughnutLabels = genderLabels
      this.genderDoughnutData = genderData

      // 카테고리별 판매량 데이터
      let categoryLabels = [];
      let categoryData = [];
      for(let [key, value] of Object.entries(cateObj)) {
        if(value) {
          categoryLabels.push(key)
          categoryData.push(value)
        }
      }
      this.categoryPieLabels = categoryLabels
      this.categoryPieData = categoryData

      // 요일별 평균 매출 데이터
      const daysObjSortByKey = this.sortObject(daysObj)

      let salesLabels = [];
      let salesData = [];
      for(let [key, value] of Object.entries(daysObjSortByKey)) {
        if(value) {
          salesLabels.push(key)

          let averPrice = value.price / value.count 
          salesData.push(averPrice)
        }
      }
      this.salesLabels = salesLabels
      this.salesData = salesData

      this.isLoading = true
      this.$store.commit('hideLoader')  
    },
    // 요일을 기준으로 정렬
    sortObject(data) {
      const sorter = {
        'monday': 1,
        'tuesday': 2,
        'wednesday': 3,
        'thursday': 4,
        'friday': 5,
        'saturday': 6,
        'sunday': 7
      };

      let tempArr = []
      Object.keys(data).forEach(function(key) {
        let value = data[key]
        let index = sorter[key.toLowerCase()]

        tempArr[index] = {
          key: key,
          value: value
        }
      })

      let orderedData = {}
      tempArr.forEach(function(obj) {
        const keyName = obj.key.charAt(0).toUpperCase() + obj.key.slice(1)
        orderedData[keyName] = obj.value;
      });

      return orderedData
    },
    async getAnalysisList() {
      if(this.isLoading) {
        this.initData()
      }
      this.$store.commit('showLoader')  

      try {
        const result = await orderAPI.getAnalysisList({year: this.year})
        this.makeData(result.data.lists)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
