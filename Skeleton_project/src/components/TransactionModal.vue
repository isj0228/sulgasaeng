<template>
  <div class="modal fade" id="transactionModal" tabindex="-1" aria-labelledby="transactionModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="transactionModalLabel">Transaction Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="transactionDate" class="form-label">Date</label>
            <input id="transactionDate" v-model="editableTransaction.date" type="date" class="form-control">
          </div>
          <div class="mb-3">
            <label for="transactionType" class="form-label">Type</label>
            <select id="transactionType" v-model="editableTransaction.type" class="form-select">
              <option value="income">Income</option>
              <option value="outcome">Outcome</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="transactionAmount" class="form-label">Amount</label>
            <input id="transactionAmount" v-model="editableTransaction.amount" type="number" class="form-control">
          </div>
          <div class="mb-3">
            <label for="transactionCategory" class="form-label">Category</label>
            <select id="transactionCategory" v-model="selectedCategory" class="form-select" @change="handleCategoryChange">
              <option disabled value="">Select a category</option>
              <option v-for="category in currentCategories" :key="category" :value="category">
                {{ category }}
              </option>
              <option value="add-new">추가..</option>
            </select>
            <div v-if="selectedCategory === 'add-new'" class="form-group mt-2">
              <input v-model="newCategory" class="form-control" placeholder="Enter new category" required />
            </div>
          </div>
          <div class="mb-3">
            <label for="transactionDesc" class="form-label">Description</label>
            <input id="transactionDesc" v-model="editableTransaction.desc" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" @click="deleteTransaction">Delete</button>
          <button type="button" class="btn btn-primary" @click="saveChanges">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, toRefs } from 'vue'
import { Modal } from 'bootstrap'

export default defineComponent({
  name: 'TransactionModal',
  props: {
    transaction: {
      type: Object,
      required: true
    },
    incomeCategories: {
      type: Array,
      required: true
    },
    outcomeCategories: {
      type: Array,
      required: true
    }
  },
  emits: ['delete-transaction', 'update-transaction'],
  setup(props, { emit }) {
    const { transaction, incomeCategories, outcomeCategories } = toRefs(props)
    const editableTransaction = ref({ ...transaction.value })
    const selectedCategory = ref(editableTransaction.value.category || '')
    const newCategory = ref('')

    const currentCategories = computed(() => {
      return editableTransaction.value.type === 'income' ? incomeCategories.value : outcomeCategories.value
    })

    watch(transaction, (newTransaction) => {
      editableTransaction.value = { ...newTransaction }
      selectedCategory.value = newTransaction.category
    })

    const handleCategoryChange = () => {
      if (selectedCategory.value !== 'add-new') {
        editableTransaction.value.category = selectedCategory.value
      }
    }

    const deleteTransaction = () => {
      emit('delete-transaction', transaction.value.id)
      const modal = Modal.getInstance(document.getElementById('transactionModal'))
      modal.hide()
    }

    const saveChanges = () => {
      if (selectedCategory.value === 'add-new') {
        editableTransaction.value.category = newCategory.value
      }
      emit('update-transaction', { id: transaction.value.id, ...editableTransaction.value })
      const modal = Modal.getInstance(document.getElementById('transactionModal'))
      modal.hide()
    }

    return {
      editableTransaction,
      selectedCategory,
      newCategory,
      deleteTransaction,
      saveChanges,
      handleCategoryChange,
      currentCategories
    }
  }
})
</script>

<style scoped>
/* 스타일은 필요에 따라 추가하세요 */
</style>
