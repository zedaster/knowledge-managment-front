<script lang="ts">

import FormulaContainer from "@/components/knowledge/formula/FormulaContainer.vue";
import FormulaIcon from "@/components/icons/FormulaIcon.vue";
import FormulaSelector from "@/components/knowledge/formula/FormulaSelector.vue";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import TextIcon from "@/components/icons/TextIcon.vue";
import {defineComponent, PropType, ref, toRaw} from "vue";
import HandIndexIcon from "@/components/icons/HandIndexIcon.vue";
import FormulaRow from "@/components/knowledge/formula/FormulaRow.vue";
import NavBar from "@/components/nav/NavBar.vue";
import KnowledgeContainer from "@/components/knowledge/KnowledgeContainer.vue";
import {FormulaApi} from "@/api/FormulaApi";
import {FormulaAddElement, isFormulaAddElement, isTextAddElement, TextAddElement} from "@/service/edit/AddElement";
import Formula from "@/models/formula/Formula";

export default defineComponent({
  components: {
    HandIndexIcon,
    RemoveIcon,
    TextIcon,
    FormulaContainer, FormulaRow, FormulaSelector, FormulaIcon, PlusIcon, NavBar, KnowledgeContainer
  },

  props: {
    parentTitle: {
      type: Object as PropType<string | null | undefined>,
    },
    title: {
      type: String,
      required: true
    },
    contents: {
      type: Object as PropType<Array<TextAddElement | FormulaAddElement>>,
      required: true
    },
    // versions: {
    //   type: Object as PropType<string>
    // }
  },

  emits: ['update:title', 'update:contents'],

  data() {
    return {
      formulaApi: new FormulaApi(),
      isLoading: true,

      isFormulaSelectorShowing: false,
      selectedFormulaId: null as null | number,
      formulaOptions: null as null | Map<number, Formula>,

      hoverContentIndex: null as null | number,
    }
  },

  setup(props) {
    const localContents = ref(structuredClone(toRaw(props.contents)))
    return {localContents}
  },

  mounted() {
    //@ts-ignore
    this.$refs.title.innerText = this.title;
  },

  methods: {
    addText() {
      this.localContents.push({text: 'Новый текст'});
    },

    pushFormulaButton() {
      if (!this.isFormulaSelectorShowing) {
        this.formulaApi.getAllAsMap().then((formulaMap) => {
          this.formulaOptions = formulaMap;
          this.selectedFormulaId = formulaMap.keys().next().value;
          this.isFormulaSelectorShowing = true;
        })
        return;
      }

      this.localContents.push({formulaId: this.selectedFormulaId!});
      this.isFormulaSelectorShowing = false;
    },

    inputTitle(event) {
      this.$emit('update:title', event.target.innerText);
    },

    inputTextContent(id, event) {
      this.localContents[id] = {
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
      for (let i = 0; i < this.localContents.length; i++) {
        if (i !== index) {
          newContents.push(this.localContents[i]);
        }
      }
      this.localContents = newContents
    },

    setHoverContent(i: number) {
      this.hoverContentIndex = i;
    },

    clearHoverContent() {
      this.hoverContentIndex = null;
    },
  },

  watch: {
    localContents: {
      handler(newValue) {
        // @ts-ignore
        this.$emit('update:contents', newValue)
      },
      deep: true
    },
    // contents: {
    //   handler(newValue) {
    //     // @ts-ignore
    //     this.localContents = structuredClone(toRaw(this.contents))
    //   }
    // }
  }
})
</script>

<template>
  <p class="text-muted" v-if="parentTitle === null">Статья в корневой ветке</p>
  <p class="text-muted" v-if="typeof parentTitle === 'string'">Родительская статья: <b>{{ parentTitle }}</b></p>

  <h1 ref="title" @input="inputTitle" contenteditable="true">Заголовок</h1>

  <div v-for="(content, i) in localContents" class="my-1" @mouseover="setHoverContent(i)"
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
</template>

<style scoped>
.tool-btn {
  background-color: var(--accent);
  color: white;
  height: 100%;
}

.tool-btn:hover {
  background-color: var(--muted);
}
</style>