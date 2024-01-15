<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import KnowledgeLayout from "@/views/KnowledgeLayout.vue";
import {ArticleApi} from "@/api/ArticleApi";
import type {Article} from "@/models/article/Article";
import NavBar from "@/components/nav/NavBar.vue";
import type {ArticleTree} from "@/models/article/ArticleTree";
import RenderedArticleContent from "@/components/knowledge/RenderedArticleContent.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import AssuranceModal from "@/components/modal/AssuranceModal.vue";

export default defineComponent({
  components: {AssuranceModal, RemoveIcon, EditIcon, RenderedArticleContent, NavBar, KnowledgeLayout},
  props: {
    id: {
      type: Object as PropType<string | undefined>,
    }
  },

  data() {
    return {
      editApi: new ArticleApi(),
      tree: undefined as ArticleTree | undefined,
      article: undefined as Article | undefined,
      isLoading: true,
      isEditIconShown: false,
      isRemoveModalShown: false
    }
  },

  mounted() {
    this.loadArticle()
  },

  computed: {
    idToNumber() {
      if (this.id) {
        return Number.parseInt(this.id.toString());
      }
      return undefined;
    },
  },

  watch: {
    id(newId) {
      this.loadArticle()
    }
  },

  methods: {
    loadArticle() {
      this.isLoading = true;

      if (!this.id) {
        this.editApi.getRootTree().then((tree) => {
          this.tree = tree;
          this.article = undefined;
          this.isLoading = false;
        }).catch((e) => {
          this.$router.push({name: 'login'})
        })
        return
      }

      this.editApi.getArticleWithTreeById(this.idToNumber!).then((articleWithTree) => {
        this.article = articleWithTree.article;
        this.tree = articleWithTree.tree;
        this.isLoading = false;
      }).catch((e) => {
        this.$router.push({name: 'login'})
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
        this.$router.push({name: 'login'})
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
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="article !== undefined" class="article-content">
      <div class="row" @mouseover="onTitleMouseOver" @mouseleave="onTitleMouseLeave">
        <div class="col-12 d-flex flex-row mb-2">
          <h1 class="me-2">{{ this.article.title }}</h1>
          <div class="d-flex align-items-center gap-1" v-if="isEditIconShown">
            <EditIcon class="edit-icon" @click="edit"/>
            <RemoveIcon class="edit-icon" @click="remove"/>
          </div>
        </div>
      </div>

      <RenderedArticleContent :html="this.article.content"/>

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