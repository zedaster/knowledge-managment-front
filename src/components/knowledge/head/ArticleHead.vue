<script setup lang="ts">

</script>

<template>
  <div class="article-head-wrapper">
    <slot/>
  </div>
</template>

<style>
.article-head-wrapper {
  margin-left: 40px;
  margin-right: 40px;
}

.article-head-wrapper h1 {
  height: 36px;
}

.article-head-wrapper h1::selection {
  background-color: #d4ecff;
}

.article-head-wrapper h1[contenteditable] {
  outline: 0 solid transparent;
}
</style>