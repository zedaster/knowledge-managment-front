<script lang="ts">

import {defineComponent, PropType} from "vue";
import KnowledgeContainer from "@/components/knowledge/KnowledgeContainer.vue";
import NavBar from "@/components/nav/NavBar.vue";
import {ArticleApi} from "@/api/ArticleApi";
import {SpaceCleanService} from "@/service/SpaceCleanService";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import FormulaIcon from "@/components/icons/FormulaIcon.vue";
import FormulaSelector from "@/components/knowledge/formula/FormulaSelector.vue";
import {FormulaApi} from "@/api/FormulaApi";
import Formula from "@/models/formula/Formula";
import FormulaRow from "@/components/knowledge/formula/FormulaRow.vue";
import FormulaContainer from "@/components/knowledge/formula/FormulaContainer.vue";
import TextIcon from "@/components/icons/TextIcon.vue";
import type {FormulaAddElement, TextAddElement} from "@/views/add/AddElement";
import {isFormulaAddElement, isTextAddElement} from "@/views/add/AddElement";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import HandIndexIcon from "@/components/icons/HandIndexIcon.vue";

export default defineComponent({
  components: {
    HandIndexIcon,
    RemoveIcon,
    TextIcon,
    FormulaContainer, FormulaRow, FormulaSelector, FormulaIcon, PlusIcon, NavBar, KnowledgeContainer
  },

  props: {
    parentId: {
      type: Object as PropType<string>,
    }
  },

  data() {
    return {
      articleApi: new ArticleApi(),
      formulaApi: new FormulaApi(),
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
    if (this.parentIdToNumber !== null) {
      this.articleApi.getTitleByArticleId(this.parentIdToNumber).then((title) => {
        this.parentTitle = title;
      });
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
      this.articleApi.createArticle({
        title: new SpaceCleanService().trimAndFormatMultiSpaces(this.title),
        content: this.getResultContent(),
        parentId: this.parentIdToNumber
      }).then(() => {
        this.$router.go(-1);
      }).catch((e) => {
        this.$router.push({name: 'login'})
      });
    },

    addText() {
      this.contents.push({text: 'Новый текст'});
    },

    pushFormulaButton() {
      console.log('Add formula button pushed')
      if (!this.isFormulaSelectorShowing) {
        this.formulaApi.getAllAsMap().then((formulaMap) => {
          this.formulaOptions = formulaMap;
          this.selectedFormulaId = formulaMap.keys().next().value;
          this.isFormulaSelectorShowing = true;
        })
        return;
      }

      this.contents.push({formulaId: this.selectedFormulaId!});
      this.isFormulaSelectorShowing = false;
    },

    inputTitle(event) {
      this.title = event.target.innerText;
    },

    inputTextContent(id, event) {
      this.contents[id] = {
        text: event.target.innerText
      }
    },

    isFormulaElement(content: any): content is FormulaAddElement {
      return isFormulaAddElement(content);
    },

    isTextElement(content: any): content is TextAddElement {
      return isTextAddElement(content);
    },

    removeContent(index: number) {
      const newContents = [];
      for (let i = 0; i < this.contents.length; i++) {
        if (i !== index) {
          newContents.push(this.contents[i]);
        }
      }
      this.contents = newContents
    },

    setHoverContent(i: number) {
      this.hoverContentIndex = i;
    },

    clearHoverContent() {
      this.hoverContentIndex = null;
    },

    getResultContent(): string {
      const codedContents = []
      for (const content of this.contents) {
        if (isTextAddElement(content)) {
          codedContents.push(`<p>${new SpaceCleanService().trimAndFormatMultiSpaces(content.text)}</p>`)
        } else if (isFormulaAddElement(content)) {
          codedContents.push(`<FormulaContainer formula-id="${content.formulaId}" />`)
        }
      }
      return codedContents.join("")
    }
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
        <p class="text-muted" v-if="parentIdToNumber == null">Статья будет добавлена в корневую ветку</p>
        <p class="text-muted" v-if="parentIdToNumber != null">Родительская статья: <b>{{ parentTitle }}</b></p>

        <h1 ref="title" @input="inputTitle" contenteditable="true">Заголовок</h1>

        <div v-for="(content, i) in contents" class="my-1" @mouseover="setHoverContent(i)"
             @mouseleave="clearHoverContent">
          <p class="mb-0"
             v-if="isTextElement(content)"
             @input="(e) => inputTextContent(i, e)"
             contenteditable="true">
            {{ content.text }}
          </p>
          <FormulaContainer class="mb-1" v-else-if="isFormulaElement(content)" :formula-id="content.formulaId"/>
          <button type="button"
                  class="btn tool-btn"
                  v-if="this.hoverContentIndex === i"
                  @click="removeContent(i)">
            <RemoveIcon/>
          </button>
        </div>

        <div class="d-flex align-items-center mt-auto gap-1">
          <div v-if="isFormulaSelectorShowing">
            <FormulaSelector v-model:selected-id="selectedFormulaId" :possible-options="formulaOptions!"/>
          </div>
          <button type="button" class="btn tool-btn" @click="pushFormulaButton">
            <div class="d-flex my-1">
              <PlusIcon/>
              <FormulaIcon/>
            </div>
          </button>
          <button type="button" class="btn tool-btn" @click="addText">
            <div class="d-flex my-1">
              <PlusIcon/>
              <TextIcon/>
            </div>
          </button>
        </div>
      </KnowledgeContainer>
    </div>

  </main>
</template>

<style scoped>
main {
  margin-top: 30px;
}

.tool-btn {
  background-color: var(--accent);
  color: white;
  height: 100%;
}

.tool-btn:hover {
  background-color: var(--muted);
}
</style>