<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    color: { type: String, required: true },
  },
  computed: {
    fillStyle() {
      return "fill: " + this.color;
    }
  }
})
</script>

<template>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.71429 3H7.28571V7.28571H3V8.71429H7.28571V13H8.71429V8.71429H13V7.28571H8.71429V3Z" :style="fillStyle" />
  </svg>
</template>

<style scoped>
</style>