<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow px-5">

        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
        </button>
        <router-link to="/" class="nav-link" id="tobar-title">
            <h3 class="mt-2 mb-0">슬기로운 가계부 생활</h3>
        </router-link>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <router-link class="nav-link" to="/">
                    <!-- <i class="fas fa-fw fa-tachometer-alt"></i> -->
                    <span>홈</span></router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/record">
                    <!-- <i class="fas fa-fw fa-tachometer-alt"></i> -->
                    <span>내역</span></router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/chart">
                    <!-- <i class="fas fa-fw fa-tachometer-alt"></i> -->
                    <span>보고서</span></router-link>
            </li>
            <li class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-bell fa-fw"></i>
                    <span class="badge badge-danger badge-counter">3+</span>
                </a>
            </li>
            <div class="topbar-divider d-none d-sm-block"></div>

            <li class="nav-item dropdown no-arrow">
                <router-link class="nav-link dropdown-toggle" to="/user">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ userInfo.name }}</span>
                    <img class="img-profile rounded-circle" :src="userInfo.image">
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import $ from 'jquery';
export default {
    mounted() {
        $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
                $('.sidebar .collapse').collapse('hide');
            };
        });
    }
}
</script>

<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/userStore.js'
// const userInfo = useUserStore().userInfo.name;
// console.log(userInfo)
// const userStore = useUserStore();
const userInfo = computed(() => useUserStore().userInfo);

</script>

<style lang="scss" scoped>
#tobar-title {
    text-decoration: none;
}
</style>