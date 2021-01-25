import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostsList from "./views/posts/PostsList.vue";
import PostDetail from "./views/posts/PostDetail.vue";
import NotFound from "./views/NotFound.vue";


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        { path: "/", redirect: "/posts" },
        { path: "/posts", component: PostsList },
        { path: "/posts/:id", component: PostDetail, props: true },
        { path: "/:notFound(.*)", component: NotFound },
    ],
});

export default router