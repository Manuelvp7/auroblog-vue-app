export default {
    async login(context, payload) {

        const response = await fetch(`http://localhost:8000/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to authenticate.');
            throw error;

        }

        context.commit("setUser", {
            api_token: responseData.data.api_token,
            userId: responseData.data.id,
        });

    },

    logout(context) {
        context.commit('setUser', {
            api_token: null,
            userId: null
        });
    }
};