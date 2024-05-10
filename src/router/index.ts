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
import ProfileView from "@/views/ProfileView.vue";

// If user tries to open another page, auth tokens will be checked
const authPages = new Set(['login', 'register']);

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
        },
        {
            path: '/add_article/:parentId?',
            name: 'add_article',
            component: AddArticleView,
            props: true,
            beforeEnter: kickIfCantEdit,
        },
        {
            path: '/edit_article/:id',
            name: 'edit_article',
            component: EditArticleView,
            props: true,
            beforeEnter: kickIfCantEdit,
        },
        {
            path: '/formulas',
            name: 'formulas',
            component: FormulasView,
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView,
            beforeEnter: kickIfNotAdmin,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView
        }
    ]
})

router.beforeEach((to, from) => {
    kickIfNotAuthorized(to);
})

function kickIfNotAuthorized(to: any) {
    if (authPages.has(to.name as string)) {
        return;
    }

    const userStorage = useUserStore();
    if (userStorage.hasUser()) {
        return;
    }

    console.log("Kicking unauthorized user")
    router.push({name: 'login'})
}

function kickIfCantEdit(to: any, from: any, next: any) {
    const userStorage = useUserStore();
    if (!userStorage.canEdit()) {
        router.push({name: 'home'});
        return;
    }
    next();
}

function kickIfNotAdmin(to: any, from: any, next: any) {
    const userStorage = useUserStore();
    if (!userStorage.isAdmin()) {
        router.push({name: 'home'});
        return;
    }
    next();
}

export default router
