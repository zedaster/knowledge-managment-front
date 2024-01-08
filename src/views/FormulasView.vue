<script lang="ts">

import KnowledgeLayout from "@/views/KnowledgeLayout.vue";
import FormulaRow from "@/components/knowledge/formula/FormulaRow.vue";
import {defineComponent} from "vue";
import {FormulaApi} from "@/api/FormulaApi";
import type Formula from "@/models/formula/Formula";
import {DependencyOptionsService} from "@/service/formula/DependencyOptionsService";
import AddButton from "@/components/knowledge/AddButton.vue";

/**
 * Page to manage formulas
 */
export default defineComponent({
  components: {AddButton, FormulaRow, KnowledgeLayout},

  data() {
    return {
      api: new FormulaApi(),
      isLoaded: false,
      formulas: new Array<Formula>(),
      isAdding: false
    }
  },

  mounted(): void {
    this.api.getAll().then(formulas => {
      this.formulas = formulas;
      this.isLoaded = true;
    });
  },

  methods: {
    getDependencyOptions(formula: Formula): Array<Formula> {
      return new DependencyOptionsService().getPossibleDependencies(formula, this.formulas);
    },

    updateFormula(newFormula) {
      console.log("Formula is changed");
      console.log("New formula is " + JSON.stringify(newFormula));
      this.api.updateFormula(newFormula);
    },

    addFormula() {
      this.isAdding = true;
      this.api.addStandardFormula().then((newFormula) => {
        this.formulas.push(newFormula);
        this.isAdding = false;
      })
    },

    removeFormula(id: number) {
      this.api.removeFormula(id).then(() => {
        this.formulas = this.formulas.filter((formula) => formula.id !== id);
      })
    }
  },
})
</script>

<template>
  <KnowledgeLayout>
    <h1>Формулы</h1>
    <br>
    <div v-if="!isLoaded">
      <p>Loading...</p>
    </div>
    <div v-if="isLoaded" class="row row-cols-1 gy-3">
      <FormulaRow v-for="formula in this.formulas"
                  :formula="formula"
                  @update="updateFormula"
                  @remove="() => removeFormula(formula.id)"
                  :dependency-options="getDependencyOptions(formula)">
      </FormulaRow>
    </div>
    <br/>
    <div class="row justify-content-center">
      <div class="col col-auto">
        <AddButton @click="addFormula" :disabled="isAdding">Добавить формулу</AddButton>
      </div>
    </div>
  </KnowledgeLayout>
</template>

<style scoped>

</style>