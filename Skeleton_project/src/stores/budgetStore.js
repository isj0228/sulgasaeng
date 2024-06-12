import { defineStore } from 'pinia';
import axios from 'axios';

// JSON server URL 상수
const API_URL = 'http://localhost:3000/budget-list';

// 스토어 정의 export로 외부에서 사용 가능
export const useBudgetStore = defineStore('budgetStore', {
  state: () => ({
    transactions: [], // 모든 거래 내역을 배열로 받아 저장
    incomeCategories: [], // 수입 카테고리
    outcomeCategories: [] // 지출 카테고리
  }),
  actions: {
    // 거래 내역을 받아오는 비동기 메서드
    async getTransactions() {
      try {
        // axios.get을 통해 응답 객체를 받아온다.
        const response = await axios.get(API_URL);
        // 응답 객체의 데이터(거래 내역 배열)를 스토어의 state인 transactions에 받아온다
        this.transactions = response.data;
        // 거래 내역의 카테고리를 추출하는 함수 호출
        this.extractCategories();
      } catch (error) {
        // 에러 발생 시
        console.error('Failed to fetch transactions:', error);
      }
    },
    // 거래 내역을 추가하는 비동기 메서드
    async addTransaction(transaction) {
      try {
        // POST를 통해 URL에 입력받은 거래 내역을 추가하고 성공적으로 추가한 거래 내역을 반환한다.
        const response = await axios.post(API_URL, transaction);
        // 추가된 데이터를 상태에 반영
        this.transactions.push(response.data);
        // 추가로 인해 카테고리가 변경 가능하므로 다시 카테고리 추출
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
          // 수정으로 인해 카테고리가 바뀔 수 있으니 다시 호출
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
        // 변경되었으니 다시 호출
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
    }
  }
});