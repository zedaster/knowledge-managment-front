<script lang="ts">

import {defineComponent, PropType, toRaw} from "vue";
import Formula from "@/models/formula/Formula";
import FormulaSelector from "@/components/knowledge/formula/FormulaSelector.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import CancelIcon from "@/components/icons/CancelIcon.vue";
import SaveIcon from "@/components/icons/SaveIcon.vue";

/**
 * Component to manage dependency formulas of a single formula.
 */
export default defineComponent({
  components: {SaveIcon, CancelIcon, EditIcon, PlusIcon, FormulaSelector},

  props: {
    /**
     * Current dependencies of a formula
     */
    modelValue: {
      type: Object as PropType<Record<string, number>>,
      required: true,
    },

    /**
     * All possible dependency variables
     */
    possibleVariables: {
      type: Array<String>,
      required: true
    },

    /**
     * All possible dependency formulas
     */
    dependencyOptions: {
      type: Object as PropType<Array<Formula>>,
      required: true
    },
  },

  data() {
    return {
      dependencies: structuredClone(toRaw(this.modelValue)) as Record<string, number | null>,
      dependencyOptionsMap: new Map(this.dependencyOptions.map(obj => [obj.id, obj])),
      isEditing: false,
      isEditIconShown: false,
      canBeSaved: true,
      addVariable: null as null | string
    }
  },

  emits: ['update:modelValue'],

  mounted() {
    this.resetAddVariable();
  },

  computed: {
    isAddingPossible() {
      return Object.keys(this.dependencies).length < this.possibleVariables.length;
    },
    availableAddOptions() {
      const usingKeySet = new Set(Object.keys(this.dependencies));
      return this.possibleVariables.filter(v => !usingKeySet.has(v))
    }
  },

  methods: {
    selectDependency(variable: string, formulaId: number) {
      this.dependencies[variable] = formulaId
      if (!this.canBeSaved) {
        if (Object.values(this.dependencies).every((v) => v !== null)) {
          this.canBeSaved = true;
        }
      }
    },

    addDependency() {
      this.dependencies[this.addVariable] = null;
      this.canBeSaved = false;
      this.resetAddVariable();
    },

    removeDependency(variable: string) {
      delete this.dependencies[variable];
      this.resetAddVariable();
    },

    startEditing() {
      this.isEditing = true;
    },

    save() {
      this.isEditing = false;
      this.$emit('update:modelValue', Object.assign({}, this.dependencies))
    },

    cancelEditing() {
      this.isEditing = false;
      this.dependencies = structuredClone(toRaw(this.modelValue))
    },

    onMouseOver() {
      this.isEditIconShown = true;
    },

    onMouseLeave() {
      this.isEditIconShown = false;
    },

    resetAddVariable() {
      const addOptions = this.availableAddOptions;
      if (addOptions.length > 0) {
        this.addVariable = addOptions[0];
      } else {
        this.addVariable = null;
      }
    },

    onChangeAddVariable(event) {
      this.addVariable = event.target.value;
    }
  }

})
</script>

<template>
  <div @mouseover="onMouseOver" @mouseleave="onMouseLeave">
    <div class="row">
      <div class="col-auto d-flex flex-row mb-2">
        <h3 class="mb-0 me-1">Обозначения</h3>
        <div class="d-flex align-items-center" :class="this.isEditIconShown ? '' : 'd-none'">
          <EditIcon v-if="!isEditing" class="edit-icon" @click="startEditing"/>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 gy-2">
      <!-- Container with a dependency -->
      <div v-for="(value, key) in dependencies" class="col">
        <div class="row gx-0">
          <!-- Variable -->
          <div class="col-1 d-flex justify-content-center align-items-center">
            <span class="formula-letter">{{ key }}</span>
          </div>

          <!-- Separator -->
          <div class="col-auto d-flex align-items-center">
            <span>—</span>
          </div>

          <!-- Selector of dependency formula -->
          <div class="col-auto d-flex align-items-center ms-3 me-1">
            <FormulaSelector
                v-if="isEditing"
                :possible-options="dependencyOptionsMap"
                :selectedId="value"
                @update:selectedId="(newId) => selectDependency(key, newId)"/>
            <span v-if="!isEditing">{{ this.dependencyOptionsMap.get(value).title }}</span>
          </div>

          <!-- Remove button -->
          <div class="col-auto" v-if="isEditing">
            <button @click="() => removeDependency(key)" type="button" class="btn tool-btn">
              <CancelIcon/>
            </button>
          </div>
        </div>
      </div>

      <div class="col" v-if="isEditing && isAddingPossible">
        <div class="row gx-1">
          <div class="col-auto">
            <select class="form-select" aria-label="Обозначение" @change="onChangeAddVariable">
              <option v-for="(posVar, index) in availableAddOptions"
                      :value="posVar"
                      :selected="index == 0">
                {{ posVar }}
              </option>
            </select>
          </div>
          <div class="col-auto">
            <button class="btn tool-btn" @click="addDependency">
              <PlusIcon/>
            </button>
          </div>
        </div>
      </div>

      <div v-if="isEditing" class="col d-flex mb-1">
        <button @click="save" type="button" class="btn tool-btn" :disabled="!canBeSaved">
          <SaveIcon/>
        </button>
        <button @click="cancelEditing" type="button" class="btn tool-btn ms-1">
          <CancelIcon/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-icon {
  color: var(--muted);
}

.edit-icon:hover {
  color: black;
  cursor: pointer;
}

.tool-btn {
  background-color: var(--accent);
  color: white;
  height: 100%;
}

.tool-btn:hover {
  background-color: var(--muted);
}

.formula-letter {
  font-size: 1rem;
}
</style>