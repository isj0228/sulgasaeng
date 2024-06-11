<template>
    <div class="p-5">
        <div class="text-center">
            <h1 class="h4 text-gray-900 mb-4">빠른 등록</h1>
        </div>
        <form>
            <div class="form-group">
                <input type="date" class="form-control form-control-user" id="exampleInputdate"
                    aria-describedby="dateHelp" placeholder="Enter date Address..." required>
                <!-- <input type="date" class="form-control form-control-user" placeholder="Date" required /> -->
            </div>
            <div class="form-group">
                    <input type="radio" name="type" value="income" v-model="newTransaction.type" required> 입금
                    <input type="radio" name="type" value="outcome" v-model="newTransaction.type" required> 출금
            </div>
            <div class="form-group">
                금액<br>
                <input type="text" class="form-control form-control-user" placeholder="금액을 입력하세요." required style="text-align: left;">
            </div>
            <div class="form-group">
                분류<br>
                <select v-model="newTransaction.category" required>
                    <option value="식비">식비</option>
                    <option value="교통비">교통비</option>
                    <option value="주거비">주거비</option>
                    <option value="통신비">통신비</option>
                    <option value="의료비">의료비</option>
                    <option value="교육비">교육비</option>
                    <option value="의류/미용">의류/미용</option>
                    <option value="오락/취미">오락/취미</option>
                    <option value="기타**">기타**</option>
        </select>
            </div>
            <div class="form-group">
                메모<br>
                <textarea name="opinion" cols="30" rows="5" v-model="newTransaction.desc"></textarea>
            </div>

            <!-- <button> 입력하면 돼요. 이벤트 발생 시 addNewTransaction 발생 -->
                
        </form>
        <!-- <hr>
                <div class="text-center">
                  <a class="small" href="forgot-password.html">Forgot Password?</a>
                </div>
                <div class="text-center">
                  <a class="small" href="register.html">Create an Account!</a>
                </div> -->
    </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import { useBudgetStore } from '@/stores/budgetStore.js'  


const date = ref(new Date());

const newTransaction = ref({
    date: '',
    type: '',
    amount: '',
    category: '',
    desc:''
})

const addNewTransaction = () => {
    budgetStore.addTransaction(newTransaction.value)
        newTransaction.value = { date: '', type: 'income', amount: '', category: '', desc: '' }
      
}

const testtest = () => {
    console.log(newTransaction)
}
</script>

<style lang="scss" scoped></style>