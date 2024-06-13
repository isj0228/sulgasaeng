<template>
  <div>
    <!-- PieCombined 컴포넌트와 BarChart 컴포넌트를 렌더링 -->
    <PieCombined />
    <BarChart />
  </div>
</template>

<script>
// PieCombined 및 BarChart 컴포넌트를 가져오기
import PieCombined from '@/components/chart/PieCombined.vue';
import BarChart from '@/components/chart/BarChart.vue';

export default {
  // 가져온 컴포넌트를 등록
  components: {
    PieCombined,
    BarChart
  }
}
</script>