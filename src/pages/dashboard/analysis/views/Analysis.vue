<template>
  <div class="analysis">
    <div class="row">
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="card">
          소비 연령대
          <div class="small">
            <pie-chart :labels="agePieLabels" :chart-data="agePieData"></pie-chart>
          </div>
        </div>
      </div>  
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="card">
          성별
          <div>
            <doughnut-chart :labels="genderDoughnutLabels" :chart-data="genderDoughnutData"></doughnut-chart>
          </div>
        </div>
      </div>  
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="card">
          카테고리별 판매량
          <div>
            <pie-chart :labels="categoryPieLabels" :chart-data="categoryPieData"></pie-chart>
          </div>
        </div>
      </div>  
    </div>

    <div>
      <div class="card">
        시간대별 매출 평균
        <div>
          <line-chart :chart-data="datacollection"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../../components/LineChart'
import PieChart from '../../components/PieChart'
import DoughnutChart from '../../components/DoughnutChart'

export default {
  name: 'Analysis',
  components: {
    LineChart,
    PieChart,
    DoughnutChart,
  },
  mounted() {},
  created() {
    this.$eventBus.$emit('pageTitle', '소비 분석')
  },
  data() {
    return {
      datacollection: {
        labels: [10,11,12,13,14,15,16,17,18,19,20,21,22],
        datasets: [
          {
            backgroundColor: 'rgba(255,213,0,.1)',
            borderColor: '#ffd500',
            borderWidth: 4,
            data: [16,23,36,23,17,21,13,24,39,28,17,12,8]
          }
        ]
      },
      agePieLabels: ['20대', '30대', '40대', '50대', '그외'],
      agePieData: [40, 35, 10, 10, 5],
      categoryPieLabels: ['Espresso', 'Frappuccino', 'Blended', 'Tea'],
      categoryPieData: [50,30,24,13,12],
      genderDoughnutLabels: ['남', '여'],
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

<style lang="scss">
.small {
    // max-width: 600px;
    // margin:  150px auto;
  }
.analysis {

  .row {
    .card {
      // margin: 0 .6rem;
    }
  }
}
</style>