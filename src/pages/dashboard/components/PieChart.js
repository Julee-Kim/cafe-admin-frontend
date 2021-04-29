import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['labels', 'chartData'],
  mounted () {
    if(this.chartData.length) {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            data: this.chartData,
            backgroundColor: this.colors.splice(0, this.chartData.length),
          }
        ]
      }, this.options);
    }
  },
  data() {
    return {
      colors: ['#437e94', '#4d4e96','#7f474f', '#457a5e', '#8e6a4d'],
      options: {
        legend: {
          display: false
        },
      }
    }
  }
}