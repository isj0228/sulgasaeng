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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Dashboard'
}
</script>

<style lang="scss" scoped></style>