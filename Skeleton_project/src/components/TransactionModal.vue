<template>
  <div class="modal fade" id="transactionModal" tabindex="-1" aria-labelledby="transactionModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="transactionModalLabel">내역 상세</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="transactionDate" class="form-label">날짜</label>
            <input id="transactionDate" v-model="editableTransaction.date" type="date" class="form-control">
          </div>
          <div class="mb-3">
            <label for="transactionType" class="form-label">분류</label>
            <select id="transactionType" v-model="editableTransaction.type" class="form-select">
              <option value="입금">입금</option>
              <option value="출금">출금</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="transactionAmount" class="form-label">금액</label>
            <input id="transactionAmount" v-model="editableTransaction.amount" type="number" class="form-control">
          </div>
          <div class="mb-3">
            <label for="transactionCategory" class="form-label">카테고리</label>
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
            <label for="transactionDesc" class="form-label">내용</label>
            <textarea v-model="editableTransaction.desc" class="form-control" id="transactionDesc" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-danger" @click="deleteTransaction">삭제</button>
          <button type="button" class="btn btn-primary" @click="saveChanges">변경 저장</button>
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
      return editableTransaction.value.type === '입금' ? incomeCategories.value : outcomeCategories.value
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
      //옵션에서 선택 된게 추가일 경우
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
</style>
