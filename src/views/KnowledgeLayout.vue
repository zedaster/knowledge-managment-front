<script lang="ts">

import {defineComponent, PropType} from "vue";
import KnowledgeMenu from "@/components/knowledge/KnowledgeMenu.vue";
import type {ArticleTree} from "@/models/ArticleTree";
import KnowledgeBlock from "@/components/knowledge/KnowledgeBlock.vue";


export default defineComponent({
  components: {KnowledgeBlock, KnowledgeMenu},
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
          <KnowledgeBlock class="px-3 py-4">
            <KnowledgeMenu :tree="tree" :selected-id="selectedId"/>
          </KnowledgeBlock>
        </div>
        <div class="col-9">
          <KnowledgeBlock class="py-4 px-5">
            <slot />
          </KnowledgeBlock>
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