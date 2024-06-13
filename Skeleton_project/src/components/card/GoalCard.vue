<template>
  <div class="card border-left-warning shadow h-100 py-2" @mouseover="showButton = true"
    @mouseleave="showButton = false">
    <div class="card-body">
      <div class="row no-gutters align-items-center">
        <div class="col mr-2">
          <div class="font-weight-bold text-warning text-uppercase mb-1">목표금액 채우기
          </div>
          <div class="row no-gutters align-items-center">
            <div class="col-auto">
              <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ progressValue }}%</div>
            </div>
            <div class="col">
              <div class="progress progress-sm mr-2">
                <div class="progress-bar bg-warning" role="progressbar" :style="{ width: progressWidth }"
                  :aria-valuenow="progressValue" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <i class="fas fa-trophy fa-2x text-gray-300"></i>
        </div>
      </div>
      <button v-show="showButton" class="btn btn-primary btn-sm position-absolute top-0 end-0 mt-2 me-2"
        @click="toggleInputField">
        수정
      </button>
      <!-- Input field for "목표 소비 금액" -->
      <div v-if="showInputField" class="input-group mb-3">
        <input type="number" class="form-control" v-model="targetExpenses" @change="updateTargetExpenses"
          placeholder="목표 소비 금액" aria-label="목표 소비 금액" aria-describedby="basic-addon2" />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">원</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect, computed } from 'vue';
import { monthlyInput } from '../../service/monthlySummary';
import { useBudgetStore } from '@/stores/budgetStore.js';

const budgetStore = useBudgetStore();
const totalInput = ref(0);
const isLoading = ref(true);
const showInputField = ref(false);
const showButton = ref(false);
const targetExpenses = ref(100000);

const toggleInputField = () => {
  showInputField.value = !showInputField.value;
};

//현재 월 기준 총합 (20,000 형식으로 넘어와서 number로 형변환)
const updateTotalInput = () => {
  const input = monthlyInput();
  const sanitizedInput = input.replace(/,/g, ''); // 쉼표 제거
  totalInput.value = Number(sanitizedInput) || 0;
  isLoading.value = false;
};
//현재 월 기준 총 수입/목표금액
const progressWidth = computed(() => {
   return `${((totalInput.value / targetExpenses.value) * 100).toFixed(1)}%`;
});
//현재 월 기준 총 수입/목표금액
const progressValue = computed(() => {
  return parseFloat(((totalInput.value / targetExpenses.value) * 100).toFixed(1));
});

watch(() => budgetStore.transactions, () => {
  updateTotalInput();
  updateTargetExpenses();

}, { deep: true });

updateTotalInput();
//목표금액 변경 시 update
const updateTargetExpenses = () => {
  localStorage.setItem('targetExpenses', targetExpenses.value);
};

//바꾼 금액 저장해서 새로고침 해도 값 유지 가능하게 함
const savedTarget = localStorage.getItem('targetExpenses');
if (savedTarget !== null) {
  targetExpenses.value = parseFloat(savedTarget);
}
</script>
<style scoped>
.position-absolute {
  position: absolute;
}

.top-0 {
  top: 0;
}

.end-0 {
  right: 0;
}
</style>