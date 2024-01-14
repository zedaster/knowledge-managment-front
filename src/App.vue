<script lang="ts">
import {defineComponent} from "vue";
import NavBar from "@/components/nav/NavBar.vue";

export default defineComponent({
  components: {NavBar},
})
</script>

<template>
  <RouterView/>
  <footer>
    <div class="p-3"></div>
  </footer>
</template>

<style scoped>

</style>
