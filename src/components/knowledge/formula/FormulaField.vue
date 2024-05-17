<script lang="ts">
import EditIcon from "@/components/icons/EditIcon.vue";
import {defineComponent, PropType} from "vue";
import SaveIcon from "@/components/icons/SaveIcon.vue";
import CancelIcon from "@/components/icons/CancelIcon.vue";
import {DependencyVariablesUtils} from "@/utils/formula/DependencyVariablesUtils";
import AssuranceModal from "@/components/modal/AssuranceModal.vue";

const variableService = new DependencyVariablesUtils();

/**
 * Special field with formula value and its result
 */
export default defineComponent({
  components: {AssuranceModal, SaveIcon, EditIcon, CancelIcon},

  props: {
    editable: {
      type: Boolean,
      default: false
    },

    /**
     * Reactive value of the formula. May be passed though v-model
     */
    modelValue: {
      type: String,
      required: true,
    },

    /**
     * Result of the formula
     */
    result: {
      type: null as PropType<null | number>,
      default: null
    },

    /**
     * If one of the variables is removed then user gets warning before saving
     */
    warnVariables: {
      type: Array<String>,
      default: [],
    }
  },

  data() {
    return {
      isEditing: false,
      oldValue: '',
      newValue: this.modelValue,
      canBeSaved: false,
      lostDependenciesModalShowing: false,
      lostDependencies: [],
    };
  },

  emits: ['update:modelValue'],

  mounted() {
    this.setDomShowingParams(this.modelValue, this.result);
  },

  methods: {
    editContent() {
      this.oldValue = this.modelValue;
      this.setDomShowingParams(this.oldValue, null);
      this.isEditing = true;
    },

    cancelEditing() {
      this.isEditing = false;
      this.newValue = this.oldValue;
      this.setDomShowingParams(this.oldValue, this.result);
    },

    save() {
      this.updateLostDependencies();
      if (this.lostDependencies.length !== 0) {
        this.lostDependenciesModalShowing = true;
        return;
      }
      this.produceSaving();
    },

    sureSave() {
      this.lostDependencies = [];
      this.lostDependenciesModalShowing = false;
      this.produceSaving();
    },

    produceSaving() {
      this.canBeSaved = false;
      //this.setDomShowingParams(this.newValue);
      this.$emit('update:modelValue', this.newValue);
      this.isEditing = false;
    },

    /**
     * Sets current showingValue as value to math-field DOM element
     */
    setDomShowingParams(formula: string, result: number | null) {
      if (!this.isEditing && result && variableService.hasDependencies(formula)) {
        (this.$refs.mathField as any).value = formula + "=" + result;
      } else {
        (this.$refs.mathField as any).value = formula;
      }
    },

    onInput(event) {
      this.newValue = event.target.value;
      this.canBeSaved = (event.target.value !== '');
    },

    updateLostDependencies(): void {
      this.lostDependencies = new DependencyVariablesUtils()
          .getLostDependencies(this.newValue, this.warnVariables);
    }
  },

  watch: {
    result(newValue) {
      this.setDomShowingParams(this.modelValue, newValue)
    },
  }
})

</script>

<template>
  <div class="row gx-1">
    <div class="col">
      <math-field :contenteditable="isEditing"
                  @input="onInput"
                  ref="mathField">
      </math-field>
    </div>

    <div v-if="editable && !isEditing" class="col-auto">
      <button @click="editContent" type="button" class="btn tool-btn">
        <EditIcon/>
      </button>
    </div>

    <div v-if="isEditing" class="col-auto">
      <button @click="save"
              :disabled="!canBeSaved"
              type="button"
              class="btn tool-btn">
        <SaveIcon/>
      </button>
    </div>

    <div v-if="isEditing" class="col-auto">
      <button @click="cancelEditing" type="button" class="btn tool-btn">
        <CancelIcon/>
      </button>
    </div>

  </div>

  <AssuranceModal
      v-model:showing="lostDependenciesModalShowing"
      title="Отвязка переменных"
      sure-label="Сохранить"
      cancel-label="Отменить"
      @assure="sureSave">
    <p>Обозначения для переменных <b>{{ this.lostDependencies.join(", ") }}</b> будут отвязаны. Уверены, что хотите
      сохранить измененную формулу?</p>
  </AssuranceModal>
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

.tool-btn {
  background-color: var(--accent);
  color: white;
  height: 100%;
}

.tool-btn:hover {
  background-color: var(--muted);
}
</style>