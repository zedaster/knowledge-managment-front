import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";
import AddArticleView from "@/views/add/AddArticleView.vue";
import FormulasView from "@/views/FormulasView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/articles/:id?',
      name: 'article',
      component: ArticleView,
      props: true,
    },
      {
          path: '/add_article/:parentId?',
          name: 'add_article',
          component: AddArticleView,
          props: true
      },
    {
      path: '/formulas',
      name: 'formulas',
      component: FormulasView
    }
  ]
})

export default router
