<template>
  <div class="sales">
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
      <div class="sales_left col-sm-12 col-md-8">
        <div class="row">
          <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="card">
              <h3 class="card_title">연 매출</h3>
              <div class="card_body card_body_year"><strong>1500</strong></div>
            </div>
          </div>  
          <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="card">
              <h3 class="card_title">오늘 매출</h3>
              <div class="card_body card_body_today"><strong>1500</strong></div>
            </div>
          </div>  
          <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="card">
              <h3 class="card_title">어제 매출</h3>
              <div class="card_body card_body_yesterday"><strong>1500</strong></div>
            </div>
          </div>  
        </div>

        <div>
          <div class="card">
            <h3 class="card_title">월별 매출</h3>
            <div class="card_body card_body_monthly">
              <bar-chart :labels="monthlyLabels" :chart-data="monthlyData"></bar-chart>
            </div>
          </div>
        </div>
      </div>
      <!-- / sales_left -->

      <div class="sales_right col-sm-12 col-md-4">
        <div class="card">
          <h3 class="card_title">지점 매출 랭킹</h3>
          <div class="card_body card_body_ranking">
            <b-table
              id="rangkingStores"
              class="table_middle"
              :fields="fields"
              :items="rankingStores"
              show-empty
            >
              <template #cell(no)="data">
                <span v-if="data.index === 0"><award-icon color="#b5b500"></award-icon></span>
                <span v-if="data.index === 1"><award-icon color="#8a8a8a"></award-icon></span>
                <span v-if="data.index === 2"><award-icon color="#7d3b00"></award-icon></span>
                <span v-if="data.index !== 0 && data.index !== 1 && data.index !== 2">{{ data.index + 1 }}</span>
              </template>
              <template #empty="scope">데이터가 없습니다.</template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AwardIcon } from 'vue-feather-icons';
import BarChart from '../../components/BarChart'

export default {
  name: 'Sales',
  components: {
    BarChart,
    AwardIcon,
  },
  mounted() {},
  created() {
    this.$eventBus.$emit('pageTitle', '매출 통계')
  },
  data() {
    return {
      year: 2021,
      monthlyLabels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthlyData: [16,23,36,23,17,21,13,24,39,28,17,12],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'storeName', label: '지점명' },
        { key: 'totalSales', label: '매출액' }
      ],
      rankingStores: [
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
        {storeName: '테헤란로지점', totalSales: 20000},
      ]
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
  }
}
</script>