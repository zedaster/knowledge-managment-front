<script lang="ts">

import {defineComponent, PropType} from "vue";
import KnowledgeContainer from "@/components/knowledge/KnowledgeContainer.vue";
import NavBar from "@/components/nav/NavBar.vue";
import {ArticleApi} from "@/api/ArticleApi";
import {SpaceCleanService} from "@/service/SpaceCleanService";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import FormulaIcon from "@/components/icons/FormulaIcon.vue";
import FormulaSelector from "@/components/knowledge/formula/FormulaSelector.vue";
import Formula from "@/models/formula/Formula";
import FormulaRow from "@/components/knowledge/formula/FormulaRow.vue";
import FormulaContainer from "@/components/knowledge/formula/FormulaContainer.vue";
import TextIcon from "@/components/icons/TextIcon.vue";
import type {FormulaAddElement, TextAddElement} from "@/service/edit/AddElement";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import HandIndexIcon from "@/components/icons/HandIndexIcon.vue";
import ArticleEditor from "@/components/knowledge/edit/ArticleEditor.vue";
import {EditorService} from "@/service/edit/EditorService";

export default defineComponent({
  components: {
    ArticleEditor,
    HandIndexIcon,
    RemoveIcon,
    TextIcon,
    FormulaContainer, FormulaRow, FormulaSelector, FormulaIcon, PlusIcon, NavBar, KnowledgeContainer
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
      contents: [{text: "Новый текст"}] as (TextAddElement | FormulaAddElement)[],

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
        content: new EditorService().compileContent(this.contents),
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
    <div class="container h-100">
      <KnowledgeContainer class="d-flex flex-column py-4 px-5">
        <div v-if="isLoading" class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <ArticleEditor v-if="!isLoading"
                       :parent-title="parentTitle"
                       v-model:title="title"
                       v-model:contents="contents"/>
      </KnowledgeContainer>
    </div>

  </main>
</template>

<style scoped>
main {
  margin-top: 30px;
}
</style>