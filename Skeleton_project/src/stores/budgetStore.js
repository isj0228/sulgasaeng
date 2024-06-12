import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:3000/budget-list';

export const useBudgetStore = defineStore('budgetStore', {
  state: () => ({
    transactions: [],
    incomeCategories: [],
    outcomeCategories: [],
    categories: [],
    filteredTransactions: []
  }),
  actions: {
    async getTransactions() {
      try {
        console.log("호출!!")
        const response = await axios.get(API_URL);
        this.transactions = response.data;
        this.filteredTransactions = [...this.transactions]; // 초기값 설정
        this.extractCategories();
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    },
    async addTransaction(transaction) {
      try {
        const response = await axios.post(API_URL, transaction);
        this.transactions.push(response.data);
        this.filteredTransactions = [...this.transactions]; // 데이터 추가 시 필터링 초기화
        this.extractCategories();
      } catch (error) {
        console.error('Failed to add transaction:', error);
      }
    },
    async updateTransaction(id, updatedTransaction) {
      try {
        const response = await axios.put(`${API_URL}/${id}`, updatedTransaction);
        const index = this.transactions.findIndex(transaction => transaction.id === id);
        if (index !== -1) {
          this.transactions[index] = response.data;
          this.filteredTransactions = [...this.transactions]; // 데이터 수정 시 필터링 초기화
          this.extractCategories();
        }
      } catch (error) {
        console.error('Failed to update transaction:', error);
      }
    },
    async deleteTransaction(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.transactions = this.transactions.filter(transaction => transaction.id !== id);
        this.filteredTransactions = [...this.transactions]; // 데이터 삭제 시 필터링 초기화
        this.extractCategories();
      } catch (error) {
        console.error('Failed to delete transactions:', error);
      }
    },
    extractCategories() {
      const categoriesSet = new Set(this.transactions.map(transaction => transaction.category));
      this.categories = Array.from(categoriesSet);
      const incomeSet = new Set(this.transactions.filter(t => t.type === '입금').map(t => t.category));
      const outcomeSet = new Set(this.transactions.filter(t => t.type === '출금').map(t => t.category));
      this.incomeCategories = Array.from(incomeSet);
      this.outcomeCategories = Array.from(outcomeSet);
    },
    filterByCategory(category) {
      if (category) {
        this.filteredTransactions = this.transactions.filter(t => t.category === category);
      } else {
        this.filteredTransactions = [...this.transactions];
      }
    }
  }
});
