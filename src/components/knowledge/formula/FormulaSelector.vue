<script lang="ts">
import {defineComponent} from "vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import {InternalSearchService} from "@/service/InternalSearchService";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {FormulaApi} from "@/api/FormulaApi";

/**
 * Button with dropdown menu to select a formula among all available.
 * The component uses {@link FormulaApi#getTitleMap} to load options.
 */
export default defineComponent({
  components: {LoadingSpinner, PlusIcon},
  props: {
    readOnly: Boolean
  },

  data() {
    return {
      formulaApi: new FormulaApi(),
      isLoading: true,
      possibleOptions: null as null | Map<number, string>,
      selectedId: null as null | number,
      showingOptions: null as null | Iterable<[number, string]>,
      searchText: '',
    }
  },

  emits: ['update:selectedId'],

  mounted() {
    if (!this.readOnly || this.selectedId) {
      this.formulaApi.getTitleMap().then((titleMap: Map<number, string>) => {
        this.possibleOptions = titleMap;
        this.showingOptions = Array.from(titleMap);
        this.isLoading = false;
      })
    } else {
      this.isLoading = false;
    }

  },

  computed: {
    dropdownLabel() {
      if (this.selectedId === null) {
        return 'Выберите формулу'
      }
      return this.possibleOptions!.get(this.selectedId)
    }
  },

  methods: {
    onSelectOption(option: [number, string]) {
      const newId = option[0]
      this.selectedId = newId
      this.$emit('update:selectedId', newId)
    }
  },

  watch: {
    searchText(newSearchQuery) {
      this.showingOptions = new InternalSearchService().search(
          newSearchQuery,
          this.possibleOptions!.entries(),
          (entry: [number, string]) => entry[1],
          20);
    }
  }
})
</script>

<template>
  <div class="dropdown">
    <!-- Dropdown button -->
    <button class="btn btn-outline-dark dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :disabled="readOnly || isLoading">
      <LoadingSpinner small v-if="isLoading"/>
      <span v-else>{{ this.dropdownLabel }}</span>
    </button>

    <!-- Dropdown menu under the button -->
    <div class="dropdown-menu" v-if="!isLoading">
      <div class="mx-2 my-2">
        <input type="text"
               class="form-control"
               v-model="searchText"
               placeholder="Название формулы">
      </div>
      <div v-for="option in showingOptions"
           class="dropdown-item"
           @click="() => onSelectOption(option)">
        <!-- Title of the formula -->
        {{ option[1] }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-menu {
  cursor: pointer;
}
</style>