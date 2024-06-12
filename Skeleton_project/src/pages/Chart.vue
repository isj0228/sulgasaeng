<template>
  <div>
    <PieCombined />
    <BarChart />
  </div>
</template>

<script>
import PieCombined from '@/components/chart/PieCombined.vue';
import BarChart from '@/components/chart/BarChart.vue';

export default {
  components: {
    PieCombined,
    BarChart
  }
}
</script>