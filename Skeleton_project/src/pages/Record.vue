<template>
  <div>
    <div class="row mb-3 pt-3 align-items-center">
      <div class="col-8">
        <h3 class="mb-0 fw-bold text-dark">내역조회</h3>
      </div>
      <div class="col-4">
        <select v-model="selectedCategory" @change="filterByCategory" class="form-select">
          <option value="">모두 보기</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mb-3 mx-0 w-100">
      <form @submit.prevent="addNewTransaction" class="row">
        <div class="col-md-2">
          <input v-model="newTransaction.date" type="date" class="form-control" placeholder="Date" required />
        </div>
        <div class="col-md-2">
          <select v-model="newTransaction.type" class="form-select col" required>
            <option value="입금">입금</option>
            <option value="출금">출금</option>
          </select>
        </div>
        <div class="col-md-2">
          <input v-model="newTransaction.amount" type="number" class="form-control" placeholder="금액" required />
        </div>

        <div class="col-md-2">
          <select v-model="selectedCategory" class="form-select col" id="category" required
            @change="handleCategoryChange">
            <option disabled value="">카테고리</option>
            <option v-for="category in currentCategories" :key="category" :value="category">
              {{ category }}
            </option>
            <option value="add-new">추가..</option>
          </select>
          <div v-if="selectedCategory === 'add-new'" class="form-group mt-2">
            <input v-model="newCategory" class="form-control" placeholder="Enter new category" required />
          </div>
        </div>

        <div class="col-md-3">
          <input v-model="newTransaction.desc" class="form-control" placeholder="내용" required />
        </div>
        <div class="col-md-1">
          <button type="submit" class="btn btn-success w-100 add-button">
            내역 추가
          </button>
        </div>
      </form>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <!-- 테이블 -->
      <table class="table table-hover bg-white">
        <thead>
          <tr>
            <th @click="sortTable('date')">날짜</th>
            <th @click="sortTable('type')">분류</th>
            <th @click="sortTable('amount')">금액</th>
            <th @click="sortTable('category')">카테고리</th>
            <th @click="sortTable('desc')">내용</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in paginatedTransactions" :key="transaction.id"
            @click="selectTransaction(transaction)">
            <td class="td-date">{{ transaction.date }}</td>
            <td class="td-type" :class="transaction.type === '입금' ? 'text-success' : 'text-danger'">{{ transaction.type
              }}</td>
            <td class="td-amount">{{ transaction.amount }}</td>
            <td class="td-category">{{ transaction.category }}</td>
            <td class="td-desc">{{ transaction.desc }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 페이지 네비게이션 -->
      <div class="d-flex justify-content-between mb-3">
        <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">이전</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">다음</button>
      </div>

      <!-- 새로운 내역 추가 폼 -->

    </div>

    <!-- 모달 컴포넌트 사용 -->
    <TransactionModal :transaction="selectedTransaction" :incomeCategories="incomeCategories"
      :outcomeCategories="outcomeCategories" @delete-transaction="deleteTransactionFromModal"
      @update-transaction="updateTransaction" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useBudgetStore } from '@/stores/budgetStore.js'
import TransactionModal from '@/components/TransactionModal.vue'

export default defineComponent({
  components: {
    TransactionModal
  },
  setup() {
    const budgetStore = useBudgetStore()
    const loading = ref(true)
    const currentPage = ref(1)
    const itemsPerPage = 10
    const selectedTransaction = ref({})
    const newTransaction = ref({
      date: '',
      type: '입금',
      amount: '',
      category: '',
      desc: ''
    })
    const selectedCategory = ref('')
    const newCategory = ref('')
    const sortKey = ref('date')  // 기본 정렬 키를 'date'로 설정
    const sortOrder = ref('desc') // 기본 정렬 순서를 'desc'로 설정 (최신 순)
    const categories = computed(() => budgetStore.categories)
    const incomeCategories = computed(() => budgetStore.incomeCategories)
    const outcomeCategories = computed(() => budgetStore.outcomeCategories)

    const totalPages = computed(() => {
      return Math.ceil(budgetStore.filteredTransactions.length / itemsPerPage)
    })

    const sortedTransactions = computed(() => {
      let sorted = [...budgetStore.filteredTransactions]
      if (sortKey.value) {
        sorted.sort((a, b) => {
          let result = 0
          if (a[sortKey.value] > b[sortKey.value]) {
            result = 1
          } else if (a[sortKey.value] < b[sortKey.value]) {
            result = -1
          }
          return sortOrder.value === 'asc' ? result : -result
        })
      }
      return sorted
    })

    const paginatedTransactions = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return sortedTransactions.value.slice(start, end)
    })

    const addNewTransaction = async () => {
      if (selectedCategory.value === 'add-new') {
        newTransaction.value.category = newCategory.value
      } else {
        newTransaction.value.category = selectedCategory.value
      }
      await budgetStore.addTransaction(newTransaction.value)
      newTransaction.value = { date: '', type: '입금', amount: '', category: '', desc: '' }
      selectedCategory.value = ''
      newCategory.value = ''
    }

    const deleteTransaction = async (id) => {
      await budgetStore.deleteTransaction(id)
    }

    const deleteTransactionFromModal = async (id) => {
      await deleteTransaction(id)
      const modal = bootstrap.Modal.getInstance(document.getElementById('transactionModal'))
      if (modal) {
        modal.hide()
      }
    }

    const updateTransaction = async (updatedTransaction) => {
      await budgetStore.updateTransaction(updatedTransaction.id, updatedTransaction)
      const modal = bootstrap.Modal.getInstance(document.getElementById('transactionModal'))
      if (modal) {
        modal.hide()
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1
      }
    }

    const selectTransaction = (transaction) => {
      selectedTransaction.value = { ...transaction }
      const modal = new bootstrap.Modal(document.getElementById('transactionModal'))
      modal.show()
    }

    const handleCategoryChange = () => {
      if (selectedCategory.value !== 'add-new') {
        newTransaction.value.category = selectedCategory.value
      }
    }

    const filterByCategory = () => {
      budgetStore.filterByCategory(selectedCategory.value)
      currentPage.value = 1 // 필터링 후 첫 페이지로 이동
    }

    const sortTable = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortKey.value = key
        sortOrder.value = 'asc'
      }
    }

    const currentCategories = computed(() => {
      return newTransaction.value.type === '입금' ? incomeCategories.value : outcomeCategories.value
    })

    onMounted(async () => {
      try {
        await budgetStore.getTransactions()
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      paginatedTransactions,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      newTransaction,
      selectedCategory,
      newCategory,
      addNewTransaction,
      deleteTransaction,
      selectedTransaction,
      selectTransaction,
      deleteTransactionFromModal,
      updateTransaction,
      incomeCategories,
      outcomeCategories,
      handleCategoryChange,
      currentCategories,
      filterByCategory,
      sortTable,
      sortedTransactions,
      sortKey,
      sortOrder,
      categories,
    }
  }
})
</script>

<style>
.table {
  table-layout: fixed;
  width: 100%;
  background-color: white;
}

.td-date {
  width: 15%;
}

.td-type {
  width: 15%;
}

.td-amount {
  width: 20%;
}

.td-category {
  width: 20%;
}

.td-desc {
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.add-button {
  /* 텍스트가 넘칠 경우 생략 부호 적용 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>