<script lang="ts">

import {defineComponent} from "vue";
import SiteButton from "@/components/SiteButton.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";

export default defineComponent({
  components: {PlusIcon, SiteButton},
  data() {
    return {
      isMouseOver: false
    }
  },
  computed: {
    color() {
      return this.isMouseOver ? "var(--accent)" : "white";
    }
  },
  methods: {
    toggleOver() {
      this.isMouseOver = !this.isMouseOver
    }
  }
})
</script>

<template>
  <SiteButton @mouseover="toggleOver" @mouseleave="toggleOver">
    <PlusIcon class="me-1" :color="color" />Новая статья
  </SiteButton>
</template>

<style scoped>

</style>