<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">슬가생 <sup>2</sup></div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
            <router-link class="nav-link" to="/">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></router-link>
        </li>
        <li class="nav-item active">
            <router-link class="nav-link" to="/record">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>내역</span></router-link>
        </li>
        <li class="nav-item active">
            <router-link class="nav-link" to="/chart">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>보고서</span></router-link>
        </li>

    </ul>
    <!-- End of Sidebar -->
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>