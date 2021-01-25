export default {
    registerPost(state, payload) {
        state.posts.push(payload);
    },

    setPosts(state, payload) {
        state.posts = payload;
    },

    updatePost(state, payload) {
        const aPost = state.posts.find((post) => post.id == payload.id);
        aPost.title = payload.title;
        aPost.content = payload.content;
    },
    deletePost(state, payload) {
        for (var i = 0; i < state.posts.length; i++) {
            if (state.posts[i].id == payload) {
                state.posts.splice(i, 1);
            }
        }
    }


};