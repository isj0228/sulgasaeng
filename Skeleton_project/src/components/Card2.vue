<template>
  <div class="card border-left-info shadow h-100 py-2" @mouseover="showButton = true" @mouseleave="showButton = false">
    <div class="card-body">
      <div class="text-xs font-weight-bold text-info text-uppercase mb-1">지출 계획</div>
      <div class="text-center">
        <div class="d-flex align-items-center justify-content-between">
          <div class="col-auto">
            <i class="fas fa-calendar fa-2x text-gray-300"></i>
          </div>
          <div class="progress progress-lg flex-grow-1 mb-3" style="height: 10px;">
            <div class="progress-bar bg-info" role="progressbar" :style="{ width: progressWidth }" :aria-valuenow="progressValue" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div class="text-gray-800 mb-1">{{ progressValue }} %</div>
        <!-- Button to toggle input field -->
        <button v-show="showButton" class="btn btn-primary btn-sm position-absolute top-0 end-0 mt-2 me-2" @click="toggleInputField">수정</button>
        <!-- Input field for "목표 소비 금액" -->
        <div v-if="showInputField" class="input-group mb-3">
          <input type="number" class="form-control" v-model="targetExpenses" @change="updateTargetExpenses" placeholder="목표 소비 금액" aria-label="목표 소비 금액" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">원</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      expensesData: [],
      targetExpenses: 100000,
      showInputField: false, // Track whether to show the input field
      showButton: false, // Track whether to show the 수정 button
    };
  },
  computed: {
    totalExpenses() {
      const incomeExpenses = this.expensesData.filter(expense => expense.type === '입금');
      const outcomeExpenses = this.expensesData.filter(expense => expense.type === '출금');
      const totalIncome = incomeExpenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
      const totalOutcome = outcomeExpenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
      return totalIncome - totalOutcome; // Calculate the difference between income and outcome
    },
    progressWidth() {
      return `${(this.totalExpenses / this.targetExpenses) * 100}%`;
    },
    progressValue() {
      return (this.totalExpenses / this.targetExpenses) * 100;
    },
  },
  mounted() {
    this.fetchExpensesData();
  },
  methods: {
    async fetchExpensesData() {
      try {
        const response = await axios.get('../../db-server/db.json');
        this.expensesData = response.data['budget-list'];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    updateTargetExpenses() {
      // Optional: Add logic here to handle updating the goal amount
    },
    toggleInputField() {
      // Toggle the visibility of the input field
      this.showInputField = !this.showInputField;
    },
  },
};
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
