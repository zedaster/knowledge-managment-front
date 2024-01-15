import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";
import AddArticleView from "@/views/edit/AddArticleView.vue";
import FormulasView from "@/views/FormulasView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import EditArticleView from "@/views/edit/EditArticleView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
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
            path: '/edit_article/:id',
            name: 'edit_article',
            component: EditArticleView,
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
