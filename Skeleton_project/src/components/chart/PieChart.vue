<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="card-title mb-0 mt-1">카테고리별 소비</h6> <!-- 카테고리별 소비 제목 -->
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
          <div id="totalAmount" class="mt-4">총 지출액: {{ totalAmount }}원</div> <!-- 총 지출액 표시 -->
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
      chartData: [], // 차트 데이터 배열
      totalAmount: 0, // 총 지출액
      myPieChart: null, // 파이 차트 객체
    };
  },
  mounted() {
    this.fetchData(); // 데이터 가져오기
  },
  methods: {
    async fetchData() {
      const budgetStore = useBudgetStore();
      try {
        await budgetStore.getTransactions(); // 거래 내역 가져오기
        const outcomeData = budgetStore.transactions.filter(item => item.type === '출금'); // 출금 데이터 필터링
        
        // 카테고리별로 합산
        const categoryMap = new Map();
        outcomeData.forEach(item => {
          const category = item.category;
          const amount = parseFloat(item.amount);
          if (categoryMap.has(category)) {
            categoryMap.set(category, categoryMap.get(category) + amount);
          } else {
            categoryMap.set(category, amount);
          }
        });
        
        // 금액을 기준으로 카테고리 정렬 (내림차순)
        const sortedCategories = Array.from(categoryMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5); // 상위 5개 카테고리만 유지
        
        // 나머지 카테고리들의 금액 합산
        const otherAmount = Array.from(categoryMap)
          .sort((a, b) => b[1] - a[1])
          .slice(5)
          .reduce((acc, [, amount]) => acc + amount, 0);
        
        // 차트 데이터 준비
        const categories = sortedCategories.map(([category]) => category);
        const amounts = sortedCategories.map(([category]) => categoryMap.get(category));
        
        // 기타 카테고리 추가
        if (otherAmount > 0) {
          categories.push("기타");
          amounts.push(otherAmount);
        }
        
        this.chartData = { categories, amounts }; // 차트 데이터 설정
        this.totalAmount = amounts.reduce((acc, curr) => acc + curr, 0); // 총 지출액 계산
        
        // 파이 차트 업데이트
        this.updatePieChart();
      } catch (err) {
        console.error('데이터 가져오기 오류:', err);
      }
    },
    // 파이 차트 업데이트 메소드
    updatePieChart() {
      if (this.myPieChart) {
        this.myPieChart.destroy(); // 기존 차트 파괴
      }
      var ctxPie = document.getElementById("myPieChart");
      this.myPieChart = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: this.chartData.categories, // 차트 라벨
          datasets: [{
            data: this.chartData.amounts, // 차트 데이터
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

      var pieChartLegend = document.getElementById("pieChartLegend");
      pieChartLegend.innerHTML = ''; // 이전 범례 항목 지우기
      this.chartData.categories.forEach((category, index) => {
        const legendItem = document.createElement("div");
        const percentage = ((this.chartData.amounts[index] / this.totalAmount) * 100).toFixed(1); // 백분율 계산
        legendItem.innerHTML = `<span>${category}: ${this.chartData.amounts[index]} 원 (${percentage}%)</span>`;
        pieChartLegend.appendChild(legendItem); // 범례 항목 추가
      });
    }
  }
}
</script>
