<script lang="ts">

import {defineComponent, PropType} from "vue";
import KnowledgeMenu from "@/components/knowledge/KnowledgeMenu.vue";
import type {ArticleTree} from "@/models/ArticleTree";
import KnowledgeContainer from "@/components/knowledge/KnowledgeContainer.vue";


export default defineComponent({
  components: {KnowledgeContainer, KnowledgeMenu},
  props: {
    tree: {
      type: Object as PropType<ArticleTree>,
      default: null,
    },
    selectedId: {
      type: Object as PropType<number>,
      default: 1
    }
  },
})
</script>

<template>
  <main class="h-100">
    <div class="container h-100">
      <div class="row gx-3 h-100">
        <div class="col-3">
          <KnowledgeContainer class="px-3 py-4">
            <KnowledgeMenu :tree="tree" :selected-id="selectedId"/>
          </KnowledgeContainer>
        </div>
        <div class="col-9">
          <KnowledgeContainer class="py-4 px-5">
            <slot />
          </KnowledgeContainer>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding-top: 30px;
}
</style>