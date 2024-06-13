import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from "@/pages/Dashboard.vue";
import Record from "@/pages/Record.vue";
import Chart from "@/pages/Chart.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Login from "@/pages/Login.vue";
import { useLoginStateStore } from '../stores/loginStateStore';

const routes = [
    { path: '/user', component: UserProfile},
    { path: '/', component: Dashboard },
    { path: '/record', component: Record },
    { path: '/chart', component: Chart },
    { path: '/login', component: Login}
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useLoginStateStore();
    if (to.path != '/login' && !authStore.loginState) {
        next('/login');
    }
    else {
        next();
    }
})

export default router;
