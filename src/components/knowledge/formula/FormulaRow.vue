<script lang="ts">
import {defineComponent, PropType, watch} from "vue";
import "mathlive"
import FormulaField from "@/components/knowledge/formula/FormulaField.vue";
import FormulaTitle from "@/components/knowledge/formula/FormulaTitle.vue";
import FormulaDependencies from "@/components/knowledge/formula/FormulaDependencies.vue";
import Formula from "@/models/formula/Formula";
import {DependencyVariablesService} from "@/service/formula/DependencyVariablesService";
import AssuranceModal from "@/components/modal/AssuranceModal.vue";

/**
 * Block that contains title, editable content and dependencies of a specific formula
 */
export default defineComponent({
  components: {AssuranceModal, FormulaDependencies, FormulaTitle, FormulaField},

  props: {
    /**
     * The specific formula
     */
    formula: {
      type: Object as PropType<Formula>,
      required: true,
    },

    /**
     * All possible dependency formulas for {@link this#formula}
     */
    dependencyOptions: {
      type: Object as PropType<Array<Formula>>,
      required: true
    }
  },

  data() {
    return {
      isRemoving: false,
    }
  },

  emits: ['update', 'remove'],

  setup(props, context) {
    const variableService = new DependencyVariablesService();

    watch(() => props.formula.title, () => {
      context.emit('update', props.formula);
    });

    const possibleVariables: string[] = variableService
        .extractPossibleVariables(props.formula.formula);
    return {possibleVariables, variableService};
  },

  mounted() {
    watch(() => this.formula.formula, () => {
      this.formula.dependencies = this.variableService
          .getSuitableDependencies(this.formula.formula, this.formula.dependencies);
      this.possibleVariables = this.variableService
          .extractPossibleVariables(this.formula.formula);
      this.$emit('update', this.formula);
    });
    watch(() => this.formula.dependencies, () => {
      this.$emit('update', this.formula);
    })
  },

  methods: {
    remove() {
      this.isRemoving = true;
    },

    sureRemove() {
      this.$emit('remove');
    }
  }

})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <FormulaTitle v-model="formula.title" @remove="remove"/>
      <!-- TODO Provide warn variables -->
      <!-- TODO Provide result -->
      <FormulaField v-model="formula.formula"
                    :result="formula.result"
                    :warn-variables="[]"
                    :content-editable="true"/>
      <br>
      <FormulaDependencies v-model="formula.dependencies"
                           v-if="possibleVariables.length !== 0"
                           :possible-variables="possibleVariables"
                           :dependency-options="dependencyOptions"/>

      <AssuranceModal title="Удаление формулы"
                      cancel-label="Отменить"
                      sure-label="Удалить"
                      v-model:showing="isRemoving"
                      @assure="sureRemove">
        <p>Вы действительно хотите удалить формулу <b>{{ this.formula.title }}</b></p>
      </AssuranceModal>
    </div>
  </div>
</template>

<style scoped>
</style>