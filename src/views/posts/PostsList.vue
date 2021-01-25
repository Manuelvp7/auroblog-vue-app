<template>
    <div>
        <base-dialog :show="!!error" title="An error Ocured!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <div>

            <section>
                <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadPosts"> Refresh </base-button>
                    <base-button link to="/auth" v-if="!isLoggedIn" > Login </base-button>
                    <base-button v-if="isLoggedIn && !isLoading" link :to="to"> New Post </base-button>


                </div>

                <div v-if="isLoading">
                    <base-spiner></base-spiner>
                </div>
                <ul v-else-if="hasPosts">
                    <post-item v-for="post in filteredPosts"
                        :key="post.id"
                        :id ="post.id"
                        :content="post.content"
                        :title="post.title"
                        :created_at="post.created_at">
                    </post-item>

                </ul>
                <h3 v-else>  No posts found </h3>
                </base-card>
            </section>
        </div>
    </div>

</template>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
import BaseButton from '../../components/ui/BaseButton.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
import PostItem from "./../../components/posts/PostItem.vue"
export default {
    data() {
        return {
            isLoading: false,
            error: null,
            to:'/new'
        }
    },
    components:{
        PostItem,
        BaseButton,
        BaseDialog
    },
    methods:{

        async loadPosts(){
            this.isLoading = true;
            try {
                await this.$store.dispatch('posts/loadPosts');
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }


            this.isLoading = false;
        },
        handleError(){
            this.error = null;
        }
    },
    created() {
        this.loadPosts();
    },
    computed: {
        filteredPosts(){
            return this.$store.getters['posts/posts'];
        },
        hasPosts(){
            return !this.isLoading && this.$store.getters['posts/hasPosts'];
        },
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        }
    }
}
</script>

