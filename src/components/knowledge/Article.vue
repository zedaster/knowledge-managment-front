<script lang="ts">
import {defineComponent, PropType} from "vue";
import type {Article} from "@/models/article/Article";

const RU_MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября',
  'ноября', 'декабря'];

export default defineComponent({
  name: "article",
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true
    }
  },
  computed: {
    stringDate(): string {
      const date = this.article.createdAt;
      return date.getDay() + " " + RU_MONTHS[date.getMonth()] + " " + date.getFullYear();
    }
  }
})
</script>

<template>
  <h1>{{ article.title }}</h1>
  <div class="created-info pt-2 pb-3">
    <span>{{ this.stringDate }}</span>
    <span class="split-dot px-2">•</span>
    <span>{{ article.author }}</span>
  </div>
  <div v-html="article.content"></div>
</template>

<style scoped>
.created-info {
  color: var(--muted);
  /* сноски */
  font-family: Grtsk Exa;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 145.455% */
}

.created-info .split-dot {
  font-family: sans-serif;
  font-weight: 800;
}
</style>