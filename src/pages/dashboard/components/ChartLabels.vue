<template>
  <div class="chart_labels">
    <template v-for="(item, index) in labels">
      <div :key="index" class="label_wrap">
        <span
          class="label_color"
          :style="[
            type === 'pie' && {backgroundColor: pieColors[index]},
            type === 'doughnut' && {backgroundColor: doughnutColors[index]},
          ]"
        ></span>
        <span class="label_text">{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ChartLabels',
  props: ['type','labels'],
  data () {
    return {
      pieColors: ['#437e94', '#4d4e96','#7f474f', '#457a5e', '#8e6a4d'],
      doughnutColors: ['#457a5e', '#8e6a4d', '#4d4e96', '#7f474f', '#437e94',],
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.chart_labels {
  padding-top: 30px;

  .label_wrap {
    display: inline-flex;
    justify-items: center;
    align-items: center;
    margin-right: 15px;

    .label_color {
      display: inline-block;
      width: 15px;
      height: 15px;
    }
    .label_text {
      padding-left: 5px;
      color: #abadb3;
    }
  }
}
</style>