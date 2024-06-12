import { defineStore } from 'pinia';
import axios from 'axios';

// JSON server URL 상수
const API_URL = 'http://localhost:3000/budget-list';

// 스토어 정의 export로 외부에서 사용 가능
export const useBudgetStore = defineStore('budgetStore', {

  state: () => ({
    transactions: [], // 모든 거래 내역을 배열로 받아 저장
    incomeCategories: [], // 수입 카테고리
    outcomeCategories: [], // 지출 카테고리
    filteredTransactions: [] // 필터링된 거래 내역
  }),
  actions: {
    // 거래 내역을 받아오는 비동기 메서드
    async getTransactions() {
      try {
        console.log("호출!!")
        const response = await axios.get(API_URL);
        this.transactions = response.data;
        this.filteredTransactions = this.transactions; // 초기값 설정
        this.extractCategories();
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    },
    // 거래 내역을 추가하는 비동기 메서드
    async addTransaction(transaction) {
      try {
        const response = await axios.post(API_URL, transaction);
        this.transactions.push(response.data);
        this.filteredTransactions = this.transactions; // 데이터 추가 시 필터링 초기화
        this.extractCategories();
      } catch (error) {
        console.error('Failed to add transaction:', error);
      }
    },
    // 거래 내역을 수정하는 비동기 메서드
    async updateTransaction(id, updatedTransaction) {
      try {
        const response = await axios.put(`${API_URL}/${id}`, updatedTransaction);
        const index = this.transactions.findIndex(transaction => transaction.id === id);
        if (index !== -1) {
          this.transactions[index] = response.data;
          this.filteredTransactions = this.transactions; // 데이터 수정 시 필터링 초기화
          this.extractCategories();
        }
      } catch (error) {
        console.error('Failed to update transaction:', error);
      }
    },
    // 거래 내역을 삭제하는 비동기 메서드
    async deleteTransaction(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.transactions = this.transactions.filter(transaction => transaction.id !== id);
        this.filteredTransactions = this.transactions; // 데이터 삭제 시 필터링 초기화
        this.extractCategories();
      } catch (error) {
        console.error('Failed to delete transactions:', error);
      }
    },
    // 거래 내역에서 카테고리를 추출하는 메서드
    extractCategories() {
      const incomeSet = new Set(this.transactions.filter(t => t.type === '입금').map(t => t.category));
      const outcomeSet = new Set(this.transactions.filter(t => t.type === '출금').map(t => t.category));
      this.incomeCategories = Array.from(incomeSet);
      this.outcomeCategories = Array.from(outcomeSet);
    },
    // 카테고리별 거래 내역을 필터링하는 메서드
    filterByCategory(category) {
      if (category) {
        this.filteredTransactions = this.transactions.filter(t => t.category === category);
      } else {
        this.filteredTransactions = this.transactions;
      }
    }
  }
});
