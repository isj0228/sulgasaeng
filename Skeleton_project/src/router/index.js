// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue"

const routes = [
    { path: '/', component: Dashboard },
    { path: '/User', component: UserProfile}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
