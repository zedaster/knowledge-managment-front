<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    color: { type: String, default: "black" },
  },
  computed: {
    fillStyle() {
      return "fill: " + this.color;
    }
  }
})
</script>

<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M4 9C2.89543 9 2 9.89543 2 11V19C2 20.1046 2.89543 21 4 21H16C17.1046 21 18 20.1046 18 19H6C4.89543 19 4 18.1046 4 17V9Z"
        :style="fillStyle" />
    <path
        d="M8 3C6.89543 3 6 3.89543 6 5V15C6 16.1046 6.89543 17 8 17H20C21.1046 17 22 16.1046 22 15V7C22 5.89543 21.1046 5 20 5H14C14 3.89543 13.1046 3 12 3H8Z"
        :style="fillStyle" />
  </svg>

</template>

<style scoped>

</style>