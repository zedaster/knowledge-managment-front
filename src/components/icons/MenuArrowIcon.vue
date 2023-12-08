<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  props: {
    isActive: {
      type: Object as PropType<boolean>,
      default: false
    },
    isExpanded: {
      type: Object as PropType<boolean>,
      default: false
    }
  },
  computed: {
    svgClass() {
      let clazz = 'icon';
      if (this.isActive) {
        clazz += ' icon-active'
      }
      return clazz
    }
  }
})
</script>

<template>
  <svg v-if="!isExpanded" xmlns="http://www.w3.org/2000/svg" width="6" height="10"
       viewBox="0 0 6 10" fill="none">
    <path :class="svgClass" d="M0 10L6 5L0 0L0 10Z" />
  </svg>
  <svg v-if="isExpanded" xmlns="http://www.w3.org/2000/svg" width="10" height="6"
       viewBox="0 0 10 6" fill="none">
    <path :class="svgClass" d="M0 0L5 6L10 0L0 0Z" />
  </svg>
</template>

<style scoped>
.icon {
  fill: black;
}

.icon-active {
  fill: var(--accent)
}

</style>