<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in recentTransactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.category }}</td>
              <td>{{ transaction.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted, computed } from 'vue'
  import { useBudgetStore } from '@/stores/budgetStore.js'
  
  export default defineComponent({
    setup() {
      const budgetStore = useBudgetStore()
      const loading = ref(true)
  
      // 최근 5개의 거래 내역을 계산하는 computed 속성
      const recentTransactions = computed(() => {
        return budgetStore.transactions.slice(-5).reverse()
      })
  
      // onMounted 훅 사용하여 컴포넌트가 DOM에 마운트된 후에 데이터를 가져옵니다.
      onMounted(async () => {
        try {
          await budgetStore.getTransactions() // 데이터 가져오기
        } finally {
          loading.value = false
        }
      })
  
      return {
        recentTransactions,
        loading
      }
    }
  })
  </script>
  
  <style>
  /* 간단한 스타일 */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f4f4f4;
    text-align: left;
  }
  </style>
  