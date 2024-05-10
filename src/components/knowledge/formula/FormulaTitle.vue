<script lang="ts">

import EditIcon from "@/components/icons/EditIcon.vue";
import {defineComponent, ref} from "vue";
import CancelIcon from "@/components/icons/CancelIcon.vue";
import SaveIcon from "@/components/icons/SaveIcon.vue";
import {SpaceCleanService} from "@/service/SpaceCleanService";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";

/**
 * Component with editable title of a specific formula
 */
export default defineComponent({
  components: {RemoveIcon, SaveIcon, CancelIcon, EditIcon},

  props: {
    /**
     * Reactive title of the specific formula. May be passed though v-model
     */
    modelValue: {
      type: String,
      required: true,
    },

    /**
     * Possibility to edit the title
     */
    editable: {
      type: Boolean,
      required: true,
    }
  },

  data() {
    return {
      isEditIconShown: false,
      isEditing: false,
      currentTitle: this.modelValue,
      canBeSaved: true,
    }
  },

  emits: ['update:modelValue', 'remove'],

  setup() {
    const titleContainer = ref<HTMLHeadingElement>();
    return {titleContainer}
  },

  methods: {
    onMouseOver() {
      this.isEditIconShown = true;
    },
    onMouseLeave() {
      this.isEditIconShown = false;
    },
    startEditing() {
      this.isEditing = true;
      setTimeout(() => {
        this.titleContainer?.focus();
      }, 50);
    },
    save() {
      this.isEditing = false;
      this.currentTitle = new SpaceCleanService().trimAndFormatMultiSpaces(this.currentTitle);
      this.$emit('update:modelValue', this.currentTitle);
    },
    cancelEditing() {
      this.currentTitle = this.modelValue;
      this.isEditing = false;
    },
    onTitleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }

    },
    onTitleInput(event) {
      this.currentTitle = event.target.innerText;

      const cleanSpacedValue: string = new SpaceCleanService().trimAndFormatMultiSpaces(event.target.innerText);

      if (cleanSpacedValue.length !== 0) {
        this.canBeSaved = true;
        return;
      }

      this.canBeSaved = false;
    },
    remove() {
      this.$emit('remove');
    }
  },
})
</script>

<template>
  <div class="row gx-1" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
    <div class="col d-flex flex-row mb-2">
      <h2
          ref="titleContainer"
          @input="onTitleInput"
          @keydown="onTitleKeyDown"
          :contenteditable="this.isEditing"
      >
        {{ this.currentTitle }}
      </h2>
      <div class="d-flex align-items-center gap-1" v-if="this.editable && this.isEditIconShown && !isEditing">
        <EditIcon class="edit-icon" @click="startEditing"/>
        <RemoveIcon class="edit-icon" @click="remove"/>
      </div>
    </div>

    <div v-if="isEditing" class="col d-flex justify-content-end mb-1">
      <button @click="save" type="button" class="btn tool-btn" :disabled="!canBeSaved">
        <SaveIcon/>
      </button>
      <button @click="cancelEditing" type="button" class="btn tool-btn ms-1">
        <CancelIcon/>
      </button>
    </div>
  </div>
</template>

<style scoped>
h2 {
  padding-right: 5px;
  margin: 0;
}

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
</style>