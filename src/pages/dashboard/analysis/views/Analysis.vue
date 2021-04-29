<template>
  <div class="analysis">
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
          <h3 class="card_title">시간대별 매출 평균</h3>
        </div>
        <div class="card_body card_body_sales">
          <line-chart :labels="salesLabels" :chart-data="salesData"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      year: 2021,
      salesLabels: [10,11,12,13,14,15,16,17,18,19,20,21,22],
      salesData: [16,23,36,23,17,21,13,24,39,28,17,12,8],
      agePieLabels: ['20대', '30대', '40대', '50대', '그외'],
      agePieData: [40, 35, 10, 10, 5],
      categoryPieLabels: ['Espresso', 'Frappuccino', 'Blended', 'Tea'],
      categoryPieData: [50,30,24,13,12],
      genderDoughnutLabels: ['Male', 'Female'],
      genderDoughnutData: [45, 65],
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>
