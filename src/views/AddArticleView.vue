<script lang="ts">

import {defineComponent} from "vue";
import KnowledgeContainer from "@/components/knowledge/KnowledgeContainer.vue";

export default defineComponent({
  components: {KnowledgeContainer},
})
</script>

<template>
<main class="h-100">
  <div class="container h-100">
    <KnowledgeContainer class="py-4 px-5">
      <h1 contenteditable="true">Заголовок</h1>
      <p contenteditable="true">
        Контент для статьи
      </p>
    </KnowledgeContainer>
  </div>

</main>
</template>

<style scoped>
main {
  margin-top: 30px;
}
</style>