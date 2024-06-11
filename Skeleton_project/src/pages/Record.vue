<template>
    <div>
      <h1>내역조회</h1>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in paginatedTransactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.category }}</td>
              <td>{{ transaction.desc }}</td>
              <td><button @click="deleteTransaction(transaction.id)">Delete</button></td>
            </tr>
          </tbody>
        </table>
        <div>
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
        <form @submit.prevent="addNewTransaction">
        <input v-model="newTransaction.date" type="date" placeholder="Date" required />
        <select v-model="newTransaction.type" required>
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>
        <input v-model="newTransaction.amount" type="number" placeholder="Amount" required />
        <input v-model="newTransaction.category" placeholder="Category" required />
        <input v-model="newTransaction.desc" placeholder="Description" required />
        <button type="submit">Add Transaction</button>
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
        newTransaction.value = { date: '', type: '', amount: '', category: '', desc: '' }
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
  
  form input {
    margin-right: 10px;
    padding: 5px;
  }
  
  form button {
    padding: 5px 10px;
  }
  </style>
  
