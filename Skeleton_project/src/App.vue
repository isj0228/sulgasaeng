<script setup>
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div id="wrapper">
    <Sidebar />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Topbar />
        <div class="container-fluid">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- <script setup>
// import { reactive, computed, provide } from 'vue';
</script> -->