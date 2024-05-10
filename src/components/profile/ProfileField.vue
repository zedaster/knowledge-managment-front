<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
  <p><b>{{ title }}</b> : {{ value }}</p>
</template>

<style scoped>

</style>