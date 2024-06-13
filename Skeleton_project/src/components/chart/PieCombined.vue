<template>
  <div>
    <div class="month-selector form-group row justify-content-center">
      <label for="selectMonth" class="col-sm-2 col-form-label">월 선택:</label>
      <div class="col-sm-4">
        <select id="selectMonth" class="form-control" v-model="selectedMonth" @change="fetchData">
          <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
        </select>
      </div>
    </div>

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">소득 분석</h6>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-8">
            <div class="chart-pie pt-4">
              <canvas id="depositPieChart"></canvas>
            </div>
          </div>
          <div class="col-lg-4">
            <div id="depositPieChartLegend" class="mt-4"></div>
            <div id="totalDepositAmount" class="mt-4">총 입금액: {{ totalDepositAmount }}원</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">소비 분석</h6>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-8">
            <div class="chart-pie pt-4">
              <canvas id="withdrawalPieChart"></canvas>
            </div>
          </div>
          <div class="col-lg-4">
            <div id="withdrawalPieChartLegend" class="mt-4"></div>
            <div id="totalWithdrawalAmount" class="mt-4">총 출금액: {{ totalWithdrawalAmount }}원</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import Chart from 'chart.js/auto';
import { useBudgetStore } from '@/stores/budgetStore';

export default {
  data() {
    return {
      selectedMonth: '',
      months: [],
      depositChartData: [],
      withdrawalChartData: [],
      totalDepositAmount: 0,
      totalWithdrawalAmount: 0,
      depositPieChart: null,
      withdrawalPieChart: null,
    };
  },
  async mounted() {
    await this.initializeData();
    this.fetchData();
  },
  methods: {
    async initializeData() {
      const budgetStore = useBudgetStore();
      await budgetStore.getTransactions();
      this.months = [...new Set(budgetStore.transactions.map(item => this.getMonthNameFromDate(item.date)))];
      if (this.months.length > 0) {
        this.selectedMonth = this.months[0];
      }
    },
    async fetchData() {
      const budgetStore = useBudgetStore();
      try {
        const transactions = budgetStore.transactions.filter(item => {
          const transactionMonth = this.getMonthNameFromDate(item.date);
          return transactionMonth === this.selectedMonth;
        });

        const depositData = transactions.filter(item => item.type === '입금');
        const withdrawalData = transactions.filter(item => item.type === '출금');
        
        this.depositChartData = this.processChartData(depositData);
        this.withdrawalChartData = this.processChartData(withdrawalData);
        
        this.totalDepositAmount = this.calculateTotalAmount(this.depositChartData);
        this.totalWithdrawalAmount = this.calculateTotalAmount(this.withdrawalChartData);
        
        this.updatePieCharts();
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    },
    getMonthNames() {
      return ["1월", "2월", "3월", "4월", "5월", "6월","7월","8월","9월", "10월","11월","12월"];
    },
    getMonthNameFromDate(date) {
      const monthNames = this.getMonthNames();
      return monthNames[new Date(date).getMonth()];
    },
    processChartData(data) {
      const result = data.reduce((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + parseFloat(amount);
      return acc;
    }, {});
    return {
      categories: Object.keys(result),
      amounts: Object.values(result),
  };
    },
    calculateTotalAmount(chartData) {
      return chartData.amounts.reduce((acc, curr) => acc + curr, 0);
    },
    updatePieCharts() {
      this.updatePieChart(
        "depositPieChart", 
        "depositPieChartLegend", 
        this.depositChartData, 
        this.totalDepositAmount
      );
      this.updatePieChart(
        "withdrawalPieChart", 
        "withdrawalPieChartLegend", 
        this.withdrawalChartData, 
        this.totalWithdrawalAmount
      );
    },
    updatePieChart(chartId, legendId, chartData, totalAmount) {
      if (this[chartId]) {
        this[chartId].destroy();
      }
      const ctxPie = document.getElementById(chartId);
      this[chartId] = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: chartData.categories,
          datasets: [{
            data: chartData.amounts,
            backgroundColor: ['#f6c23e', '#36b9cc', '#4e73df', '#1cc88a', '#6610f2', '#e74a3b'],
            hoverBackgroundColor: ['#f0c24e', '#2a96ad', '#375abd', '#17a673', '#5a1de1', '#d73a28'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          }],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            enabled: false
          },
          legend: {
            display: false
          },
          cutoutPercentage: 80,
        },
      });

      const pieChartLegend = document.getElementById(legendId);
      pieChartLegend.innerHTML = ''; // Clear previous legend items
      chartData.categories.forEach((category, index) => {
        const percentage = ((chartData.amounts[index] / totalAmount) * 100).toFixed(1);
        const legendItem = document.createElement("div");
        legendItem.innerHTML = `<span>${category}: ${chartData.amounts[index]} 원 (${percentage}%)</span>`;
        pieChartLegend.appendChild(legendItem);
      });
    }
  }
}
</script>

<style scoped>
.month-selector {
  margin-bottom: 20px;
}

#totalDepositAmount,
#totalWithdrawalAmount {
  font-weight: bold;
}
</style>
