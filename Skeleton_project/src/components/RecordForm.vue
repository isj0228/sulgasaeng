<template>
    <div class="p-5">
        <div class="text-center">
            <h1 class="h4 text-gray-900 mb-4">빠른 등록</h1>
        </div>
        <form @submit.prevent="addNewTransaction">
            <div class="form-group">
                <label for="transactionDate" class="form-label">날짜</label>
                <input id="transactionDate" v-model="newTransaction.date" type="date" class="form-control" required>
            </div>
            <div class="form-group">
                <p for="transactionType" class="form-label">분류</p>
                <div class="form-check form-check-inline">
                    <input v-model="newTransaction.type" class="form-check-input" type="radio" name="transactionHistory" id="exampleRadios1"
                        value="입금" checked>
                    <label class="form-check-label" for="exampleRadios1">
                        입금
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input v-model="newTransaction.type" class="form-check-input" type="radio" name="transactionHistory" id="exampleRadios2"
                        value="출금">
                    <label class="form-check-label" for="exampleRadios2">
                        출금
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="transactionAmount" class="form-label">금액</label>
                <input id="transactionAmount" v-model="newTransaction.amount" min="0" type="number" class="form-control"
                    placeholder="금액을 입력하세요." required>
            </div>
            <div class="form-group">
                <label for="transactionCategory" class="form-label">카테고리</label>
                <select id="transactionCategory" v-model="selectedCategory" class="form-select"
                    @change="handleCategoryChange" required>
                    <option disabled value="">카테고리</option>
                    <option v-for="category in currentCategories" :key="category" :value="category">
                        {{ category }}
                    </option>
                    <option value="add-new">추가..</option>
                </select>
                <div v-if="selectedCategory === 'add-new'" class="form-group mt-2">
                    <input v-model="newCategory" class="form-control" placeholder="Enter new category" required />
                </div>
            </div>
            <div class="form-group">
                <label for="transactionDesc" class="form-label">내용</label>
                <textarea v-model="newTransaction.desc" class="form-control" id="transactionDesc" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-user btn-block">등록하기</button>
        </form>
    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { useBudgetStore } from '@/stores/budgetStore.js'


const budgetStore = useBudgetStore()
const loading = ref(true)
//카테고리가 변경되면 바로 반응하게 computed를 사용
const categories = computed(() => budgetStore.categories)

// 사용자 내역 입력값 바인딩
const newTransaction = ref({
    date: '',
    type: '입금',
    amount: '',
    category: '',
    desc: ''
})
const selectedCategory = ref('')
const newCategory = ref('')

const incomeCategories = computed(() => budgetStore.incomeCategories)
const outcomeCategories = computed(() => budgetStore.outcomeCategories)

// pinia json-db에 추가
const addNewTransaction = async () => {
    if (selectedCategory.value === 'add-new') {
        newTransaction.value.category = newCategory.value
    } else {
        newTransaction.value.category = selectedCategory.value
    }
    await budgetStore.addTransaction(newTransaction.value)
    newTransaction.value = { date: '', type: '입금', amount: '', category: '', desc: '' }
    selectedCategory.value = ''
    newCategory.value = ''
}

const handleCategoryChange = () => {
    if (selectedCategory.value !== 'add-new') {
        newTransaction.value.category = selectedCategory.value
    }
}

const currentCategories = computed(() => {
    return newTransaction.value.type === '입금' ? incomeCategories.value : outcomeCategories.value
})

onMounted(async () => {
    try {
        await budgetStore.getTransactions()
    } finally {
        loading.value = false
    }
})
</script>

<style lang="scss" scoped></style>