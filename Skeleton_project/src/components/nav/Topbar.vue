<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div class="d-flex d-md-none align-items-center justify-content-between w-100">

            <!-- <button id="sidebarToggleTop" class="btn btn-link rounded-circle custom-hover-button"
                @mouseover="showDropdown" @mouseleave="hideDropdown">
                <i class="fa fa-bars"></i>
            </button> -->
            <!-- <div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="fa fa-bars"></i>
                </a>

                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div> -->
            <div class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-bars"></i>
                </a>
                <!-- Dropdown - Alerts -->
                <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="alertsDropdown">
                    <h6 class="dropdown-header fs-6">
                        슬기로운 가계부 생활
                    </h6>
                    <a class="dropdown-item d-flex align-items-center py-3" href="#">
                        <div class="mr-3">
                            <div class="icon-circle bg-primary">
                                <i class="fas fa-house text-white"></i>
                            </div>
                        </div>
                        <div>
                            <span class="font-weight-bold">HOME</span>
                        </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center py-3" href="#">
                        <div class="mr-3">
                            <div class="icon-circle bg-success">
                                <i class="fas fa-table-list text-white"></i>
                            </div>
                        </div>
                        <div>
                            RECORD
                        </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center py-3" href="#">
                        <div class="mr-3">
                            <div class="icon-circle bg-warning">
                                <i class="fas fa-chart-line text-white"></i>
                            </div>
                        </div>
                        <div>
                            REPORT
                        </div>
                    </a>
                </div>

            </div>


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

        <router-link to="/" class="nav-link d-none d-md-block" id="tobar-title">
            <h3 class="mt-2 mb-0">슬기로운 가계부 생활</h3>
        </router-link>

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
/* 추가적인 스타일이 필요하다면 여기에 작성하세요 */
.custom-hover-button {
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.position-relative {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    border: 1px solid #ddd;
    z-index: 1000;
    min-width: 200px;
    display: none;
}

.dropdown-menu.show {
    display: block;
}

.dropdown-item {
    padding: 10px 20px;
    text-decoration: none;
    color: #333;
    display: block;
}

.dropdown-item:hover {
    background-color: #f8f9fa;
}
</style>
