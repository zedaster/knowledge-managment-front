<script>
import {defineComponent, h} from 'vue';
import FormulaContainer from '@/components/knowledge/formula/FormulaContainer.vue';

export default defineComponent({
  components: {
    FormulaContainer
  },

  props: {
    html: {
      type: String,
      required: true
    }
  },

  computed: {
    dynamicComponent() {
      const rawHtml = this.html.replace(
          /<FormulaContainer formula-id="(\d+)"\s*\/>/g,
          '<FormulaContainer formula-id="$1"></FormulaContainer>');

      return defineComponent({
        render() {
          // Обработка HTML и создание массива vnodes
          const vNodes = [];

          // Простой парсер для демонстрации - требуется более сложная обработка реального HTML
          // Возможно, это надо будет заменить на настоящий парсер, если HTML сложный
          const doc = new DOMParser().parseFromString(rawHtml, 'text/html');

          doc.body.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
              vNodes.push(h("p", {
                innerText: node.textContent,
                class: "my-2"
              }));
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName.toLowerCase() === 'formulacontainer') {
                // Динамически рендерим компонент FormulaContainer
                let props = {
                  class: "my-2"
                };
                for (const attr of node.attributes) {
                  props[attr.name] = attr.value;
                }
                vNodes.push(h(FormulaContainer, props));
              } else {
                // Просто рендерим HTML тег
                vNodes.push(h(node.tagName.toLowerCase(), {
                  innerHTML: node.innerHTML,
                  class: "my-2"
                }));
              }
            }
          });

          return h('div', vNodes);
        },
        props: ['content']
      });
    }
  }
});
</script>

<template>
  <div>
    <component :is="dynamicComponent"/>
  </div>
</template>

<style scoped>
/* Ваши стили */
</style>