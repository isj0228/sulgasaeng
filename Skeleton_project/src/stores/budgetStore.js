import { defineStore } from 'pinia';
import axios from 'axios';

//json server url 상수
const API_URL = 'http://localhost:3000/budget-list';

//스토어 정의 export로 외부에서 사용가능
export const useBudgetStore = defineStore('budgetStore', {
  state: () => ({
    transactions: [],//모든 거래 내역을 배열로 받아 저장
    categories: []//거래 내역의 카테고리를 받아 저장
  }),
  actions: {
    //거래내역을 받아오는 비동기 메서드
    async getTransactions() {   
      try {
        //axios.get을 통해 응답객체를 받아온다.
        const response = await axios.get(API_URL);
        //응답객체의 데이터(거래내역 배열)를 스토어의 state인 transactions에 받아온다
        this.transactions = response.data;
        //거래내역의 카테고리를 셋으로 받아 중복제거 후 배열로 변환 후 categories에 할당하는 함수 호출
        this.extractCategories();
      } catch (error) {
        //에러 발생 시
        console.error('Failed to fetch transactions:', error);
      }
    },
    /*  거래내역을 추가하는 비동기 메서드
    *   @param {Object} transaction -> 추가할 거래 객체를 input으로
    */
    async addTransaction(transaction) {
      try {
        //post를 통해 url에 입력받은 거래내역을 추가하고 성공적으로 추가한 거래내역을 반환한다.
        const response = await axios.post(API_URL, transaction);
        //이렇게 추가하면 서버측에만 데이터가 추가됨
        //이미 클라이언트에서 받아 놓은 상태에서 클라-서버간 데이터 일관성을 위해 추가된 데이터를
        //추가해주는 작업
        this.transactions.push(response.data);     
        //추가로 인해 카테고리가 변경가능하므로 다시 카테고리 추출
        this.extractCategories();
      } catch (error) {
        console.error('Failed to add transaction:', error);
      }
    },
    /* 거래내역 id를 통해 해당 거래내역을 updated Transaction으로 수정하는 비동기 메서드
    * @param {number} id
    * @param {updatedTransaction} Object
    */ 
    async updateTransaction(id, updatedTransaction) {
      try {
        /*/ axios.put 이용 해당 url의 id를 통해 해당 거래내역에 접근하고 
        변경사항을 적용한 후 해당 거래내역 응답객체로 리턴*/
        const response = await axios.put(`${API_URL}/${id}`, updatedTransaction);
        //state의 거래내역 배열에서 입력받은 id를 가진 거래내역을 찾아 인덱스를 저장한다.
        const index = this.transactions.findIndex(transaction => transaction.id === id);
        //거래내역 배열에 해당 인덱스에 서버에 수정된 거래내역으로 변경해준다.
        if (index !== -1) {
          this.transactions[index] = response.data;
          //수정으로 인해 카테고리가 바뀔 수 있으니 다시 호출
          this.extractCategories();
        }
      } catch (error) {
        console.error('Failed to update transaction:', error);
      }
    },
    //id를 입력 받아 해당 거래내역을 삭제해주는 비동기 메서드
    // @param {number} id
    async deleteTransaction(id) {
      try {
        //url에 id를 합쳐 해당 거래내역 접근하여 삭제
        await axios.delete(`${API_URL}/${id}`);
        //삭제된 거래내역에 해당하는 거래내역을 제외한 배열을 다시 만들어 일관성 유지
        this.transactions = this.transactions.filter(transaction => transaction.id !== id);
        //변경되었으니 다시 호출
        this.extractCategories();
      } catch (error) {
        console.error('Failed to delete transactions:', error);
      }
    },
    //state에 존재하는 거래내역에 카테고리를 map함수를 이용 해당 배열의 모든 원소에 대해 콜백함수를 실행한다.
    extractCategories() {
    //콜백함수가 하는 건 해당 원소의 카테고리를 set에 추가하는 것
    //이렇게 추가되면서 중복은 제거된다.
      const categoriesSet = new Set(this.transactions.map(transaction => transaction.category));
    //set을 다시 배열로 바꿔 state의 categories에 보내준다.
      this.categories = Array.from(categoriesSet);
    }
  }
});
