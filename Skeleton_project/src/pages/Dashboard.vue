<template>
  <div class="row">
    <div class="col-xl-3 col-md-6 mb-4">
      <IncomeCard />
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <OutcomeCard />
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <PlanCard />
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <GoalCard />
    </div>
  </div>

  <div class="row">
    <div class="col-lg-8 mb-4">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="mb-0 mt-1 card-title">최근 내역</h6>
        </div>
        <div class="card-body">
          <Record />
        </div>
      </div>

      <PieChart/>
    </div>
    <div class="col-lg-4 mb-4">
      <div class="card shadow mb-4">
        <div class="card-body p-0">
          <RecordForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RecordForm from "@/components/RecordForm.vue"
import Record from "@/components/RecordRecent.vue"
import IncomeCard from "@/components/card/IncomeCard.vue"
import OutcomeCard from "@/components/card/OutcomeCard.vue"
import PlanCard from "@/components/card/PlanCard.vue"
import GoalCard from "@/components/card/GoalCard.vue"
import PieChart from '@/components/chart/PieChart.vue'
</script>

<style lang="scss" scoped>

</style>