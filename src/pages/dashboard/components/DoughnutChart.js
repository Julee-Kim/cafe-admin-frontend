import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
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
      colors: ['#457a5e', '#8e6a4d', '#4d4e96', '#7f474f', '#437e94',],
      options: {
        legend: {
          display: false
        },
        responsive: true,
      }
    }
  }
}