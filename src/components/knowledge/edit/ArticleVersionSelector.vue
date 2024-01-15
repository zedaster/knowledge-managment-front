<script lang="ts">
import {defineComponent, PropType} from "vue";
import type {ArticleVersion} from "@/models/edit/ArticleVersion";

export default defineComponent({
  props: {
    currentVersion: {
      type: Object as PropType<number>,
      required: true,
    },
    versions: {
      type: Object as PropType<ArticleVersion[]>,
      required: true
    }
  },

  emits: ['update:currentVersion'],

  methods: {
    selectVersion(event) {
      this.$emit('update:currentVersion', event.target.value)
    },
    formatDate(date: Date) {
      const newDate = new Date(date.getTime() - (5 * 60 * 60 * 1000)); // -5 hours
      const day = (newDate.getDate() < 10 ? '0' : '') + newDate.getDate();
      const month = (newDate.getMonth() < 9 ? '0' : '') + (newDate.getMonth() + 1);
      const year = newDate.getFullYear();
      const hours = newDate.getHours();
      const minutes = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();
      const seconds = (newDate.getSeconds() < 10 ? '0' : '') + newDate.getSeconds();

      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
    }
  }
});
</script>

<template>
  <div class="row justify-content-end">
    <div class="col-auto">
      <select class="form-select"
              aria-label="Version selector"
              @change="selectVersion">
        <option v-for="version in versions"
                :value="version.versionId"
                :selected="currentVersion === version.versionId">
          {{ formatDate(version.createdAt) }}
        </option>
      </select>
    </div>
  </div>

</template>

<style scoped>

</style>