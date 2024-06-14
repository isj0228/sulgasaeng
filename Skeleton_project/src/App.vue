<template>
  <div id="wrapper">
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Topbar />
        <div class="container-fluid container-padding-x">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Topbar from '@/components/nav/Topbar.vue'
import { useUserStore } from '@/stores/userStore.js'
const { fetchUser } = useUserStore();
fetchUser();

</script>

<style>
.container-padding-x {
  padding-left: 4rem;
  padding-right: 4rem;
}
</style>
