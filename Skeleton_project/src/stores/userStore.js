import { defineStore } from "pinia";
import { reactive, computed } from 'vue';
import axios from 'axios';

const user = "user/";
const index = "1";
const BASEURI = "http://localhost:3000/";

export const useUserStore = defineStore("userStore", () => {
    const state = reactive({
        userInfo: {},
        isLoading: false
    })

    const fetchUser = async () => {
        state.isLoading = true;
        try{
            const response = await axios.get(BASEURI + `${user}${index}`);
            if(response.status === 200) {
                state.userInfo = response.data;
            }else{
                alert('데이터 조회 실패');
            }
            state.isLoading = false;
        } catch(err){
            alert('에러 발생 : '+err);
            state.isLoading = false;
        }
    }

    const updateUser = async({name,email,phone,image},successCallback) => {

        state.isLoading = true;
        try{
            const payload = {name,email,phone,image};
            const response = await axios.put(BASEURI + `${user}${index}`,payload)
            if(response.status===200){
                // let index = state.userInfo.findIndex((user)=>user.id === id);
                state.userInfo = {name,email,phone,image};
                successCallback();
            }else {
                alert('user 변경 실패');
            }
        }catch(error){
            alert('에러발생 :' + error);
            state.isLoading = false;
        }
    }

    const userInfo = computed(()=>state.userInfo);
    const isLoading = computed(()=>state.isLoading);

    return { userInfo, isLoading, fetchUser, updateUser };
})
