<template>
  <!-- 카드 컴포넌트 시작 -->
  <div class="card border-left-info shadow h-100 py-2" @mouseover="showButton = true" @mouseleave="showButton = false">
    <div class="card-body">
      <div class="row no-gutters align-items-center">
        <div class="col mr-2">
          <!-- 현재 월과 계획 제목 표시 -->
          <div class="font-weight-bold text-info text-uppercase mb-1">{{ month }}월 지출 계획</div>
          <div class="row no-gutters align-items-center">
            <div class="col-auto">
              <!-- 진행률 값을 퍼센트로 표시 -->
              <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ progressValue }}%</div>
            </div>
            <div class="col">
              <div class="progress progress-sm mr-2">
                <!-- 동적인 너비를 가진 진행률 표시줄 -->
                <div class="progress-bar bg-info" role="progressbar" :style="{ width: progressWidth }"
                  :aria-valuenow="progressValue" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <!-- 아이콘 표시 -->
          <i class="fa-regular fa-credit-card fa-2x text-gray-300"></i>
        </div>
      </div>
      <!-- 수정 버튼 및 목표 소비 금액 입력 필드 표시 -->
      <button v-show="showButton" class="btn btn-primary btn-sm position-absolute top-0 end-0 mt-2 me-2"
        @click="toggleInputField">수정</button>
      <!-- "목표 소비 금액" 입력 필드 -->
      <div v-if="showInputField" class="input-group mb-3">
        <input type="number" class="form-control" v-model="targetExpenses" @change="updateTargetExpenses"
          placeholder="목표 소비 금액" aria-label="목표 소비 금액" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">원</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 카드 컴포넌트 종료 -->
</template>

<script setup>
// Vue 및 다른 필요한 모듈 및 함수 가져오기
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useBudgetStore } from '@/stores/budgetStore.js';

// 반응형 데이터 속성에 대한 참조 생성
const budgetStore = useBudgetStore();
const expensesData = ref([]);
const targetExpenses = ref(parseInt(localStorage.getItem('targetExpenses')) || 100000); // 로컬 저장소에서 초기화
const showInputField = ref(false);
const showButton = ref(false);

// 현재 월 가져오기
const month = new Date().getMonth() + 1;

// JSON 서버에서 지출 데이터를 가져오는 함수
const fetchExpensesData = async () => {
  try {
    const response = await axios.get('../../db-server/db.json');
    expensesData.value = response.data['budget-list'];
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
  }
};

// 가져온 지출 데이터를 기반으로 현재 월의 총 지출 계산
const computeTotalOutcome = () => {
  // 현재 월의 지출 필터링 및 합산
  const currentMonthExpenses = expensesData.value.filter(expense => {
    const expenseDate = new Date(expense.date); // expense.date가 표준 형식이라고 가정
    return expenseDate.getMonth() + 1 === month && expense.type === '출금';
  });
  return currentMonthExpenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
};

// 진행률 막대의 너비와 값 계산
const progressWidth = computed(() => {
  return `${((computeTotalOutcome() / targetExpenses.value) * 100).toFixed(1)}%`;
});

const progressValue = computed(() => {
  return parseFloat(((computeTotalOutcome() / targetExpenses.value) * 100).toFixed(1));
});

// budgetStore.transactions의 변경을 감지하고 지출 데이터를 업데이트
watch(() => budgetStore.transactions, async () => {
  try {
    const response = await axios.get('../../db-server/db.json');
    expensesData.value = response.data['budget-list'];
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
  }
}, { deep: true });

// 입력 필드 토글 함수
const toggleInputField = () => {
  showInputField.value = !showInputField.value;
};

// 목표 지출 업데이트 함수
const updateTargetExpenses = () => {
  localStorage.setItem('targetExpenses', targetExpenses.value.toString());
};

// 컴포넌트가 마운트될 때 초기 지출 데이터 가져오기
onMounted(fetchExpensesData);

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