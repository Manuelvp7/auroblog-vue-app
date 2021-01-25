import { createStore } from 'vuex';
import postsModule from './modules/posts/index.js';
import authModule from './modules/auth/index.js'


export default createStore({
    modules: {
        posts: postsModule,
        auth: authModule
    }

});