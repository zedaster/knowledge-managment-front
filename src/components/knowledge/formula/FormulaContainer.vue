<script lang="ts">
import {defineComponent} from "vue";
import FormulaField from "@/components/knowledge/formula/FormulaField.vue";
import {FormulaApi} from "@/api/FormulaApi";
import type Formula from "@/models/formula/Formula";
import FormulaDependencies from "@/components/knowledge/formula/FormulaDependencies.vue";
import {DependencyVariablesUtils} from "@/utils/formula/DependencyVariablesUtils";

const variableService = new DependencyVariablesUtils();
export default defineComponent({
  components: {FormulaDependencies, FormulaField},

  props: {
    formulaId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      api: new FormulaApi(),
      formula: null as null | Formula,
    }
  },

  mounted() {
    this.api.getOneById(this.formulaId).then((formula: Formula) => {
      this.formula = formula;
    })
  },

  watch: {
    formula(newValue) {
      // @ts-ignore
      console.log("Update formula " + newValue.formula)
      if (newValue.result && variableService.hasDependencies(newValue.formula)) {
        // @ts-ignore
        this.$refs.mathField.value = newValue.formula + "=" + newValue.result;
      } else {
        // @ts-ignore
        this.$refs.mathField.value = newValue.formula;
      }
    }
  },
})
</script>

<template>
  <div class="row gx-1">
    <div class="col">
      <math-field ref="mathField" :contenteditable="false"></math-field>
    </div>
  </div>
</template>

<style scoped>
math-field {
  font-size: 1.2rem;
  width: 100%;
}

math-field::part(menu-toggle), math-field::part(virtual-keyboard-toggle), math-field::part(keyboard-sink) {
  color: red;
}

math-field::part(menu-toggle):hover, math-field::part(virtual-keyboard-toggle):hover {
  color: var(--muted);
}
</style>