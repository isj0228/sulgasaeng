<template>
    <div>
      <h1>내역조회</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <table class="table table-striped">
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
            <!-- 각 row는 클릭 시 해당하는 내역의 모달창이 열린다. -->
            <tr v-for="transaction in paginatedTransactions" :key="transaction.id" @click="selectTransaction(transaction)">
              <td>{{ transaction.date }}</td>
              <!-- income 초록색 outcome 빨간색으로 표시한다. -->
              <td :class="transaction.type === 'income' ? 'text-success' : 'text-danger'">{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.category }}</td>
              <td>{{ transaction.desc }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 테이블의 page를 구현하는 파트-->
        <!-- div를 flex로 만들고 justify-content-between 간격 비슷하게 -->
        <div class="d-flex justify-content-between mb-3">
          <!-- 이전 페이지 버튼 현재페이지가 1일경우 버튼 비활성화 -->
          <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <!-- 다음 페이지 버튼 현재페이지가 전체페이지와 같을경우 즉 마지막페이지일경우 버튼 비활성화 -->
          <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
  
        <!-- 새로운 내역을 추가하는 파트 -->
        <form @submit.prevent="addNewTransaction" class="row g-3">
          <div class="col-md-2">
            <input v-model="newTransaction.date" type="date" class="form-control" placeholder="Date" required />
          </div>
          <div class="col-md-2">
            <select v-model="newTransaction.type" class="form-select col" required>
              <option value="income">Income</option>
              <option value="outcome">Outcome</option>
            </select>
          </div>
          <div class="col-md-2">
            <input v-model="newTransaction.amount" type="number" class="form-control" placeholder="Amount" required />
          </div>
  
          <div class="col-md-2">
            <select v-model="selectedCategory" class="form-select col" id="category" required @change="handleCategoryChange">
              <option disabled value="">Select a category</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
              <option value="add-new">추가..</option>
            </select>
            <div v-if="selectedCategory === 'add-new'" class="form-group mt-2">
              <input v-model="newCategory" class="form-control" placeholder="Enter new category" required />
            </div>
          </div>
  
          <div class="col-md-3">
            <input v-model="newTransaction.desc" class="form-control" placeholder="Description" required />
          </div>
          <div class="col-md-1">
            <button type="submit" class="btn btn-success w-100">추가</button>
          </div>
        </form>
      </div>
  
      <!-- 모달 컴포넌트 사용 -->
      <TransactionModal :transaction="selectedTransaction" :categories="categories" @delete-transaction="deleteTransactionFromModal" @update-transaction="updateTransaction" />
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
      //카테고리가 변경되면 바로 반응하게 computed를 사용
      const categories = computed(() => budgetStore.categories)
      const newTransaction = ref({
        date: '',
        type: 'income',
        amount: '',
        category: '',
        desc: ''
      })
      const selectedCategory = ref('')
      const newCategory = ref('')
  
      const totalPages = computed(() => {
        return Math.ceil(budgetStore.transactions.length / itemsPerPage)
      })
  
      const paginatedTransactions = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage
        const end = start + itemsPerPage
        return budgetStore.transactions.slice(start, end)
      })
  
      const addNewTransaction = async () => {
        if (selectedCategory.value === 'add-new') {
          newTransaction.value.category = newCategory.value
        } else {
          newTransaction.value.category = selectedCategory.value
        }
        await budgetStore.addTransaction(newTransaction.value)
        newTransaction.value = { date: '', type: 'income', amount: '', category: '', desc: '' }
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
        selectedTransaction.value = { ...transaction } // Deep copy to avoid direct mutation
        const modal = new bootstrap.Modal(document.getElementById('transactionModal'))
        modal.show()
      }
  
      const handleCategoryChange = () => {
        if (selectedCategory.value !== 'add-new') {
          newTransaction.value.category = selectedCategory.value
        }
      }
  
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
        categories,
        handleCategoryChange
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
  
  form {
    margin-bottom: 20px;
  }
  
  form input, form select {
    padding: 5px;
  }
  
  form button {
    padding: 5px 10px;
  }
  </style>
  