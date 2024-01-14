<script lang="ts">
import {defineComponent} from "vue";
import NavBar from "@/components/nav/NavBar.vue";

export default defineComponent({
  components: {NavBar},
})
</script>

<template>
  <RouterView class="mb-3"/>
</template>

<style scoped>

</style>
