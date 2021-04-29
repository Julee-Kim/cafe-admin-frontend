import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['labels', 'chartData'],
  mounted () {
    if(this.chartData.length) {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            data: this.chartData,
            backgroundColor: 'rgba(0,207,232,.12)',
            borderColor: '#00cfe8',
            borderWidth: 2,
          }
        ]
      }, this.options);
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#989ba0'
            },
          }],
          xAxes: [{
            ticks: {
              fontColor: '#989ba0'
            },
          }]
        }
      }
    }
  }
}