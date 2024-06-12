<template>
    <div class="card border-left-info shadow h-100 py-2">
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
      };
    },
    computed: {
      totalExpenses() {
        const outcomeExpenses = this.expensesData.filter(expense => expense.type === 'outcome');
        return outcomeExpenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
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
    },
  };
  </script>
  
