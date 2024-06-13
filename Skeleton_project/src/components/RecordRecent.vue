<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <table class="table" @click="navigateToRecord">
        <thead>
          <tr>
            <th>날짜</th>
            <!-- <th>입/출금</th> -->
            <th>금액</th>
            <th>카테고리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in recentTransactions" :key="transaction.id">
            <td>{{ transaction.date }}</td>
            <!-- <td :class="transaction.type === '입금' ? 'text-success' : 'text-danger'">{{ transaction.type }}</td> -->
            <td v-if="transaction.type === '입금'" class="text-success"><i class="fa-solid fa-circle-plus me-3"></i>{{ transaction.amount }}</td>
            <td v-else class="text-danger"><i class="fa-solid fa-square-minus me-3"></i>{{ transaction.amount }}</td>
            <!-- <td>{{ transaction.amount }}</td> -->
            <td><span class="badge bg-secondary text-light">{{ transaction.category }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useBudgetStore } from '@/stores/budgetStore.js'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const budgetStore = useBudgetStore()
    const loading = ref(true)
    const router = useRouter()

    // 최근 5개의 거래 내역을 계산하는 computed 속성
    const recentTransactions = computed(() => {
      return budgetStore.transactions.slice(-5).reverse()
    })

    // 특정 라우터로 이동하는 함수
    const navigateToRecord = () => {
      router.push({ path: '/record' })
    }

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
      loading,
      navigateToRecord
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

th,
td {
  padding: 8px;
}

th {
  background-color: #f4f4f4;
  text-align: left;
}
</style>