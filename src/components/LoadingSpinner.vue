<script lang="ts">
import {defineComponent} from "vue";

/**
 * Component that indicates loading status
 */
export default defineComponent({
  props: {
    /**
     * If true smaller size will be applied
     * Otherwise size will be default
     */
    small: Boolean
  }
})
</script>

<template>
  <div :class="small ? 'spinner-border spinner-border-sm' : 'spinner-border'" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<style scoped>

</style>