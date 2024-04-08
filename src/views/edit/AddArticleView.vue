<script lang="ts">

import {defineComponent, PropType} from "vue";
import KnowledgeContainer from "@/components/knowledge/KnowledgeContainer.vue";
import NavBar from "@/components/nav/NavBar.vue";
import {ArticleApi} from "@/api/ArticleApi";
import {SpaceCleanService} from "@/service/SpaceCleanService";
import FormulaSelector from "@/components/knowledge/formula/FormulaSelector.vue";
import Formula from "@/models/formula/Formula";
import ArticleEditor from "@/components/knowledge/edit/ArticleEditor.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

/**
 * Page for creating a new article
 */
export default defineComponent({
  components: {
    LoadingSpinner,
    ArticleEditor,
    FormulaSelector,
    NavBar,
    KnowledgeContainer,
  },

  props: {
    parentId: {
      type: Object as PropType<string | undefined>,
    }
  },

  data() {
    return {
      editApi: new ArticleApi(),
      isLoading: true,
      parentTitle: null as string | null,

      title: 'Заголовок',
      content: {
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "Новый текст"
            }
          }
        ]
      } as any,

      isFormulaSelectorShowing: false,
      selectedFormulaId: null as null | number,
      formulaOptions: null as null | Map<number, Formula>,

      hoverContentIndex: null as null | number,

      isSaveButtonActive: true,
    }
  },

  mounted() {
    if (this.parentIdToNumber) {
      this.editApi.getTitleByArticleId(this.parentIdToNumber).then((title) => {
        this.parentTitle = title;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  },

  computed: {
    parentIdToNumber() {
      if (this.parentId) {
        return Number.parseInt(this.parentId.toString());
      } else {
        return null;
      }
    },
  },

  methods: {
    save() {
      this.isSaveButtonActive = false;
      this.editApi.createArticle({
        title: new SpaceCleanService().trimAndFormatMultiSpaces(this.title),
        content: JSON.stringify(this.content),
        parentId: this.parentIdToNumber
      }).then(() => {
        this.$router.go(-1);
      }).catch((e) => {
        this.$router.push({name: 'login'})
      });
    },
  },
})
</script>

<template>
  <header>
    <NavBar :editMode="true" @save="save"/>
  </header>
  <main class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100 justify-content-center">
        <div class="col container-wrapper">
          <KnowledgeContainer class="d-flex flex-column py-4 px-4">
            <div v-if="isLoading" class="d-flex justify-content-center">
              <LoadingSpinner/>
            </div>

            <ArticleEditor v-if="!isLoading"
                           :parent-title="parentTitle"
                           v-model:title="title"
                           v-model:content="content"/>
          </KnowledgeContainer>
        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
main {
  margin-top: 30px;
}

.container-wrapper {
  max-width: 800px;
}
</style>