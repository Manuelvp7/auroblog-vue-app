import mutations from './mutations.js';
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    state() {
        return {
            userId: null,
            api_token: null,
        };
    },
    mutations,
    actions,
    getters
};