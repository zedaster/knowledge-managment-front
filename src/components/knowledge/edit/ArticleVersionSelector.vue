<script lang="ts">
import {defineComponent, PropType} from "vue";
import type {ArticleVersion} from "@/models/edit/ArticleVersion";
import {FormatDateTimeUtil} from "@/utils/format/FormatDateTimeUtil";

const dateTimeUtil = new FormatDateTimeUtil();

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
      return dateTimeUtil.stringifyDateTime(date);
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