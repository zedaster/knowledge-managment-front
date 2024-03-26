<script lang="ts">
import {defineComponent, PropType} from "vue";
import EditorJS from '@editorjs/editorjs';

/**
 * Component to show or edit content of a specific article
 */
export default defineComponent({
  props: {
    editable: {
      default: false,
      type: Boolean
    },
    content: {
      type: Object as PropType<any>,
      required: true
    }
  },

  emits: ['update:content'],

  mounted() {
    const vueEmit = this.$emit
    const editor = new EditorJS({
      /**
       * Enable/Disable the read only mode
       */
      readOnly: !this.editable,

      /**
       * Wrapper of Editor
       */
      holder: 'editorjs',

      tools: {},

      data: this.content,

      defaultBlock: 'embed',

      onChange: !this.editable ? null : function (api, event) {
        editor.save().then((savedData) => {
          vueEmit('update:content', savedData)
        })
      }
    })
  },
})
</script>

<template>
  <div id="editorjs"></div>
</template>

<style scoped>

</style>