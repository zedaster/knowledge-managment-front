<script lang="ts">

import MenuArrowIcon from "@/components/icons/MenuArrowIcon.vue";
import {defineComponent} from "vue";
import type {PropType} from "vue";
import type {ArticleTree} from "@/models/article/ArticleTree";

export default defineComponent({
  components: {MenuArrowIcon},
  props: {
    level: {
      type: Object as PropType<number>,
      default: 0
    },
    tree: {
      type: Object as PropType<ArticleTree>,
      required: true,
    },
    selectedId: {
      type: Object as PropType<number>,
      required: true,
    }
  },
  methods: {
    isActive(id: number): boolean {
      return id === this.selectedId
    },
    isExpanded(id: number): boolean {
      return id <= this.selectedId && (this.tree.parentIds.includes(id));
    }
  },
})
</script>

<template>
  <ul class="nav flex-column ms-2">
    <li class="nav-item my-1" v-for="link in tree.linksByLevel[level]">
      <RouterLink class="link" :to="{name: 'article', params: {id: link.id}}">
        <div class="nav-label">
          <div class="nav-icon">
            <MenuArrowIcon class="nav-icon" :is-active="isActive(link.id)" :is-expanded="isExpanded(link.id)"/>
          </div>
          <span :class="isActive(link.id) ? ['ms-2', 'nav-title-active'] : ['ms-2']">{{ link.title }}</span>
        </div>
      </RouterLink>
      <ArticleMenu v-if="this.isExpanded(link.id)"
                   :tree="tree"
                   :level="level+1"
                   :selected-id="selectedId"/>
    </li>

  </ul>
</template>

<style scoped>
.link {
  text-decoration: none;
}

.nav-label {
  display: flex;
  align-items: center;
  color: black;
}

.nav-title-active {
  color: var(--accent);
}

.nav-icon {
  align-self: start;
}
</style>