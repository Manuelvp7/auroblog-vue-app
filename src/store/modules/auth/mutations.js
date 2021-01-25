export default {
    setUser(state, payload) {
        state.api_token = payload.api_token;
        state.userId = payload.userId;
    }
};