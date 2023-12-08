<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    color: { type: String, default: "black" },
  },
  computed: {
    fillStyle() {
      return "fill: " + this.color;
    },
    stokeStyle() {
      return "stroke: " + this.color;
    }
  }
})
</script>

<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12V21H20V12" :style="stokeStyle" stroke-width="2"/>
    <path d="M2 11L12 3L22 11" :style="stokeStyle" stroke-width="2"/>
    <rect x="14" y="11" width="2" height="4" :style="fillStyle" />
  </svg>
</template>

<style scoped>

</style>