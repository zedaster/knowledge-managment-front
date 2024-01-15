<script lang="ts">
import {defineComponent} from "vue";
import ArticleEditor from "@/components/knowledge/edit/ArticleEditor.vue";
import KnowledgeContainer from "@/components/knowledge/KnowledgeContainer.vue";
import {EditArticleApi} from "@/api/EditArticleApi";
import type {FormulaAddElement, TextAddElement} from "@/service/edit/AddElement";
import {EditorService} from "@/service/edit/EditorService";
import type {ArticleVersion} from "@/models/edit/ArticleVersion";
import ArticleVersionSelector from "@/components/knowledge/edit/ArticleVersionSelector.vue";
import NavBar from "@/components/nav/NavBar.vue";

export default defineComponent({
  components: {NavBar, ArticleVersionSelector, KnowledgeContainer, ArticleEditor},

  props: {
    id: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      editApi: new EditArticleApi(),
      isArticleLoading: true,
      isVersionsLoading: true,
      title: null as null | string,
      contents: null as null | (TextAddElement | FormulaAddElement)[],
      initialTitle: null as null | string,
      initialContents: null as null | (TextAddElement | FormulaAddElement)[],
      versions: null as null | ArticleVersion[],
      currentVersion: null as null | number
    }
  },

  computed: {
    idToNumber() {
      return Number.parseInt(this.id);
    }
  },

  mounted() {
    this.editApi.getEditData(this.idToNumber).then((data) => {
      console.log(data)
      console.log(new EditorService().decompileContent(data.content))
      this.title = data.title;
      this.contents = new EditorService().decompileContent(data.content);
      this.versions = data.versions;
      this.currentVersion = data.currentVersion;
      this.isVersionsLoading = false;
      this.isArticleLoading = false;
    }).catch((e) => {
      this.$router.push({name: 'login'})
    })
  },

  methods: {
    save() {
      this.isVersionsLoading = true;
      this.isArticleLoading = true;
      this.editApi.commit({
        articleId: this.idToNumber,
        versionId: this.currentVersion as number,
        title: this.title as string,
        content: new EditorService().compileContent(this.contents as (TextAddElement | FormulaAddElement)[])
      }).then(() => {
        this.$router.push({name: 'article', params: {id: this.id}})
      }).catch((e) => {
        this.$router.push({name: 'login'})
      })
    }
  },

  watch: {
    currentVersion(newVersion: number) {
      this.isArticleLoading = true;
      this.editApi.getCertainVersion(newVersion).then((data) => {
        this.title = data.title;
        this.contents = new EditorService().decompileContent(data.content);
        this.isArticleLoading = false;
      }).catch((e) => {
        this.$router.push({name: 'login'})
      })
    },
  }
})
</script>

<template>
  <header>
    <NavBar :editMode="true" @save="save"/>
  </header>
  <main class="h-100">
    <div class="container h-100">
      <KnowledgeContainer class="d-flex flex-column py-4 px-5">
        <ArticleVersionSelector v-if="!isVersionsLoading"
                                v-model:currentVersion="currentVersion as number"
                                :versions="versions"/>

        <ArticleEditor v-if="!isArticleLoading"
                       v-model:title="title as string"
                       v-model:contents="contents"/>

        <div v-if="isArticleLoading" class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

      </KnowledgeContainer>
    </div>
  </main>

</template>

<style scoped>
main {
  margin-top: 30px;
}
</style>