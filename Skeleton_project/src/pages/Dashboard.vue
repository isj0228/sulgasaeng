<template>
  <!-- <div>
    <h2>대시보드</h2>
    <Record />
  </div> -->
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
        class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> -->
  </div>

  <div class="row">
    <div class="col-xl-3 col-md-6 mb-4">
      <Card1 />
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <Card1 />
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <Card2 />
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <Card2 />
    </div>
  </div>

  <div class="row">
    <div class="col-lg-6 mb-4">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">최근 내역</h6>
        </div>
        <div class="card-body">
          <Record />
        </div>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">최근 내역</h6>
        </div>
        <div class="card-body">
          <Record />
        </div>
      </div>
    </div>
    <div class="col-lg-6 mb-4">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">최근 내역</h6>
        </div>
        <div class="card-body">
          <Record />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Record from "@/pages/Record1.vue" // Record1.vue를 불러옵니다
import Card1 from "@/components/Card1.vue"
import Card2 from "@/components/Card2.vue"

</script>

<style lang="scss" scoped></style>
