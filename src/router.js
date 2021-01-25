import { createRouter, createWebHistory } from "vue-router";
import PostsList from "./views/posts/PostsList.vue";
import PostDetail from "./views/posts/PostDetail.vue";
import NotFound from "./views/NotFound.vue";
import PostCreation from "./views/posts/PostCreation.vue"
import UserAuth from "./views/auth/UserAuth.vue";
import store from './store/index.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/posts" },
        { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
        { path: "/posts", component: PostsList },
        { path: "/new", component: PostCreation, meta: { requiresAuth: true } },
        { path: "/posts/:id", component: PostDetail, props: true },
        { path: "/:notFound(.*)", component: NotFound },
    ],
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next("/posts");
    } else {
        next();
    }
});

export default router;