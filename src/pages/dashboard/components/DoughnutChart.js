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
      colors: ['#00cfe8','#ff9f43','#ea5455','#7367f0','#28c76f',],
      options: {
        legend: {
          display: false
        },
        responsive: true,
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      }
    }
  }
}