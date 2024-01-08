<script lang="ts">
import {defineComponent, PropType} from "vue";
import MenuArrowIcon from "@/components/icons/MenuArrowIcon.vue";
import ArticleMenu from "@/components/knowledge/ArticleMenu.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import AddButton from "@/components/knowledge/AddButton.vue";
import HomeMenuIcon from "@/components/icons/HomeMenuIcon.vue";
import ArticlesMenuIcon from "@/components/icons/ArticlesMenuIcon.vue";
import {ArticleTree} from "@/models/article/ArticleTree";
import FormulaMenuIcon from "@/components/icons/FormulaMenuIcon.vue";
import router from "@/router";

export default defineComponent({
  components: {ArticlesMenuIcon, HomeMenuIcon, AddButton, PlusIcon, ArticleMenu, MenuArrowIcon},

  props: {
    tree: {
      type: Object as PropType<ArticleTree>,
      default: null
    },
    selectedId: {
      type: Object as PropType<number>,
      required: true,
    }
  },

  data() {
    return {
      navItems: [
        {
          title: 'Главная',
          icon: HomeMenuIcon,
          route: 'home'
        },
        {
          title: 'Формулы',
          icon: FormulaMenuIcon,
          route: 'formulas'
        },
        {
          title: 'Статьи',
          icon: ArticlesMenuIcon,
          route: 'article'
        }
      ]
    }
  },

  methods: {
    openAddArticlePage() {
      router.push({name: 'add_article'})
    }
  }
})
</script>

<template>
  <ul class="nav nav-pills flex-column">
    <li class="nav-item" v-for="item in navItems">
      <RouterLink
          :to="{name: item.route}"
          :class="['nav-link', { 'active' : this.$route.name === item.route }]"
      >
        <component
            :is="item.icon" class="me-2"
            :color="this.$route.name === item.route ? 'white' : 'black'">
        </component>
        {{ item.title }}
      </RouterLink>
    </li>
    <ArticleMenu v-if="this.tree != null"
                 class="my-2"
                 :tree="tree"
                 :selected-id="selectedId" />
  </ul>
  <div class="spacer"></div>
  <AddButton class="w-100" @click="openAddArticlePage">Новая статья</AddButton>
</template>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  color: black;
  border-radius: 10px;
}

.nav-link.active {
  color: white;
  background-color: black;
}

.spacer {
  flex: 1;
  min-height: 10px;
}

</style>