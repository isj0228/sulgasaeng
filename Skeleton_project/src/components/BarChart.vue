<template>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Bar Chart</h6>
      </div>
      <div class="card-body">
        <div id="monthLabel" class="text-center mb-4">{{ currentMonth }}</div>
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
        currentMonth: this.getCurrentMonth()
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const budgetStore = useBudgetStore();
        try {
          await budgetStore.getTransactions();
          this.updateBarChart(budgetStore.transactions);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      },
      getCurrentMonth() {
        const date = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[date.getMonth()];
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
  