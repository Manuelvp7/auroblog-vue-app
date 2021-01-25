export default {
    posts(state) {
        return state.posts;
    },
    hasPosts(state) {
        return state.posts && state.posts.length > 0;
    },


};