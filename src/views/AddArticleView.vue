<script lang="ts">

import KnowledgeBlock from "@/components/knowledge/KnowledgeBlock.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {KnowledgeBlock},
})
</script>

<template>
<main class="h-100">
  <div class="container h-100">
    <KnowledgeBlock class="py-4 px-5">
      <h1 contenteditable="true">Заголовок</h1>
      <p contenteditable="true">
        Контент для статьи
      </p>
    </KnowledgeBlock>
  </div>

</main>
</template>

<style scoped>
main {
  margin-top: 30px;
}
</style>