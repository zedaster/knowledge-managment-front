<script lang="ts">
import {defineComponent} from "vue";

/**
 * Container with smooth corners filled with block background color. Use it to show some content on a page
 */
export default defineComponent({})
</script>

<template>
<div class="block">
  <slot />
</div>
</template>

<style scoped>
.block {
  background-color: var(--block-background);
  border-radius: 20px;
  min-height: 100%;
}
</style>