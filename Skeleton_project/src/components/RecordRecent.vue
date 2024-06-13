<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else class="table-responsive-sm">
      <table class="table" @click="navigateToRecord">
        <thead>
          <tr>
            <th>날짜</th>
            <th>금액</th>
            <th>카테고리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in recentTransactions" :key="transaction.id" >
            <td>{{ transaction.date }}</td>
            <td v-if="transaction.type === '입금'" class="text-success"><i class="fa-solid fa-circle-plus me-3"></i>{{ transaction.amount }}</td>
            <td v-else class="text-danger"><i class="fa-solid fa-square-minus me-3"></i>{{ transaction.amount }}</td>
            <td><span class="badge bg-secondary text-light">{{ transaction.category }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useBudgetStore } from '@/stores/budgetStore.js';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const budgetStore = useBudgetStore();
    const loading = ref(true);
    const router = useRouter();

    // 최근 5개의 거래 내역을 계산하는 computed 속성
    const recentTransactions = computed(() => {
      // 날짜 기준으로 내림차순 정렬
      const sortedTransactions = [...budgetStore.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
      return sortedTransactions.slice(0, 5);
    });

    // 특정 라우터로 이동하는 함수
    const navigateToRecord = () => {
      router.push({ path: `/record` });
    };

    // onMounted 훅 사용하여 컴포넌트가 DOM에 마운트된 후에 데이터를 가져옵니다.
    onMounted(async () => {
      try {
        await budgetStore.getTransactions(); // 데이터 가져오기
      } finally {
        loading.value = false;
      }
    });

    return {
      recentTransactions,
      loading,
      navigateToRecord
    };
  }
});
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

tr {
  cursor: pointer;
}
</style>
