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
      colors: ['#7367f0', '#00cfe8','#ea5455', '#28c76f','#ff9f43'],
      options: {
        legend: {
          display: false
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      }
    }
  }
}