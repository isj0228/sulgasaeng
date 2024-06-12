<template>
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="font-weight-bold text-primary text-uppercase mb-1">{{ month }}월 소득
                    </div>
                    <div v-if="isLoading" class="h5 mb-0 font-weight-bold text-gray-800">Loading...</div>
                    <div v-else class="h5 mb-0 font-weight-bold text-gray-800">{{ totalInput }}</div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-coins fa-2x text-gray-300"></i>
                    <!-- <i class="fa-solid fa-coins"></i> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, watchEffect, computed } from 'vue';
import { monthlyInput } from '../../service/monthlySummary';
import { useBudgetStore } from '@/stores/budgetStore.js';

const budgetStore = useBudgetStore();
const totalInput = ref(0);
const isLoading = ref(true);

const month = Number((new Date()).getMonth()) + 1;

const updateTotalInput = () => {
    totalInput.value = monthlyInput();
    isLoading.value = false;
};

watch(() => budgetStore.transactions, () => {
    updateTotalInput();
}, { deep: true });

updateTotalInput();
</script>
