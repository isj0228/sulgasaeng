import { defineStore } from "pinia";

export const useLoginStateStore = defineStore('auth', {
    state: () => ({
        loginState : false
    }),
    actions: {
        login() {
            this.loginState = true
        },
        logout() {
            this.loginState = false
        }
    }
}

)