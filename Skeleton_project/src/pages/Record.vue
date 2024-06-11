<template>
    <div>
      <h6>내역조회</h6>
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
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.type }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.category }}</td>
            <td>{{ transaction.desc }}</td>
            <td>
              <button @click="deleteTransaction(transaction.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
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
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue'
import { useBudgetStore } from '@/stores/budgetStore.js'  
  export default defineComponent({
    setup() {
      const budgetStore = useBudgetStore()
  
      const newTransaction = ref({
        date: '',
        type: 'income',
        amount: '',
        category: '',
        desc: ''
      })
  
      const addNewTransaction = () => {
        budgetStore.addTransaction(newTransaction.value)
        newTransaction.value = { date: '', type: 'income', amount: '', category: '', desc: '' }
      }
  
      return {
        transactions: budgetStore.transactions,
        newTransaction,
        addNewTransaction,
        deleteTransaction: budgetStore.deleteTransaction
      }
    },
    created() {
      const budgetStore = useBudgetStore()
      budgetStore.getTransactions()
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
  
