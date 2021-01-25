export default {
    async registerPost(context, data) {
        const postData = {
            title: data.title,
            content: data.content,
        };

        const token = context.rootGetters.api_token;

        const response = await fetch(`http://localhost:8000/api/posts`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        // const reponseData = await response.json();

        if (!response.ok) {
            console.log(response);
        }

        context.commit("registerPost", {
            ...postData,
        });
    },

    async updatePost(context, data) {
        const postData = {
            id: data.id,
            title: data.title,
            content: data.content,
        };

        const token = context.rootGetters.api_token;

        const response = await fetch("http://localhost:8000/api/posts/" + data.id, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        // const reponseData = await response.json();

        if (!response.ok) {
            console.log(response);
        }

        context.commit("updatePost", {
            ...postData,
        });
    },
    async deletePost(context, data) {

        console.log('deleting this post' + data);
        const token = context.rootGetters.api_token;

        const response = await fetch("http://localhost:8000/api/posts/" + data, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }

        });

        console.log(response);

        if (!response.ok) {
            console.log(response);
        }

        context.commit("deletePost", {
            data,
        });
    },

    async loadPosts(context) {
        const response = await fetch(`http://localhost:8000/api/posts`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || "Failed to fetch");
            throw error;
        }

        const posts = [];

        for (const key in responseData) {
            const post = {
                id: responseData[key].id,
                title: responseData[key].title,
                content: responseData[key].content,
                created_at: responseData[key].created_at,
            };

            posts.push(post);
        }

        context.commit("setPosts", posts);
    },
};