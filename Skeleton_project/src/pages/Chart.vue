<template>
  <div>
    <PieChart />
    <BarChart />
  </div>
</template>

<script>
import PieChart from '@/components/chart/PieChart.vue';
import BarChart from '@/components/chart/BarChart.vue';

export default {
  components: {
    PieChart,
    BarChart
  }
}
</script>