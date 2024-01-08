<script setup lang="ts">

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
  height: 100%;
}
</style>