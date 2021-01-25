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
    }

};