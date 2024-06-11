import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:3000/budget-list';

export const useBudgetStore = defineStore('budgetStore', {
    state: () => ({
    transactions: []
    }),
    actions: {
        async getTransactions() {   
            try {
                const response = await axios.get(API_URL);
                this.transactions = response.data;
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        },
        async addTransaction(transaction) {
            try {
                const response = await axios.post(API_URL, transaction);
                this.transactions.push(response.data);
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
                }
            } catch (error) {
                console.error('Failed to update transaction:', error);
            }
        },
        async deleteTransaction(id) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                this.transactions = this.transactions.filter(transaction => transaction.id !== id);
            } catch (error) {
                console.error('Failed to delete transactions:', error);
            }
        },
}
});
