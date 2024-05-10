import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";
import AddArticleView from "@/views/edit/AddArticleView.vue";
import FormulasView from "@/views/FormulasView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import EditArticleView from "@/views/edit/EditArticleView.vue";
import AdminView from "@/views/AdminView.vue";
import {useUserStore} from "@/store/UserStore";


const isAuthenticated = (to: any, from: any, next: any) => {
    const userStorage = useUserStore();
    if (userStorage.hasUser()) {
        next();
        return;
    }

    router.push({name: 'login'})
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter: isAuthenticated
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
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
            beforeEnter: isAuthenticated,
        },
        {
            path: '/add_article/:parentId?',
            name: 'add_article',
            component: AddArticleView,
            props: true,
            beforeEnter: isAuthenticated,
        },
        {
            path: '/edit_article/:id',
            name: 'edit_article',
            component: EditArticleView,
            props: true,
            beforeEnter: isAuthenticated,
        },
        {
            path: '/formulas',
            name: 'formulas',
            component: FormulasView,
            beforeEnter: isAuthenticated,
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView,
            beforeEnter: isAuthenticated,
        }
    ]
})

export default router
