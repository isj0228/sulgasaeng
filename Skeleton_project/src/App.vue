<template>
  <div id="wrapper">
    <!-- <Sidebar /> -->
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Topbar />
        <div class="container-fluid px-5">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Topbar from '@/components/nav/Topbar.vue'
// import Sidebar from '@/components/nav/Sidebar.vue'

import { useUserStore } from '@/stores/userStore.js'
const { fetchUser } = useUserStore();
fetchUser();

</script>

<!-- <script setup>
// import { reactive, computed, provide } from 'vue';
</script> -->