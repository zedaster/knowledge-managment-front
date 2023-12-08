<script setup lang="ts">

import SiteButton from "@/components/SiteButton.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
</script>

<template>
  <nav class="navbar navbar-dark bg-black">
    <div class="container">
      <RouterLink :to="{name: 'home'}" class="navbar-brand" href="/">
        <img src="../../assets/image/logo.svg" width="24" height="24" class="d-inline-block align-top"
             alt="Логотип Брусники">
        <span class="navbar-title">База знаний</span>
      </RouterLink>
      <div class="right-block">
        <SiteButton><span class="mx-3">Вход</span></SiteButton>
        <a href="#" class="ms-4"><ProfileIcon /></a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  display: flex;
  align-items: center;
}
.navbar-title {
  margin-left: 10px;
}
.right-block {
  display: flex;
}
</style>