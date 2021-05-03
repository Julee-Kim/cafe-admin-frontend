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
              <div class="card_body card_body_year"><strong>{{ totalYear | numberWithComma }}</strong></div>
            </div>
          </div>  
          <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="card">
              <h3 class="card_title">오늘 매출</h3>
              <div class="card_body card_body_today"><strong>{{ totalToday | numberWithComma }}</strong></div>
            </div>
          </div>  
          <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="card">
              <h3 class="card_title">어제 매출</h3>
              <div class="card_body card_body_yesterday"><strong>{{ totalYesterday | numberWithComma }}</strong></div>
            </div>
          </div>  
        </div>

        <div>
          <div class="card">
            <h3 class="card_title">월별 매출</h3>
            <div class="card_body card_body_monthly">
              <bar-chart
                v-if="isLoading"
                :labels="monthlyLabels"
                :chart-data="monthlyData"
              ></bar-chart>
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
              <template #cell(ranking)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(totalSales)="data">
                {{ data.item.totalSales | numberWithComma }}
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
import moment from 'moment';
import BarChart from '../../components/BarChart';
import orderAPI from '@/api/order';

export default {
  name: 'Sales',
  components: {
    BarChart,
  },
  mounted() {},
  created() {
    this.$eventBus.$emit('pageTitle', '매출 통계')
    this.getSaleList()
  },
  data() {
    return {
      year: 2021,
      totalYear: 0,
      totalToday: 0,
      totalYesterday: 0,
      isLoading: false,
      monthlyLabels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthlyData: null,
      fields: [
        { key: 'ranking', label: 'No.' },
        { key: 'storeName', label: '지점명' },
        { key: 'totalSales', label: '매출액' }
      ],
      rankingStores: []
    }
  },
  watch: {
    year() {
      this.getSaleList()
    }
  },
  methods: {
    initData() {
      this.totalYear = 0
      this.totalToday = 0
      this.totalYesterday = 0
      this.isLoading = false
    },
    makeData(data) {
      const today = moment().format('YYYY-MM-DD');
      const yesterDay = moment().subtract(1, 'day').format('YYYY-MM-DD');
      let stores = {}
      let monthlyDataObj = {};

      let i;
      for(i = 0; i < data.length; i++) {
        const item = data[i];
        const orderDate = moment(item.create_date).format('YYYY-MM-DD');

        // 연매출
        this.totalYear += item.orderPrice;

        // 오늘 매출
        if(moment(today).isSame(orderDate)) {
          this.totalToday += item.orderPrice;
        }

        // 어제 매출
        if(moment(yesterDay).isSame(orderDate)) {
          this.totalYesterday += item.orderPrice;
        }

        // 지점 매출 순위
        if(!stores[item.storeName]) {
          // stores[item.storeName] = {}
          stores[item.storeName] = item.orderPrice
        } else {
          stores[item.storeName] += item.orderPrice
        }

        // 월별 매출
        const orderMonth = moment(item.create_date).format('MM')
        if(!monthlyDataObj[orderMonth]) {
          monthlyDataObj[orderMonth] = item.orderPrice
        } else {
          monthlyDataObj[orderMonth] += item.orderPrice
        }
      }      

      // 지점 매출 순위 매출 높은 순으로
      let rankingArr = [];
      let key;
      for(key in stores) {
        rankingArr.push({
          storeName: key,
          totalSales: stores[key]
        })
      }
      rankingArr.sort(function (a, b) {
        if (a.totalSales > b.totalSales) {
          return 1;
        }
        if (a.totalSales < b.totalSales) {
          return -1;
        }
        return 0;
      });

      this.rankingStores = rankingArr.reverse();


      // 월별 매출 배열로
      let monthlyDataArr = [];
      for(key in monthlyDataObj) {
        monthlyDataArr.push(monthlyDataObj[key])
      }

      this.monthlyData = monthlyDataArr;
      this.isLoading = true;

      this.$store.commit('hideLoader')
    },
    async getSaleList() {
      if(this.isLoading) {
        this.initData()
      }
      this.$store.commit('showLoader')  

      try {
        const result = await orderAPI.getSaleList({year: this.year})
        this.makeData(result.data.lists)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>