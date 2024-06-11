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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in paginatedTransactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td :class="transaction.type === 'income' ? 'text-success' : 'text-danger'">{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.category }}</td>
              <td>{{ transaction.desc }}</td>
              <td><button class="btn btn-danger btn-sm" @click="deleteTransaction(transaction.id)">X</button></td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between mb-3">
          <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
        <form @submit.prevent="addNewTransaction" class="row g-3">
          <div class="col-md-2">
            <input v-model="newTransaction.date" type="date" class="form-control" placeholder="Date" required />
          </div>
          <div class="col-md-2">
            <select v-model="newTransaction.type" class="form-select" required>
              <option value="income">Income</option>
              <option value="outcome">Outcome</option>
            </select>
          </div>
          <div class="col-md-2">
            <input v-model="newTransaction.amount" type="number" class="form-control" placeholder="Amount" required />
          </div>
          <div class="col-md-3">
            <input v-model="newTransaction.category" class="form-control" placeholder="Category" required />
          </div>
          <div class="col-md-3">
            <input v-model="newTransaction.desc" class="form-control" placeholder="Description" required />
          </div>
          <div class="col-md-12">
            <button type="submit" class="btn btn-success">Add Transaction</button>
          </div>
        </form>
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
      const currentPage = ref(1)
      const itemsPerPage = 10
  
      const newTransaction = ref({
        date: '',
        type: 'income',
        amount: '',
        category: '',
        desc: ''
      })
  
      const totalPages = computed(() => {
        return Math.ceil(budgetStore.transactions.length / itemsPerPage)
      })
  
      const paginatedTransactions = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage
        const end = start + itemsPerPage
        return budgetStore.transactions.slice(start, end)
      })
  
      const addNewTransaction = async () => {
        await budgetStore.addTransaction(newTransaction.value)
        newTransaction.value = { date: '', type: 'income', amount: '', category: '', desc: '' }
      }
  
      const deleteTransaction = async (id) => {
        await budgetStore.deleteTransaction(id)
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
        addNewTransaction,
        deleteTransaction
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
  