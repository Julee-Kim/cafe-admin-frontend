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
              fontColor: '#989ba0',
              beginAtZero: true,
              userCallback: function(value) {
                value = value.toString()
                value = value.split(/(?=(?:...)*$)/)
                value = value.join(',')
                return value
              }
            },
          }],
          xAxes: [{
            ticks: {
              fontColor: '#989ba0'
            },
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index]
              if(parseInt(value) >= 1000){
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              } else {
                return value
              }
            }
          }
        }
      }
    }
  }
}