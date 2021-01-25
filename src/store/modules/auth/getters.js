export default {
    userId(state) {
        return state.userId;
    },
    api_token(state) {
        return state.api_token;
    },
    isAuthenticated(state) {
        return !!state.api_token;
    }
};