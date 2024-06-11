<template>
  <div>
    <h2>대시보드</h2>
    <Record />
  </div>
</template>

<script>
import Record from "@/pages/Record1.vue" // Record1.vue를 불러옵니다

export default {
  name: 'Dashboard',
  components: {
    Record // Record 컴포넌트를 등록합니다
  }
  
}
</script>

<style lang="scss" scoped></style>
