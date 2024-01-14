<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import KnowledgeLayout from "@/views/KnowledgeLayout.vue";
import {ArticleApi} from "@/api/ArticleApi";
import type {Article} from "@/models/article/Article";
import NavBar from "@/components/nav/NavBar.vue";
import type {ArticleTree} from "@/models/article/ArticleTree";
import RenderedArticleContent from "@/components/knowledge/RenderedArticleContent.vue";

export default defineComponent({
  components: {RenderedArticleContent, NavBar, KnowledgeLayout},
  props: {
    id: {
      type: Object as PropType<string>,
    }
  },

  data() {
    return {
      articleApi: new ArticleApi(),
      tree: undefined as ArticleTree | undefined,
      article: undefined as Article | undefined,
    }
  },

  mounted() {
    this.loadArticle()
  },

  computed: {
    idToNumber() {
      if (this.id) {
        return Number.parseInt(this.id.toString());
      } else {
        // TODO: Return null and load top article
        return 1;
      }
    },
  },

  watch: {
    id(newId) {
      this.loadArticle()
    }
  },

  methods: {
    loadArticle() {
      this.article = undefined;
      this.articleApi.getArticleWithTreeById(this.idToNumber).then((articleWithTree) => {
        this.article = articleWithTree.article;
        this.tree = articleWithTree.tree;
      })
    }
  }

})
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <KnowledgeLayout :selected-id="this.idToNumber" :tree="tree">
    <div v-if="article === undefined" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="article !== undefined">
      <h1>{{ this.article.title }}</h1>
      <RenderedArticleContent :html="this.article.content"/>
    </div>
  </KnowledgeLayout>
</template>

<style scoped>

</style>