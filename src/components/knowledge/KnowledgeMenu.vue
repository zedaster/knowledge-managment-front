<script lang="ts">
import {Component, defineComponent, PropType} from "vue";
import ArticleMenu from "@/components/knowledge/ArticleMenu.vue";
import AddButton from "@/components/knowledge/AddButton.vue";
import HomeMenuIcon from "@/components/icons/HomeMenuIcon.vue";
import ArticlesMenuIcon from "@/components/icons/ArticlesMenuIcon.vue";
import {ArticleTree} from "@/models/article/ArticleTree";
import FormulaMenuIcon from "@/components/icons/FormulaMenuIcon.vue";
import router from "@/router";
import {useUserStore} from "@/store/UserStore";
import AdminMenuIcon from "@/components/icons/AdminMenuIcon.vue";

/**
 * Type for a navigation item
 */
type NavItem = {
  /**
   * Title for navigation item
   */
  title: string,

  /**
   * Icon svg component for the item
   */
  icon: Component,

  /**
   * String id of route. See {@link router}
   */
  route: string,

  /**
   * Is nav item hidden (defalut behavior: it is visible)
   */
  hidden?: boolean,
}

/**
 * Menu on the left side of {@link KnowledgeLayout}
 */
export default defineComponent({
  components: {ArticlesMenuIcon, HomeMenuIcon, AddButton, ArticleMenu},

  props: {
    tree: {
      type: Object as PropType<ArticleTree>,
      default: null
    },
    selectedId: {
      type: Object as PropType<number | undefined>,
      required: true,
    }
  },

  data() {
    const userStorage = useUserStore();

    return {
      /**
       * Contains items for the menu
       */
      navItems: <NavItem[]>[
        {
          title: 'Главная',
          icon: HomeMenuIcon,
          route: 'home'
        },
        {
          title: 'Администратор',
          icon: AdminMenuIcon,
          route: 'admin',
          hidden: !userStorage.isAdmin(),
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
      ],

      /**
       * User storage
       */
      userStorage
    }
  },

  computed: {
    visibleNavItems() {
      return this.navItems.filter((item) => !item.hidden)
    },
    canUserEdit() {
      return this.userStorage.canEdit()
    }
  },

  methods: {
    /**
     * Opens add article page
     */
    openAddArticlePage() {
      router.push({name: 'add_article', params: {parentId: this.selectedId}})
    },
  }
})
</script>

<template>
  <ul class="nav nav-pills flex-column">
    <li class="nav-item" v-for="item in visibleNavItems">
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
  <AddButton v-if="canUserEdit" class="w-100" @click="openAddArticlePage">Новая статья</AddButton>
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