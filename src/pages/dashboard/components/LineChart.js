import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartId', 'chartData'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  data() {
    return {
      options: {
        // chartId: this.chartId,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      }
    }
  }
}