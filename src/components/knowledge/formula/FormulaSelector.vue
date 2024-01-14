<script lang="ts">
import {defineComponent, PropType} from "vue";
import type Formula from "@/models/formula/Formula";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import {InternalSearchService} from "@/service/InternalSearchService";

export default defineComponent({
  components: {PlusIcon},
  props: {
    possibleOptions: {
      type: Object as PropType<Map<number, Formula>>,
      required: true,
    },
    selectedId: {
      type: Object as PropType<number | null>,
      required: true
    },
  },

  data() {
    return {
      showingOptions: Array.from(this.possibleOptions.values()),
      searchText: '',
    }
  },

  emits: ['update:selectedId'],

  computed: {
    dropdownLabel() {
      if (this.selectedId === null) {
        return 'Не выбрано'
      }
      return this.possibleOptions.get(this.selectedId).title
    }
  },

  methods: {
    onSelect(formula: Formula) {
      this.$emit('update:selectedId', formula.id)
    }
  },

  watch: {
    searchText(newValue) {
      this.showingOptions = new InternalSearchService()
          .search(newValue, this.possibleOptions.values(), (f: Formula) => f.title, 20);
    }
  }
})
</script>

<template>
  <div class="dropdown">
    <button class="btn btn-outline-dark dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false">
      <span>{{ this.dropdownLabel }}</span>
    </button>
    <div class="dropdown-menu">
      <div class="mx-2 my-2">
        <input type="text"
               class="form-control"
               v-model="searchText"
               placeholder="Название формулы">
      </div>
      <div v-for="formula in showingOptions"
           class="dropdown-item"
           @click="() => onSelect(formula)">
        {{ formula.title }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-menu {
  cursor: pointer;
}
</style>