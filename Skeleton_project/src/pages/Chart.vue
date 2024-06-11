<template>
  <div>
    <!-- Pie Chart -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Pie Chart</h6>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-8">
            <div class="chart-pie pt-4">
              <canvas id="myPieChart"></canvas>
            </div>
          </div>
          <div class="col-lg-4">
            <div id="pieChartLegend" class="mt-4"></div>
            <div id="totalAmount" class="mt-4">총 지출액: {{ totalAmount }}원</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bar Chart -->
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
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      chartData: [],
      totalAmount: 0,
      intervalId: null,
      myPieChart: null,
      myBarChart: null,
      currentMonth: this.getCurrentMonth() // Get the current month
    };
  },
  mounted() {
    this.fetchData();
    this.intervalId = setInterval(this.fetchData, 60000); // Polling interval: every 60 seconds
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // Clear the polling interval when component is destroyed
  },
  methods: {
    fetchData() {
      fetch('../db-server/db.json')
        .then(response => response.json())
        .then(data => {
          const outcomeData = data['budget-list'].filter(item => item.type === 'outcome');
          const categories = outcomeData.map(item => item.category);
          const amounts = outcomeData.map(item => parseFloat(item.amount));
          this.chartData = { categories, amounts };
          this.totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
          this.updatePieChart();
          this.updateBarChart(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    getCurrentMonth() {
      const date = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthNames[date.getMonth()];
    },
    updatePieChart() {
      // Update the pie chart with new data
      if (this.myPieChart) {
        this.myPieChart.destroy();
      }
      var ctxPie = document.getElementById("myPieChart");
      this.myPieChart = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: this.chartData.categories,
          datasets: [{
            data: this.chartData.amounts,
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

      // Display numbers beside the pie chart
      var pieChartLegend = document.getElementById("pieChartLegend");
      pieChartLegend.innerHTML = ''; // Clear previous legend items
      this.chartData.categories.forEach((category, index) => {
        const legendItem = document.createElement("div");
        const percentage = ((this.chartData.amounts[index] / this.totalAmount) * 100).toFixed(2);
        legendItem.innerHTML = `<span>${category}: ${this.chartData.amounts[index]} 원 (${percentage}%)</span>`;
        pieChartLegend.appendChild(legendItem);
      });
    },
    updateBarChart(data) {
      // Update the bar chart with new data
      if (this.myBarChart) {
        this.myBarChart.destroy();
      }
      const incomeData = data['budget-list'].filter(item => item.type === 'income');
      const outcomeData = data['budget-list'].filter(item => item.type === 'outcome');
      const weeklyIncome = [0, 0, 0, 0]; // Initialize array for 4 weeks
      const weeklyOutcome = [0, 0, 0, 0]; // Initialize array for 4 weeks
      const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

      // Distribute income amounts into 4 weeks (simple equal distribution as an example)
      incomeData.forEach((item, index) => {
        const weekIndex = index % 4; // Rotate index to simulate weekly distribution
        weeklyIncome[weekIndex] += parseFloat(item.amount);
      });

      // Distribute outcome amounts into 4 weeks (simple equal distribution as an example)
      outcomeData.forEach((item, index) => {
        const weekIndex = index % 4; // Rotate index to simulate weekly distribution
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
                max: Math.max(...weeklyIncome.concat(weeklyOutcome)) * 1.2, // Adjust the max value based on data
                maxTicksLimit: 5,
                padding: 10,
                callback: function(value, index, values) {
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

      // Display the total amount below each set of bars
      var barChartTotals = document.getElementById("barChartTotals");
      barChartTotals.innerHTML = ''; // Clear previous totals
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
