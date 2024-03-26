<script lang="ts">

import {defineComponent, PropType} from "vue";
import KnowledgeMenu from "@/components/knowledge/KnowledgeMenu.vue";
import type {ArticleTree} from "@/models/article/ArticleTree";
import KnowledgeContainer from "@/components/knowledge/KnowledgeContainer.vue";

/**
 * Layout for primary pages of the project. It contains two columns. The left one is {@link KnowledgeMenu} and the
 * right one contains the child HTML of the component wrapped into {@link KnowledgeContainer}
 */
export default defineComponent({
  components: {KnowledgeContainer, KnowledgeMenu},
  props: {
    tree: {
      type: Object as PropType<ArticleTree>,
      default: null,
    },
    selectedId: {
      type: Object as PropType<number | undefined>
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