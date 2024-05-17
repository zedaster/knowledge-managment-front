<script lang="ts">

import KnowledgeLayout from "@/views/KnowledgeLayout.vue";
import FormulaRow from "@/components/knowledge/formula/FormulaRow.vue";
import {defineComponent} from "vue";
import {FormulaApi} from "@/api/FormulaApi";
import type Formula from "@/models/formula/Formula";
import {DependencyOptionsUtils} from "@/utils/formula/DependencyOptionsUtils";
import AddButton from "@/components/knowledge/AddButton.vue";
import NavBar from "@/components/nav/NavBar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {useUserStore} from "@/store/UserStore";

/**
 * Page to manage formulas
 */
export default defineComponent({
  components: {LoadingSpinner, NavBar, AddButton, FormulaRow, KnowledgeLayout},

  data() {
    return {
      editApi: new FormulaApi(),
      userStorage: useUserStore(),

      isLoaded: false,
      formulas: new Array<Formula>(),
      isAdding: false
    }
  },

  mounted(): void {
    this.editApi.getAll().then(formulas => {
      this.formulas = formulas;
      this.isLoaded = true;
    });
  },

  computed: {
    canUserEdit() {
      return this.userStorage.canEdit();
    }
  },

  methods: {
    getDependencyOptions(formula: Formula): Array<Formula> {
      return new DependencyOptionsUtils().getPossibleDependencies(formula, this.formulas);
    },

    updateFormula(newFormula) {
      this.editApi.updateFormula(newFormula).then((formulaWithResult) => {
        const index = this.formulas.findIndex((f: Formula) => f.id === formulaWithResult.id)
        this.formulas[index] = formulaWithResult
      })
    },

    addFormula() {
      this.isAdding = true;
      this.editApi.addStandardFormula().then((newFormula) => {
        this.formulas.push(newFormula);
        this.isAdding = false;
      })
    },

    removeFormula(id: number) {
      this.editApi.removeFormula(id).then(() => {
        this.formulas = this.formulas.filter((formula) => formula.id !== id);
      })
    },
  },
})
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <KnowledgeLayout>
    <h1>Формулы</h1>
    <br>
    <div v-if="!isLoaded">
      <LoadingSpinner/>
    </div>
    <div v-if="isLoaded" class="row row-cols-1 gy-3">
      <FormulaRow v-if="canUserEdit"
                  v-for="formula in this.formulas"
                  :formula="formula"
                  :is-editable="true"
                  @update="updateFormula"
                  @remove="() => removeFormula(formula.id)"
                  :dependency-options="getDependencyOptions(formula)">
      </FormulaRow>
      <FormulaRow v-else
                  v-for="formula in this.formulas"
                  :formula="formula"
                  :dependency-options="getDependencyOptions(formula)"
                  :is-editable="false">
      </FormulaRow>
    </div>
    <br/>
    <div v-if="canUserEdit" class="row justify-content-center">
      <div class="col col-auto">
        <AddButton @click="addFormula" :disabled="isAdding">Добавить формулу</AddButton>
      </div>
    </div>
  </KnowledgeLayout>
</template>

<style scoped>

</style>