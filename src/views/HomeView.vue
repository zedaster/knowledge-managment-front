<script lang="ts">
import {defineComponent} from "vue";
import KnowledgeLayout from "@/views/KnowledgeLayout.vue";
import NavBar from "@/components/nav/NavBar.vue";

/**
 * Home page. It opens when an authorized user opens the root path
 */
export default defineComponent({
  components: {NavBar, KnowledgeLayout}
})
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <KnowledgeLayout>
    <h1>Главная страница</h1>
  </KnowledgeLayout>
</template>

<style scoped>

</style>