import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";
import AddArticleView from "@/views/AddArticleView.vue";

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
      path: '/add_article',
      name: 'add_article',
      component: AddArticleView
    }
  ]
})

export default router
