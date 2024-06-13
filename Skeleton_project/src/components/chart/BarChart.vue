<template>
  <div class="card shadow mb-4">
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-lg-2">
          <select id="selectMonth" class="form-select" v-model="selectedMonth" @change="fetchData">
            <option v-for="(month, index) in months" :key="index" :value="month">{{ month }}</option>
          </select>
        </div>
      </div>

      <span class="card-title mb-0 mt-1 bg-gray-400 p-1">주별 요약</span>

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
      selectedMonth: '', // 선택된 월 초기화
      months: [], // 월 배열 초기화
      totalMonthlyAmount: 0, // 총 월 금액 초기화
      weekLabels: ["1주차", "2주차", "3주차", "4주차"], // 주차 레이블
    };
  },
  mounted() {
    this.initializeData(); // 컴포넌트가 마운트될 때 초기 데이터 설정
  },
  methods: {
    // 초기 데이터를 설정하는 함수
    async initializeData() {
      const budgetStore = useBudgetStore();
      await budgetStore.getTransactions(); // 트랜잭션 데이터를 불러옴
      // 트랜잭션에서 고유한 월 이름을 추출
      this.months = [...new Set(budgetStore.transactions.map(item => this.getMonthNameFromDate(item.date)))];
      // 기본 선택 월 설정
      if (this.months.length > 0) {
        this.selectedMonth = this.months[0];
      }
      // 기본 선택 월에 따라 초기 데이터 가져오기
      this.fetchData();
    },
    // 선택된 월에 따른 데이터를 가져오는 함수
    async fetchData() {
      const budgetStore = useBudgetStore();
      try {
        const transactions = budgetStore.transactions.filter(item => {
          const transactionMonth = this.getMonthNameFromDate(item.date);
          return transactionMonth === this.selectedMonth;
        });
        this.updateBarChart(transactions); // 막대 차트 업데이트
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    },
    // 월 이름 배열 반환
    getMonthNames() {
      return ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    },
    // 날짜로부터 월 이름을 추출
    getMonthNameFromDate(date) {
      const monthNames = this.getMonthNames();
      return monthNames[new Date(date).getMonth()];
    },
    // 막대 차트를 업데이트하는 함수
    updateBarChart(data) {
      if (this.myBarChart) {
        this.myBarChart.destroy(); // 기존 차트가 있으면 파괴
      }
      const incomeData = data.filter(item => item.type === '입금'); // 입금 데이터 필터링
      const outcomeData = data.filter(item => item.type === '출금'); // 출금 데이터 필터링
      const weeklyIncome = [0, 0, 0, 0]; // 주간 입금 초기화
      const weeklyOutcome = [0, 0, 0, 0]; // 주간 출금 초기화

      // 주간 입금 데이터 계산
      incomeData.forEach((item, index) => {
        const weekIndex = index % 4;
        weeklyIncome[weekIndex] += parseFloat(item.amount);
      });

      // 주간 출금 데이터 계산
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

      // 막대 차트 총 금액 표시 업데이트
      var barChartTotals = document.getElementById("barChartTotals");
      barChartTotals.innerHTML = '';
      this.weekLabels.forEach((week, index) => {
        const totalAmount = weeklyIncome[index] - weeklyOutcome[index];
        const totalText = document.createElement("div");
        totalText.innerHTML = `<span>총 금액: ${totalAmount.toLocaleString()}원</span>`;
        totalText.style.textAlign = "center";
        barChartTotals.appendChild(totalText);
      });

      // 총 월 금액 계산 및 업데이트
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
