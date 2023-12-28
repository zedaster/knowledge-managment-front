<script setup lang="ts">

import SearchIcon from "@/components/icons/SearchIcon.vue";
</script>

<template>
  <form class="form-inline">
    <div class="input-group">
      <span class="input-group-text" id="search-icon"><SearchIcon/></span>
      <input type="text"
             class="form-control shadow-none"
             placeholder="Поиск"
             aria-label="Search"
             aria-describedby="search-icon">
    </div>
  </form>
</template>

<style scoped>
.input-group-text {
  background-color: white;
  border-right: 0;
  border-bottom-left-radius: 30px;
  border-top-left-radius: 30px;
}

.form-control {
  border-left: 0;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
}
</style>