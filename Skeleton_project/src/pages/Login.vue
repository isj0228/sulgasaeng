<template>
    <div>
        <form @submit.prevent="checkLogin" >
            <h1>Login</h1>
            <br>
            ID   &nbsp;&nbsp;<input type="text" value="" v-model="inputID">
            <br>
            <br>
            PW <input type="password" value="" v-model="inputPW">
            <br><br>
            <button type="submit" class="btn btn-primary btn-user btn-block">로그인</button>
        </form>
    </div>
</template>

<script setup>
import { useLoginStateStore } from '../stores/loginStateStore';
import { useUserStore } from '../stores/userStore';

const inputID = "";
const inputPW = "";
const loginStore = useLoginStateStore();
const userStore = useUserStore();
const checkLogin = function() {
    

}


</script>