<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import KnowledgeLayout from "@/views/KnowledgeLayout.vue";
import {ArticleApi} from "@/api/ArticleApi";
import type {Article} from "@/models/article/Article";
import NavBar from "@/components/nav/NavBar.vue";
import type {ArticleTree} from "@/models/article/ArticleTree";
import EditIcon from "@/components/icons/EditIcon.vue";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import AssuranceModal from "@/components/modal/AssuranceModal.vue";
import ArticleContent from "@/components/knowledge/ArticleContent.vue";
import ArticleHead from "@/components/knowledge/head/ArticleHead.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {TreeUpdateUtils} from "@/utils/TreeUpdateUtils";
import {useUserStore} from "@/store/UserStore";
import {FormatDateTimeUtil} from "@/utils/format/FormatDateTimeUtil";

/**
 * Util to get an updated tree
 */
const treeUpdateService = new TreeUpdateUtils();

const dateUtil = new FormatDateTimeUtil();

/**
 * Page of a specific article
 */
export default defineComponent({
  components: {
    LoadingSpinner,
    ArticleHead,
    ArticleContent,
    AssuranceModal,
    RemoveIcon,
    EditIcon,
    NavBar,
    KnowledgeLayout
  },

  props: {
    id: {
      type: Object as PropType<string | undefined>,
    }
  },

  data() {
    return {
      editApi: new ArticleApi(),
      userStorage: useUserStore(),

      tree: undefined as ArticleTree | undefined,
      article: undefined as Article | undefined,
      isLoading: true,
      isEditIconShown: false,
      isRemoveModalShown: false
    }
  },

  mounted() {
    // this.loadArticle()
    if (this.id) {
      // console.log("[ARTICLE] Loading a full tree")
      this.loadArticleWithFullTree(this.idToNumber!)
    } else {
      // console.log("[ARTICLE] Loading the root tree")
      this.loadRootTree()
    }

  },

  computed: {
    idToNumber() {
      if (this.id) {
        return Number.parseInt(this.id.toString());
      }
      return undefined;
    },

    canUserEdit() {
      return this.userStorage.canEdit();
    },

    strCreatedAt() {
      console.log("Created at is " + this.article!.createdAt)
      return dateUtil.stringifyDateWithMonthName(this.article!.createdAt)
    },
  },

  watch: {
    id(newId) {
      // console.log("[ARTICLE] Updating article and tree")
      this.updateArticleAndTree(this.idToNumber!)
    }
  },

  methods: {
    /**
     * Загружает корневое дерево статьей
     */
    loadRootTree() {
      this.isLoading = true;
      this.article = undefined;
      this.editApi.getRootTree().then((tree) => {
        this.tree = tree;
        this.isLoading = false;
      }).catch((e) => {
        console.log('root tree loading thrown an error')
        throw e
      })
    },

    /**
     * Загружает статью с полным деревом
     * @param id Id статьи
     */
    loadArticleWithFullTree(id: number) {
      this.isLoading = true;
      this.article = undefined;
      this.editApi.getArticleWithTree(id).then((articleWithTree) => {
        this.article = articleWithTree.article;
        this.tree = articleWithTree.tree;
        this.isLoading = false;
      }).catch((e) => {
        console.log('loadArticleWithFullTree thrown an error')
        throw e
      })
    },

    /**
     * Обновляет статью и только нужные пункты в меню
     * @param id
     */
    updateArticleAndTree(id: number) {
      this.isLoading = true;
      this.article = undefined;
      this.editApi.getArticleWithChildren(id).then((articleWithChildren) => {
        this.article = articleWithChildren.article;
        this.tree = treeUpdateService.getUpdatedTree(this.tree!, this.article!.id, articleWithChildren.childArticles)
        this.isLoading = false;
      }).catch(e => {
        console.log('updateArticleAndTree thrown an error')
        throw e
      })
    },

    onTitleMouseOver() {
      this.isEditIconShown = true;
    },

    onTitleMouseLeave() {
      this.isEditIconShown = false;
    },

    remove() {
      this.isRemoveModalShown = true;
    },

    sureRemove() {
      const id = this.article!.id;

      let redirectParams = {}
      if (this.article!.articleParentId) {
        redirectParams = {name: 'article', params: {id: this.article!.articleParentId}}
      } else {
        redirectParams = {name: 'article'}
      }

      this.article = undefined;
      this.editApi.removeById(id).then(() => {
        this.$router.push(redirectParams)
      }).catch((e) => {
        console.log('sureRemove thrown an error')
        throw e
      })
    },

    edit() {
      const id = this.article!.id;
      this.$router.push({name: 'edit_article', params: {id: id}})
    }
  }

})
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <KnowledgeLayout :selected-id="this.idToNumber" :tree="tree">
    <div v-if="isLoading" class="d-flex justify-content-center">
      <LoadingSpinner/>
    </div>

    <div v-if="article !== undefined" class="article-content">
      <ArticleHead>
        <div class="row" @mouseover="onTitleMouseOver" @mouseleave="onTitleMouseLeave">
          <div class="col-12 d-flex flex-row mb-0">
            <h1 class="me-2">{{ this.article.title }}</h1>
            <div v-if="canUserEdit && isEditIconShown" class="d-flex align-items-center gap-1">
              <EditIcon class="edit-icon" @click="edit"/>
              <RemoveIcon class="edit-icon" @click="remove"/>
            </div>
          </div>
        </div>
        <div class="row mb-4 text-muted">
          <span>{{ article.author }}  · {{ this.strCreatedAt }}</span>
        </div>
      </ArticleHead>


      <ArticleContent :content="JSON.parse(this.article.content)"/>

      <!-- Assurance Modal for removing article -->
      <AssuranceModal title="Удаление"
                      cancel-label="Отмена"
                      sure-label="Удалить"
                      @assure="sureRemove"
                      v-model:showing="isRemoveModalShown">
        <p>Вы действительно хотите удалить статью <b>{{ article.title }}</b></p>
      </AssuranceModal>

    </div>
  </KnowledgeLayout>


</template>

<style scoped>
.edit-icon {
  color: var(--muted);
}

.edit-icon:hover {
  color: black;
  cursor: pointer;
}
</style>