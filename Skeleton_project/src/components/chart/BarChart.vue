<template>
  <div>
    <div class="month-selector">
      <select v-model="selectedMonth" @change="fetchData">
        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
      </select>
    </div>

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">한달 요약</h6>
      </div>
      <div class="card-body">
        <div id="monthLabel" class="text-center mb-4">{{ selectedMonth }}</div>
        <div class="text-center mb-4">월 총 금액: {{ totalMonthlyAmount.toLocaleString() }}원</div>
        <div class="chart-bar">
          <canvas id="myBarChart"></canvas>
        </div>
        <div id="barChartTotals" class="mt-4"></div>
      </div>
    </div>

    <!-- Existing 입금별 소비 and 출금별 소비 charts here -->
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
      myBarChart: null,
      totalMonthlyAmount: 0,
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

        this.updateBarChart(transactions);
        // Update the pie charts (assuming updatePieCharts method exists)
        this.updatePieCharts(transactions);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    },
    getMonthNames() {
      return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    },
    getMonthNameFromDate(date) {
      const monthNames = this.getMonthNames();
      return monthNames[new Date(date).getMonth()];
    },
    updateBarChart(data) {
      if (this.myBarChart) {
        this.myBarChart.destroy();
      }
      const incomeData = data.filter(item => item.type === '입금');
      const outcomeData = data.filter(item => item.type === '출금');
      const weeklyIncome = [0, 0, 0, 0];
      const weeklyOutcome = [0, 0, 0, 0];
      const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

      incomeData.forEach((item, index) => {
        const weekIndex = Math.floor((new Date(item.date).getDate() - 1) / 7);
        weeklyIncome[weekIndex] += parseFloat(item.amount);
      });

      outcomeData.forEach((item, index) => {
        const weekIndex = Math.floor((new Date(item.date).getDate() - 1) / 7);
        weeklyOutcome[weekIndex] += parseFloat(item.amount);
      });

      var ctxBar = document.getElementById("myBarChart");
      this.myBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: weekLabels,
          datasets: [
            {
              label: "입금",
              backgroundColor: "#4e73df",
              hoverBackgroundColor: "#2e59d9",
              borderColor: "#4e73df",
              data: weeklyIncome,
            },
            {
              label: "출금",
              backgroundColor: "#e74a3b",
              hoverBackgroundColor: "#d73a28",
              borderColor: "#e74a3b",
              data: weeklyOutcome,
            }
          ],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 25
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 4
              },
              maxBarThickness: 25,
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: Math.max(...weeklyIncome.concat(weeklyOutcome)) * 1.2,
                maxTicksLimit: 5,
                padding: 10,
                callback: function (value, index, values) {
                  return value.toLocaleString();
                }
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            display: true
          },
          tooltips: {
            enabled: true
          },
        }
      });

      var barChartTotals = document.getElementById("barChartTotals");
      barChartTotals.innerHTML = '';
      weekLabels.forEach((week, index) => {
        const totalAmount = weeklyIncome[index] - weeklyOutcome[index];
        const totalText = document.createElement("div");
        totalText.innerHTML = `<span>총 금액: ${totalAmount.toLocaleString()}원</span>`;
        totalText.style.textAlign = "center";
        barChartTotals.appendChild(totalText);
      });

      // Calculate and update totalMonthlyAmount
      this.totalMonthlyAmount = incomeData.reduce((acc, cur) => acc + parseFloat(cur.amount), 0) - outcomeData.reduce((acc, cur) => acc + parseFloat(cur.amount), 0);
    },
    updatePieCharts(transactions) {
      const depositData = transactions.filter(item => item.type === '입금');
      const withdrawalData = transactions.filter(item => item.type === '출금');
      
      this.depositChartData = this.processChartData(depositData);
      this.withdrawalChartData = this.processChartData(withdrawalData);
      
      this.totalDepositAmount = this.calculateTotalAmount(this.depositChartData);
      this.totalWithdrawalAmount = this.calculateTotalAmount(this.withdrawalChartData);
      
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
    processChartData(data) {
      const categories = data.map(item => item.category);
      const amounts = data.map(item => parseFloat(item.amount));
      return { categories, amounts };
    },
    calculateTotalAmount(chartData) {
      return chartData.amounts.reduce((acc, curr) => acc + curr, 0);
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

<style>
.chart-bar {
  position: relative;
}

#barChartTotals div {
  display: inline-block;
  width: 25%;
  text-align: center;
  margin-top: 10px;
}

#monthLabel {
  font-weight: bold;
  font-size: 1.2em;
}

.month-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.month-selector select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
