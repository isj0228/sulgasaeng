<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div class="d-flex d-md-none align-items-center justify-content-between w-100">
            <div class="nav-item dropdown no-arrow mx-1">

                <!-- 화면이 작아지면 나타나는 드롭다운 버튼 -->
                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-bars"></i>
                </a>
                <!-- 화면이 작아지면 나타나는 메뉴 -->
                <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="alertsDropdown">
                    <h6 class="dropdown-header fs-6">
                        슬기로운 가계부 생활
                    </h6>
                    <router-link to="/">
                        <a class="dropdown-item d-flex align-items-center py-3">
                            <div class="mr-3">
                                <div class="icon-circle bg-primary">
                                    <i class="fas fa-house text-white"></i>
                                </div>
                            </div>
                            <span class="text-gray-900">HOME</span>
                        </a>
                    </router-link>
                    <router-link to="/record">
                        <a class="dropdown-item d-flex align-items-center py-3">
                            <div class="mr-3">
                                <div class="icon-circle bg-success">
                                    <i class="fas fa-table-list text-white"></i>
                                </div>
                            </div>
                            <div>
                                <span class="text-gray-900">RECORD</span>
                            </div>
                        </a>
                    </router-link>
                    <router-link to="/chart">
                        <a class="dropdown-item d-flex align-items-center py-3">
                            <div class="mr-3">
                                <div class="icon-circle bg-warning">
                                    <i class="fas fa-chart-line text-white"></i>
                                </div>
                            </div>
                            <div>
                                <span class="text-gray-900">REPORT</span>

                            </div>
                        </a>
                    </router-link>

                </div>
            </div>

            <!-- 유저 정보 -->
            <ul class="navbar-nav d-flex flex-row align-items-center">
                <div class="topbar-divider d-sm-block"></div>
                <li class="nav-item dropdown no-arrow">
                    <router-link class="nav-link dropdown-toggle" to="/user">
                        <span class="mr-2 d-lg-inline text-gray-600 small">{{ userInfo.name }}</span>
                        <img class="img-profile rounded-circle" :src="userInfo.image">
                    </router-link>
                </li>
            </ul>
        </div>

        <!-- 제목 로고 -->
        <router-link to="/" class="nav-link d-none d-md-block" id="tobar-title">
            <h3 class="mt-2 mb-0">슬기로운 가계부 생활</h3>
        </router-link>

        <!-- 메뉴 이동 -->
        <ul class="navbar-nav ml-auto d-none d-md-flex">
            <li class="nav-item active">
                <router-link class="nav-link" to="/">
                    <span>홈</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/record">
                    <span>내역</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/chart">
                    <span>보고서</span>
                </router-link>
            </li>
            <!-- <li class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-bell fa-fw"></i>
                    <span class="badge badge-danger badge-counter">3+</span>
                </a>
            </li> -->
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

<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/userStore.js'
const userInfo = computed(() => useUserStore().userInfo);

const dropdownVisible = ref(false);

const showDropdown = () => {
    dropdownVisible.value = true;
    console.log(dropdownVisible.value);
};

const hideDropdown = () => {
    dropdownVisible.value = false;
    console.log(dropdownVisible.value);
};
</script>

<style scoped>
.custom-hover-button {
    transition: background-color 0.3s ease, transform 0.3s ease;
}
</style>
