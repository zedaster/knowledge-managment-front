<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import KnowledgeLayout from "@/views/KnowledgeLayout.vue";
import {FakeArticleTree} from "@/models/article/FakeArticleTree";
import {FakeArticles} from "@/models/article/FakeArticles";

export default defineComponent({
  components: {KnowledgeLayout},
  props: {
    id: {
      type: Object as PropType<string>,
    }
  },
  computed: {
    idToNumber() {
      if (this.id) {
        return Number.parseInt(this.id.toString());
      } else {
        return 1;
      }
    },
  },
  data() {
    return {
      tree: new FakeArticleTree(),
      articles: new FakeArticles(),
    }
  }

})
</script>

<template>
  <KnowledgeLayout :selected-id="this.idToNumber" :tree="tree">
    <h1>{{ this.articles.getArticleById(idToNumber).title }}</h1>
    <span v-html="this.articles.getArticleById(idToNumber).content"></span>
  </KnowledgeLayout>
</template>

<style scoped>

</style>