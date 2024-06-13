<template>
  <div class="card border-left-info shadow h-100 py-2" @mouseover="showButton = true" @mouseleave="showButton = false">
    <div class="card-body">
      <div class="row no-gutters align-items-center">
        <div class="col mr-2">
          <div class="font-weight-bold text-info text-uppercase mb-1">{{ month }}월 지출 계획</div>
          <div class="row no-gutters align-items-center">
            <div class="col-auto">
              <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ progressValue }}%</div>
            </div>
            <div class="col">
              <div class="progress progress-sm mr-2">
                <div class="progress-bar bg-info" role="progressbar" :style="{ width: progressWidth }"
                  :aria-valuenow="progressValue" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <i class="fa-regular fa-credit-card fa-2x text-gray-300"></i>
        </div>
      </div>
      <button v-show="showButton" class="btn btn-primary btn-sm position-absolute top-0 end-0 mt-2 me-2"
        @click="toggleInputField">수정</button>
      <!-- Input field for "목표 소비 금액" -->
      <div v-if="showInputField" class="input-group mb-3">
        <input type="number" class="form-control" v-model="targetExpenses" @change="updateTargetExpenses"
          placeholder="목표 소비 금액" aria-label="목표 소비 금액" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">원</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useBudgetStore } from '@/stores/budgetStore.js';

const budgetStore = useBudgetStore();
const expensesData = ref([]);
const targetExpenses = ref(100000);
const showInputField = ref(false);
const showButton = ref(false);

const month = new Date().getMonth() + 1;

// Function to fetch expenses data from JSON server
const fetchExpensesData = async () => {
  try {
    const response = await axios.get('../../db-server/db.json');
    expensesData.value = response.data['budget-list'];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Compute total outcome for the current month based on fetched expenses data
const computeTotalOutcome = () => {
  const currentMonthExpenses = expensesData.value.filter(expense => {
    const expenseDate = new Date(expense.date); // assuming expense.date is in a standard format
    return expenseDate.getMonth() + 1 === month && expense.type === '출금';
  });
  return currentMonthExpenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
};

// Compute progress width and value based on total outcome and target expenses
const progressWidth = computed(() => {
  return `${((computeTotalOutcome() / targetExpenses.value) * 100).toFixed(1)}%`;
});

const progressValue = computed(() => {
  return parseFloat(((computeTotalOutcome() / targetExpenses.value) * 100).toFixed(1));
});

// Watch for changes in budgetStore.transactions and update expenses data accordingly
watch(() => budgetStore.transactions, async () => {
  try {
    const response = await axios.get('../../db-server/db.json');
    expensesData.value = response.data['budget-list'];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}, { deep: true });

const toggleInputField = () => {
  showInputField.value = !showInputField.value;
};

const updateTargetExpenses = () => {
  localStorage.setItem('targetExpenses', targetExpenses.value);
};

// On component mount, fetch initial expenses data
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
