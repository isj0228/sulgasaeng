<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">주달 요약</h6>
    </div>
    <div class="card-body">
      <div class="form-group row justify-content-center">
        <label for="selectMonth" class="col-sm-2 col-form-label">월 선택:</label>
        <div class="col-sm-4">
          <select id="selectMonth" class="form-control" v-model="selectedMonth" @change="fetchData">
            <option v-for="(month, index) in months" :key="index" :value="month">{{ month }}</option>
          </select>
        </div>
      </div>
      
      <div class="text-center mb-4">{{ selectedMonth }} 총 금액: {{ totalMonthlyAmount.toLocaleString() }}원</div>
      
      <div class="chart-bar">
        <canvas id="myBarChart"></canvas>
      </div>
      
      <div id="barChartTotals" class="mt-4"></div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { useBudgetStore } from '@/stores/budgetStore';

export default {
  data() {
    return {
      myBarChart: null,
      selectedMonth: '', // Initialize selectedMonth
      months: [], // Initialize months array
      totalMonthlyAmount: 0, // Initialize totalMonthlyAmount
      weekLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    };
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      const budgetStore = useBudgetStore();
      await budgetStore.getTransactions();
      // Extract unique month names from transactions
      this.months = [...new Set(budgetStore.transactions.map(item => this.getMonthNameFromDate(item.date)))];
      // Set default selected month
      if (this.months.length > 0) {
        this.selectedMonth = this.months[0];
      }
      // Fetch initial data based on default selected month
      this.fetchData();
    },
    async fetchData() {
      const budgetStore = useBudgetStore();
      try {
        const transactions = budgetStore.transactions.filter(item => {
          const transactionMonth = this.getMonthNameFromDate(item.date);
          return transactionMonth === this.selectedMonth;
        });
        this.updateBarChart(transactions);
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
    updateBarChart(data) {
      if (this.myBarChart) {
        this.myBarChart.destroy();
      }
      const incomeData = data.filter(item => item.type === '입금');
      const outcomeData = data.filter(item => item.type === '출금');
      const weeklyIncome = [0, 0, 0, 0];
      const weeklyOutcome = [0, 0, 0, 0];

      incomeData.forEach((item, index) => {
        const weekIndex = index % 4;
        weeklyIncome[weekIndex] += parseFloat(item.amount);
      });

      outcomeData.forEach((item, index) => {
        const weekIndex = index % 4;
        weeklyOutcome[weekIndex] += parseFloat(item.amount);
      });

      var ctxBar = document.getElementById("myBarChart");
      this.myBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: this.weekLabels,
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
      this.weekLabels.forEach((week, index) => {
        const totalAmount = weeklyIncome[index] - weeklyOutcome[index];
        const totalText = document.createElement("div");
        totalText.innerHTML = `<span>총 금액: ${totalAmount.toLocaleString()}원</span>`;
        totalText.style.textAlign = "center";
        barChartTotals.appendChild(totalText);
      });

      // Calculate and update totalMonthlyAmount
      this.totalMonthlyAmount = incomeData.reduce((acc, cur) => acc + parseFloat(cur.amount), 0) - outcomeData.reduce((acc, cur) => acc + parseFloat(cur.amount), 0);
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
</style>
