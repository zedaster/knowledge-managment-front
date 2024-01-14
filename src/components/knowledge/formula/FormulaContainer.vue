<script lang="ts">
import {defineComponent} from "vue";
import FormulaField from "@/components/knowledge/formula/FormulaField.vue";
import {FormulaApi} from "@/api/FormulaApi";
import type Formula from "@/models/formula/Formula";
import FormulaDependencies from "@/components/knowledge/formula/FormulaDependencies.vue";

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
      formula: null as null | Formula
    }
  },

  mounted() {
    this.api.getOneById(this.formulaId).then((formula: Formula) => {
      this.formula = formula;
    })
  }
})
</script>

<template>
  <div contenteditable="false">
    <FormulaField v-if="formula != null"
                  :modelValue="formula!.formula"
                  :result="formula!.result"
                  :content-editable="false"/>
  </div>

  <!--  <FormulaDependencies v-model="formula!.dependencies"-->
  <!--                       :possible-variables="possibleVariables"-->
  <!--                       :dependency-options="dependencyOptions"/>-->
</template>

<style scoped>

</style>