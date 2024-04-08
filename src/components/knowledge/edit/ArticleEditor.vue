<script lang="ts">

import {defineComponent, PropType} from "vue";
import {FormulaApi} from "@/api/FormulaApi";
import ArticleContent from "@/components/knowledge/ArticleContent.vue";
import ArticleHead from "@/components/knowledge/head/ArticleHead.vue";

/**
 * Component for editing a specific article (header and content)
 */
export default defineComponent({
  components: {
    ArticleHead,
    ArticleContent
  },

  props: {
    parentTitle: {
      type: Object as PropType<string | null | undefined>,
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: Object as PropType<any>,
      required: true
    }
  },

  emits: ['update:title', 'update:content'],

  data() {
    return {
      formulaApi: new FormulaApi(),
      isLoading: true,
    }
  },

  mounted() {
    //@ts-ignore
    this.$refs.title.innerText = this.title;
  },

  methods: {
    inputTitle(event) {
      this.$emit('update:title', event.target.innerText);
    },

    updateContent(newContent) {
      this.$emit('update:content', newContent)
    }
  },
})
</script>

<template>
  <ArticleHead>
    <p class="text-muted" v-if="parentTitle === null">Статья в корневой ветке</p>
    <p class="text-muted" v-if="typeof parentTitle === 'string'">Родительская статья: <b>{{ parentTitle }}</b></p>
    <h1 ref="title" @input="inputTitle" contenteditable="true">Заголовок</h1>
  </ArticleHead>

  <ArticleContent :editable="true" :content="content" @update:content="updateContent"/>
</template>

<style>
.ce-block__content, .ce-toolbar__content {
  max-width: calc(100% - 80px) !important;
}

.cdx-block {
  max-width: 100% !important;
}
</style>