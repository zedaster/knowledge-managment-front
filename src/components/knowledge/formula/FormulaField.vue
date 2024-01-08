<script lang="ts">
import EditIcon from "@/components/icons/EditIcon.vue";
import {defineComponent} from "vue";
import SaveIcon from "@/components/icons/SaveIcon.vue";
import CancelIcon from "@/components/icons/CancelIcon.vue";
import {DependencyVariablesService} from "@/service/formula/DependencyVariablesService";
import AssuranceModal from "@/components/modal/AssuranceModal.vue";

/**
 * Special field with formula value and its result
 */
export default defineComponent({
  components: {AssuranceModal, SaveIcon, EditIcon, CancelIcon},

  props: {
    contentEditable: {
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
    this.setDomShowingValue(this.modelValue);
  },

  methods: {
    editContent() {
      this.oldValue = (this.$refs.mathField as any).value;
      this.isEditing = true;
    },

    cancelEditing() {
      this.isEditing = false;
      this.newValue = this.oldValue;
      this.setDomShowingValue(this.oldValue);
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
      this.setDomShowingValue(this.newValue);
      this.$emit('update:modelValue', this.newValue);
      this.isEditing = false;
    },

    /**
     * Sets current showingValue as value to math-field DOM element
     */
    setDomShowingValue(value: string) {
      (this.$refs.mathField as any).value = value;
    },

    onInput(event) {
      this.newValue = event.target.value;
      this.canBeSaved = (event.target.value !== '');
    },

    updateLostDependencies(): void {
      console.log('Updating lost dependencies')
      this.lostDependencies = new DependencyVariablesService()
          .getLostDependencies(this.newValue, this.warnVariables);
      console.log(`Lost dependencies are ${this.lostDependencies}`)
    }
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

    <div v-if="contentEditable && !isEditing" class="col-auto">
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