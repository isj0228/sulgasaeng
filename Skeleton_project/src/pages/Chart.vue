<template>
  <div>
    <PieChart />
    <BarChart />
  </div>
</template>

<script>
import PieChart from '@/components/PieChart.vue';
import BarChart from '@/components/BarChart.vue';

export default {
  components: {
    PieChart,
    BarChart
  }
}
</script>