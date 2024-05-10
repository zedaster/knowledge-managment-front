<script lang="ts">
import {defineComponent} from "vue";
import {Modal} from "bootstrap";

export default defineComponent({
  props: {
    showing: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    sureLabel: {
      type: String,
      required: true
    },
    cancelLabel: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      modal: null as null | Modal
    }
  },

  emits: ['assure', 'update:showing'],

  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      // keyboard: false, // Optionally, you can customize the modal behavior
      // backdrop: false // Based on your requirements
    });

    (this.$refs.modal as any).addEventListener('hidden.bs.modal', (event) => {
      this.$emit('update:showing', false);
    });
  },

  beforeUnmount() {
    (this.modal as Modal).dispose();
  },

  methods: {
    onAssure() {
      this.$emit('assure');
      this.$emit('update:showing', false);
      (this.modal as Modal).hide();
    },
  },

  watch: {
    showing(newValue) {
      if (newValue) {
        (this.modal as Modal).show();
      } else {
        (this.modal as Modal).hide();
      }
    }
  }
});
</script>

<template>
  <div class="modal" ref="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot/>
        </div>
        <div class="modal-footer">
          <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">
            {{ cancelLabel }}
          </button>
          <button type="button" class="btn btn-sure" @click="onAssure">{{ sureLabel }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-sure {
  background-color: var(--accent);
  color: white;
}
</style>