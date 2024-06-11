// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from "@/pages/Dashboard.vue";
import Record from "@/pages/Record.vue";
import Chart from "@/pages/Chart.vue";
import UserProfile from "@/pages/UserProfile.vue";

const routes = [
    { path: '/user', component: UserProfile},
    { path: '/', component: Dashboard },
    { path: '/record', component: Record },
    { path: '/chart', component: Chart },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
